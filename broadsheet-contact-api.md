# Broadsheet Contact API

This site sends contact-page enquiries to Broadsheet through the API base URL configured in `_config.yml`:

```yml
broadsheetApiUrl: https://api.broadsheet.intellify.co.za
```

Jekyll exposes that value to the contact form script in `_includes/contact.html`:

```js
const API_URL = '{{ site.broadsheetApiUrl }}';
```

At build time, that becomes:

```js
const API_URL = 'https://api.broadsheet.intellify.co.za';
```

## Current Contact Page Flow

The `/contact/` page is defined in `contact.md` and renders the shared contact form with:

```liquid
{% include contact.html %}
```

The form in `_includes/contact.html` uses the `id="contactForm"` element and intercepts submit events with JavaScript. The browser does not submit to an HTML `action`; the script sends the enquiry with `fetch()`.

Before sending, the script validates these required fields:

- `firstName`
- `lastName`
- `emailAddress`
- `content`

`phoneNumber` is optional.

There is also a hidden honeypot field named `location`. Real visitors should leave it blank. Bots sometimes fill hidden fields, so this can help the receiving API identify suspicious submissions.

## API Request

The contact form posts to:

```text
POST https://api.broadsheet.intellify.co.za/v1/messages
```

The request uses JSON:

```http
Content-Type: application/json
```

The current payload is:

```json
{
  "name": "First Last",
  "emailAddress": "person@example.com",
  "phoneNumber": "+27 82 000 0000",
  "location": "",
  "content": "Message text from the form"
}
```

The payload is built from the form fields like this:

```js
const body = {
  name: fields.firstName.value.trim() + ' ' + fields.lastName.value.trim(),
  emailAddress: fields.emailAddress.value.trim(),
  phoneNumber: fields.phoneNumber.value.trim(),
  location: fields.location.value,
  content: fields.content.value.trim()
};
```

Then sent like this:

```js
const response = await fetch(API_URL + '/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});
```

If `response.ok` is false, the form shows the error message. If the response is successful, the form resets and shows the success message.

## Required Markup For Another Page

To implement this on another page, the simplest option is to reuse the include:

```liquid
{% include contact.html %}
```

If the new page needs a different layout or different fields, copy the same JavaScript pattern and keep these parts aligned:

- The form element must exist before the script runs.
- The form ID must match `document.getElementById('contactForm')`, or the script must be updated to use the new ID.
- Every field referenced in the `fields` object must exist in the HTML.
- Every required field referenced in the `errors` object needs a matching error element, such as `id="error-firstName"`.
- The submit button ID must match `submitBtn`.
- The success and error message containers must match `status-sent` and `status-error`, or the script must be updated.
- The API base URL should keep coming from `{{ site.broadsheetApiUrl }}` rather than being hard-coded in multiple places.

## Adding Page-Specific Context

If another page needs to tell Broadsheet where the enquiry came from, add that context to `content` or add another field only if the API supports it.

Safe option:

```js
content: '(Affordability calculator enquiry)<br>' + fields.content.value.trim()
```

This keeps the API contract the same because the request still sends the known `content` field.

Use a new top-level field only after confirming Broadsheet accepts it:

```js
sourcePage: 'affordability-calculator'
```

## Minimal Reuse Example

```html
<form id="contactForm">
  <input id="firstName" name="firstName" type="text">
  <span id="error-firstName"></span>

  <input id="lastName" name="lastName" type="text">
  <span id="error-lastName"></span>

  <input id="emailAddress" name="emailAddress" type="email">
  <span id="error-emailAddress"></span>

  <input id="phoneNumber" name="phoneNumber" type="tel">

  <input id="location" name="location" type="text" tabindex="-1" autocomplete="off" hidden>

  <textarea id="content" name="content"></textarea>
  <span id="error-content"></span>

  <div id="status-sent" style="display:none;">Thank you, your enquiry has been received.</div>
  <div id="status-error" style="display:none;">Sorry, something went wrong.</div>

  <button type="submit" id="submitBtn">
    <span>Submit Enquiry</span>
  </button>
</form>
```

Use the submit handler from `_includes/contact.html` with this markup, or include the whole contact component directly.
