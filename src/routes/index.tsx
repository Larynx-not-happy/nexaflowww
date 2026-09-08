import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, CalendarClock, GitBranch, LineChart, ShieldCheck, Workflow } from "lucide-react";

import heroImage from "@/assets/hero-dashboard.jpg";
import { Container, CtaBand } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const title = "NexaFlow — AI workflow automation for teams";
const description =
  "Automate repetitive work, organise tasks and run projects from one dashboard. NexaFlow builds workflows in plain language so your team ships faster.";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title,
      description,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description,
        url: SITE.url,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free plan with 5 active automations",
        },
      },
    }),
  component: HomePage,
});

const pillars = [
  {
    icon: Workflow,
    title: "Visual workflow builder",
    body: "Chain triggers, conditions and actions across the tools you already use — no scripting required.",
  },
  {
    icon: Bot,
    title: "AI that drafts the work",
    body: "Describe the process in a sentence and NexaFlow proposes the steps, owners and checks for you.",
  },
  {
    icon: LineChart,
    title: "One live dashboard",
    body: "Tasks, projects and automation runs share a single view, so status meetings get a lot shorter.",
  },
];

const steps = [
  {
    icon: GitBranch,
    title: "Connect",
    body: "Link your task tracker, inbox, docs and calendar in a few clicks.",
  },
  {
    icon: Bot,
    title: "Describe",
    body: "Write what should happen in plain language, then refine the generated steps.",
  },
  {
    icon: CalendarClock,
    title: "Run",
    body: "Workflows fire on a trigger or a schedule and log every run for review.",
  },
];

function HomePage() {
  return (
    <main id="main">
      <section className="glow-top border-b border-border">
        <Container className="grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="rise">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {SITE.tagline}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl">
              The busywork runs itself.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              NexaFlow is an AI-powered platform for automating repetitive workflows, organising
              tasks and managing projects — all from a single dashboard your whole team can read.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link
                  to="/contact"
                  onClick={() => trackEvent("cta_click", { location: "hero", label: "get_started" })}
                >
                  Get started free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  to="/features"
                  onClick={() => trackEvent("cta_click", { location: "hero", label: "learn_more" })}
                >
                  See how it works
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free plan, no card required. Cancel or export your data whenever you like.
            </p>
          </div>

          <div className="panel overflow-hidden">
            <img
              src={heroImage}
              width={1600}
              height={1000}
              fetchPriority="high"
              decoding="async"
              alt="NexaFlow dashboard showing automation run trends, project progress and team capacity"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16 sm:py-20">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Everything your team repeats every week, handled once.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((item) => (
              <article key={item.title} className="panel p-6">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm">
            <Link to="/features" className="font-medium underline underline-offset-4">
              Explore all NexaFlow features
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">Three steps to your first workflow</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="panel p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Step {index + 1}
                </span>
                <step.icon className="mt-4 h-6 w-6" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold">Built to be boring about your data</h2>
            <p className="mt-3 text-muted-foreground">
              Role-based permissions, an audit log of every automated action, and exports whenever
              you want them. You can see exactly what ran, when, and on whose behalf.
            </p>
            <p className="mt-4 text-sm">
              <Link to="/privacy-policy" className="underline underline-offset-4">
                Read how we handle data
              </Link>
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {[
              ["5 min", "Median time to first workflow"],
              ["120+", "Prebuilt automation templates"],
              ["Every run", "Logged with inputs and outputs"],
              ["Unlimited", "Projects on paid plans"],
            ].map(([value, label]) => (
              <div key={label} className="panel p-5">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold">{value}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand location="home_footer" />
    </main>
  );
}
