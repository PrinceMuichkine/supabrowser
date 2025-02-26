import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supabrowser - Agentic Browser",
  description: "Supabrowser is a modern web browser powered by AI.",
  keywords: ["browser", "ai-agent", "ai-browser", "ai", "browser automation", "ai-actions"],
  authors: [{ name: "lomi." }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://supabrowser.com",
    title: "Supabrowser - Agentic Browser",
    description: "Supabrowser is a modern web browser powered by AI.",
    siteName: "Supabrowser",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supabrowser - Agentic Browser",
    description: "Supabrowser is a modern web browser powered by AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
