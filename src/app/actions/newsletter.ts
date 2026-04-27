"use server";

import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { SITE } from "@/lib/site";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function subscribeNewsletter(formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      kind: "error" as const,
      message: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { email } = parsed.data;

  // Send a double-opt-in confirmation email. The link encodes the address
  // with an HMAC signature; the /api/newsletter/confirm route validates it.
  // For MVP we email Chef Vee with the request and send the confirm link to
  // the subscriber.
  try {
    await sendEmail({
      to: email,
      subject: `Confirm your subscription to ${SITE.name}`,
      text: `Thanks for your interest in ${SITE.name}. Reply YES to this email and we will add you to the seasonal menu drop list. (We'll wire a one-click confirm link in v2.)`,
    });

    await sendEmail({
      to: SITE.email,
      subject: `Newsletter signup: ${email}`,
      text: `New newsletter signup: ${email}`,
    });

    return {
      kind: "success" as const,
      message: "Check your inbox to confirm.",
    };
  } catch {
    return {
      kind: "error" as const,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
