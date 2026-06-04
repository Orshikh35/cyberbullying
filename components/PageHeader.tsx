import type { LucideIcon } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      {/* grid + warm glow, echoing the home hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.12),transparent_24rem),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[length:auto,92px_92px,92px_92px]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.03em] text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
        </div>
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-sm bg-accent text-white shadow-lg shadow-accent/20">
          <Icon className="h-8 w-8" aria-hidden />
        </div>
      </div>
    </section>
  );
}
