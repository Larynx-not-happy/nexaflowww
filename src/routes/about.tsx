import { createFileRoute, Link } from "@tanstack/react-router";

import { Container, CtaBand, PageHeader } from "@/components/site/Sections";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const title = "About NexaFlow — why we build automation for teams";
const description =
  "NexaFlow is a small product team building automation that people actually understand. Read what we value and how we work.";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title,
      description,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    }),
  component: AboutPage,
});

const values = [
  {
    title: "Understandable over clever",
    body: "If a teammate can't tell what an automation does by looking at it, the automation is wrong. Every run is readable and reversible.",
  },
  {
    title: "Automate the process, not the people",
    body: "We build for the repetitive glue work between tools, so the judgement calls stay with your team.",
  },
  {
    title: "Data you can take with you",
    body: "Export is a first-class feature, not a retention lever. Your workflows and history belong to you.",
  },
];

function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="About"
        title="We build automation that teams can read"
        intro="NexaFlow started because the same handful of processes were being re-typed every week in every team we worked with. Automation existed, but it was either too rigid or too technical for the people who owned the work."
      />

      <section className="border-b border-border">
        <Container className="grid gap-10 py-14 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold">What we value</h2>
          </div>
          <div className="grid gap-6 md:col-span-2">
            {values.map((value) => (
              <article key={value.title} className="panel p-6">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface">
        <Container className="py-14">
          <h2 className="text-2xl font-bold">How we work</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We ship small changes continuously, publish what changed, and keep the roadmap shaped by
            the workflows customers actually build. If something in the product is confusing, we
            treat that as a bug.
          </p>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Want to talk to a human?{" "}
            <Link to="/contact" className="underline underline-offset-4">
              Send us a message
            </Link>{" "}
            — a person reads every one.
          </p>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            Note: NexaFlow is presented here as a demonstration product. Company details, metrics
            and pricing on this site are illustrative placeholders rather than verified claims.
          </p>
        </Container>
      </section>

      <CtaBand location="about_footer" />
    </main>
  );
}
