import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Server-side validation schema — the client uses the same rules. */
export const contactSchema = z.object({
  submission_id: z.string().uuid(),
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.enum(["sales", "support", "partnership", "other"], {
    errorMap: () => ({ message: "Please choose a topic." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please give us at least 20 characters so we can help.")
    .max(2000, "Please keep your message under 2000 characters."),
  /** Honeypot: must stay empty. Bots fill it in. */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Public, append-only intake. Never expose a read or arbitrary table operation.
    if (data.website) return { ok: false as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      submission_id: data.submission_id,
      name: data.name,
      email: data.email,
      company: data.company || null,
      topic: data.topic,
      message: data.message,
    });

    if (error?.code === "23505") return { ok: true as const };
    if (error) {
      console.error("Contact storage failed", error.code);
      throw new Error("We couldn't send your message. Please try again in a moment.");
    }

    return { ok: true as const };
  });
