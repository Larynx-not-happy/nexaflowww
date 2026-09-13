import { createFileRoute, Link } from "@tanstack/react-router";

import { Container, CtaBand, PageHeader } from "@/components/site/Sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { FAQS } from "@/lib/site";

const title = "FAQ — product, plans, privacy and contact | NexaFlow";
const description =
  "Answers to common NexaFlow questions: what the platform does, whether you need to code, how task runs are counted, example plans, privacy and contact.";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      path: "/faq",
      title,
      description,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]),
      ],
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="The things people ask before they start. If your question isn't here, send it over — we'll answer and usually add it to this page."
      />

      <section className="border-b border-border">
        <Container className="py-14">
          <h2 className="sr-only">Questions and answers</h2>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {FAQS.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mx-auto mt-10 max-w-3xl text-sm text-muted-foreground">
            Looking for plan limits? See{" "}
            <Link to="/pricing" className="underline underline-offset-4">
              pricing
            </Link>
            . For how we handle personal data, read the{" "}
            <Link to="/privacy-policy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </Container>
      </section>

      <CtaBand
        title="Question not answered?"
        body="Tell us what you would like to know about the NexaFlow concept."
        location="faq_footer"
      />
    </main>
  );
}
