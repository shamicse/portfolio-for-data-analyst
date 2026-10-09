import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { geistVF } from "./fonts";
import { SiteChrome } from "@/components/global/SiteChrome";
import { siteConfig } from "@/data/data";
export const metadata: Metadata = {
  title: "Shami Akhtar — A little universe of data & daydreams",
  description: siteConfig.description,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><link rel="icon" href="/favicon_io/favicon.ico" sizes="any" /></head><body className={`${geistVF.className} dark:bg-black bg-white antialiased`}><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange><SiteChrome>{children}</SiteChrome></ThemeProvider></body></html>;
}
