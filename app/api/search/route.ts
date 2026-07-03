import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_RESULTS, SearchResult } from "@/lib/fallback";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ results: [], fallback: false, empty: true });
  }

  const key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;
  const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${encodeURIComponent(q)}`;

  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Google ${r.status}`);
    const data = await r.json();
    const results: SearchResult[] = (data.items ?? []).slice(0, 8).map((it: { title: string; link: string; snippet?: string }) => ({
      title: it.title,
      link: it.link,
      snippet: it.snippet ?? "",
    }));
    if (results.length === 0) throw new Error("no items");
    return NextResponse.json({ results, fallback: false });
  } catch {
    return NextResponse.json({ results: FALLBACK_RESULTS, fallback: true });
  }
}
