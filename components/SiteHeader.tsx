"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Нүүр" },
  { href: "/info", label: "Мэдээлэл" },
  { href: "/advice", label: "Зөвлөгөө" },
  { href: "/report", label: "Мэдээлэх" },
  { href: "/dashboard", label: "Дата" },
];

export function SiteHeader() {
  const pathname = usePathname();

  // The full-screen home hero ships its own nav — avoid a duplicate bar.
  if (pathname === "/") return null;

  // Mirror the home hero header exactly (full-bleed, tall tiles, white tiles).
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-6 py-5 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-mono">
          <span className="grid h-7 w-7 place-items-center rounded-sm bg-accent text-white">
            <ShieldCheck className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.28em] text-slate-900">Цахим хамгаалал</span>
        </Link>

        <nav className="grid grid-cols-3 font-mono sm:flex sm:flex-wrap" aria-label="Үндсэн цэс">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative grid min-h-[2.6rem] min-w-0 place-items-center border border-slate-200 px-2 text-[0.62rem] font-medium transition sm:min-h-[3.25rem] sm:min-w-[5.5rem] sm:px-4 sm:text-[0.7rem]",
                  active ? "bg-slate-100 text-slate-900" : "bg-white/70 text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <span className={cn("absolute right-1.5 top-1.5 h-1 w-1 rounded-full", active ? "bg-accent" : "bg-slate-400")} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/assessment"
            className="relative grid min-h-[2.6rem] place-items-center bg-accent px-2 text-center text-[0.62rem] font-bold leading-tight text-white transition hover:bg-accent-bright sm:col-auto sm:min-h-[3.25rem] sm:min-w-[8.5rem] sm:px-5 sm:text-[0.7rem]"
          >
            <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-white" />
            Судалгаа өгөх
          </Link>
        </nav>
      </div>
    </header>
  );
}
