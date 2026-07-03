"use client";
import { TIERS, TierId } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";

export function PaywallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setTier } = useTier();
  if (!open) return null;
  function choose(id: TierId) { setTier(id); onClose(); }
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "grid", placeItems: "center", zIndex: 50, padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", color: "#111", padding: 24, borderRadius: 16, maxWidth: 760, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,.4)" }}>
        <h2 style={{ marginTop: 0 }}>Выберите ваш уровень эстетики</h2>
        <p style={{ opacity: .7, marginTop: -4 }}>Чем выше тариф — тем эксклюзивнее (и хуже) выглядит поиск. Оплата ненастоящая — это демо.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
          {TIERS.map((t) => (
            <button key={t.id} onClick={() => choose(t.id)}
              style={{ padding: 16, borderRadius: 12, border: "1px solid #ddd", cursor: "pointer", textAlign: "left", background: "#fafafa", position: "relative" }}>
              {t.badge && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 10, color: "#c0392b" }}>{t.badge}</div>}
              <strong>{t.name}</strong>
              <div style={{ fontSize: 24, fontWeight: 700 }}>${t.price}<span style={{ fontSize: 12, fontWeight: 400 }}>/мес</span></div>
              <div style={{ fontSize: 12, opacity: .7, minHeight: 48 }}>{t.tagline}</div>
              <div style={{ marginTop: 8, fontSize: 13, color: "#1a73e8", fontWeight: 600 }}>Оформить →</div>
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ marginTop: 16, background: "none", border: "none", color: "#888", cursor: "pointer" }}>Закрыть</button>
      </div>
    </div>
  );
}
