# Form backend (PHP)

The contact and free-trial forms post to `public/api/send-mail.php`, which sends
the enquiry by email. No third party (FormSubmit, Formspree, etc.) is involved.

## Files

| File | Purpose |
|---|---|
| `public/api/send-mail.php` | The endpoint. Validates, filters spam, sends the mail. |
| `public/api/bootstrap.php` | Shared helpers: config, validation, rate limit, SMTP client. |
| `public/api/config.example.php` | Defaults. Committed. |
| `public/api/config.php` | Your real settings and credentials. **Not committed.** |
| `storage/form-submissions.log` | One JSON line per submission attempt. **Not committed.** |

## Running locally

`npm run dev` already starts PHP and proxies `/api` to it:

```
[php] C:/xampp/php/php.exe serving /api on http://127.0.0.1:8123
```

On Windows the plugin probes the usual XAMPP / WAMP / Laragon locations. To use a
different binary or port:

```powershell
$env:PHP_BIN = 'C:\path\to\php.exe'
$env:PHP_PORT = '8123'
npm run dev
```

`npm run preview` starts PHP too, so the production build can be tested with a
working form.

## Configuring mail delivery

Copy `config.example.php` to `config.php` and adjust it. Two delivery modes:

**1. Local mail transfer agent (default)**

Leave `smtp.host` empty and PHP's `mail()` is used. This requires a working MTA
on the server (Postfix, Exim, sendmail). On a typical Linux host this is already
present.

**2. Authenticated SMTP relay (recommended)**

Set `smtp.host`, `port`, `username`, `password` and `encryption`. This works
without a local MTA and improves deliverability. Example for Google Workspace:

```php
'smtp' => [
    'host' => 'smtp.gmail.com',
    'port' => 587,
    'username' => 'sales@supportfacility.com',
    'password' => 'your-app-password', // App Password, not the login password
    'encryption' => 'tls',
],
```

Every setting can also come from the environment, which is preferable on hosts
that support it: `SF_MAIL_TO`, `SF_MAIL_FROM`, `SF_SMTP_HOST`, `SF_SMTP_PORT`,
`SF_SMTP_USER`, `SF_SMTP_PASS`, `SF_SMTP_ENCRYPTION`, `SF_RECAPTCHA_SECRET`.

## Deploying

1. `npm run build`
2. Upload the contents of `dist/` **and** `public/api/` to the web root, keeping
   the `api/` directory name so `/api/send-mail.php` resolves.
3. Upload `config.php` with production values (or use environment variables).
4. Ensure `storage/` is writable by the web server.
5. Make sure `from_email` is on the domain you send from, and that SPF/DKIM are
   configured, or mail will be filed as spam.

Vite hashes JS/CSS filenames but copies `public/` verbatim, so the PHP files
land at `/api/send-mail.php` unchanged.

## Security behaviour

- **Honeypot** — a hidden `_honey` field. If filled, the request returns success
  without sending, so bots do not learn they were filtered.
- **Rate limit** — 5 submissions per IP per 15 minutes (`rate_limit` config).
  Fails open, so a disk problem never blocks a genuine enquiry.
- **Server-side validation** — name, email, company and service are required;
  phone is format-checked; all input is trimmed and stripped of control
  characters to prevent email header injection.
- **Reply-To** — set to the visitor's address, so replying reaches them.
- **Optional reCAPTCHA v3** — set `recaptcha_secret` to enable. The client may
  send `recaptcha_token`. Verification failures are rejected.
- **No error leakage** — PHP warnings are suppressed and buffered away, so the
  response body is always valid JSON.

## Endpoint contract

Request (JSON or form-encoded):

```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "company": "Acme Hosting",
  "phone": "+91 98765 43210",
  "service": "Technical Support",
  "message": "We need overnight coverage.",
  "form_type": "Website Contact Request",
  "page_url": "https://www.supportfacility.com/contact/"
}
```

Responses:

| Status | Body |
|---|---|
| `200` | `{"ok":true,"redirect":"/thank-you"}` |
| `405` | Non-POST request |
| `422` | `{"ok":false,"error":"...","fields":{"name":"...","email":"..."}}` |
| `429` | Rate limit exceeded |
| `500` | `{"ok":false,"error":"Your enquiry could not be sent..."}` |

The React side lives in `src/components/useLeadForm.js` and shows field-level
messages plus a status banner.

## Testing without a real mail server

A minimal SMTP sink is enough to verify the pipeline end to end:

```powershell
python smtp_sink.py 2525 smtp-capture.txt
```

Point `smtp.host` at `127.0.0.1`, `port` at `2525`, `encryption` at `none`, then
submit the form. The captured message is written to `smtp-capture.txt`.
