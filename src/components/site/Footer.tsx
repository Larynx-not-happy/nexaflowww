import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";
import { CONSENT_EVENT } from "@/lib/analytics";
import { FOOTER_LEGAL, NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {SITE.tagline} NexaFlow brings automation, tasks and projects into one calm dashboard.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <a className="underline underline-offset-4 hover:text-foreground" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Product</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: "reopen" }))
                }
              >
                Cookie preferences
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {SITE.name}. Product, pricing and company details on this
          site are illustrative placeholders.
        </p>
      </div>
    </footer>
  );
}
