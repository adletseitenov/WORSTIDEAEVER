"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/*  IntentSearch — ядро продукта и главная шутка.                       */
/*  Пользователь вводит запрос (то, что «забыл»), мы проигрываем        */
/*  короткий AI-театр «восстановления намерения» и честно редиректим    */
/*  в настоящий Google. Никакого своего индекса — просще некуда.        */
/* ------------------------------------------------------------------ */

// Шаги «восстановления намерения» — чистый театр на фронте, ~2 секунды.
const STEPS = [
  "Сканируем ваше подсознание…",
  "Восстанавливаем утраченное намерение…",
  "Кросс-валидация по 12 млрд забытых мыслей…",
  "Совпадение найдено · уверенность 98.6%",
  "Отправляем в Google…",
];

const STEP_MS = 460;

function googleUrl(q: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export function IntentSearch({ autoFocus = false }: { autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Чистим таймеры при размонтировании, чтобы не редиректить «из ниоткуда».
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function recover(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query || running) return;
    setRunning(true);
    setStep(0);

    STEPS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setStep(i), i * STEP_MS)
      );
    });
    timers.current.push(
      setTimeout(() => {
        window.location.href = googleUrl(query);
      }, STEPS.length * STEP_MS)
    );
  }

  const inputStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    padding: "16px 20px",
    borderRadius: 999,
    border: "1px solid var(--card-bd, var(--line))",
    background: "var(--card-bg)",
    color: "var(--fg)",
    fontFamily: "var(--font)",
    fontSize: 17,
    outline: "none",
  };

  const buttonStyle: CSSProperties = {
    padding: "16px 26px",
    borderRadius: 999,
    border: "none",
    background: "var(--accent)",
    color: "#fff",
    cursor: running ? "progress" : "pointer",
    fontFamily: "var(--font)",
    fontWeight: 600,
    fontSize: 16,
    whiteSpace: "nowrap",
    opacity: running ? 0.7 : 1,
  };

  return (
    <div style={{ maxWidth: 640, marginTop: 30 }}>
      <form
        className="intent-form"
        onSubmit={recover}
        style={{ display: "flex", gap: 10, alignItems: "center" }}
        aria-busy={running}
      >
        <input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={running}
          placeholder="Что вы хотели найти? Начните печатать — мы вспомним…"
          aria-label="Ваш забытый запрос"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} disabled={running}>
          {running ? "Вспоминаем…" : "Восстановить →"}
        </button>
      </form>

      {/* Полоса AI-театра: появляется только во время «восстановления». */}
      <div
        aria-live="polite"
        style={{
          height: 26,
          marginTop: 14,
          fontFamily: "var(--mono)",
          fontSize: 13.5,
          color: "var(--accent)",
          opacity: running ? 1 : 0,
          transition: "opacity .2s ease",
        }}
      >
        {running && (
          <span>
            <span style={{ marginRight: 8 }}>◐</span>
            {STEPS[step]}
          </span>
        )}
      </div>
    </div>
  );
}
