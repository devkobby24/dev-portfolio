import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justice' Portfolio",
  description: "Modern & Minimalistic Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        >
        {children}
        <SpeedInsights />
        <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  );
}
