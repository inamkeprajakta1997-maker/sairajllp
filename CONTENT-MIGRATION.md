# Sairaj LLP content migration

Source of company facts: https://sairajgroups.in/ (retrieved 15 November 2026).
Design reference: https://www.allcargologistics.com/ (visual inspiration only; no copied branding, photographs or text).

## Completed

- Homepage, About, all ten service detail pages, services overview, industries, group showcase, contact, business/shipment inquiry, blog listing and all ten existing articles.
- Company history: founded in 2017, Sahajpurwadi, founder Sukhdeo Choramale. LLP branding transition supplied in the project brief; no new registration identifiers inferred.
- Full service content and blog bodies are retained as structured, text-only blocks in `src/data/migrated.json`. Migration is reproducible with `node scripts/migrate-content.mjs` from the downloaded source snapshots.
- Three existing testimonials retained with original names; company name updated to LLP.
- Main contact page details retained: +91 9922469898, sairajgroups9898@yahoo.com, F5QH+Q88, Sahajpurwadi, Maharashtra 412202, office hours 09:00 am–10:00 pm.
- Original logo and original service, article and company-showcase images retained. Existing supplied industrial hero asset used for the new hero.
- One original article image URL returned an HTML error page. The warehouse/manpower article uses the existing warehouse service photograph instead. Raster assets are resized and encoded for approximately 82% lower total payload.

## Information requiring company confirmation

- The About page contains explicit editable placeholders for official vision and mission statements. None were available on the source website.
- Original homepage shows twelve company marks under “Family Group Of Companies”, without textual company names, relationship descriptions or external links. The gallery is retained; relationship information is explicitly marked pending confirmation on the group page.
- The source has contradictory experience claims (“10+ years” versus founded in 2017). The redesign uses the documented founding year and no experience counter.
- One blog lists a different phone and email from the main Contact page. Shared contact UI uses the main Contact page details. Obsolete inline article contact details are omitted.
- Original GST number is associated with the old business identity. It is archived in source snapshots and is not represented as a confirmed LLP registration.
- No verified social account URLs were published in the retrieved pages. No invented social profiles are linked.
- Generic airline/AIG statements on the old About page appear unrelated to its industrial business description and are excluded pending verification.

## Forms and integration

Contact and shipment forms validate fields and prepare an email or WhatsApp message to the verified business contact. The original shipment fields (name, email, phone, delivery city, Express/Regular) and consulting service selector are preserved. No submission is claimed until the visitor sends using their chosen app. Messages are not stored by the website.

To enable direct server submission, replace the prepare handler in `src/components/corporate.tsx` with an authenticated server endpoint for the chosen email/CRM provider. Add server validation, rate limiting and delivery-status handling. Provision secrets through Lovable; do not place them in client variables or source code. Database schema changes must be handled through Lovable per AGENTS.md.

## Existing project conventions

The supplied application is React/TypeScript with Tailwind and TanStack Start file routing, so its working router/build integration is retained. CSS handles restrained motion and honours reduced-motion preferences. No second router or animation dependency is introduced.

SEO uses the existing production domain. Update canonical base and sitemap if the deployment domain changes. Source repository: https://github.com/inamkeprajakta1997-maker/sairajllp. Production deployment remains managed through the existing Lovable workflow; a source push does not by itself confirm production publication.
