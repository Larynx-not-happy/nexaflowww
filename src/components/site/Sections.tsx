import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="glow-top border-b border-border">
      <Container className="py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Ready to automate the busywork?",
  body = "Tell us about your team and the workflow you would like to simplify.",
  location,
}: {
  title?: string;
  body?: string;
  location: string;
}) {
  return (
    <section className="border-t border-border bg-surface-strong">
      <Container className="flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link
              to="/contact"
              onClick={() => trackEvent("cta_click", { location, label: "get_started" })}
            >
              Contact the team
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link
              to="/pricing"
              onClick={() => trackEvent("cta_click", { location, label: "see_pricing" })}
            >
              See pricing
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
