import type { Metadata } from "next";
import "./globals.css";
import "./themes.css";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Croogle — красота для бедных, роскошь — каракули",
  description: "Первый поисковик, где вы платите за то, как результаты выглядят. Чем дороже тариф — тем эксклюзивнее (и хуже).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body style={{ margin: 0 }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
