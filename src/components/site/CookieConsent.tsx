import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CONSENT_EVENT, getConsent, loadAnalytics, setConsent } from "@/lib/analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing === "accepted") loadAnalytics();
    if (!existing) setVisible(true);

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail === "reopen") setVisible(true);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="cookie-title" className="text-sm font-semibold">
            Cookies on this site
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Essential cookies keep the site working and are always on. Analytics cookies (Google
            Analytics 4) help us understand which pages are useful, and only load if you accept. You
            can change this any time from “Cookie preferences” in the footer. Read our{" "}
            <Link
              to="/privacy-policy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="min-h-11" onClick={() => choose("rejected")}>
            Essential only
          </Button>
          <Button className="min-h-11" onClick={() => choose("accepted")}>
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
