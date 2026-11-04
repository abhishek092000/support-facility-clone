<?php
/**
 * Shared configuration for the contact and free-trial form endpoints.
 *
 * Copy config.example.php to config.php and adjust the values, or set the same
 * keys as environment variables. config.php is git-ignored so real credentials
 * never end up in source control.
 */

return [
    // Where enquiries are delivered. Several recipients can be given as an array.
    'recipient' => getenv('SF_MAIL_TO') ?: 'sales@supportfacility.com',

    // Must be an address on the domain that sends the mail, otherwise SPF fails.
    'from_email' => getenv('SF_MAIL_FROM') ?: 'no-reply@supportfacility.com',
    'from_name' => getenv('SF_MAIL_FROM_NAME') ?: 'Support Facility Website',

    // reply_to is set to the visitor's address so a reply reaches them directly.

    // Optional: send through an authenticated SMTP relay instead of PHP mail().
    // Leave host empty to use the server's local mail transfer agent.
    'smtp' => [
        'host' => getenv('SF_SMTP_HOST') ?: '',
        'port' => (int) (getenv('SF_SMTP_PORT') ?: 587),
        'username' => getenv('SF_SMTP_USER') ?: '',
        'password' => getenv('SF_SMTP_PASS') ?: '',
        'encryption' => getenv('SF_SMTP_ENCRYPTION') ?: 'tls', // tls, ssl or none
    ],

    // Only these origins may post to the endpoint. Add the production domain.
    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:4173',
        'http://localhost:4180',
        'http://127.0.0.1:5173',
        'https://www.supportfacility.com',
        'https://supportfacility.com',
    ],

    // Where to send the visitor after a successful submission.
    'redirect_success' => '/thank-you',

    // Optional Google reCAPTCHA v3 verification. Leave empty to disable.
    'recaptcha_secret' => getenv('SF_RECAPTCHA_SECRET') ?: '',
    'recaptcha_min_score' => 0.5,

    // Basic abuse protection: max submissions allowed per IP per window.
    'rate_limit' => [
        'max' => 5,
        'window' => 900, // seconds
        'storage' => sys_get_temp_dir() . '/sf-form-rate-limit',
    ],

    'log_file' => dirname(__DIR__, 2) . '/storage/form-submissions.log',
];
