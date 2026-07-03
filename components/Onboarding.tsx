"use client";

import { useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { TIERS, type TierId } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";

const shell: CSSProperties = { width: "100%", maxWidth: 860, margin: "0 auto", padding: "0 24px" };
const eyebrow: CSSProperties = { fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--accent)" };
const heading: CSSProperties = { fontFamily: "var(--display)", fontWeight: 500, letterSpacing: "-.02em", fontSize: "clamp(28px,5vw,44px)", margin: "14px 0 8px", lineHeight: 1.05 };
const field: CSSProperties = { width: "100%", padding: "13px 14px", borderRadius: "var(--radius)", border: "1px solid var(--card-bd)", background: "var(--card-bg)", color: "var(--fg)", fontFamily: "var(--mono)", fontSize: 15 };
const label: CSSProperties = { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" };

export function Onboarding() {
  const router = useRouter();
  const params = useSearchParams();
  const { setTier } = useTier();
  const { status, update } = useSession();

  const preset = TIERS.find((t) => t.id === params.get("plan"))?.id ?? null;
  const [selected, setSelected] = useState<TierId | null>(preset);
  const [step, setStep] = useState<1 | 2>(preset ? 2 : 1);
  const [processing, setProcessing] = useState(false);

  const plan = TIERS.find((t) => t.id === selected) ?? null;

  async function confirm() {
    if (!plan) return;
    // Подписка привязывается к аккаунту → сперва вход через Google,
    // после чего Google вернёт нас на этот же шаг оплаты.
    if (status !== "authenticated") {
      signIn("google", { callbackUrl: `/onboarding?plan=${plan.id}` });
      return;
    }
    setProcessing(true);
    await update({ tier: plan.id }); // персистим подписку в JWT аккаунта
    setTier(plan.id);                // мгновенно перекрашиваем интерфейс
    router.push("/search");
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: 28, paddingBottom: 80 }}>
      {/* top bar */}
      <div style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(28px,6vw,56px)" }}>
        <Link href="/" style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, letterSpacing: "-.02em", textDecoration: "none", color: "var(--fg)" }}>Croogle</Link>
        <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", letterSpacing: ".1em" }}>ШАГ {step} ИЗ 2</span>
      </div>

      {/* STEP 1 — choose plan */}
      {step === 1 && (
        <section style={shell}>
          <div style={eyebrow}>Онбординг · выбор тарифа</div>
          <h1 style={heading}>За какое качество вы готовы платить?</h1>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, margin: "0 0 26px" }}>
            Напоминаем: чем дороже тариф, тем эксклюзивнее и хуже нарисован ваш поиск. Красота — бесплатна, уродство — премиально.
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            {TIERS.map((t, i) => {
              const on = t.id === selected;
              const quality = ((TIERS.length - 1 - i) / (TIERS.length - 1)) * 100;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  aria-pressed={on}
                  style={{
                    display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center",
                    textAlign: "left", cursor: "pointer", padding: "18px 20px",
                    border: on ? "2px solid var(--accent)" : "1px solid var(--card-bd)",
                    borderRadius: "var(--radius)", background: on ? "color-mix(in srgb, var(--accent) 7%, var(--card-bg))" : "var(--card-bg)",
                    color: "var(--fg)", font: "inherit",
                  }}
                >
                  <div style={{ fontFamily: "var(--mono)", fontSize: 22, minWidth: 70, color: t.id === "scribble" ? "var(--accent-ink)" : "var(--fg)" }}>${t.price}</div>
                  <div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 500 }}>{t.name}{t.badge ? <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".1em", color: "var(--accent-ink)", marginLeft: 10 }}>{t.badge}</span> : null}</div>
                    <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 3 }}>{t.tagline}</div>
                    <div style={{ height: 4, background: "var(--line)", borderRadius: 2, marginTop: 10, maxWidth: 220, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${quality}%`, background: "var(--accent)" }} />
                    </div>
                  </div>
                  <div aria-hidden style={{ width: 22, height: 22, borderRadius: 999, border: on ? "6px solid var(--accent)" : "2px solid var(--card-bd)" }} />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selected && setStep(2)}
            disabled={!selected}
            style={{ marginTop: 26, fontFamily: "var(--font)", fontWeight: 600, fontSize: 16, padding: "14px 26px", borderRadius: "var(--radius)", border: "none", cursor: selected ? "pointer" : "not-allowed", background: selected ? "var(--accent)" : "var(--card-bd)", color: "#fff", opacity: selected ? 1 : 0.6 }}
          >
            Продолжить к оплате →
          </button>
        </section>
      )}

      {/* STEP 2 — payment */}
      {step === 2 && plan && (
        <section style={shell}>
          <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 13, padding: 0, marginBottom: 8 }}>← назад к тарифам</button>
          <div style={eyebrow}>Онбординг · оплата</div>
          <h1 style={heading}>{plan.price === 0 ? "Активация тарифа «Шедевр»" : `Оплата тарифа «${plan.name}»`}</h1>

          <div style={{ display: "grid", gap: 26, gridTemplateColumns: "minmax(0,1fr) minmax(0,300px)", alignItems: "start", marginTop: 22 }}>
            {/* payment form / free activation */}
            <div>
              {plan.price === 0 ? (
                <div style={{ border: "1px solid var(--card-bd)", borderRadius: "var(--radius)", padding: 22, background: "var(--card-bg)" }}>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>Карта не нужна — красота достаётся даром. Но вы уверены, что готовы к поиску, который не выделяет вас из толпы?</p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 16 }}>
                  <div>
                    <span style={label}>Номер карты</span>
                    <input style={field} placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div><span style={label}>Срок</span><input style={field} placeholder="12 / 28" autoComplete="cc-exp" /></div>
                    <div><span style={label}>CVC</span><input style={field} placeholder="•••" autoComplete="cc-csc" /></div>
                  </div>
                  <div>
                    <span style={label}>Имя на карте</span>
                    <input style={field} placeholder="ALIYA W" autoComplete="cc-name" />
                  </div>
                  <p style={{ margin: "2px 0 0", fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>Оплата ненастоящая. Мы списываем только ваш вкус.</p>
                </div>
              )}
            </div>

            {/* order summary */}
            <aside style={{ border: "1px solid var(--card-bd)", borderRadius: "var(--radius)", padding: 20, background: "var(--card-bg)", boxShadow: "var(--shadow)" }}>
              <div style={{ ...label, marginBottom: 12 }}>Ваш заказ</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--display)", fontSize: 20 }}>Croogle {plan.name}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 20, color: plan.id === "scribble" ? "var(--accent-ink)" : "var(--fg)" }}>${plan.price}</span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>в месяц · {plan.tagline}</div>
              <hr className="hairline" style={{ margin: "16px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 15 }}>
                <span>Итого сегодня</span><strong>${plan.price}</strong>
              </div>

              <button
                onClick={confirm}
                disabled={processing}
                style={{ width: "100%", marginTop: 18, fontFamily: "var(--font)", fontWeight: 600, fontSize: 16, padding: "14px 20px", borderRadius: "var(--radius)", border: "none", cursor: processing ? "wait" : "pointer", background: plan.id === "scribble" ? "var(--accent-ink)" : "var(--accent)", color: "#fff" }}
              >
                {processing
                  ? "Проводим платёж…"
                  : status !== "authenticated"
                  ? "Войти через Google →"
                  : plan.price === 0
                  ? "Активировать бесплатно →"
                  : `Оплатить $${plan.price} →`}
              </button>
              <p style={{ margin: "10px 0 0", fontSize: 11.5, color: "var(--muted)", textAlign: "center" }}>
                {status !== "authenticated"
                  ? "Подписка привязывается к вашему Google-аккаунту."
                  : "Далее откроется ваш поиск в оплаченном качестве."}
              </p>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}
