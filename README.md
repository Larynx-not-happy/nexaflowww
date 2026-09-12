# Evergreen Web Presence

Build a complete, production-ready website with a modern, responsive, fast, accessible, and SEO-friendly implementation.

Do not create a basic mockup. Implement all required pages, functionality, technical SEO, performance optimizations, accessibility features, tracking, and validation.

1. Website Structure

Create a clear, logical site structure with:

Homepage

Main content/service/product pages as appropriate

FAQ page or FAQ section

Privacy Policy page

Terms & Conditions page

Custom 404 error page

Contact/form page where applicable

Use clean, human-readable URLs such as:

/

/about

/services

/faq

/privacy-policy

/terms

/contact

Keep navigation consistent across the entire website.

2. Clear CTAs

Add strategically placed, highly visible calls-to-action throughout the website.

Examples:

Get Started

Contact Us

Learn More

Request a Quote

Sign Up

CTAs should have clear visual hierarchy and should lead to the correct destination.

Do not use misleading CTAs or unnecessary popups.

3. FAQ

Create a useful FAQ section/page.

Requirements:

Use expandable accordion items.

Make the questions easy to scan.

Provide concise but useful answers.

Ensure keyboard accessibility.

Use appropriate FAQ structured data/schema where eligible.

Do not add fake questions simply to manipulate SEO.

4. Privacy Policy & Terms

Create dedicated:

/privacy-policy

/terms

pages with properly structured content.

Include appropriate sections for:

Data collection

Cookies

Analytics

User rights

Third-party services

Data usage

Contact information

Terms of website usage

Limitations/disclaimers where applicable

Do not claim legal compliance that has not actually been implemented.

5. robots.txt

Create a valid /robots.txt.

Requirements:

Allow search-engine crawlers to access public pages.

Block genuinely private/admin areas where necessary.

Reference the XML sitemap.

Do not accidentally block important CSS, JavaScript, images, or public pages.

6. sitemap.xml

Create a valid /sitemap.xml.

Include all important indexable canonical URLs.

Exclude:

404 pages

Redirect URLs

Duplicate URLs

Private/admin pages

Pages intentionally marked noindex

Ensure URLs are absolute and use the correct HTTPS domain.

7. Custom 404 Page

Create a custom 404 page instead of displaying a generic server error.

It should include:

Clear "Page Not Found" message

Link back to homepage

Useful navigation

Search or relevant links where appropriate

Consistent website branding

Proper HTTP 404 status

Do not redirect every missing URL to the homepage.

8. Image SEO & Accessibility

Every meaningful image must have appropriate alt text.

Requirements:

Descriptive alt text for informative images.

Empty alt="" for purely decorative images.

Never use filenames as alt text.

Avoid keyword stuffing.

Ensure images have appropriate dimensions.

Use modern image formats such as WebP/AVIF where supported.

Lazy-load below-the-fold images.

Do not lazy-load the primary above-the-fold/LCP image unnecessarily.

9. Analytics

Implement analytics correctly.

Requirements:

Use a privacy-conscious analytics configuration where possible.

Track important conversions such as CTA clicks and successful form submissions.

Do not send unnecessary personally identifiable information to analytics.

Ensure analytics does not significantly hurt page performance.

Respect applicable cookie/consent requirements.

Use environment variables/configuration for analytics IDs instead of hardcoding sensitive configuration.

10. Meta Titles

Create unique, descriptive <title> tags for every indexable page.

Requirements:

Every page must have a unique title.

Titles should accurately describe the page.

Avoid keyword stuffing.

Keep them concise and useful for search results.

11. Meta Descriptions

Create unique meta descriptions for important indexable pages.

Requirements:

Accurately summarize the page.

Include the primary topic naturally.

Make them useful and compelling for search users.

Do not duplicate the same description across every page.

12. Social Sharing

Implement social sharing metadata.

Include:

Open Graph tags

Twitter/X Card metadata

Correct social preview title

Correct social preview description

Social preview image

Canonical URL

Ensure shared pages generate an appropriate preview.

13. Favicon

Add a complete favicon setup.

Include appropriate:

favicon

Apple touch icon where appropriate

Web manifest icons if a PWA/manifest is used

Use properly sized assets and reference them correctly in the document head.

14. Canonical URLs

Every indexable page should have the correct canonical URL.

Requirements:

Use absolute HTTPS canonical URLs.

Avoid duplicate canonical declarations.

Ensure canonical URLs correspond to the preferred page.

Keep canonical URLs consistent with the sitemap.

15. Cookie Consent

Implement a proper cookie-consent mechanism if cookies or tracking technologies requiring consent are used.

Requirements:

Clearly explain what categories of cookies/tracking are used.

Provide meaningful choices rather than forcing acceptance.

Do not load non-essential tracking before the required consent is obtained.

Allow users to change/revoke their preferences.

Link to the Privacy Policy.

Keep the banner accessible on mobile and desktop.

Do not create a fake cookie banner that does not actually control tracking.

16. Mobile Version

Make the entire website fully responsive.

Test at minimum:

Mobile

Tablet

Laptop

Desktop

Requirements:

No horizontal scrolling.

Touch-friendly buttons and controls.

Readable typography.

Responsive navigation.

Responsive images.

Proper spacing.

Forms must work correctly on mobile.

No content should be hidden or unusable on small screens.

Use a mobile-first responsive approach where appropriate.

17. Accessibility

Follow WCAG 2.2 AA principles as closely as reasonably applicable.

Implement:

Semantic HTML

Proper heading hierarchy

Keyboard navigation

Visible focus states

Accessible forms

Proper labels

ARIA only when necessary

Sufficient color contrast

Accessible buttons and links

Screen-reader-friendly navigation

Skip-to-content link

Reduced-motion support where appropriate

No keyboard traps

Meaningful link text

Accessible error messages

Do not rely on color alone to communicate information.

18. Forms

Test every form.

Verify:

Required fields

Email validation

Invalid input handling

Error messages

Success messages

Keyboard navigation

Mobile usability

Duplicate submission prevention where appropriate

Loading states

Server-side validation if applicable

Secure handling of submitted data

Do not claim a form works unless the submission flow is actually implemented.

19. Broken-Link Testing

Scan the entire website for broken links.

Check:

Internal links

Navigation links

Footer links

CTA links

Image URLs

Assets

External links where practical

Fix:

404 links

Incorrect paths

Broken anchors

Missing assets

Incorrect redirects

Do not leave placeholder links such as #, /coming-soon, or fake URLs unless explicitly required.

20. Performance Optimization

Optimize the website for real-world performance.

Focus on:

Core Web Vitals

LCP

INP

CLS

TTFB where controllable

JavaScript bundle size

CSS size

Image size

Font loading

Caching

Compression

Lazy loading

Code splitting where appropriate

Removing unused dependencies

Minimizing render-blocking resources

Preloading only critical resources

Avoiding unnecessary third-party scripts

Do not sacrifice accessibility, functionality, or visual quality merely to achieve a performance score.

21. SEO Technical Checks

Also implement:

Semantic HTML

One clear H1 per page where appropriate

Proper H2/H3 hierarchy

Clean URLs

Internal linking

Descriptive anchor text

Structured data where genuinely applicable

Correct HTTP status codes

HTTPS

Mobile-friendly layout

Indexability controls

No accidental noindex

No accidental canonical conflicts

22. Security & Reliability

Where applicable:

Validate user input server-side.

Sanitize user-generated content.

Do not expose API keys or secrets in client-side code.

Use environment variables for secrets.

Avoid unnecessary third-party scripts.

Implement sensible security headers where supported.

Handle errors gracefully.

Do not expose stack traces or internal implementation details to users.

23. Final Testing Checklist

Before considering the website complete, perform a full QA pass.

Test:

Desktop layout

Mobile layout

Tablet layout

Navigation

All buttons

All CTAs

All forms

Form validation

404 behavior

Internal links

External links

Images

Alt text

Favicon

Meta titles

Meta descriptions

Canonical URLs

Open Graph metadata

Twitter/X metadata

robots.txt

sitemap.xml

Cookie consent

Analytics

Keyboard navigation

Accessibility

Console errors

JavaScript errors

Missing assets

Performance

Core Web Vitals

24. Deliverables

Provide the complete working website, not just a design.

Include:

All source code

All pages

Components

Styling

Assets/configuration

robots.txt

sitemap.xml

favicon

SEO metadata

Privacy Policy

Terms page

FAQ

Custom 404

Cookie-consent implementation

Analytics implementation

Form functionality

Responsive design

Accessibility implementation

At the end, provide a concise QA report showing:

What was implemented

What was tested

Any remaining issues

Performance findings

Accessibility findings

SEO findings

Broken links found and fixed

Any features that require external configuration

Do not mark the website as "complete" if a required feature is only a placeholder.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nexaflowww.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/096a5237-dd82-48b1-8f05-f4e896fbc1d3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
