import "server-only";
import { randomUUID } from "node:crypto";
import { sendEmail } from "./email";
import { dishBySlug } from "./menu";
import { SITE } from "./site";
import { zoneInfo, type Zone } from "./postcode";
import type { OrderInput } from "./order-schema";

/**
 * Order provider seam. The MVP impl writes to memory + emails Chef Vee.
 * To swap to Stripe/Tock/Resy, replace this implementation — the SubmitResult
 * shape is the contract.
 */

export interface SubmitResult {
  ok: boolean;
  orderId?: string;
  message?: string;
}

interface PreparedOrder extends OrderInput {
  orderId: string;
  zone: Zone;
  total: number;
  receivedAt: string;
}

function prepareOrder(input: OrderInput, zone: Zone): PreparedOrder {
  const total = input.items.reduce((sum, item) => {
    const dish = dishBySlug(item.slug);
    return sum + (dish?.price ?? 0) * item.qty;
  }, 0);

  return {
    ...input,
    orderId: randomUUID().slice(0, 8).toUpperCase(),
    zone,
    total,
    receivedAt: new Date().toISOString(),
  };
}

function chefEmailBody(order: PreparedOrder): string {
  const z = zoneInfo(order.zone);
  const lines = order.items
    .map((item) => {
      const dish = dishBySlug(item.slug);
      const name = dish?.name ?? item.slug;
      const price = dish?.price ?? 0;
      return `  • ${item.qty} × ${name}  (£${price * item.qty})`;
    })
    .join("\n");

  return [
    `New order ${order.orderId}`,
    "",
    `From:        ${order.name} <${order.email}>`,
    order.phone ? `Phone:       ${order.phone}` : null,
    `Postcode:    ${order.postcode.toUpperCase()}  (${z.zone}, lead ${z.leadLabel}, delivery ${z.deliveryLabel})`,
    `Wants for:   ${order.deliveryDate}`,
    order.occasion ? `Occasion:    ${order.occasion}` : null,
    "",
    "Items:",
    lines,
    "",
    `Subtotal:    £${order.total}`,
    "",
    order.dietary ? `Dietary: ${order.dietary}` : null,
    order.notes ? `Notes:   ${order.notes}` : null,
    "",
    `Marketing opt-in: ${order.marketingOptIn ? "yes" : "no"}`,
    `Received:        ${order.receivedAt}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function customerEmailBody(order: PreparedOrder): string {
  return [
    `Hi ${order.name},`,
    "",
    `Thanks for your order with ${SITE.name}. We've got it.`,
    "",
    `Reference: ${order.orderId}`,
    `Wanted for: ${order.deliveryDate}`,
    `Subtotal: £${order.total}`,
    "",
    "Chef Vee will reply within one working day to confirm delivery time and",
    "share a payment link. If you need to amend anything in the meantime, just",
    `reply to this email or write to ${SITE.email}.`,
    "",
    "— The Vee's Kitchen team",
  ].join("\n");
}

export async function submitOrder(
  input: OrderInput,
  zone: Zone,
): Promise<SubmitResult> {
  const order = prepareOrder(input, zone);

  if (zone === "outOfZone") {
    return {
      ok: false,
      message:
        "We can't deliver to that postcode just yet. Please email us directly.",
    };
  }

  try {
    await Promise.all([
      sendEmail({
        to: SITE.email,
        replyTo: order.email,
        subject: `Order ${order.orderId} — ${order.name} — £${order.total}`,
        text: chefEmailBody(order),
      }),
      sendEmail({
        to: order.email,
        subject: `Your order with ${SITE.name} — ${order.orderId}`,
        text: customerEmailBody(order),
      }),
    ]);

    return { ok: true, orderId: order.orderId };
  } catch (e) {
    console.error("[order:error]", e);
    return {
      ok: false,
      message: "Something went wrong while sending your order. Please email us directly.",
    };
  }
}
