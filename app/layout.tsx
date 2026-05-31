import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

// 1. Configure the font to output a CSS variable
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans", 
});

export const metadata: Metadata = {
  title: "CAF PRE-BMT",
  description: "Training application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Proměnnou s fontem vložíme úplně nejvýš do html
    <html lang="en" className={inter.variable}>
      {/* 2. Body necháme čisté, font se sem propíše automaticky shora */}
      <body className="antialiased">
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}