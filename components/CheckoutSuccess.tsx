"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TIERS, type TierId } from "@/lib/tiers";
import { useTier } from "@/app/providers/ThemeProvider";

const shell: CSSProperties = { width: "100%", maxWidth: 640, margin: "0 auto", padding: "0 24px" };

export function CheckoutSuccess() {
  const router = useRouter();
  const params = useSearchParams();
  const { update } = useSession();
  const { setTier } = useTier();
  const ran = useRef(false);

  const tierId = params.get("tier") as TierId | null;
  const demo = params.get("demo") === "1";
  const plan = TIERS.find((t) => t.id === tierId) ?? null;
  const [msg, setMsg] = useState("Активируем ваш тариф…");

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    (async () => {
      if (plan) {
        // Персистим подписку в JWT аккаунта и мгновенно перекрашиваем интерфейс.
        try {
          await update({ tier: plan.id });
        } catch {
          /* сессия не обязательна для показа успеха — тариф всё равно применим локально */
        }
        setTier(plan.id);
      }
      setMsg("Готово. Открываем ваш поиск…");
      setTimeout(() => router.push("/search"), 1300);
    })();
  }, [plan, update, setTier, router]);

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <section style={shell}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--accent)" }}>
          {demo ? "Оплата · demo" : "Оплата прошла"}
        </div>
        <h1 style={{ fontFamily: "var(--display)", fontWeight: 500, letterSpacing: "-.02em", fontSize: "clamp(30px,6vw,52px)", margin: "14px 0 10px", lineHeight: 1.05 }}>
          {plan ? <>Добро пожаловать в&nbsp;«{plan.name}»</> : "Спасибо!"}
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.55, margin: "0 auto", maxWidth: 460 }}>
          {plan
            ? `Вы официально платите $${plan.price}/мес за ${plan.price === 0 ? "красоту" : "эксклюзивно худшую выдачу"}. ${msg}`
            : msg}
        </p>
        <div style={{ marginTop: 26 }}>
          <Link href="/search" style={{ fontFamily: "var(--font)", fontWeight: 600, fontSize: 16, background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "13px 24px", borderRadius: "var(--radius)" }}>
            Открыть поиск →
          </Link>
        </div>
      </section>
    </main>
  );
}
