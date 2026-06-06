"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Activity, Globe, Lightbulb, Smartphone, TimerReset, UserCheck } from "lucide-react";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { Card } from "@/components/ui";
import { StatCard } from "@/components/StatCard";
import { Reveal } from "@/components/Reveal";
import {
  INTL_SOURCES,
  asiaPrevalence,
  internationalKpis,
  screenTimeMentalHealth,
  usParentalControls,
  usPlatformUsage,
  whoGenderRoles,
} from "@/data/internationalStats";

const chartConfig = {
  хувь: { label: "Хувь", color: "#2563eb" },
  хохирогч: { label: "Хохирогч", color: "#2563eb" },
  үүсгэгч: { label: "Дарамт үүсгэгч", color: "#94a3b8" },
  иххэрэглэгч: { label: "Их хэрэглэгч (4+ цаг)", color: "#fb7185" },
  багахэрэглэгч: { label: "Бага хэрэглэгч (<2 цаг)", color: "#34d399" },
};

const axisStyle = { fill: "rgba(15,23,42,0.55)", fontSize: 12 };
const gridColor = "rgba(15,23,42,0.1)";
const kpiIcons = [Globe, Smartphone, TimerReset, Activity];

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

export function InternationalDataSection() {
  return (
    <section className="px-5 pt-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Олон улсын мэдээлэл</p>
          <h2 className="mt-3 flex items-start gap-3 text-2xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">
            <UserCheck className="mt-1 h-7 w-7 shrink-0 text-accent sm:h-8 sm:w-8" />
            <span className="min-w-0">Дэлхий, Ази, АНУ-ын лавлагаа</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            ДЭМБ, Pew Research, CDC болон FOSI зэрэг хүлээн зөвшөөрөгдсөн эх сурвалжаас цахим аюулгүй байдал, өсвөр үеийн сэтгэцийн эрүүл мэнд, эцэг эхийн хяналтын тоон үзүүлэлт.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {internationalKpis.map((item, index) => (
            <StatCard key={item.label} label={item.label} value={item.value} detail={item.detail} icon={kpiIcons[index]} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {/* Ази тивийн харьцуулалт */}
          <ChartCard
            title="Цахим дарамтад өртсөн % (Ази)"
            subtitle="Өсвөр насныхны хохирогч болсон хувь"
            source="Park et al. 2021; Ruangnapakuletal et al. 2019"
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={asiaPrevalence}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="хувь" radius={[8, 8, 0, 0]}>
                  {asiaPrevalence.map((entry) => (
                    <Cell key={entry.name} fill="#60a5fa" />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* WHO/HBSC хүйс ба үүрэг */}
          <ChartCard
            title="Хүйс ба үүргээр (Европ, WHO/HBSC)"
            subtitle="44 улсын өсвөр үе — хохирогч ба дарамт үүсгэгчийн хувь"
            source="WHO/Europe HBSC Study"
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={whoGenderRoles}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Bar dataKey="хохирогч" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="үүсгэгч" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Дэлгэцийн цаг ба сэтгэцийн эрүүл мэнд */}
          <ChartCard
            title="Дэлгэцийн цаг ба сэтгэцийн эрүүл мэнд (АНУ)"
            subtitle="4+ цаг хэрэглэгчдийн дунд шинж тэмдэг ~2 дахин их"
            source="CDC NHIS-Teen Survey 2021–2023"
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={screenTimeMentalHealth}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Bar dataKey="иххэрэглэгч" fill="#fb7185" radius={[6, 6, 0, 0]} />
                <Bar dataKey="багахэрэглэгч" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* АНУ-ын платформын хэрэглээ */}
          <ChartCard
            title="Платформын хэрэглээ (АНУ, 13–17 нас)"
            subtitle="Тухайн платформыг ашигладаг өсвөр үеийнхний %"
            source="Pew Research Center 2024"
          >
            <ChartContainer config={chartConfig}>
              <BarChart data={usPlatformUsage}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="хувь" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Эцэг эхийн хяналт */}
          <ChartCard
            title="Эцэг эхийн цахим хяналт (АНУ)"
            subtitle="Эцэг эхчүүдийн зан үйл ба гэрийн дүрэм — % хариулагчид"
            source="Pew Research • FOSI 2025"
          >
            <ChartContainer config={chartConfig}>
              <BarChart layout="vertical" data={usParentalControls} margin={{ left: 12 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={220} tick={{ ...axisStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="хувь" fill="#60a5fa" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          {/* Insight panel */}
          <Card className="flex flex-col gap-4 bg-gradient-to-br from-accent/[0.06] to-transparent p-6">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                <Lightbulb className="h-4 w-4" aria-hidden />
              </div>
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Гол ажиглалт</p>
            </div>
            <h3 className="text-xl font-black text-slate-900">Олон улсын чиг хандлага</h3>
            <ul className="space-y-3 text-sm leading-6 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">1</span>
                <span>Дэлхийн өсвөр үеийн өртөлт <strong className="font-bold text-slate-900">15%</strong> — 2018 оноос 3 нэгжээр өссөн. Охид хөвгүүдээс арай илүү (16% vs 15%) өртдөг.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">2</span>
                <span>Өдөрт <strong className="font-bold text-slate-900">4+ цаг</strong> дэлгэц харагч өсвөр үеийнхний сэтгэлзүйн шинж тэмдэг бага хэрэглэгчдээс <strong className="font-bold text-slate-900">2 дахин</strong> их.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">3</span>
                <span>Эцэг эхчүүдийн <strong className="font-bold text-slate-900">86% дүрэмтэй</strong> ч зөвхөн <strong className="font-bold text-slate-900">19% нь</strong> үргэлж дагадаг — дүрэм болон практикийн хооронд том зөрүү.</span>
              </li>
            </ul>
            <p className="mt-2 border-t border-slate-200/70 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
              {INTL_SOURCES}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
