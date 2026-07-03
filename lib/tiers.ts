export type TierId = "masterpiece" | "design" | "sketch" | "scribble";

export type Tier = {
  id: TierId;
  name: string;
  price: number;      // $/мес
  tagline: string;
  badge?: string;
};

// Порядок = по возрастанию цены и по УБЫВАНИЮ качества (инверсия ценности).
export const TIERS: Tier[] = [
  { id: "masterpiece", name: "Шедевр",   price: 0,   tagline: "Вылизанный поиск. Для тех, кто ещё ценит красоту." },
  { id: "design",      name: "Дизайн",   price: 9,   tagline: "Чистый современный интерфейс." },
  { id: "sketch",      name: "Набросок", price: 49,  tagline: "Минимализм на грани лени." },
  { id: "scribble",    name: "Каракули", price: 499, tagline: "Рукотворные каракули под каждый запрос. Настоящая роскошь.", badge: "⭐ Most Premium" },
];

export const DEFAULT_TIER: TierId = "masterpiece";
