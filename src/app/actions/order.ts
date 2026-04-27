"use server";

import { redirect } from "next/navigation";
import { orderSchema } from "@/lib/order-schema";
import { submitOrder } from "@/lib/order-provider";
import { zoneFor } from "@/lib/postcode";

type ActionResult =
  | { kind: "ok"; orderId: string }
  | { kind: "error"; message: string; fieldErrors?: Record<string, string[]> };

export async function submitOrderAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const itemsRaw = formData.get("items");
  let items: unknown = [];
  try {
    items = itemsRaw ? JSON.parse(String(itemsRaw)) : [];
  } catch {
    return { kind: "error", message: "Order data was malformed. Please try again." };
  }

  const parsed = orderSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    postcode: formData.get("postcode"),
    deliveryDate: formData.get("deliveryDate"),
    occasion: formData.get("occasion") ?? "",
    dietary: formData.get("dietary") ?? "",
    notes: formData.get("notes") ?? "",
    marketingOptIn: formData.get("marketingOptIn") === "on",
    gdprConsent: formData.get("gdprConsent") === "on",
    items,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
    }
    return {
      kind: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const zone = zoneFor(parsed.data.postcode);
  const result = await submitOrder(parsed.data, zone);

  if (!result.ok || !result.orderId) {
    return {
      kind: "error",
      message: result.message ?? "Could not place your order. Please try again.",
    };
  }

  redirect(`/order/confirmation?ref=${result.orderId}`);
}
