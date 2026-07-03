"use client";
import { SearchResult } from "@/lib/fallback";

// Сниппеты приходят из внешнего Google API. Экранируем весь HTML, затем возвращаем
// только теги подсветки <b>/</b>, которыми Google выделяет совпадения. Так вид
// «настоящего Google» сохраняется, а XSS (<img onerror=...> и т.п.) закрыт.
function safeSnippet(raw: string): string {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/&lt;(\/?b)&gt;/g, "<$1>");
}

// Пропускаем только http/https — иначе javascript:/data:-ссылка из внешней выдачи
// могла бы выполниться при клике.
function safeHref(link: string): string {
  return /^https?:\/\//i.test(link) ? link : "#";
}

export function ResultsList({ results }: { results: SearchResult[] }) {
  return (
    <div>
      {results.map((r, i) => (
        <div className="result" key={i}>
          <a href={safeHref(r.link)} target="_blank" rel="noreferrer">{r.title}</a>
          <div className="url">{r.link}</div>
          <div className="snippet" dangerouslySetInnerHTML={{ __html: safeSnippet(r.snippet) }} />
        </div>
      ))}
    </div>
  );
}
