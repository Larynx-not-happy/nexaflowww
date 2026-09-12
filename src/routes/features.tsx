import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Boxes, Bot, ClipboardList, KeyRound, LineChart, Plug, Workflow } from "lucide-react";

import { Container, CtaBand, PageHeader } from "@/components/site/Sections";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const title = "Features — workflow automation, tasks and projects | NexaFlow";
const description =
  "See what NexaFlow does: an AI workflow builder, task and project management, integrations, run history, permissions and reporting in one dashboard.";

export const Route = createFileRoute("/features")({
  head: () =>
    pageHead({
      path: "/features",
      title,
      description,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
      ]),
    }),
  component: FeaturesPage,
});

const groups = [
  {
    heading: "Automation",
    items: [
      {
        icon: Workflow,
        title: "Workflow builder",
        body: "Triggers, branches, delays and approvals arranged visually. Test a workflow with sample data before you switch it on.",
      },
      {
        icon: Bot,
        title: "AI drafting and summaries",
        body: "Describe a process in a sentence to generate a draft workflow, and get plain-language summaries of what changed this week.",
      },
      {
        icon: Bell,
        title: "Smart notifications",
        body: "Alerts fire on real events — a blocked task, an overdue approval, a failed run — instead of a constant feed.",
      },
    ],
  },
  {
    heading: "Work management",
    items: [
      {
        icon: ClipboardList,
        title: "Tasks and boards",
        body: "Board, list and calendar views over the same tasks, with owners, due dates, dependencies and checklists.",
      },
      {
        icon: Boxes,
        title: "Projects and templates",
        body: "Reusable project templates that create their own tasks, owners and automations the moment a project starts.",
      },
      {
        icon: LineChart,
        title: "Reporting",
        body: "Throughput, cycle time, workload and automation savings, exportable to CSV for your own analysis.",
      },
    ],
  },
  {
    heading: "Platform",
    items: [
      {
        icon: Plug,
        title: "Integrations",
        body: "Connect email, chat, docs, calendars, CRMs and issue trackers, or call any HTTP endpoint from a workflow step.",
      },
      {
        icon: KeyRound,
        title: "Access control",
        body: "Roles, per-project permissions, single sign-on on Business, and an audit log of every automated action.",
      },
    ],
  },
];

function FeaturesPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Product concept · Planned features"
        title="One dashboard for the work, and the work about the work"
        intro="Explore the NexaFlow product vision: AI automation, tasks and projects in one workspace. These are proposed capabilities, not live tools on this website."
      />

      {groups.map((group) => (
        <section key={group.heading} className="border-b border-border">
          <Container className="py-14">
            <h2 className="text-2xl font-bold sm:text-3xl">{group.heading}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {group.items.map((item) => (
                <article key={item.title} className="panel p-6">
                  <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="border-b border-border bg-surface">
        <Container className="py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">Questions before you start?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The{" "}
            <Link to="/faq" className="underline underline-offset-4">
              FAQ
            </Link>{" "}
            explains the product concept and how this site works, and the{" "}
            <Link to="/pricing" className="underline underline-offset-4">
              pricing page
            </Link>{" "}
            shows what's included on each plan.
          </p>
        </Container>
      </section>

      <CtaBand location="features_footer" />
    </main>
  );
}
