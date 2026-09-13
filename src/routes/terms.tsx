import { createFileRoute, Link } from "@tanstack/react-router";

import { Container, PageHeader } from "@/components/site/Sections";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const title = "Terms & Conditions | NexaFlow";
const description =
  "The terms that apply when you use the NexaFlow website: acceptable use, intellectual property, disclaimers, liability limits and contact details.";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      path: "/terms",
      title,
      description,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Terms & Conditions", path: "/terms" },
      ]),
    }),
  component: TermsPage,
});

const sections = [
  {
    h: "1. Agreement",
    p: "By using this website you agree to these terms. If you do not agree, please stop using the site. These terms cover the website only; a separate agreement would govern any paid NexaFlow subscription.",
  },
  {
    h: "2. Use of the site",
    p: "You may browse, link to and quote this site with attribution. You may not attempt to disrupt the site, probe it for vulnerabilities without permission, scrape it at a rate that degrades service, or submit unlawful, misleading or abusive content through our forms.",
  },
  {
    h: "3. Contact submissions",
    p: "Send only information you are allowed to share. Do not submit sensitive personal data, credentials or confidential material. We may keep a copy of your message to answer it, as described in the Privacy Policy.",
  },
  {
    h: "4. Intellectual property",
    p: "The NexaFlow name, logo, site design, text and graphics are owned by us or our licensors and may not be reused as your own product or brand. Third-party marks belong to their owners.",
  },
  {
    h: "5. Accuracy and placeholder content",
    p: "This site is a demonstration. Product capabilities, statistics, availability and pricing shown here are illustrative placeholders and may change or may not reflect a live commercial service. Nothing here is an offer, a warranty or a commitment.",
  },
  {
    h: "6. Availability",
    p: "We aim to keep the site available but we do not guarantee uninterrupted access. Pages may be changed or removed at any time without notice.",
  },
  {
    h: "7. Third-party links",
    p: "Where we link to other sites we do so for convenience. We do not control them and we are not responsible for their content or privacy practices.",
  },
  {
    h: "8. Disclaimers and liability",
    p: "The site is provided \u201cas is\u201d without warranties of any kind to the extent permitted by law. We are not liable for indirect or consequential loss arising from your use of the site. Nothing in these terms limits liability that cannot legally be limited.",
  },
  {
    h: "9. Changes to these terms",
    p: "We may update these terms; the revised version applies from the date shown on this page. Continued use of the site means you accept the update.",
  },
];

function TermsPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="The rules for using this website, written as plainly as we can manage."
      />

      <section>
        <Container className="max-w-3xl py-14">
          <p className="text-sm text-muted-foreground">Last updated: 8 September 2026</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground">
            {sections.map((section) => (
              <section key={section.h}>
                <h2 className="text-xl font-bold text-foreground">{section.h}</h2>
                <p className="mt-3">{section.p}</p>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-bold text-foreground">10. Contact</h2>
              <p className="mt-3">
                Questions about these terms? Email{" "}
                <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>{" "}
                or use the{" "}
                <Link to="/contact" className="underline underline-offset-4">
                  contact form
                </Link>
                . See also our{" "}
                <Link to="/privacy-policy" className="underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <p className="rounded-lg border border-border p-4">
              This page is a good-faith summary for a demonstration website, not legal advice.
              Governing law and a registered entity should be added before commercial use.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
