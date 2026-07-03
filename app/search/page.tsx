"use client";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ResultsList } from "@/components/ResultsList";
import { TierSwitcher } from "@/components/TierSwitcher";
import { SearchResult } from "@/lib/fallback";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function onSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true); setSearched(true);
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await r.json();
      setResults(data.results ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24 }}>
      <a href="/" style={{ display: "block", textAlign: "center", fontSize: 44, fontWeight: 600, fontFamily: "var(--display)", letterSpacing: "-.02em", textDecoration: "none" }}>
        {/* На тарифе Каракули текстовый логотип скрывается, показывается рукотворный рисунок */}
        <span className="wordmark-text">Croogle</span>
        <img className="scribble-logo" src="/scribble-logo.png" alt="Croogle — рукотворный поиск" />
      </a>
      <TierSwitcher />
      <SearchBar onSearch={onSearch} />
      {loading && <p style={{ textAlign: "center", fontFamily: "var(--font)" }}>Рисуем результаты вручную…</p>}
      {!loading && searched && results.length === 0 && (
        <p style={{ textAlign: "center", fontFamily: "var(--font)" }}>Вы, кажется, забыли, что искали. Как и все.</p>
      )}
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <ResultsList results={results} />
      </div>
    </main>
  );
}
