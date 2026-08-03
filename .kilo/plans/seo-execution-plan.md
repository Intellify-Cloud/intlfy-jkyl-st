# SEO Execution Plan for Intellify

## Current State Assessment

**Website**: https://www.intellify.co.za
**Platform**: Jekyll static site
**Pages**: Home (/), Contact (/contact/), Portfolio (/portfolio/), Privacy Policy (/privacy-policy/)
**Strengths**: Basic meta tags, canonical URLs, OG/Twitter cards, Organization schema markup, sitemap.xml, robots.txt, FAQ section

## Priority 1: Critical Technical SEO (Week 1) ✅ COMPLETED

### 1.1 Enhanced Sitemap ✅
- Added `<lastmod>`, `<changefreq>`, and `<priority>` tags to sitemap.xml
- Excluded redundant pages from sitemap (/contact-us/, .xml files)

### 1.2 Optimized Structured Data ✅
- Added LocalBusiness schema (address: Durban, South Africa) to head.html
- Added FAQPage schema using existing FAQ content (sitetext.yml)
- Added ItemList schema for portfolio sites
- Added Product/Offer schema for pricing plans on portfolio page

### 1.3 Core Web Vitals Optimization ⏳ PENDING
- [ ] Optimize hero image (assets/img/hero/home.jpg) - compress and add WebP version
- [ ] Inline critical CSS for above-the-fold content
- [ ] Preload key fonts with `font-display: swap`

## Priority 2: On-Page SEO (Week 1-2) ✅ COMPLETED

### 2.1 Title Tag Optimization ✅
- Home: "Managed Website Subscriptions South Africa"
- Portfolio: "Website Plans South Africa"  
- Contact: "Contact Web Designer Durban"

### 2.2 Meta Description Enhancement ✅
- Extended descriptions to 150-160 characters with keywords

### 2.3 Content Optimization ✅
- Added hero subheading with keywords
- Added aria-labelledby attributes for accessibility
- Improved alt text for portfolio images

## Priority 3: Content & Keyword Strategy (Week 2-3)

### 3.1 Target Keywords (from _data/seo.yml)
**Primary**: 
- managed website subscription South Africa
- small business website Durban
- monthly website plan
- SEO optimized websites South Africa

**Secondary**:
- affordable website design Durban
- no upfront cost website
- cloud managed websites
- professional business websites South Africa
- KZN web design
- website hosting included

### 3.2 Blog/Content Plan (RECOMMENDED)
Create content hub with topics:
- "10 Website Features Every South African Business Needs"
- "Why Monthly Websites Beat One-Time Builds in 2026"
- "SEO Checklist for Small Business Websites"
- Case studies for portfolio clients

## Priority 4: Off-Page & Local SEO (Week 3-4)

### 4.1 Google Business Profile
- Claim/verify Google Business listing for "Intellify"
- Add service area: Durban, KwaZulu-Natal, South Africa
- Add categories: "Web Designer", "Digital Marketing Service"

### 4.2 Directory Citations
- Yalwa.co.za
- Brabys.co.za
- JunkMail.co.za
- Hotfrog.co.za

### 4.3 Link Building
- Client website footer links back to Intellify
- Guest posts on South African business blogs
- Partner with local business associations

## Priority 5: Performance Monitoring (Ongoing)

### 5.1 Tools Setup
- Google Search Console (verify with existing html file)
- Google Analytics
- Bing Webmaster Tools
- Monitor Core Web Vitals (PageSpeed Insights)

### 5.2 Monthly Tasks
- Track keyword rankings
- Monitor organic traffic growth
- Update content based on search queries
- Check for crawl errors

## Completed Changes Summary

| File | Change |
|------|--------|
| `_includes/head.html` | Added og:locale, format-detection meta tag, enhanced LocalBusiness schema |
| `sitemap.xml` | Added lastmod, changefreq, priority tags |
| `robots.txt` | Added Disallow rules for assets/private paths |
| `_data/seo.yml` | New file with keywords |
| `_includes/structured-data.html` | FAQPage schema include (uses sitetext.yml FAQ) |
| `_layouts/home.html` | Added structured-data include |
| `_includes/portfolio.html` | Added width/height, improved alt text, ItemList schema |
| `_includes/hero.html` | Added aria-labelledby, hero-subheading |
| `_includes/mission.html` | Added aria-labelledby |
| `_includes/offering.html` | Added aria-labelledby, improved H3 tags |
| `_assets/components/_hero.scss` | Added hero-subheading styles |
| `index.html` | Updated title/description with keywords |
| `contact.md` | Updated title/description with keywords |
| `portfolio/index.html` | Added Product/Offer schema, updated title/description |
| `privacy-policy/index.html` | Updated description |

## Validation Commands

```bash
# Build and verify
bundle exec jekyll build

# Check sitemap
cat _site/sitemap.xml

# Check robots.txt
cat _site/robots.txt

# Validate structured data at Google Rich Results Test
