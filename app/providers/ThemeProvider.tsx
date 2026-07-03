"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { type TierId, DEFAULT_TIER } from "@/lib/tiers";

const STORAGE_KEY = "croogle.tier.v1";

type Ctx = { tier: TierId; setTier: (t: TierId) => void };
const ThemeCtx = createContext<Ctx>({ tier: DEFAULT_TIER, setTier: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [tier, setTierState] = useState<TierId>(DEFAULT_TIER);

  // Гость: помним выбор локально.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as TierId | null;
    if (saved) setTierState(saved);
  }, []);

  // Залогинен: подписка аккаунта (из JWT-сессии) перекрывает локальный выбор.
  useEffect(() => {
    if (session?.tier) setTierState(session.tier);
  }, [session?.tier]);

  const setTier = (t: TierId) => {
    setTierState(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch { /* private mode */ }
  };

  return (
    <ThemeCtx.Provider value={{ tier, setTier }}>
      <div className={`theme-${tier} theme-root`}>{children}</div>
    </ThemeCtx.Provider>
  );
}

export const useTier = () => useContext(ThemeCtx);
