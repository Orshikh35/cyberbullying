import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";

export function AdviceCard({ title, text, icon: Icon }: { title: string; text: string; icon: LucideIcon }) {
  return (
    <Card className="group p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-md">
      <div className="grid h-12 w-12 place-items-center rounded-sm border border-accent/25 bg-accent/10 text-accent">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-black text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Card>
  );
}
