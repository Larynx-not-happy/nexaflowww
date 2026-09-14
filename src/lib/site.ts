/**
 * Single source of truth for site-wide content and configuration.
 * Replace SITE.url in one place to change canonicals, sitemap and OG URLs.
 */
export const SITE = {
  name: "NexaFlow",
  tagline: "Automate work. Move faster.",
  url: process.env.SITE_URL || "https://nexaflowww.lovable.app",
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
  id: "free" | "pro" | "business";
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
    cta: "Ask about Free",
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
    cta: "Ask about Pro",
    features: [
      "Up to 10 seats",
      "Unlimited automations",
      "25,000 monthly task runs",
      "AI workflow builder and summaries",
      "Project templates and dashboards",
      "Email support",
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
      "Priority support",
    ],
  },
];

export const FAQS = [
  {
    q: "What is NexaFlow?",
    a: "NexaFlow is a fictional AI-powered productivity product, designed around workflow automation, task organisation and project management. This website presents that product concept; it is not a working automation application.",
  },
  {
    q: "Do I need to know how to code?",
    a: "The proposed product uses a visual workflow builder with AI-assisted drafting, designed for teams without coding experience. The builder and integrations are not available on this website.",
  },
  {
    q: "How is a task run counted?",
    a: "In the proposed pricing model, one task run is one executed workflow step. A four-step workflow running ten times would use forty task runs. All limits shown are illustrative and editable.",
  },
  {
    q: "Can I start a free plan or trial here?",
    a: "Not yet. Free, Pro and Business are example plans, not purchasable subscriptions. The plan buttons open a contact form with your interest prefilled; they do not create an account, charge a card or activate a trial.",
  },
  {
    q: "What happens when I submit the contact form?",
    a: "Your validated message is stored privately in Lovable Cloud for the site operator to review. No public message listing is available. There is no automated email notification or guaranteed response time.",
  },
  {
    q: "Can I control analytics and request deletion?",
    a: "Yes. Analytics is optional and only enabled after consent and configuration of a real GA4 ID. Reopen Cookie preferences in the footer to change your choice. Contact the site operator about message deletion; see the Privacy Policy for details.",
  },
] as const;
