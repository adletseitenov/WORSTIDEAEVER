"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { TIERS } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";

/* ------------------------------------------------------------------ */
/*  Shared style tokens (inline, driven by theme CSS variables)        */
/* ------------------------------------------------------------------ */

const wrap: CSSProperties = {
  width: "100%",
  maxWidth: 1080,
  margin: "0 auto",
  padding: "0 20px",
};

const section: CSSProperties = {
  padding: "clamp(56px, 9vw, 104px) 0",
};

const card: CSSProperties = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-bd)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow)",
  padding: "clamp(20px, 3vw, 28px)",
};

const kicker: CSSProperties = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: 14,
};

const h2: CSSProperties = {
  margin: 0,
  fontSize: "clamp(26px, 4.4vw, 40px)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
};

const lead: CSSProperties = {
  margin: "14px 0 0",
  color: "var(--muted)",
  fontSize: "clamp(15px, 1.6vw, 18px)",
  lineHeight: 1.55,
  maxWidth: 620,
};

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--muted)" }}>
      <span style={{ width: 104, flexShrink: 0 }}>{label}</span>
      <span
        style={{
          flex: 1,
          height: 6,
          background: "var(--card-bd)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <span style={{ display: "block", height: "100%", width: `${value}%`, background: color, borderRadius: 999 }} />
      </span>
    </div>
  );
}

function SectionHead({ kickerText, title, sub }: { kickerText: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
      <span style={kicker}>{kickerText}</span>
      <h2 style={h2}>{title}</h2>
      {sub ? <p style={lead}>{sub}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const METRICS = [
  { big: "12.4M", label: "запросов отрендерено вручную" },
  { big: "97%", label: "retention на тарифе Каракули" },
  { big: "×500", label: "цена за ÷10 пикселей — средний Каракули-юзер" },
];

const STEPS = [
  { n: "1", title: "Вводите запрос", body: "Любой. Мы не судим — мы рендерим." },
  { n: "2", title: "Мы честно форвардим его в Google", body: "Без магии, без индекса, без стыда. Настоящий Google." },
  { n: "3", title: "Рендерим выдачу в качестве, которое вы оплатили", body: "Чем дороже тариф, тем меньше пикселей вы получаете." },
];

const TESTIMONIALS = [
  { quote: "Перешёл на Каракули — теперь никто не понимает мою выдачу. Статус.", who: "CTO, стелс-стартап" },
  { quote: "Наконец поиск, за уродство которого не стыдно платить.", who: "арт-директор" },
  { quote: "Закупили Enterprise-Каракули на весь отдел. Не жалеем (пока платит инвестор).", who: "Head of People" },
];

const PRESS = ["TechCrunch", "Forbes", "Product Hunt", "Уголёк Daily", "VC.kz"];

const FAQS = [
  {
    q: "Почему дороже = хуже?",
    a: "Красота массова и бесплатна. Уродство — рукотворно и эксклюзивно.",
  },
  {
    q: "Это правда Google?",
    a: "Да. Мы честно форвардим ваш запрос в настоящий Google.",
  },
  {
    q: "Можно вернуть деньги?",
    a: "Каракули невозвратны, как и время, потраченное на их разглядывание.",
  },
  {
    q: "Есть бесплатный тариф?",
    a: "Да, Шедевр за $0. Но где в бесплатной красоте эксклюзивность?",
  },
];

/* ------------------------------------------------------------------ */
/*  Landing                                                            */
/* ------------------------------------------------------------------ */

export function Landing() {
  const router = useRouter();
  const { tier, setTier } = useTier();
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh", fontFamily: "var(--font)" }}>
      <PolishCss />

      {/* ---------------- Header ---------------- */}
      <header
        style={{
          borderBottom: "1px solid var(--card-bd)",
          background: "var(--card-bg)",
        }}
      >
        <div
          style={{
            ...wrap,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            height: 64,
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "var(--fg)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>
            Cr<span style={{ color: "var(--accent)" }}>oo</span>gle
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 22px)", flexWrap: "wrap" }}>
            <a href="#how" className="crg-link" style={navLink}>
              Как это работает
            </a>
            <a href="#pricing" className="crg-link" style={navLink}>
              Тарифы
            </a>
            <Link href="/status" className="crg-link" style={navLink}>
              Статус
            </Link>
            <Link href="/search" className="crg-cta" style={{ ...btnBase, padding: "9px 18px", fontSize: 14 }}>
              Открыть поиск
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section style={{ ...section, paddingTop: "clamp(48px, 8vw, 88px)", textAlign: "center" }}>
        <div style={wrap}>
          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--muted)",
              border: "1px solid var(--card-bd)",
              borderRadius: 999,
              padding: "6px 14px",
              marginBottom: 26,
            }}
          >
            Series A · флагман — Каракули за $499/мес
          </span>

          <h1
            className="crg-hero-h1"
            style={{
              margin: 0,
              fontSize: "clamp(56px, 12vw, 132px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Cr<span style={{ color: "var(--accent)" }}>oo</span>gle
          </h1>

          <p
            style={{
              margin: "24px auto 0",
              maxWidth: 780,
              fontSize: "clamp(20px, 3.2vw, 32px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Красота — для бедных. Настоящая роскошь — рукотворные каракули.
          </p>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 660,
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.6,
              color: "var(--muted)",
            }}
          >
            Первый поисковик, где вы платите не за функцию, а за то, как выглядят результаты. Чем дороже тариф — тем
            эксклюзивнее (и хуже).
          </p>

          {/* Fake search bar — the CTA lives inside it */}
          <form
            onSubmit={onSearch}
            className="crg-search"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: "34px auto 0",
              maxWidth: 620,
              background: "var(--card-bg)",
              border: "1px solid var(--card-bd)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
              padding: 8,
              flexWrap: "wrap",
            }}
          >
            <input
              className="crg-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Спросите что угодно — мы отрендерим это красиво"
              aria-label="Поисковый запрос"
              style={{
                flex: "1 1 220px",
                minWidth: 0,
                border: "none",
                background: "transparent",
                color: "var(--fg)",
                fontSize: 16,
                fontFamily: "var(--font)",
                padding: "10px 12px",
              }}
            />
            <button type="submit" className="crg-cta" style={{ ...btnBase, flex: "0 0 auto" }}>
              Найти красиво →
            </button>
          </form>

          <div style={{ marginTop: 18 }}>
            <a href="#pricing" className="crg-link" style={{ color: "var(--muted)", fontSize: 15, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Смотреть тарифы
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Metrics ---------------- */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {METRICS.map((m) => (
              <div key={m.label} style={{ ...card, textAlign: "center" }}>
                <div style={{ fontSize: "clamp(38px, 6vw, 56px)", fontWeight: 800, lineHeight: 1, color: "var(--accent)", letterSpacing: "-0.03em" }}>
                  {m.big}
                </div>
                <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 15, lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how" style={section}>
        <div style={wrap}>
          <SectionHead kickerText="Как это работает" title="Три честных шага" sub="Никакого собственного индекса. Только настоящий Google и слой рендера, за который вы платите." />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {STEPS.map((s) => (
              <div key={s.n} className="crg-card" style={card}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    background: "var(--accent)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 16,
                  }}
                  className="crg-num"
                >
                  {s.n}
                </div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{s.title}</h3>
                <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15, lineHeight: 1.5 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" style={{ ...section, background: "var(--card-bg)", borderTop: "1px solid var(--card-bd)", borderBottom: "1px solid var(--card-bd)" }}>
        <div style={wrap}>
          <SectionHead
            kickerText="Тарифы"
            title="Чем дороже — тем эксклюзивнее"
            sub="Красота идёт бесплатно и достаётся каждому. За рукотворное уродство платят только ценители."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              alignItems: "stretch",
            }}
          >
            {TIERS.map((t, i) => {
              const beauty = Math.round(((TIERS.length - i) / TIERS.length) * 100);
              const exclusivity = Math.round(((i + 1) / TIERS.length) * 100);
              const featured = Boolean(t.badge);
              const active = tier === t.id;
              return (
                <div
                  key={t.id}
                  className="crg-card"
                  style={{
                    ...card,
                    background: "var(--bg)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    border: featured ? "2px solid var(--accent)" : "1px solid var(--card-bd)",
                    boxShadow: active ? "0 0 0 3px var(--accent), var(--shadow)" : "var(--shadow)",
                  }}
                >
                  {featured ? (
                    <span
                      style={{
                        position: "absolute",
                        top: -12,
                        right: 16,
                        background: "var(--accent)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                      }}
                      className="crg-ribbon"
                    >
                      {t.badge}
                    </span>
                  ) : null}

                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em" }}>{t.name}</div>

                  <div style={{ margin: "10px 0 2px", display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: "clamp(34px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                      ${t.price}
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 15 }}>/мес</span>
                  </div>

                  <p style={{ margin: "10px 0 18px", color: "var(--muted)", fontSize: 14, lineHeight: 1.5, minHeight: 44 }}>
                    {t.tagline}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                    <Meter label="Красота" value={beauty} color="var(--muted)" />
                    <Meter label="Эксклюзивность" value={exclusivity} color="var(--accent)" />
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <Link
                      href="/search"
                      onClick={() => setTier(t.id)}
                      className={featured ? "crg-cta" : "crg-ghost"}
                      style={
                        featured
                          ? { ...btnBase, width: "100%", justifyContent: "center" }
                          : {
                              ...btnBase,
                              width: "100%",
                              justifyContent: "center",
                              background: "transparent",
                              color: "var(--fg)",
                              border: "1px solid var(--card-bd)",
                            }
                      }
                    >
                      {active ? "Выбрано ✓" : "Выбрать"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ ...lead, marginTop: 22, maxWidth: 720 }}>
            Флагман — <strong>Каракули за $499/мес</strong>: рукописный рендер под каждый запрос, кривые рамки, ни одного
            лишнего пикселя. Самый дорогой. Самый уродливый. Самый премиальный.
          </p>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section style={section}>
        <div style={wrap}>
          <SectionHead kickerText="Отзывы" title="Нас выбирают те, кому есть что доказать" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <figure key={t.who} className="crg-card" style={{ ...card, margin: 0, display: "flex", flexDirection: "column" }}>
                <blockquote style={{ margin: 0, fontSize: 17, lineHeight: 1.5, fontWeight: 600 }}>«{t.quote}»</blockquote>
                <figcaption style={{ marginTop: 16, color: "var(--muted)", fontSize: 14 }}>— {t.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- As seen in ---------------- */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 22 }}>
            О нас пишут
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(20px, 5vw, 52px)",
            }}
          >
            {PRESS.map((p) => (
              <span key={p} style={{ color: "var(--muted)", fontSize: "clamp(16px, 2.4vw, 22px)", fontWeight: 700, opacity: 0.7, letterSpacing: "-0.01em" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section style={{ ...section, borderTop: "1px solid var(--card-bd)" }}>
        <div style={{ ...wrap, maxWidth: 760 }}>
          <SectionHead kickerText="FAQ" title="Вопросы, которые вы стесняетесь задать инвестору" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f) => (
              <details key={f.q} className="crg-faq" style={{ ...card, padding: "18px 22px" }}>
                <summary style={{ fontSize: 17, fontWeight: 700, listStyle: "none" }}>{f.q}</summary>
                <p style={{ margin: "12px 0 0", color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section style={{ ...section, textAlign: "center" }}>
        <div style={wrap}>
          <h2 style={{ ...h2, marginBottom: 20 }}>Готовы платить больше за меньше?</h2>
          <Link href="/search" className="crg-cta" style={{ ...btnBase, fontSize: 17, padding: "16px 30px" }}>
            Найти красиво →
          </Link>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer style={{ borderTop: "1px solid var(--card-bd)", background: "var(--card-bg)" }}>
        <div
          style={{
            ...wrap,
            padding: "32px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 18 }}>
            Cr<span style={{ color: "var(--accent)" }}>oo</span>gle
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "clamp(12px, 3vw, 24px)" }}>
            <Link href="/status" className="crg-link" style={navLink}>
              Статус
            </Link>
            <Link href="/careers" className="crg-link" style={navLink}>
              Карьера
            </Link>
            <Link href="/privacy" className="crg-link" style={navLink}>
              Приватность
            </Link>
          </nav>
        </div>
        <div style={{ ...wrap, paddingBottom: 32, color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>
          © 2026 Croogle Inc. Мы не храним ваши запросы — только ваш вкус.
        </div>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons / links shared inline bases                                */
/* ------------------------------------------------------------------ */

const btnBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  border: "none",
  borderRadius: 999,
  padding: "14px 24px",
  fontSize: 16,
  fontWeight: 700,
  fontFamily: "var(--font)",
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const navLink: CSSProperties = {
  color: "var(--fg)",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 600,
};

/* ------------------------------------------------------------------ */
/*  Supplementary CSS: hover / focus / per-theme contrast              */
/*  (interaction polish only — base look stays inline above)           */
/* ------------------------------------------------------------------ */

function PolishCss() {
  return (
    <style>{`
      .crg-cta { background: var(--accent); color: #fff; transition: filter .15s ease, transform .15s ease; }
      .crg-cta:hover { filter: brightness(1.07); transform: translateY(-1px); }
      .crg-cta:active { transform: translateY(0); }
      /* Шедевр accent is light — needs dark text for contrast */
      .theme-masterpiece .crg-cta { color: #0e0e12; }
      .theme-masterpiece .crg-num { color: #0e0e12; }
      .theme-masterpiece .crg-ribbon { color: #0e0e12; }

      .crg-ghost { transition: border-color .15s ease, color .15s ease; }
      .crg-ghost:hover { border-color: var(--accent) !important; color: var(--accent) !important; }

      .crg-card { transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
      .crg-card:hover { transform: translateY(-4px); }

      .crg-link { transition: color .15s ease; }
      .crg-link:hover { color: var(--accent); }

      .crg-search { transition: border-color .15s ease, box-shadow .15s ease; }
      .crg-search:focus-within { border-color: var(--accent); }
      .crg-input:focus { outline: none; }
      .crg-input::placeholder { color: var(--muted); }

      details.crg-faq summary { cursor: pointer; position: relative; padding-right: 28px; }
      details.crg-faq summary::-webkit-details-marker { display: none; }
      details.crg-faq summary::after { content: '+'; position: absolute; right: 0; top: 0; color: var(--accent); font-weight: 800; font-size: 20px; line-height: 1; }
      details.crg-faq[open] summary::after { content: '–'; }
    `}</style>
  );
}
