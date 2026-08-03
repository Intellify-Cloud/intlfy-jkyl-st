# Contact Form Email Sender - Implementation Plan

## Overview
Create a PHP email sender for the contact form on the Intellify Jekyll site, hosted on xneelo with full cPanel access. The form currently submits to a broadsheet API endpoint via JavaScript - we'll add a PHP fallback that sends email via xneelo SMTP.

## Current Architecture
- **Frontend**: Jekyll site with contact form in `_includes/contact.html` and `contact-us/index.html`
- **Form fields**: name, emailAddress, phoneNumber, content, location (honeypot)
- **Current submission**: POST to `site.broadsheet_api_url` (Azure Container Apps) via JS in `assets/js/site.js`
- **Email destination**: `site.email` = `pieter@intellify.co.za` (from `_config.yml`)

## Implementation Plan

### 1. Create PHP Email Sender (`/contact.php`)
**Location**: Site root (publicly accessible)

**Requirements**:
- PHP 7.4+ (xneelo supports 8.x)
- PHPMailer v6.x via SMTP (more reliable than `mail()`)
- Validate honeypot (`location` must be empty)
- Validate required fields: name, emailAddress, content
- Send HTML + plain text email to `pieter@intellify.co.za`
- Reply-To: user's email
- Return JSON response for AJAX compatibility
- CORS headers for cross-origin requests

**SMTP Config (xneelo)**:
- Host: `mail.intellify.co.za` (or `smtp.xneelo.co.za`)
- Port: 465 (SSL) or 587 (TLS)
- Username: `noreply@intellify.co.za`
- Password: (from cPanel Email Accounts)

### 2. Include PHPMailer Library
**Location**: `/phpmailer/` (vendor directory)

Download PHPMailer 6.x source and place in `/phpmailer/src/` - no Composer needed for simple cPanel deployment.

### 3. Update Frontend JavaScript (`_assets/site.js`)
Add fallback submission logic:
1. Try primary API endpoint first
2. On failure, POST to `/contact.php`
3. Handle JSON response, show success/error in `[data-form-status]`

### 4. Security Considerations
- Honeypot validation (location field empty)
- Input sanitization (strip_tags, htmlspecialchars)
- No email header injection (validate email format)
- Rate limiting: simple file-based IP tracking (optional v2)
- CSRF token (optional v2)

### 5. Email Template
**HTML**: Intellify branded, includes all form fields, timestamp, IP
**Text**: Plain fallback with same data

### 6. Environment Configuration
Store SMTP credentials securely:
- Option A: cPanel → PHP Variables (recommended)
- Option B: `.env` file outside web root
- Option C: Constants in `contact.php` (less secure)

## Files to Create/Modify

### New Files
1. `/contact.php` - Main email handler
2. `/phpmailer/` - PHPMailer library (vendor)
3. `.kilo/plans/contact-form-email-sender-plan.md` - This plan

### Modified Files
1. `_assets/site.js` → compiles to `assets/js/site.js`
   - Add fallback fetch to `/contact.php`

## Deployment Steps
1. Download PHPMailer 6.x → upload to `/phpmailer/src/`
2. Upload `contact.php` to site root via cPanel File Manager
3. Create email account `noreply@intellify.co.za` in cPanel
4. Set SMTP credentials in cPanel → PHP Variables or in `contact.php`
5. Test form submission from live site
6. Verify email received at `pieter@intellify.co.za`

## Testing Checklist
- [ ] Form submits via AJAX to `/contact.php`
- [ ] Email received with correct formatting
- [ ] Reply-To works (reply goes to user)
- [ ] Honeypot blocks spam (location filled = rejected)
- [ ] Required field validation works
- [ ] JSON response handled by frontend
- [ ] Success/error messages display in `[data-form-status]`
- [ ] CORS headers allow form submission
- [ ] Works on live domain (not just localhost)

## Future Enhancements
- Rate limiting (IP + time window)
- reCAPTCHA/hCaptcha integration
- Submission logging to file/database
- Admin notification CC
- Custom email templates via admin