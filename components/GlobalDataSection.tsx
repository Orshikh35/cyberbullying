"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Activity, Globe2, ShieldAlert, TrendingUp, Users } from "lucide-react";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { Badge, Card } from "@/components/ui";
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
  дэлхий: { label: "Дэлхий", color: "#94a3b8" },
  монгол: { label: "Монгол", color: "#2563eb" },
  value: { label: "Хувь", color: "#2563eb" },
};

const colors = ["#2563eb", "#60a5fa", "#34d399", "#f59e0b", "#fb7185", "#14b8a6"];
const axisStyle = { fill: "rgba(15,23,42,0.55)", fontSize: 12 };
const gridColor = "rgba(15,23,42,0.1)";
const kpiIcons = [Activity, ShieldAlert, Users, TrendingUp];

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal variant="up">
      <Card className="min-w-0 p-5">
        <h3 className="mb-4 font-mono text-[0.78rem] font-bold uppercase tracking-[0.16em] text-slate-700">{title}</h3>
        {children}
      </Card>
    </Reveal>
  );
}

export function GlobalDataSection() {
  return (
    <section className="px-5 pt-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Олон улс ба Монгол</p>
            <h2 className="mt-3 flex items-start gap-3 text-2xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">
              <Globe2 className="mt-1 h-7 w-7 shrink-0 text-accent sm:h-8 sm:w-8" />
              <span className="min-w-0">Дэлхий ба Монголын дүр зураг</span>
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Цахим дээрэлхэлт зөвхөн манайд биш — дэлхий даяар тулгамдсан асуудал. Доорх график нь олон улс, Монголын үзүүлэлтийг харьцуулна.
            </p>
          </div>
          <Badge tone="amber">Жишээ / лавлагаа дата</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {referenceKpis.map((item, index) => (
            <StatCard key={item.label} label={item.label} value={item.value} detail={item.detail} icon={kpiIcons[index]} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ChartCard title="Цахим дээрэлхэлтэд өртсөн хувь (улсаар)">
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

          <ChartCard title="Жил тутмын чиг хандлага: дэлхий vs Монгол">
            <ChartContainer config={chartConfig}>
              <LineChart data={trendByYear}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Line type="monotone" dataKey="дэлхий" stroke="#94a3b8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="монгол" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
          </ChartCard>

          <ChartCard title="Монголд насны бүлгээр өртсөн хувь">
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

          <ChartCard title="Платформоор тохиолдлын эзлэх хувь (Монгол)">
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

          <ChartCard title="Дээрэлхэлтийн төрлийн задаргаа (Монгол)">
            <ChartContainer config={chartConfig}>
              <BarChart layout="vertical" data={typeBreakdown} margin={{ left: 40 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={130} tick={axisStyle} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#60a5fa" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartCard>

          <Card className="flex flex-col justify-center p-6">
            <Badge tone="blue">Тайлбар</Badge>
            <h3 className="mt-4 text-xl font-black text-slate-900">Дата юу хэлж байна вэ?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Нас ахих тусам цахим дээрэлхэлтэд өртөх магадлал нэмэгддэг. Монголын үзүүлэлт дэлхийн дунджаас дээгүүр байгаа нь
              урьдчилан сэргийлэх, мэдээлэл өгөх ажлын ач холбогдлыг харуулж байна.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
