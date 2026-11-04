<?php
/**
 * Shared helpers for the Support Facility form endpoints.
 * Used by send-mail.php.
 */

declare(strict_types=1);

// Never let PHP warnings/notices corrupt the JSON contract of the endpoints.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

function sf_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }

    $defaults = require __DIR__ . '/config.example.php';
    $localPath = __DIR__ . '/config.php';
    if (is_file($localPath)) {
        $local = require $localPath;
        if (is_array($local)) {
            $defaults = array_replace_recursive($defaults, $local);
        }
    }

    return $config = $defaults;
}

function sf_apply_cors(): void
{
    $config = sf_config();
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = $config['allowed_origins'] ?? [];

    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function sf_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Trim, strip control characters that would allow header injection, and
 * normalise to valid UTF-8.
 */
function sf_clean(string $value): string
{
    $value = str_replace(["\r\n", "\r", "\0"], ' ', $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    if (!mb_check_encoding($value, 'UTF-8')) {
        $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }

    return trim($value);
}

function sf_client_ip(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

function sf_rate_limited(string $key): bool
{
    $config = sf_config()['rate_limit'];
    $max = (int) $config['max'];
    $window = (int) $config['window'];
    $dir = (string) $config['storage'];

    if ($max <= 0 || $window <= 0) {
        return false;
    }
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false; // Fail open: never block genuine enquiries on a disk issue.
    }

    $file = $dir . '/' . hash('sha256', $key) . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_values(array_filter($decoded, static fn($t) => is_int($t) && $t > $now - $window));
        }
    }

    if (count($hits) >= $max) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);

    return false;
}

function sf_log(array $entry): void
{
    $file = (string) sf_config()['log_file'];
    $dir = dirname($file);
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $entry['at'] = gmdate('c');
    @file_put_contents($file, json_encode($entry, JSON_UNESCAPED_SLASHES) . PHP_EOL, FILE_APPEND | LOCK_EX);
}

/**
 * Minimal SMTP client so the endpoint can use an authenticated relay without
 * requiring Composer or PHPMailer on the host.
 */
function sf_smtp_send(array $smtp, string $fromEmail, string $fromName, string $toEmail, string $replyTo, string $subject, string $body): void
{
    $host = (string) $smtp['host'];
    $port = (int) $smtp['port'];
    $encryption = strtolower((string) $smtp['encryption']);
    $target = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;

    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $socket = @stream_socket_client($target, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new RuntimeException("SMTP connection failed: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 20);

    $read = static function () use ($socket): string {
        $data = '';
        while (($line = fgets($socket, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $expect = static function (string $response, string $code) {
        if (strncmp($response, $code, strlen($code)) !== 0) {
            throw new RuntimeException('SMTP error: ' . trim($response));
        }
    };
    $command = static function (string $command, string $code) use ($socket, $read, $expect) {
        fwrite($socket, $command . "\r\n");
        $expect($read(), $code);
    };

    $expect($read(), '220');
    fwrite($socket, "EHLO " . gethostname() . "\r\n");
    $ehlo = $read();
    $expect($ehlo, '250');

    if ($encryption === 'tls') {
        $command('STARTTLS', '220');
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('Could not start TLS for SMTP.');
        }
        fwrite($socket, "EHLO " . gethostname() . "\r\n");
        $expect($read(), '250');
    }

    if ((string) $smtp['username'] !== '') {
        $command('AUTH LOGIN', '334');
        $command(base64_encode((string) $smtp['username']), '334');
        $command(base64_encode((string) $smtp['password']), '235');
    }

    $command('MAIL FROM:<' . $fromEmail . '>', '250');
    $command('RCPT TO:<' . $toEmail . '>', '250');
    $command('DATA', '354');

    $headers = [
        'From: ' . sf_encode_header($fromName) . ' <' . $fromEmail . '>',
        'To: <' . $toEmail . '>',
        'Reply-To: ' . $replyTo,
        'Subject: ' . sf_encode_header($subject),
        'Date: ' . date('r'),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    $data = implode("\r\n", $headers) . "\r\n\r\n" . $body;
    $data = preg_replace('/^\./m', '..', $data) ?? $data;

    fwrite($socket, $data . "\r\n.\r\n");
    $expect($read(), '250');
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
}

function sf_encode_header(string $value): string
{
    return mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n");
}

/**
 * Sends the enquiry. Uses the SMTP relay when configured, otherwise mail().
 */
function sf_send_mail(array $config, string $replyTo, string $subject, string $body): void
{
    $fromEmail = (string) $config['from_email'];
    $fromName = (string) $config['from_name'];
    $recipients = (array) $config['recipient'];

    foreach ($recipients as $toEmail) {
        $toEmail = (string) $toEmail;
        if ($toEmail === '') {
            continue;
        }

        if (!empty($config['smtp']['host'])) {
            sf_smtp_send($config['smtp'], $fromEmail, $fromName, $toEmail, $replyTo, $subject, $body);
            continue;
        }

        $headers = [
            'From' => sf_encode_header($fromName) . ' <' . $fromEmail . '>',
            'Reply-To' => $replyTo,
            'Content-Type' => 'text/plain; charset=UTF-8',
            'MIME-Version' => '1.0',
        ];
        $headerLines = [];
        foreach ($headers as $name => $value) {
            $headerLines[] = $name . ': ' . $value;
        }

        if (!mail($toEmail, sf_encode_header($subject), $body, implode("\r\n", $headerLines), '-f' . $fromEmail)) {
            throw new RuntimeException('mail() returned false for ' . $toEmail);
        }
    }
}

/**
 * Verifies a Google reCAPTCHA token when a secret is configured.
 * Returns true when verification is disabled or the token is valid.
 */
function sf_recaptcha_ok(array $config, string $token): bool
{
    $secret = (string) $config['recaptcha_secret'];
    if ($secret === '') {
        return true;
    }
    if ($token === '') {
        return false;
    }

    $payload = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => sf_client_ip(),
    ]);
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 10,
        ],
    ]);
    $response = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    if ($response === false) {
        // Network failure should not silently drop a real enquiry.
        return true;
    }
    $decoded = json_decode($response, true);
    if (!is_array($decoded) || empty($decoded['success'])) {
        return false;
    }

    return (float) ($decoded['score'] ?? 1.0) >= (float) $config['recaptcha_min_score'];
}
