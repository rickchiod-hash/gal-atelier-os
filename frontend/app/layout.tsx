import "./globals.css";
import { Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Gal Atelier OS",
  description: "Sistema premium para wigmaker: briefing, orçamento, Pix e WhatsApp"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${playfair.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`
          }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
