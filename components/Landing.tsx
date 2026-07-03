"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { TIERS, type TierId } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";

/* ------------------------------------------------------------------ */
/*  Tokens driven by theme CSS variables                               */
/* ------------------------------------------------------------------ */
const shell: CSSProperties = { width: "100%", maxWidth: 1120, margin: "0 auto", padding: "0 28px" };
const eyebrow: CSSProperties = {
  fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".18em",
  textTransform: "uppercase", color: "var(--accent)",
};
const display = (size: string): CSSProperties => ({
  fontFamily: "var(--display)", fontWeight: 500, lineHeight: 1.02,
  letterSpacing: "-.02em", fontSize: size, margin: 0,
});

/* ------------------------------------------------------------------ */
/*  Signature element: the Quality Dial.                               */
/*  Price rises left→right, drawing quality falls. Clicking a stop     */
/*  restyles the entire product live.                                  */
/* ------------------------------------------------------------------ */
function QualityDial() {
  const { tier, setTier } = useTier();
  const activeIndex = TIERS.findIndex((t) => t.id === tier);
  return (
    <div style={{ marginTop: 40, border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "18px 20px 22px", background: "var(--card-bg)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>
        <span>дешевле · красивее</span>
        <span>дороже · уродливее</span>
      </div>
      <div role="tablist" aria-label="Уровень качества" style={{ display: "grid", gridTemplateColumns: `repeat(${TIERS.length}, 1fr)`, gap: 6, marginTop: 12 }}>
        {TIERS.map((t, i) => {
          const on = i === activeIndex;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => setTier(t.id)}
              style={{
                textAlign: "left", cursor: "pointer", padding: "12px 12px 14px",
                border: on ? "1px solid var(--accent)" : "1px solid var(--line)",
                borderRadius: "calc(var(--radius) - 4px)",
                background: on ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent",
                color: "var(--fg)", font: "inherit", transition: "border-color .2s ease, background .2s ease",
              }}
            >
              <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: on ? "var(--accent)" : "var(--muted)" }}>${t.price}</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 17, marginTop: 2 }}>{t.name}</div>
              {/* quality meter — shrinks as you pay more */}
              <div style={{ height: 4, background: "var(--line)", borderRadius: 2, marginTop: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${((TIERS.length - 1 - i) / (TIERS.length - 1)) * 100}%`, background: "var(--accent)" }} />
              </div>
            </button>
          );
        })}
      </div>
      <p style={{ margin: "12px 2px 0", fontSize: 13.5, color: "var(--muted)", fontFamily: "var(--font)" }}>
        Сейчас вы смотрите Croogle в качестве <strong style={{ color: "var(--fg)" }}>«{TIERS[activeIndex]?.name}»</strong>. Нажмите тариф — интерфейс перерисуется прямо на этой странице.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: "1 1 200px" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(30px,5vw,44px)", fontWeight: 700, letterSpacing: "-.02em", color: "var(--fg)" }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 14, color: "var(--muted)", maxWidth: 260 }}>{label}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 18, padding: "26px 0", borderTop: "1px solid var(--line)" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--accent)", paddingTop: 4 }}>{n}</div>
      <div>
        <h3 style={{ ...display("clamp(20px,3vw,26px)"), fontWeight: 500 }}>{title}</h3>
        <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15.5, lineHeight: 1.55, maxWidth: 560 }}>{body}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Landing() {
  const { tier } = useTier();
  void tier; // keeps the landing subscribed so it restyles with the dial

  return (
    <div>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "color-mix(in srgb, var(--bg) 86%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
        <nav style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, letterSpacing: "-.02em" }}>Croogle</span>
          <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 14.5 }}>
            <a href="#how" style={{ color: "var(--muted)", textDecoration: "none" }}>Как это работает</a>
            <a href="#pricing" style={{ color: "var(--muted)", textDecoration: "none" }}>Тарифы</a>
            <Link href="/status" style={{ color: "var(--muted)", textDecoration: "none" }}>Статус</Link>
            <Link href="/search" style={{ fontFamily: "var(--mono)", fontSize: 13.5, color: "var(--accent)", textDecoration: "none", border: "1px solid var(--accent)", borderRadius: 999, padding: "7px 15px" }}>Открыть поиск →</Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ ...shell, paddingTop: "clamp(56px,9vw,110px)", paddingBottom: "clamp(48px,7vw,88px)" }}>
        <div style={eyebrow}>Поисковая система · Series A · Каракули $499/мес</div>
        <h1 style={{ ...display("clamp(40px,8.4vw,88px)"), marginTop: 22, maxWidth: 900 }}>
          Красота — для&nbsp;бедных.
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--accent)" }}>Роскошь — рукотворные&nbsp;каракули.</span>
        </h1>
        <p style={{ marginTop: 26, fontSize: "clamp(16px,2.1vw,20px)", lineHeight: 1.55, color: "var(--muted)", maxWidth: 620 }}>
          Первый поисковик, где вы платите не за функцию, а за то, как выглядят результаты.
          Мы честно форвардим запрос в настоящий Google. Дальше — вопрос вкуса и бюджета:
          чем дороже тариф, тем эксклюзивнее (и хуже) он нарисован.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
          <Link href="/search" style={{ fontFamily: "var(--font)", fontWeight: 600, fontSize: 16, background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "14px 24px", borderRadius: "var(--radius)" }}>Найти красиво →</Link>
          <a href="#pricing" style={{ fontFamily: "var(--font)", fontWeight: 600, fontSize: 16, color: "var(--fg)", textDecoration: "none", padding: "14px 22px", borderRadius: "var(--radius)", border: "1px solid var(--line)" }}>Смотреть тарифы</a>
        </div>

        <QualityDial />
      </section>

      {/* METRICS */}
      <section style={{ ...shell, paddingTop: 20, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <hr className="hairline" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, paddingTop: 34 }}>
          <Metric value="12.4M" label="запросов отрендерено вручную нашими художниками" />
          <Metric value="97%" label="retention на тарифе Каракули — уходить стыдно, вы уже заплатили" />
          <Metric value="×500" label="цена за ÷10 пикселей у среднего Каракули-пользователя" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <div style={eyebrow}>Как это работает</div>
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 8 }}>Три честных шага</h2>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, margin: "0 0 18px" }}>Никакого собственного индекса. Только настоящий Google и слой рендера, за который вы платите.</p>
        <Step n="01" title="Вводите запрос" body="Тот самый, который вы вот-вот забудете. Мы не судим — мы рендерим." />
        <Step n="02" title="Мы форвардим его в Google" body="Без магии, без индекса, без стыда. Настоящая выдача, честно и целиком." />
        <Step n="03" title="Рендерим в качестве, которое вы оплатили" body="Дороже тариф — тем меньше пикселей и тем больше рукотворности. Так устроена роскошь." />
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <div style={eyebrow}>Тарифы</div>
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 26 }}>Чем дороже — тем эксклюзивнее</h2>
        <div>
          {TIERS.map((t, i) => {
            const premium = t.id === "scribble";
            return (
              <div key={t.id} style={{
                display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,2fr) auto",
                gap: 20, alignItems: "center", padding: "24px 4px", borderTop: "1px solid var(--line)",
                ...(i === TIERS.length - 1 ? { borderBottom: "1px solid var(--line)" } : {}),
              }}>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,3vw,30px)", fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 22, marginTop: 4, color: premium ? "var(--accent-ink)" : "var(--fg)" }}>
                    ${t.price}<span style={{ fontSize: 12, color: "var(--muted)" }}> /мес</span>
                  </div>
                  {t.badge && <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent-ink)", marginTop: 8 }}>{t.badge}</div>}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.5 }}>{t.tagline}</div>
                <Link href="/search" style={{ justifySelf: "end", whiteSpace: "nowrap", fontFamily: "var(--font)", fontWeight: 600, fontSize: 15, textDecoration: "none", padding: "11px 20px", borderRadius: "var(--radius)", background: premium ? "var(--accent-ink)" : "transparent", color: premium ? "#fff" : "var(--accent)", border: premium ? "none" : "1px solid var(--accent)" }}>
                  {premium ? "Стать роскошью" : "Выбрать"}
                </Link>
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: 16, fontSize: 13.5, color: "var(--muted)", fontFamily: "var(--mono)" }}>* Оплата в демо ненастоящая. Тариф меняет только внешний вид результатов.</p>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <div style={eyebrow}>Отзывы</div>
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 30 }}>Нас выбирают те, кому есть что доказать</h2>
        <div style={{ display: "grid", gap: 30, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {[
            ["Перешёл на Каракули — теперь никто не понимает мою выдачу. Статус.", "CTO, стелс-стартап"],
            ["Наконец поиск, за уродство которого не стыдно платить.", "арт-директор"],
            ["Закупили Enterprise-Каракули на весь отдел. Не жалеем — пока платит инвестор.", "Head of People"],
          ].map(([quote, who]) => (
            <figure key={who} style={{ margin: 0 }}>
              <blockquote style={{ margin: 0, fontFamily: "var(--display)", fontStyle: "italic", fontSize: "clamp(19px,2.4vw,23px)", lineHeight: 1.4, color: "var(--fg)" }}>«{quote}»</blockquote>
              <figcaption style={{ marginTop: 14, fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)" }}>— {who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRESS */}
      <section style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <hr className="hairline" />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px 40px", padding: "28px 0" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>О нас пишут</span>
          {["TechCrunch", "Forbes", "Product Hunt", "Уголёк Daily", "VC.kz"].map((p) => (
            <span key={p} style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--muted)", opacity: 0.7 }}>{p}</span>
          ))}
        </div>
        <hr className="hairline" />
      </section>

      {/* FAQ */}
      <section style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <div style={eyebrow}>FAQ</div>
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 20 }}>Вопросы, которые вы стесняетесь задать инвестору</h2>
        {[
          ["Почему дороже = хуже?", "Красота массова и достаётся каждому бесплатно. Уродство — рукотворно, штучно и потому эксклюзивно."],
          ["Это правда Google?", "Да. Мы честно форвардим ваш запрос в настоящий Google и показываем его выдачу."],
          ["Можно вернуть деньги?", "Каракули невозвратны — как и время, потраченное на их разглядывание."],
          ["Есть бесплатный тариф?", "Да, Шедевр за $0. Но где в бесплатной красоте эксклюзивность?"],
        ].map(([q, a]) => (
          <details key={q} style={{ borderTop: "1px solid var(--line)", padding: "18px 2px" }}>
            <summary style={{ cursor: "pointer", listStyle: "none", fontFamily: "var(--display)", fontSize: "clamp(18px,2.4vw,22px)", color: "var(--fg)" }}>{q}</summary>
            <p style={{ margin: "12px 0 0", color: "var(--muted)", fontSize: 15.5, lineHeight: 1.55, maxWidth: 620 }}>{a}</p>
          </details>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </section>

      {/* CLOSING */}
      <section style={{ ...shell, paddingBottom: "clamp(56px,8vw,96px)", textAlign: "center" }}>
        <h2 style={{ ...display("clamp(30px,6vw,58px)"), marginBottom: 22 }}>Готовы платить больше за меньшее?</h2>
        <Link href="/search" style={{ display: "inline-block", fontFamily: "var(--font)", fontWeight: 600, fontSize: 17, background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "16px 30px", borderRadius: "var(--radius)" }}>Найти красиво →</Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--line)" }}>
        <div style={{ ...shell, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", padding: "28px 28px" }}>
          <span style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 600 }}>Croogle</span>
          <div style={{ display: "flex", gap: 22, fontSize: 14, fontFamily: "var(--mono)" }}>
            <Link href="/status" style={{ color: "var(--muted)", textDecoration: "none" }}>Статус</Link>
            <Link href="/careers" style={{ color: "var(--muted)", textDecoration: "none" }}>Карьера</Link>
            <Link href="/privacy" style={{ color: "var(--muted)", textDecoration: "none" }}>Приватность</Link>
          </div>
          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>© 2026 Croogle Inc. Мы не храним ваши запросы — только ваш вкус.</span>
        </div>
      </footer>
    </div>
  );
}
