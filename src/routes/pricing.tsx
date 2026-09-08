import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";

import { Container, CtaBand, PageHeader } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { PLANS } from "@/lib/site";

const title = "Pricing — Free, Pro and Business plans | NexaFlow";
const description =
  "Compare NexaFlow plans: a free plan for individuals, Pro for small teams and Business for companies. Monthly or yearly billing, placeholder pricing.";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      path: "/pricing",
      title,
      description,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
      ]),
    }),
  component: PricingPage,
});

function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main id="main">
      <PageHeader
        eyebrow="Pricing"
        title="Simple plans, priced per seat"
        intro="Start free and upgrade when automation becomes part of how your team works. Prices below are placeholders for this demonstration site."
      />

      <section className="border-b border-border">
        <Container className="py-14">
          <div className="flex flex-wrap items-center gap-4">
            <span id="billing-label" className="text-sm font-medium">
              Billing period
            </span>
            <div
              role="group"
              aria-labelledby="billing-label"
              className="inline-flex rounded-lg border border-border p-1"
            >
              {[
                { key: false, label: "Monthly" },
                { key: true, label: "Yearly (save 20%)" },
              ].map((option) => (
                <button
                  key={String(option.key)}
                  type="button"
                  aria-pressed={yearly === option.key}
                  onClick={() => setYearly(option.key)}
                  className={`min-h-11 rounded-md px-4 text-sm font-medium transition-colors ${
                    yearly === option.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const price = yearly ? plan.yearly : plan.monthly;
              return (
                <article
                  key={plan.id}
                  className={`panel flex flex-col p-6 ${
                    plan.featured ? "border-primary shadow-[var(--shadow-elevated)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold">{plan.name}</h2>
                    {plan.featured && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
                  <p className="mt-6">
                    <span className="font-display text-4xl font-bold">${price}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {price === 0 ? "forever" : `per seat / month${yearly ? ", billed yearly" : ""}`}
                    </span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    <Link
                      to="/contact"
                      search={{ plan: plan.id }}
                      onClick={() =>
                        trackEvent("cta_click", { location: "pricing", label: plan.id })
                      }
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Not sure which plan fits? The{" "}
            <Link to="/faq" className="underline underline-offset-4">
              FAQ
            </Link>{" "}
            explains how task runs are counted and what happens when you switch plans.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Still comparing?"
        body="Tell us about your workflows and we'll point you at the right plan — no sales sequence."
        location="pricing_footer"
      />
    </main>
  );
}
