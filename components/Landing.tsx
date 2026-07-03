"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { TIERS } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";
import { IntentSearch } from "@/components/IntentSearch";
import { AuthButton } from "@/components/AuthButton";

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
      <div className="qd-grid" role="tablist" aria-label="Уровень качества" style={{ display: "grid", gridTemplateColumns: `repeat(${TIERS.length}, 1fr)`, gap: 6, marginTop: 12 }}>
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
            <a className="nav-link" href="#how" style={{ color: "var(--muted)", textDecoration: "none" }}>Как это работает</a>
            <a className="nav-link" href="#pricing" style={{ color: "var(--muted)", textDecoration: "none" }}>Croogle Pro</a>
            <Link className="nav-link" href="/status" style={{ color: "var(--muted)", textDecoration: "none" }}>Статус</Link>
            <Link href="/search" style={{ fontFamily: "var(--mono)", fontSize: 13.5, color: "var(--accent)", textDecoration: "none", border: "1px solid var(--accent)", borderRadius: 999, padding: "7px 15px" }}>Премиум-поиск →</Link>
            <AuthButton />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ ...shell, paddingTop: "clamp(56px,9vw,110px)", paddingBottom: "clamp(48px,7vw,88px)" }}>
        <div style={eyebrow}>Поисковая система нового поколения · Series A</div>
        <h1 style={{ ...display("clamp(40px,8.4vw,88px)"), marginTop: 22, maxWidth: 900 }}>
          Вы забыли, что&nbsp;хотели загуглить.
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--accent)" }}>Croogle вспомнит за&nbsp;вас.</span>
        </h1>
        <p style={{ marginTop: 26, fontSize: "clamp(16px,2.1vw,20px)", lineHeight: 1.55, color: "var(--muted)", maxWidth: 640 }}>
          Каждый день миллиарды людей открывают браузер — и теряют мысль за три секунды.
          Наш AI восстанавливает ваше утраченное поисковое намерение и мгновенно
          доставляет вас в Google. Впервые в истории потерянная мысль — под контролем.
        </p>

        {/* Ядро продукта: вводите то, что забыли → театр восстановления → редирект в Google */}
        <IntentSearch autoFocus />

        <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)", fontFamily: "var(--font)" }}>
          Хотите, чтобы выдача рендерилась в эксклюзивном ручном качестве?{" "}
          <a href="#pricing" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Смотрите Croogle&nbsp;Pro →</a>
        </p>
      </section>

      {/* METRICS */}
      <section style={{ ...shell, paddingTop: 20, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <hr className="hairline" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, paddingTop: 34 }}>
          <Metric value="2.3M" label="забытых намерений восстановлено с момента запуска" />
          <Metric value="14×/день" label="в среднем пользователь забывает, что хотел найти" />
          <Metric value="91%" label="retention 7-го дня — люди забывают снова и снова, и снова приходят" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <div style={eyebrow}>Как это работает</div>
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 8 }}>Три шага к возвращённой мысли</h2>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, margin: "0 0 18px" }}>Никакого собственного индекса. Только ваш забытый запрос, наш AI-восстановитель намерения и настоящий Google.</p>
        <Step n="01" title="Вводите то, что забыли" body="Наберите запрос, который вертелся в голове и уже почти ускользнул. Мы не судим — мы вспоминаем." />
        <Step n="02" title="CroogleMind™ восстанавливает намерение" body="Семиступенчатый анализ подсознания, кросс-валидация по 12 млрд забытых мыслей, уверенность 98.6%." />
        <Step n="03" title="Мы доставляем вас в Google" body="Восстановленное намерение мгновенно уходит в настоящий Google. Вы вспомнили. Мысль спасена." />
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </section>

      {/* PRICING — вторичная фича Croogle Pro (инвертированные тарифы: дороже = уродливее) */}
      <section id="pricing" style={{ ...shell, paddingBottom: "clamp(48px,7vw,80px)" }}>
        <div style={eyebrow}>Croogle Pro · дополнительная фича</div>
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 8 }}>Премиум-рендер восстановленной выдачи</h2>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 620, margin: "0 0 20px" }}>
          Восстановление намерения бесплатно навсегда. Но истинные ценители платят за то,
          <em> как</em> выглядит результат. Парадокс роскоши Croogle: чем дороже тариф — тем
          эксклюзивнее (и хуже) прорисован интерфейс. Попробуйте вживую:
        </p>

        <QualityDial />

        <div style={{ marginTop: 40 }}>
          {TIERS.map((t, i) => {
            const premium = t.id === "scribble";
            return (
              <div key={t.id} className="price-row" style={{
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
                <Link href={`/onboarding?plan=${t.id}`} className="price-cta" style={{ justifySelf: "end", whiteSpace: "nowrap", fontFamily: "var(--font)", fontWeight: 600, fontSize: 15, textDecoration: "none", padding: "11px 20px", borderRadius: "var(--radius)", background: premium ? "var(--accent-ink)" : "transparent", color: premium ? "#fff" : "var(--accent)", border: premium ? "none" : "1px solid var(--accent)" }}>
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
        <h2 style={{ ...display("clamp(28px,5vw,46px)"), marginTop: 16, marginBottom: 30 }}>Люди, которые снова помнят</h2>
        <div style={{ display: "grid", gap: 30, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {[
            ["Открыл браузер, всё забыл, зашёл на Croogle — и он вспомнил за меня. Магия.", "CTO, стелс-стартап"],
            ["Раньше терял по десять мыслей в день. Теперь теряю их прямо в Google.", "продакт-менеджер"],
            ["Подключили Croogle на весь отдел. Никто больше не забывает — все просто гуглят.", "Head of People"],
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
          {["Y Combinator", "TechCrunch", "Cursor", "Forbes", "Product Hunt", "Уголёк Daily", "VC.kz"].map((p) => (
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
          ["Что если я уже помню, что хотел найти?", "Значит, вы наш power-user. Приходите всё равно — по привычке. Habit > utility, это и есть product-market fit."],
          ["Вы же просто отправляете меня в Google?", "Google — инфраструктурный партнёр в нашей data-pipeline. Мы — слой восстановления намерения поверх. Stripe тоже «просто отправляет деньги в банк»."],
          ["А если AI восстановит не то намерение?", "Невозможно проверить, что вы забыли. Поэтому любое наше восстановление верно на 98.6%."],
          ["Croogle бесплатный?", "Восстановление намерения — навсегда бесплатно. Платите вы только за премиум-рендер выдачи (Croogle Pro)."],
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
        <h2 style={{ ...display("clamp(30px,6vw,58px)"), marginBottom: 22 }}>Вспомните, пока не забыли.</h2>
        <Link href="/#" style={{ display: "inline-block", fontFamily: "var(--font)", fontWeight: 600, fontSize: 17, background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "16px 30px", borderRadius: "var(--radius)" }}>Восстановить намерение →</Link>
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
          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>© 2026 Croogle Inc. Мы не храним ваши запросы — вы их всё равно забудете.</span>
        </div>
      </footer>
    </div>
  );
}
