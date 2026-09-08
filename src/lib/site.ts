/**
 * Single source of truth for site-wide content and configuration.
 * Replace SITE.url in one place to change canonicals, sitemap and OG URLs.
 */
export const SITE = {
  name: "NexaFlow",
  tagline: "Automate work. Move faster.",
  url: "https://nexaflow.com",
  email: "hello@nexaflow.com",
  twitter: "@nexaflow",
  description:
    "NexaFlow is an AI workflow automation platform that helps teams automate repetitive work, organise tasks and run projects from one dashboard.",
} as const;

export const absoluteUrl = (path: string) =>
  `${SITE.url}${path === "/" ? "" : path.replace(/\/$/, "")}` || SITE.url;

export const NAV_LINKS = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export const FOOTER_LEGAL = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

/** Pages included in sitemap.xml — keep in sync with indexable routes. */
export const INDEXABLE_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/features", priority: "0.9", changefreq: "monthly" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly" },
  { path: "/about", priority: "0.6", changefreq: "yearly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "yearly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
] as const;

export type Plan = {
  id: string;
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  featured?: boolean;
  cta: string;
  features: string[];
};

/** Placeholder pricing — edit freely, the UI derives everything from here. */
export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    blurb: "For individuals automating their own day-to-day work.",
    monthly: 0,
    yearly: 0,
    cta: "Start for free",
    features: [
      "1 workspace, 1 seat",
      "5 active automations",
      "500 monthly task runs",
      "Task board and calendar",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For small teams that want automation on autopilot.",
    monthly: 19,
    yearly: 15,
    featured: true,
    cta: "Start 14-day trial",
    features: [
      "Up to 10 seats",
      "Unlimited automations",
      "25,000 monthly task runs",
      "AI workflow builder and summaries",
      "Project templates and dashboards",
      "Email support, 1 business day",
    ],
  },
  {
    id: "business",
    name: "Business",
    blurb: "For growing companies with cross-team processes.",
    monthly: 49,
    yearly: 39,
    cta: "Talk to us",
    features: [
      "Unlimited seats",
      "250,000 monthly task runs",
      "Advanced permissions and audit log",
      "Single sign-on (SAML)",
      "Sandbox environment",
      "Priority support with 4-hour response",
    ],
  },
];

export const FAQS = [
  {
    q: "What does NexaFlow actually do?",
    a: "NexaFlow connects the tools your team already uses and runs repeatable work for you: routing requests, creating and assigning tasks, chasing updates, and summarising project status. You build a workflow once, and it runs on a schedule or whenever a trigger fires.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Workflows are built from visual steps, and you can describe what you want in plain language and have the AI builder draft the steps for you. Teams that do write code can still call custom HTTP endpoints inside a workflow.",
  },
  {
    q: "How is a task run counted?",
    a: "One task run is one step executed inside a workflow. A workflow with four steps that runs ten times uses forty task runs. Usage is shown in your dashboard so you can see exactly where your allowance goes.",
  },
  {
    q: "Can I try NexaFlow before paying?",
    a: "Yes. The Free plan has no time limit and no card required, and Pro includes a 14-day trial. You can move between plans at any time and the change is prorated.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your workspace becomes read-only at the end of the billing period and you can export tasks, projects and run history as CSV or JSON. Data is deleted 30 days after cancellation unless you ask us to remove it sooner.",
  },
  {
    q: "Do you offer support during onboarding?",
    a: "Pro plans include email support with a one business day target. Business plans add priority support with a four-hour target during business hours and a guided onboarding session.",
  },
] as const;
