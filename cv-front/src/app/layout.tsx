import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "../middleware";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cercavila",
  description: "L'ecosistema de les colles geganteres de Mataró",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
