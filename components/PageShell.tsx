import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/**
 * Нэгдсэн хуудасны бүрхүүл: gradient + тор + abstract цэнхэр orb-ууд бүхий
 * нэг жигд canvas дээр header + агуулгыг байрлуулна (хоёр өнгийн зааггүй).
 */
export function PageShell({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f6f7fb] to-[#eaeef6]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[length:92px_92px]" />
        <div className="animate-float-slow absolute -left-32 top-16 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[100px]" />
        <div className="animate-float-slow absolute -right-24 top-52 h-[30rem] w-[30rem] rounded-full bg-blue-400/20 blur-[110px] [animation-delay:1.5s]" />
        <div className="absolute bottom-[-6rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <header className="px-5 pb-10 pt-16 sm:px-8">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
            <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
          </div>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-sm bg-accent text-white shadow-lg shadow-accent/25">
            <Icon className="h-8 w-8" aria-hidden />
          </div>
        </Reveal>
      </header>

      {children}
    </main>
  );
}
