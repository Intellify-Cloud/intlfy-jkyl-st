# Intellify Jekyll Site

A Jekyll-based static site.

## Setup

```powershell
bundle install
```

## Development

```powershell
bundle exec jekyll serve --livereload
```

## Build

```powershell
npm run bundle
```

`npm run bundle` runs the Jekyll build and then verifies that `_site/assets/css/main.css`
contains compiled CSS, not raw Sass directives. Use this before deploy.

## Project Shape

- `_config.yml` contains global site identity and SEO defaults.
- `_layouts/` contains page wrappers.
- `_includes/` contains reusable Liquid sections.
- `_data/sitetext.yml` contains repeated page content.
- `_assets/` contains editable Sass partials compiled by Jekyll.
- `assets/css/main.scss` is the Jekyll Sass entrypoint.
- `assets/js/site.js` contains the small browser script.
- `assets/img/` contains static images.
- `_site/` is generated output and should not be hand-edited.

The old Next/React source and npm/Webpack pipeline have been removed. Build and serve with Bundler/Jekyll.

## Sass Compatibility

Keep `assets/css/main.scss` and `_assets/site.scss` on `@import` syntax for now.
The production build has previously served raw `@use` directives as CSS.
The `npm run bundle` guard fails if that regression comes back.
