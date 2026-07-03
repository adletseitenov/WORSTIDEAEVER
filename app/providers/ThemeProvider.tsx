"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { TierId, DEFAULT_TIER } from "@/lib/tiers";

type Ctx = { tier: TierId; setTier: (t: TierId) => void };
const ThemeCtx = createContext<Ctx>({ tier: DEFAULT_TIER, setTier: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<TierId>(DEFAULT_TIER);
  return (
    <ThemeCtx.Provider value={{ tier, setTier }}>
      <div className={`theme-${tier} theme-root`}>{children}</div>
    </ThemeCtx.Provider>
  );
}

export const useTier = () => useContext(ThemeCtx);
