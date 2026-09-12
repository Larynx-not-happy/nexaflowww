import { createFileRoute, Link } from "@tanstack/react-router";

import { Container, PageHeader } from "@/components/site/Sections";
import { CONSENT_EVENT } from "@/lib/analytics";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const title = "Privacy Policy | NexaFlow";
const description =
  "How NexaFlow collects, uses and stores personal data on this website: contact form submissions, cookies, analytics, your rights and how to reach us.";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead({
      path: "/privacy-policy",
      title,
      description,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]),
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="This policy explains what this website collects, why, and what you can ask us to do about it. It describes the site you are reading now."
      />

      <section>
        <Container className="max-w-3xl py-14">
          <p className="text-sm text-muted-foreground">Last updated: 8 September 2026</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-foreground">1. Who we are</h2>
              <p className="mt-3">
                {SITE.name} operates this website. For any privacy question, write to{" "}
                <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                . A formal legal entity name and registered address should be added here before this
                site is used commercially.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">2. Data we collect</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Contact form data.</strong> Name, email
                  address, optional company name, the topic you choose and your message. We collect
                  this only when you submit the form.
                </li>
                <li>
                  <strong className="text-foreground">Analytics data.</strong> If you accept
                  analytics cookies, Google Analytics 4 collects pages viewed, approximate location
                  derived from IP address and device information. Our custom events omit contact details, URL query strings and referrers. Google does not log or store individual IP addresses in GA4.
                </li>
                <li>
                  <strong className="text-foreground">Technical logs.</strong> Our hosting provider
                  processes standard request logs, including IP address, needed to serve and secure
                  the site.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">3. How we use it</h2>
              <p className="mt-3">
                Contact form data is processed to respond to your request (pre-contractual steps or legitimate interests, as applicable) and to keep a record of the
                conversation. Analytics data is used in aggregate to understand which pages help
                visitors. We do not sell personal data and we do not use it for automated
                decision-making.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">4. Cookies and tracking</h2>
              <p className="mt-3">
                Essential storage keeps your cookie choice and keeps the site functioning; it cannot
                be switched off. Analytics cookies (<code>_ga</code>, <code>_ga_*</code>) are set by
                Google Analytics 4 only after you press “Accept analytics”. Choosing “Essential
                only” prevents the analytics script from loading at all and clears existing
                analytics cookies we can reach.
              </p>
              <p className="mt-3">
                You can change your choice at any time:{" "}
                <button
                  type="button"
                  className="font-medium text-foreground underline underline-offset-4"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: "reopen" }))
                  }
                >
                  open cookie preferences
                </button>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">5. Third-party services</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Google Analytics 4 — website analytics, loaded only with your consent.</li>
                <li>Google Fonts — serves the typefaces used on this site.</li>
                <li>
                  Lovable Cloud (Supabase infrastructure) — stores contact form submissions privately and serves the site.
                </li>
              </ul>
              <p className="mt-3">
                Each provider processes data under its own terms and may transfer data outside your
                country.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">6. Retention</h2>
              <p className="mt-3">
                Contact messages are kept for as long as needed to handle your enquiry and up to 24
                months afterwards. This is a manual retention target, not an automated deletion schedule; the operator must review and remove old records. Analytics data follows the configured Google Analytics retention settings. Ask
                us and we will delete your message sooner.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">7. Your rights</h2>
              <p className="mt-3">
                Depending on where you live, you may have the right to access, correct, delete,
                restrict or port your personal data, to object to processing, and to withdraw
                consent at any time. To exercise any of these, email{" "}
                <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                . You may also complain to your local data protection authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">8. Security</h2>
              <p className="mt-3">
                The site is served over HTTPS, form input is validated on the server before it is
                stored, and stored messages are not readable from the public website. No system is
                perfectly secure, so please don't send sensitive personal information through the
                contact form.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">9. Changes</h2>
              <p className="mt-3">
                If this policy changes we will update the date above. Related terms are in our{" "}
                <Link to="/terms" className="underline underline-offset-4">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </section>

            <p className="rounded-lg border border-border p-4">
              This policy describes what has actually been implemented on this website. It is not
              legal advice, and it does not by itself make the site compliant with any particular
              law.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
