import type { TierId } from "@/lib/tiers";

/**
 * Polar product ID для каждого ПЛАТНОГО тарифа.
 * «Шедевр» ($0) бесплатен и через Polar не проходит.
 *
 * ⚠️ ID тарифа «Каракули» ($499) выглядит неполным (не стандартный UUID) —
 *    перепроверить в Polar (Products → нужный продукт → ID).
 */
export const POLAR_PRODUCT_BY_TIER: Partial<Record<TierId, string>> = {
  design: "e90af2f0-fcd8-4d87-b62a-f6675350be26", // $9
  sketch: "84c1caac-a177-4e9e-aa4a-f12b81222f6a", // $49
  scribble: "2fdba6dd-8ac9-4b0097158802", // $499 — проверить ID
};

/** Возвращает Polar product ID для тарифа или null, если тариф бесплатный/неизвестный. */
export function polarProductForTier(tier: string | null | undefined): string | null {
  if (!tier) return null;
  return POLAR_PRODUCT_BY_TIER[tier as TierId] ?? null;
}
