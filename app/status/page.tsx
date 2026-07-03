import Link from "next/link";
import type { CSSProperties } from "react";

const shell: CSSProperties = {
  background: "var(--bg)",
  color: "var(--fg)",
  minHeight: "100vh",
  fontFamily: "var(--font)",
};

const wrap: CSSProperties = {
  width: "100%",
  maxWidth: 760,
  margin: "0 auto",
  padding: "clamp(48px, 8vw, 88px) 20px",
};

const row: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "18px 20px",
  background: "var(--card-bg)",
  border: "1px solid var(--card-bd)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
};

const SYSTEMS = [
  { name: "Search API", status: "Operational" },
  { name: "Scribble Rendering Farm", status: "Operational (uptime 99.99%)" },
  { name: "Beauty Downgrade Engine", status: "Operational" },
  { name: "Payment Regret Pipeline", status: "Operational" },
];

export default function StatusPage() {
  return (
    <main style={shell}>
      <div style={wrap}>
        <Link href="/" style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none" }}>
          ← Croogle
        </Link>

        <h1 style={{ margin: "18px 0 0", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Croogle System Status
        </h1>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: 16,
            padding: "8px 16px",
            borderRadius: 999,
            background: "var(--card-bg)",
            border: "1px solid var(--card-bd)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#1db954", boxShadow: "0 0 0 4px rgba(29,185,84,.18)" }} />
          Все системы в норме
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
          {SYSTEMS.map((s) => (
            <div key={s.name} style={row}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: 14, textAlign: "right" }}>
                {s.status}
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "#1db954", flexShrink: 0 }} />
              </span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          All systems nominal. Last incident: никогда (мы не храним стыд).
        </p>
      </div>
    </main>
  );
}
