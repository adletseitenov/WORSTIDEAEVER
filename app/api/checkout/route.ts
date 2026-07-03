import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";
import { polarProductForTier } from "@/lib/polar";

/**
 * GET /api/checkout?tier=<tierId>
 * Создаёт Polar checkout для платного тарифа и редиректит на hosted-оплату.
 * После оплаты Polar возвращает на /onboarding/success, где тариф пишется в аккаунт.
 *
 * Demo-safe: если нет POLAR_ACCESS_TOKEN, тариф без Polar-продукта или Polar
 * недоступен — уходим сразу на success (demo=1), чтобы демо не падало на сцене.
 */
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const tier = req.nextUrl.searchParams.get("tier");
  const productId = polarProductForTier(tier);
  const token = process.env.POLAR_ACCESS_TOKEN;

  const success = (extra: string) =>
    `${origin}/onboarding/success?tier=${encodeURIComponent(tier ?? "")}${extra}`;

  if (!token || !productId) {
    return NextResponse.redirect(success("&demo=1"));
  }

  try {
    const polar = new Polar({
      accessToken: token,
      server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
    });
    const checkout = await polar.checkouts.create({
      products: [productId],
      // {CHECKOUT_ID} подставит Polar — оставляем плейсхолдер как есть.
      successUrl: success("&checkout_id={CHECKOUT_ID}"),
    });
    return NextResponse.redirect(checkout.url);
  } catch {
    return NextResponse.redirect(success("&demo=1&error=1"));
  }
}
