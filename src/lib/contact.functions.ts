import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

/** Server-side validation schema — the client uses the same rules. */
export const contactSchema = z.object({
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
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot filled → pretend success, store nothing.
    if (data.website) return { ok: true as const };

    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      topic: data.topic,
      message: data.message,
    });

    if (error) {
      console.error("contact insert failed", error.message);
      throw new Error("We couldn't send your message. Please try again in a moment.");
    }

    return { ok: true as const };
  });
