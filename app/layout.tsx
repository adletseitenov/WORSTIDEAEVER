import type { Metadata } from "next";
import "./globals.css";
import "./themes.css";
import { Providers } from "@/app/providers/Providers";

export const metadata: Metadata = {
  title: "Croogle — вы забыли, что хотели загуглить",
  description: "AI, который восстанавливает ваше утраченное поисковое намерение и мгновенно доставляет вас в Google. Впервые потерянная мысль — под контролем.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
