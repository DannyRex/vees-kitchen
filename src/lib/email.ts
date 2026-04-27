import "server-only";
import { Resend } from "resend";
import { SITE } from "./site";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM ?? `${SITE.name} <hello@veeskitchen.co.uk>`;

const resend = apiKey ? new Resend(apiKey) : null;

interface SendEmailArgs {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, text, html, replyTo }: SendEmailArgs) {
  if (!resend) {
    // In dev, log instead of failing — keeps the form flow usable without keys.
    console.log("[email:dev]", { to, subject, replyTo, text });
    return { id: "dev-no-send" };
  }

  const result = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    text,
    html,
    replyTo,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
  return { id: result.data?.id ?? "" };
}
