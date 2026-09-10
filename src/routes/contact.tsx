import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { z } from "zod";

import { Container, PageHeader } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { contactSchema, submitContactMessage } from "@/lib/contact.functions";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

const title = "Contact NexaFlow — talk to the team";
const description =
  "Ask about plans, onboarding or a specific workflow. Send the NexaFlow team a message and get a reply from a person, usually within one business day.";

const searchSchema = z.object({ plan: z.string().optional() });

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () =>
    pageHead({
      path: "/contact",
      title,
      description,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    }),
  component: ContactPage,
});

type Fields = "name" | "email" | "company" | "topic" | "message";
type Errors = Partial<Record<Fields | "form", string>>;

const TOPICS = [
  { value: "sales", label: "Plans and pricing" },
  { value: "support", label: "Product support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
];

function ContactPage() {
  const { plan } = Route.useSearch();
  const send = useServerFn(submitContactMessage);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return; // prevents duplicate submits

    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData) as Record<string, string>;
    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const firstKey = Object.keys(next)[0];
      const field = firstKey ? formRef.current?.elements.namedItem(firstKey) : null;
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      await send({ data: parsed.data });
      trackEvent("generate_lead", { topic: parsed.data.topic, plan: plan ?? "none" });
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: "We couldn't send your message. Please try again in a moment." });
    }
  }

  return (
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you're trying to automate"
        intro="Whether you're comparing plans or stuck on a specific workflow, send the details and a person will reply — usually within one business day."
      />

      <section>
        <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            {status === "sent" ? (
              <div role="status" className="panel flex gap-4 p-6">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold">Message sent</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks — we've got it. You'll hear back at the email address you gave us,
                    usually within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="max-w-xl space-y-6">
                <h2 className="text-xl font-bold">Send a message</h2>

                {errors.form && (
                  <p role="alert" className="rounded-md border border-destructive px-4 py-3 text-sm">
                    {errors.form}
                  </p>
                )}

                <Field id="name" label="Your name" error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                  />
                </Field>

                <Field id="email" label="Work email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                  />
                </Field>

                <Field id="company" label="Company" optional error={errors.company}>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                  />
                </Field>

                <Field id="topic" label="What's it about?" error={errors.topic}>
                  <select
                    id="topic"
                    name="topic"
                    required
                    defaultValue={plan ? "sales" : ""}
                    aria-invalid={!!errors.topic}
                    aria-describedby={errors.topic ? "topic-error" : undefined}
                    className={inputClass}
                  >
                    <option value="">Choose a topic</option>
                    {TOPICS.map((topic) => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="message"
                  label="Your message"
                  error={errors.message}
                  hint="At least 20 characters — the more context, the better the answer."
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    defaultValue={plan ? `I'm interested in the ${plan} plan. ` : ""}
                    aria-invalid={!!errors.message}
                    aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
                    className={inputClass}
                  />
                </Field>

                {/* Honeypot: hidden from people, tempting for bots. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  We use your details only to reply. See the Privacy Policy for how long we keep
                  them.
                </p>
              </form>
            )}
          </div>

          <aside className="panel h-fit p-6">
            <h2 className="text-lg font-semibold">Other ways to reach us</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Prefer email? Write to{" "}
              <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Support hours are Monday to Friday, 09:00–18:00 UTC. Business plans get a four-hour
              response target during those hours.
            </p>
          </aside>
        </Container>
      </section>
    </main>
  );
}

const inputClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none";

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {optional ? <span className="ml-2 text-muted-foreground">(optional)</span> : null}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
