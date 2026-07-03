"use client";
import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch(q); }}
      style={{ display: "flex", gap: 8, maxWidth: 640, margin: "24px auto" }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Что вы хотели найти? (мы тоже забыли)"
        style={{ flex: 1, padding: 12, borderRadius: "var(--radius)", border: "1px solid var(--card-bd)", background: "var(--card-bg)", color: "var(--fg)", fontFamily: "var(--font)", fontSize: 16 }}
      />
      <button type="submit" style={{ padding: "12px 20px", borderRadius: "var(--radius)", border: "none", background: "var(--accent)", color: "#fff", cursor: "pointer", fontFamily: "var(--font)", fontWeight: 600 }}>
        Найти
      </button>
    </form>
  );
}
