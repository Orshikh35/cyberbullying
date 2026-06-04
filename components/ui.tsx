import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-sm px-5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-accent text-white hover:bg-accent-bright focus-visible:outline-accent",
        variant === "secondary" && "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-accent",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-900/[0.04]", className)} {...props} />;
}

export function Badge({ className, tone = "blue", ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: "blue" | "green" | "amber" | "rose" | "slate" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em]",
        tone === "blue" && "border-accent/40 bg-accent/10 text-accent",
        tone === "green" && "border-emerald-500/40 bg-emerald-500/10 text-emerald-700",
        tone === "amber" && "border-amber-500/40 bg-amber-500/10 text-amber-700",
        tone === "rose" && "border-rose-500/40 bg-rose-500/10 text-rose-700",
        tone === "slate" && "border-slate-300 bg-slate-100 text-slate-700",
        className,
      )}
      {...props}
    />
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
