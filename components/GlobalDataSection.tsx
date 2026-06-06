"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Activity, ExternalLink, Globe2, Info, Lightbulb, ShieldAlert, TrendingUp, Users } from "lucide-react";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { Card } from "@/components/ui";
import { StatCard } from "@/components/StatCard";
import { Reveal } from "@/components/Reveal";
import {
  mongoliaByAge,
  platformShare,
  prevalenceByCountry,
  referenceKpis,
  trendByYear,
  typeBreakdown,
} from "@/data/referenceStats";

const chartConfig = {
  хувь: { label: "Хувь", color: "#2563eb" },
  тоо: { label: "Тоо", color: "#2563eb" },
  value: { label: "Хувь", color: "#2563eb" },
};

const REPORT_SOURCE = "Эх сурвалж: НҮБХХ • 'Монголын хүүхэд, өсвөр үеийнхний дундах цахим дээрэлхэлтийн талаарх судалгаа', 2025/03";
const REPORT_URL = "https://www.undp.org/mongolia";

const colors = ["#2563eb", "#60a5fa", "#34d399", "#f59e0b", "#fb7185", "#14b8a6"];
const axisStyle = { fill: "rgba(15,23,42,0.55)", fontSize: 12 };
const gridColor = "rgba(15,23,42,0.1)";
const kpiIcons = [Activity, ShieldAlert, Users, TrendingUp];

function ChartCard({
  title,
  subtitle,
  source,
  children,
}: {
  title: string;
  subtitle?: string;
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal variant="up">
      <Card className="flex min-w-0 flex-col p-5">
        <div className="mb-4">
          <h3 className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.16em] text-slate-700">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="flex-1">{children}</div>
        {source ? (
          <p className="mt-4 border-t border-dashed border-slate-200 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
            {source}
          </p>
        ) : null}
      </Card>
    </Reveal>
  );
}

export function GlobalDataSection() {
  return (
    <section className="px-5 pt-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Олон улс ба Монгол</p>
          <h2 className="mt-3 flex items-start gap-3 text-2xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">
            <Globe2 className="mt-1 h-7 w-7 shrink-0 text-accent sm:h-8 sm:w-8" />
            <span className="min-w-0">Дэлхий ба Монголын дүр зураг</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Цахим дээрэлхэлт зөвхөн манайд биш — дэлхий даяар тулгамдсан асуудал. Доорх график нь олон улс, Монголын үзүүлэлтийг харьцуулна.
          </p>
        </div>

        <div className="mb-8 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <div className="text-sm leading-6">
            <p className="font-bold text-slate-900">Эх сурвалж: НҮБХХ 2025 тайлан</p>
            <p className="mt-1 text-slate-600">
              Доорх график бүгд Нэгдсэн Үндэстний Байгууллагын Хөгжлийн хөтөлбөр болон Цахим хөгжил, инновац, харилцаа холбооны яамны хамтран 2025 оны 3-р сард гаргасан{" "}
              <em className="not-italic font-medium text-slate-900">"Монголын хүүхэд, өсвөр үеийнхний дундах цахим дээрэлхэлтийн талаарх судалгаа"</em>{" "}
              тайлангаас (Улаанбаатарын 12 сургуулийн n=5,477; 1,620 эцэг эх + 3,857 сурагч) гарсан тоон үзүүлэлт.
            </p>
            <a
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent transition hover:text-accent-bright"
            >
              Бүрэн тайлан үзэх
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {referenceKpis.map((item, index) => (
            <StatCard key={item.label} label={item.label} value={item.value} detail={item.detail} icon={kpiIcons[index]} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Цахим дээрэлхэлтэд өртсөн хувь (улсаар)"
            subtitle="Өсвөр насныхны хувьд % өртсөн — Монголын тоо нь 13–17 насныхны өртөлт"
            source={REPORT_SOURCE}
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={prevalenceByCountry}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="хувь" radius={[8, 8, 0, 0]}>
                  {prevalenceByCountry.map((entry) => (
                    <Cell key={entry.name} fill={entry.name === "Монгол" ? "#2563eb" : "#cbd5e1"} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            title="Бүртгэгдсэн цахим гэмт хэргийн тоо (Монгол)"
            subtitle="2012-оос 2018 он хүртэл ~20 дахин нэмэгдсэн"
            source={REPORT_SOURCE}
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={trendByYear}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="тоо" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            title="Монголд насны бүлгээр өртсөн хувь"
            subtitle="Цахим дээрэлхэлтэд өртсөн гэж хариулсан сурагчид"
            source={REPORT_SOURCE}
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={mongoliaByAge}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="хувь" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            title="Эцэг эх хүүхдийн цахим дарамтыг мэдэх байдал"
            subtitle="'Хүүхэд минь цахим дарамтад өртсөн үү?' — эцэг эхийн хариулт (n=1,620)"
            source={REPORT_SOURCE}
          >
            <ChartContainer config={chartConfig}>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={platformShare} dataKey="value" nameKey="name" innerRadius={60} outerRadius={102} paddingAngle={2}>
                  {platformShare.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <ChartLegend />
              </PieChart>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            title="Гол анхаарал татсан дутагдал (Монгол)"
            subtitle="Тайлангаас гарсан гол сорилт, мэдлэгийн зөрүү — хувиар"
            source={REPORT_SOURCE}
          >
            <ChartContainer config={chartConfig}>
              <BarChart layout="vertical" data={typeBreakdown} margin={{ left: 12 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={220} tick={{ ...axisStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#60a5fa" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          <Card className="flex flex-col gap-4 bg-gradient-to-br from-accent/[0.06] to-transparent p-6">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                <Lightbulb className="h-4 w-4" aria-hidden />
              </div>
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Дата юу хэлж байна вэ?</p>
            </div>
            <h3 className="text-xl font-black text-slate-900">Гурван гол ажиглалт</h3>
            <ul className="space-y-3 text-sm leading-6 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">1</span>
                <span>13–17 насны өсвөр үеийнхний <strong className="font-bold text-slate-900">51.3%</strong> цахим дарамтад өртөж байсан — дэлхийн дунджаас дөрөв дахин их.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">2</span>
                <span>Өртсөн хүүхдийн <strong className="font-bold text-slate-900">3 тутмын 2 нь</strong> насанд хүрэгчдэд хэлдэггүй — мэдээлэх сувагт итгэх итгэл сул.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">3</span>
                <span>9–12 насныхны <strong className="font-bold text-slate-900">90% Facebook</strong> ашигладаг хэдий ч платформын насны хязгаар (13)-ыг хангаагүй.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
