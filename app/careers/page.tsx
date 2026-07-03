"use client";

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
  maxWidth: 820,
  margin: "0 auto",
  padding: "clamp(48px, 8vw, 88px) 20px",
};

const card: CSSProperties = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-bd)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  padding: "clamp(20px, 3vw, 28px)",
};

const OPENINGS = [
  {
    title: "Senior Scribble Artist",
    meta: "Ремесленный цех · удалённо / за мольбертом",
    body: "Рисует каракули вручную под каждый пользовательский запрос. Требование: «твёрдая рука и презрение к сеткам». Опыт работы с пикселями будет расценён как красный флаг.",
  },
  {
    title: "Head of Ugliness",
    meta: "Дизайн-инверсия · full-time",
    body: "Отвечает за то, чтобы дорогие тарифы выглядели дороже (то есть хуже). Проводит ревью красоты и отклоняет всё, что можно понять с первого взгляда.",
  },
  {
    title: "VP of Perceived Value",
    meta: "Рост · full-time",
    body: "Объясняет инвесторам и клиентам, почему ×500 к цене за ÷10 пикселей — это не баг, а позиционирование. Свободный венчурный сторителлинг с прямым лицом обязателен.",
  },
];

export default function CareersPage() {
  const apply = (title: string) => {
    window.alert(`Спасибо за интерес к позиции «${title}». Мы рукотворно отрендерим ваш отклик и, возможно, никогда его не покажем.`);
  };

  return (
    <main style={shell}>
      <div style={wrap}>
        <Link href="/" style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none" }}>
          ← Croogle
        </Link>

        <h1 style={{ margin: "18px 0 0", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Карьера в Croogle
        </h1>
        <p style={{ margin: "14px 0 0", color: "var(--muted)", fontSize: 17, lineHeight: 1.6, maxWidth: 620 }}>
          Мы строим будущее, где красота бесплатна, а уродство — премиально. Присоединяйтесь, если умеете держать это лицо.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
          {OPENINGS.map((o) => (
            <div key={o.title} style={{ ...card, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800 }}>{o.title}</h2>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>{o.meta}</span>
              </div>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>{o.body}</p>
              <div style={{ marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => apply(o.title)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "11px 22px",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "var(--font)",
                    cursor: "pointer",
                  }}
                >
                  Откликнуться
                </button>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 28, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
          Croogle — работодатель равных (не)возможностей. Мы одинаково недооцениваем всех.
        </p>
      </div>
    </main>
  );
}
