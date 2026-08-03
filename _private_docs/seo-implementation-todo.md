# SEO Implementation Todo

Date: 2026-07-22

Use this as the working checklist for the next SEO pass. The detailed rationale and content bank live in `_private_docs/seo-working-document.md`.

## Existing Documents

- [x] Found existing SEO audit: `_private_docs/seo-audit-traffic-growth-plan.md`
- [x] Found existing execution plan: `.kilo/plans/seo-execution-plan.md`
- [x] Created active working document: `_private_docs/seo-working-document.md`
- [x] Created implementation todo: `_private_docs/seo-implementation-todo.md`

## Phase 1: Quick Technical And Content Wins

- [x] Fix visible encoding artifacts in source pages and data files.
- [x] Add per-page `last_modified_at` front matter for important pages.
- [x] Update `sitemap.xml` to use page `last_modified_at` when available.
- [x] Add reusable FAQ schema include that reads visible FAQ data.
- [x] Add BreadcrumbList schema for non-home pages.
- [x] Create a reusable service-page FAQ pattern.
- [ ] Add a proper `1200x630` social sharing image and use it for Open Graph/Twitter cards.

## Phase 2: Improve Existing SEO Pages

- [x] Expand `/managed-website-subscriptions-south-africa/`.
- [x] Add visible FAQs to `/managed-website-subscriptions-south-africa/`.
- [x] Add matching FAQPage schema to `/managed-website-subscriptions-south-africa/`.
- [x] Expand `/small-business-website-packages-south-africa/`.
- [x] Add package-choice FAQs to `/small-business-website-packages-south-africa/`.
- [x] Add matching FAQPage schema to `/small-business-website-packages-south-africa/`.
- [x] Expand `/website-design-durban/`.
- [x] Add local trust and service-area copy to `/website-design-durban/`.
- [x] Add matching FAQPage schema to `/website-design-durban/`.
- [x] Improve `/pricing/` with FAQ content under the plan cards.
- [x] Verify pricing schema matches `_data/sitetext.yml`.

## Phase 3: New High-Intent Pages

- [ ] Create `/monthly-website-subscription-south-africa/`.
- [ ] Create `/seo-friendly-website-design-south-africa/`.
- [ ] Create `/website-maintenance-and-hosting-south-africa/`.
- [ ] Create `/how-it-works/`.
- [ ] Add each new page to internal linking from relevant existing pages.
- [ ] Ensure each page has unique title, meta description, H1, and CTA.

## Phase 4: Resource/Article Content

- [ ] Decide whether resources should live under `/resources/`.
- [ ] Draft article: How much does a small business website cost in South Africa?
- [ ] Draft article: Monthly website subscription vs once-off website build.
- [ ] Draft article: What should a small business website include?
- [ ] Draft article: Website maintenance checklist for small businesses.
- [ ] Draft article: How to choose the right website package.
- [ ] Draft article: Why your business needs a professional domain.
- [ ] Add internal links from articles back to pricing and contact.

## Phase 5: Case Studies And Proof

- [ ] Choose 3 to 5 portfolio clients for case studies.
- [ ] Confirm which client names, industries, screenshots, and outcomes may be published.
- [ ] Create `/case-studies/` index page.
- [ ] Create first case study page.
- [ ] Add portfolio/case-study ItemList schema.
- [ ] Link case studies from relevant service pages.

## Phase 6: Local SEO

- [ ] Confirm Google Business Profile status for Intellify.
- [ ] Confirm preferred service area wording: Durban, KwaZulu-Natal, South Africa.
- [ ] Add stronger local trust copy to the homepage or Durban page.
- [ ] Add consistent NAP details: name, email, phone, Durban/South Africa.
- [ ] Identify local directory/citation opportunities.

## Phase 7: Validation

- [x] Run Jekyll build.
- [x] Check generated sitemap.
- [x] Check generated robots.txt.
- [x] Inspect generated page metadata in `_site/`.
- [ ] Validate schema with Google Rich Results Test.
- [ ] Check canonical URLs.
- [ ] Check mobile layout after FAQ/content expansion.
- [ ] Check key pages in Search Console after deployment.

## Waiting On Pieter

- [ ] Confirm current prices: Starter R150, Recommended R199, Premium R350.
- [ ] Confirm whether to publish blog/resource pages.
- [ ] Confirm which portfolio clients can become case studies.
- [ ] Confirm whether Intellify should lead with Durban, South Africa, or both equally.
- [ ] Confirm any claims about turnaround time, included support, and monthly changes before publishing expanded copy.
