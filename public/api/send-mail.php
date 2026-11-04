<?php
/**
 * Contact and free-trial enquiry endpoint.
 *
 * Accepts POST requests as JSON or application/x-www-form-urlencoded and
 * replies with JSON: { "ok": true, "redirect": "/thank-you" } on success.
 *
 * Deploy alongside the built site and point the React form's action at it.
 */

declare(strict_types=1);

// PHP warnings must never be echoed into the JSON response body.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// Discard anything already emitted (for example a BOM from an editor) so the
// response body is always valid JSON.
if (!ob_get_level()) {
    ob_start();
}
ob_clean();

require __DIR__ . '/bootstrap.php';

sf_apply_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    sf_json(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$config = sf_config();

// Accept both JSON bodies and classic form posts.
$raw = file_get_contents('php://input') ?: '';
$isJson = str_contains((string) ($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json');
$data = [];
if ($isJson && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (!$data) {
    $data = $_POST;
}

$field = static function (string $name, int $max = 5000) use ($data): string {
    $value = $data[$name] ?? '';
    if (is_array($value)) {
        return '';
    }
    $value = sf_clean((string) $value);

    return mb_substr($value, 0, $max);
};

// Honeypot: real visitors never fill this hidden field.
if ($field('_honey', 200) !== '') {
    sf_log(['result' => 'honeypot', 'ip' => sf_client_ip()]);
    sf_json(200, ['ok' => true, 'redirect' => $config['redirect_success']]);
}

$name = $field('name', 120);
$email = $field('email', 190);
$company = $field('company', 190);
$phone = $field('phone', 60);
$service = $field('service', 120);
$message = $field('message', 5000);
$formType = $field('form_type', 120) ?: 'Website Contact Request';
$recaptchaToken = $field('recaptcha_token', 4000);

$errors = [];
if ($name === '') {
    $errors['name'] = 'Please enter your name.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid business email address.';
}
if ($company === '') {
    $errors['company'] = 'Please enter your company name.';
}
if ($service === '') {
    $errors['service'] = 'Please select a service.';
}
if ($phone !== '' && !preg_match('/^[0-9+().\-\s]{5,60}$/', $phone)) {
    $errors['phone'] = 'Please enter a valid phone number.';
}

if ($errors) {
    sf_json(422, ['ok' => false, 'error' => 'Please correct the highlighted fields.', 'fields' => $errors]);
}

if (sf_rate_limited(sf_client_ip())) {
    sf_json(429, ['ok' => false, 'error' => 'Too many requests. Please try again later.']);
}

if (!sf_recaptcha_ok($config, $recaptchaToken)) {
    sf_json(400, ['ok' => false, 'error' => 'Spam verification failed. Please try again.']);
}

$subject = sprintf('Support Facility - %s', $formType);

$lines = [
    'New enquiry from the Support Facility website.',
    '',
    'Request type: ' . $formType,
    'Name:         ' . $name,
    'Email:        ' . $email,
    'Company:      ' . $company,
    'Phone:        ' . ($phone !== '' ? $phone : 'Not provided'),
    'Service:      ' . $service,
    '',
    'Message:',
    $message !== '' ? $message : '(not provided)',
    '',
    '---',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'IP address: ' . sf_client_ip(),
    'Page: ' . ($field('page_url', 500) ?: 'Not provided'),
];

try {
    sf_send_mail($config, $email, $subject, implode("\n", $lines));
} catch (Throwable $e) {
    sf_log([
        'result' => 'error',
        'ip' => sf_client_ip(),
        'form_type' => $formType,
        'error' => $e->getMessage(),
    ]);
    sf_json(500, ['ok' => false, 'error' => 'Your enquiry could not be sent. Please try again or contact us on WhatsApp.']);
}

sf_log([
    'result' => 'sent',
    'ip' => sf_client_ip(),
    'form_type' => $formType,
    'email' => $email,
    'company' => $company,
    'service' => $service,
]);

sf_json(200, ['ok' => true, 'redirect' => $config['redirect_success']]);
