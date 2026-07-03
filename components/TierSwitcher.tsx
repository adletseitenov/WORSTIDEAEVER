"use client";
import { useState } from "react";
import { TIERS } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";
import { PaywallModal } from "./PaywallModal";

export function TierSwitcher() {
  const { tier, setTier } = useTier();
  const [payOpen, setPayOpen] = useState(false);
  const current = TIERS.find((t) => t.id === tier)!;
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap", margin: "8px 0" }}>
      {TIERS.map((t) => (
        <button key={t.id} onClick={() => setTier(t.id)}
          style={{ padding: "6px 14px", borderRadius: 999, cursor: "pointer",
            border: t.id === tier ? "2px solid var(--accent)" : "1px solid var(--card-bd)",
            background: t.id === tier ? "var(--accent)" : "transparent",
            color: t.id === tier ? "#fff" : "var(--fg)", fontFamily: "var(--font)", fontWeight: 600 }}>
          {t.name} ${t.price}
        </button>
      ))}
      <button onClick={() => setPayOpen(true)} style={{ padding: "6px 14px", borderRadius: 999, border: "1px dashed var(--accent)", background: "transparent", color: "var(--accent)", cursor: "pointer", fontFamily: "var(--font)" }}>
        Апгрейд ↑
      </button>
      <PaywallModal open={payOpen} onClose={() => setPayOpen(false)} />
      <span style={{ width: "100%", textAlign: "center", fontSize: 12, opacity: .65, fontFamily: "var(--font)" }}>Текущий тариф: {current.name} — {current.tagline}</span>
    </div>
  );
}
