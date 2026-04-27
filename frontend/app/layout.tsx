import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gal Atelier OS",
  description: "Sistema premium para wigmaker: briefing, orçamento, Pix e WhatsApp"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
