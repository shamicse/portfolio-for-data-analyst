import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { Navbar } from "@/components/global/Navbar";
import { geistVF } from "./fonts";
import { Footer } from "@/components/global/Footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { siteConfig } from "@/data/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistVF.className} dark:bg-black bg-white antialiased`}
      >
        <ScrollProgress />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
