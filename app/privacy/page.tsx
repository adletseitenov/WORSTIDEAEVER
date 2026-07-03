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
  maxWidth: 720,
  margin: "0 auto",
  padding: "clamp(48px, 8vw, 88px) 20px",
};

const CLAUSES = [
  {
    h: "Запросы",
    p: "Мы не храним ваши запросы. Мы храним только ваш вкус.",
  },
  {
    h: "Ваши каракули",
    p: "Ваши каракули принадлежат вам (но выглядят как наши).",
  },
  {
    h: "Продажа данных",
    p: "Мы не продаём ваши данные — они слишком уродливы, чтобы иметь ценность.",
  },
  {
    h: "Cookies",
    p: "Мы используем только рукотворные cookies. Их рисует Senior Scribble Artist, поэтому они невоспроизводимы и, скорее всего, кривые.",
  },
];

export default function PrivacyPage() {
  return (
    <main style={shell}>
      <div style={wrap}>
        <Link href="/" style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none" }}>
          ← Croogle
        </Link>

        <h1 style={{ margin: "18px 0 0", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Политика приватности
        </h1>
        <p style={{ margin: "14px 0 0", color: "var(--muted)", fontSize: 15 }}>
          Обновлено 3 июля 2026. Читается за минуту, забывается мгновенно.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
          {CLAUSES.map((c) => (
            <section
              key={c.h}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-bd)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
                padding: "clamp(18px, 3vw, 24px)",
              }}
            >
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{c.h}</h2>
              <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>{c.p}</p>
            </section>
          ))}
        </div>

        <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
          Вопросы о приватности можно задать в никуда — мы всё равно ничего не храним.
        </p>
      </div>
    </main>
  );
}
