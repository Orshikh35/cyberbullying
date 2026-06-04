"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<string, { label: string; color: string }>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);
const subscribe = (onStoreChange: () => void) => {
  const frame = requestAnimationFrame(onStoreChange);
  return () => cancelAnimationFrame(frame);
};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ChartContainer({ config, className, children }: React.HTMLAttributes<HTMLDivElement> & { config: ChartConfig; children: React.ReactNode }) {
  const mounted = React.useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-[310px] w-full text-sm", className)}>
        {mounted ? (
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            {children as React.ReactElement}
          </RechartsPrimitive.ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-xl bg-slate-100" aria-label="График ачаалж байна" />
        )}
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;
export const ChartLegend = RechartsPrimitive.Legend;

export function ChartTooltipContent({ active, payload, label }: { active?: boolean; payload?: { name?: string; value?: number; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-36 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-lg">
      {label ? <p className="mb-2 font-semibold text-slate-900">{label}</p> : null}
      <div className="space-y-1">
        {payload.map((item) => (
          <div key={`${item.name}-${item.value}`} className="flex items-center justify-between gap-4 text-slate-600">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <strong className="text-slate-900">{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
