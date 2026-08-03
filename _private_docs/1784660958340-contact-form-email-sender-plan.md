# Contact Form Email Sender - Final Plan

## Goal
Replace the contact form submissions from the external broadsheet API to a self-hosted PHP endpoint on xneelo, using `noreply@intellify.co.za` via SMTP.

## Current State
- Static Jekyll site on GitHub Pages (`contact.md`, `contact-us/index.html`)
- Form fields: `name`, `emailAddress`, `phoneNumber`, `content`, `location` (honeypot)
- Form currently POSTs to `site.broadsheet_api_url` via JS in `assets/js/site.js`
- Recipient: `pieter@intellify.co.za` from `_config.yml`

## Architecturl Decision
**Stay on GitHub Pages for the static site, deploy only the email endpoint to xneelo via FTP.**
- Form action URL: `https://intellify.co.za/contact.php` (cross-origin POST)
- No PHP runs on GitHub Pages; GitHub serves only the built Jekyll site
- This keeps version control on GitHub while email sends through your xneelo mailbox

## Files

### Create on xneelo via FTP
| File | Purpose |
|------|---------|
| `contact.php` | Validates input, sends email via PHPMailer SMTP, returns JSON |
| `phpmailer/src/*` | PHPMailer v6.x library (no Composer needed) |

### Modify locally, rebuild, re-upload to xneelo
| File | Change |
|------|--------|
| `_assets/site.js` (→ `assets/js/site.js`) | Change form `action`/fetch target to `https://intellify.co.za/contact.php` |
| `_includes/contact.html` | Remove old `data-api-url` attribute, add `action="/contact.php"` or keep JS-only |
| `contact-us/index.html` | Same form target update |

## contact.php Behavior
- Accepts POST: `name`, `emailAddress`, `phoneNumber`, `content`, `location`
- Reject if `location` is not empty (honeypot)
- Reject if `name`, `emailAddress`, or `content` is empty
- Sanitize all input before use
- Send HTML+text email to `pieter@intellify.co.za`
- Set `Reply-To` to user's `emailAddress`
- Return JSON: `{ "success": true }` or `{ "success": false, "error": "..." }`
- Set CORS header `Access-Control-Allow-Origin: https://www.intellify.co.za`

## SMTP Configuration (needs your confirmation in cPanel)
```php
SMTP_HOST = mail.intellify.co.za (or smtp.xneelo.co.za)
SMTP_PORT = 465 (SSL)
SMTP_USER = noreply@intellify.co.za
SMTP_PASS = <from cPanel Email Accounts>
```
Note: Confirm exact host/port in xneelo cPanel → Email Accounts → Configure Mail Client.

## xneelo Deployment via FTP
1. Build site locally: `bundle exec jekyll build` → outputs to `_site/`
2. Upload `_site/` contents to xneelo `public_html/`
3. Upload `contact.php` to `public_html/contact.php`
4. Upload `phpmailer/src/` to `public_html/phpmailer/src/`
5. Create `noreply@intellify.co.za` email in cPanel if not already
6. Set SMTP password in `contact.php` or via cPanel PHP Variables
7. Test: submit form, check inbox at pieter@intellify.co.za

## Validation Checklist
- [ ] POST from GitHub Pages domain to `https://intellify.co.za/contact.php` succeeds (CORS)
- [ ] Correct email arrives at pieter@intellify.co.za
- [ ] Reply-To points to the visitor's email
- [ ] Honeypot rejects submissions where `location` is filled
- [ ] Empty required fields show an error instead of sending
- [ ] JSON response renders success/error in `[data-form-status]`
- [ ] Form resets after successful submission
- [ ] SPAM/DMARC/SPF records allow xneelo SMTP to send as intellify.co.za

## Open Question for You
What is your **xneelo SMTP server host and port**? Check cPanel → Email Accounts → mail client settings. Common xneelo values are `mail.intellify.co.za` on port 465 or 587. Confirm this before I finalize the PHP constants.
