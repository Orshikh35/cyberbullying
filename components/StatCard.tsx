"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";

/** "720" / "33%" / "≈40%" зэргээс эхний тоог салгаж тоолуурыг хөдөлгөнө. */
function useCountUp(value: string) {
  const ref = useRef<HTMLParagraphElement>(null);
  const match = value.match(/(\d+(?:\.\d+)?)/);
  const target = match ? parseFloat(match[1]) : null;
  const decimals = match && match[1].includes(".") ? 1 : 0;
  const [display, setDisplay] = useState(target === null ? value : value.replace(match![1], decimals ? "0.0" : "0"));

  useEffect(() => {
    if (target === null || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = (target * eased).toFixed(decimals);
          setDisplay(value.replace(match![1], current));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { ref, display };
}

export function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  const { ref, display } = useCountUp(value);

  return (
    <Card className="p-5 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p ref={ref} className="mt-2 text-3xl font-black tabular-nums text-slate-900">{display}</p>
          <p className="mt-1 text-sm text-slate-500">{detail}</p>
        </div>
        <div className="rounded-sm border border-accent/25 bg-accent/10 p-3 text-accent">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
