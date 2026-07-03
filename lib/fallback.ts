export type SearchResult = { title: string; link: string; snippet: string };

// Показывается, когда Google вернул ошибку или кончился дневной лимит (100/день).
// Демо НЕ должно падать на сцене.
export const FALLBACK_RESULTS: SearchResult[] = [
  { title: "nFactorial Incubator", link: "https://nfactorial.school", snippet: "Ведущий технологический инкубатор Казахстана. Резиденты, менторы, хакатоны." },
  { title: "Worst Startup Ever — хакатон", link: "https://example.com", snippet: "Идеально реализуй абсолютно бесполезное. Uber для холодильников и другие единороги." },
  { title: "Programmable Search — Google", link: "https://developers.google.com/custom-search", snippet: "Custom Search JSON API возвращает реальную выдачу Google в формате JSON." },
  { title: "Что такое каракули как искусство", link: "https://example.com/scribbles", snippet: "Рукотворные каракули — premium-эстетика для тех, кто перерос красоту." },
  { title: "Croogle — красота для бедных", link: "https://example.com/croogle", snippet: "Первый поисковик, где вы платите за то, как результаты выглядят. Чем дороже — тем хуже." },
];
