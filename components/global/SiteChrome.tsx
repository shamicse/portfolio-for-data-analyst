"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return <>{children}</>;
  return <><ScrollProgress /><Navbar />{children}<Footer /></>;
}
