"use client";
import Link from "next/link";
import { IntentSearch } from "@/components/IntentSearch";
import { AuthButton } from "@/components/AuthButton";

export default function SearchPage() {
  return (
    <main style={{ minHeight: "100vh", padding: 24 }}>
      {/* Минималистичная шапка: смена тарифа + аккаунт */}
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <Link href="/onboarding" style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)", textDecoration: "none", letterSpacing: ".04em" }}>сменить тариф ↑</Link>
        <AuthButton compact />
      </div>

      <a href="/" style={{ display: "block", textAlign: "center", fontSize: 44, fontWeight: 600, fontFamily: "var(--display)", letterSpacing: "-.02em", textDecoration: "none", marginTop: 8 }}>
        {/* На тарифе Каракули текстовый логотип скрывается, показывается рукотворный рисунок */}
        <span className="wordmark-text">Croogle</span>
        <img className="scribble-logo" src="/scribble-logo.png" alt="Croogle — рукотворный поиск" />
      </a>

      {/* Как на лендинге: театр «восстановления намерения» → редирект в настоящий Google */}
      <div style={{ maxWidth: 680, margin: "24px auto 0" }}>
        <IntentSearch autoFocus />
      </div>
    </main>
  );
}
