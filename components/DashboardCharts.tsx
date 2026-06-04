"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, HelpCircle, Users } from "lucide-react";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { Badge, Card } from "@/components/ui";
import { StatCard } from "@/components/StatCard";
import { Reveal } from "@/components/Reveal";
import { actionStack, bullyingByAge, countBy, impactData, monthlyTrend, percent } from "@/data/chartHelpers";
import { mockResponses } from "@/data/mockResponses";

const chartConfig = {
  хувь: { label: "Хувь", color: "#2563eb" },
  value: { label: "Тоо", color: "#60a5fa" },
  тохиолдол: { label: "Тохиолдол", color: "#2563eb" },
  өндөр: { label: "Өндөр эрсдэл", color: "#fb7185" },
  тийм: { label: "Тийм", color: "#34d399" },
  үгүй: { label: "Үгүй", color: "#f59e0b" },
  тоо: { label: "Тоо", color: "#60a5fa" },
};

const colors = ["#2563eb", "#60a5fa", "#34d399", "#f59e0b", "#fb7185", "#14b8a6"];
const platforms = ["Бүгд", "Facebook", "Instagram", "TikTok", "YouTube", "Discord", "Telegram"];
const ageGroups = ["Бүгд", "9-11", "12-14", "15-17"];
const axisStyle = { fill: "rgba(15,23,42,0.55)", fontSize: 12 };
const gridColor = "rgba(15,23,42,0.1)";

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

export function DashboardCharts() {
  const [platform, setPlatform] = useState("Бүгд");
  const [age, setAge] = useState("Бүгд");

  const responses = useMemo(() => {
    return mockResponses.filter((response) => {
      const platformOk = platform === "Бүгд" || response.platform === platform;
      const group = response.age <= 11 ? "9-11" : response.age <= 14 ? "12-14" : "15-17";
      const ageOk = age === "Бүгд" || group === age;
      return platformOk && ageOk;
    });
  }, [platform, age]);

  const experienced = responses.filter((response) => response.experienced).length;
  const highRisk = responses.filter((response) => response.riskLevel === "Өндөр").length;
  const needsHelp = responses.filter((response) => response.needsHelp).length;

  return (
    <section id="dashboard" className="scroll-mt-24 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Манай судалгааны дата</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">Сайт дээр цугларсан нэргүй хариултууд</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Доорх графикууд нь хүүхдүүдийн өгсөн нэргүй судалгаан дээр суурилсан (одоогоор 720 мөр жишээ дата). Зөвхөн бүлэглэсэн, танигдах боломжгүй статистик харуулна.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <select aria-label="Огнооны хүрээ" className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
              <option>Сүүлийн 12 сар</option>
              <option>Сүүлийн 6 сар</option>
              <option>Сүүлийн 3 сар</option>
            </select>
            <select aria-label="Платформ шүүх" value={platform} onChange={(event) => setPlatform(event.target.value)} className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
              {platforms.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select aria-label="Насны бүлэг шүүх" value={age} onChange={(event) => setAge(event.target.value)} className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
              {ageGroups.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        {responses.length === 0 ? (
          <Card className="p-10 text-center text-slate-600">Одоогоор сонгосон нөхцөлд тохирох дата алга.</Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Нийт бөглөсөн" value={responses.length.toString()} detail="Нэргүй хариулт" icon={Users} />
              <StatCard label="Өртсөн хувь" value={`${percent(experienced, responses.length)}%`} detail="Сүүлийн 3 сарын асуултаар" icon={Activity} />
              <StatCard label="Өндөр эрсдэл" value={`${percent(highRisk, responses.length)}%`} detail="Яаралтай дэмжлэг хэрэгтэй байж магадгүй" icon={AlertTriangle} />
              <StatCard label="Тусламж хүссэн" value={`${percent(needsHelp, responses.length)}%`} detail="Өөрийгөө ганцаараа биш гэдгийг мэдрүүлэх" icon={HelpCircle} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <ChartCard title="Насны бүлгээр өртсөн хувь">
                <ChartContainer config={chartConfig}>
                  <BarChart data={bullyingByAge(responses)}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="хувь" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard title="Платформоор тохиолдлын тоо">
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie data={countBy(responses, (r) => r.platform)} dataKey="value" nameKey="name" innerRadius={64} outerRadius={104} paddingAngle={2}>
                      {countBy(responses, (r) => r.platform).map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
                    </Pie>
                    <ChartLegend />
                  </PieChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard title="Сарын өөрчлөлт">
                <ChartContainer config={chartConfig}>
                  <LineChart data={monthlyTrend(responses)}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="тохиолдол" stroke="#2563eb" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="өндөр" stroke="#fb7185" strokeWidth={3} dot={false} />
                  </LineChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard title="Эрсдэлийн түвшний тархалт">
                <ChartContainer config={chartConfig}>
                  <BarChart data={countBy(responses, (r) => r.riskLevel)}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard title="Хэнд хандсан тухай">
                <ChartContainer config={chartConfig}>
                  <BarChart layout="vertical" data={countBy(responses, (r) => r.toldTo)} margin={{ left: 28 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" width={94} tick={axisStyle} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#34d399" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard title="Block / report / screenshot хийсэн эсэх">
                <ChartContainer config={chartConfig}>
                  <BarChart data={actionStack(responses)}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend />
                    <Bar dataKey="тийм" stackId="a" fill="#34d399" radius={[0, 0, 6, 6]} />
                    <Bar dataKey="үгүй" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard title="Сэтгэлзүйн нөлөөллийн түвшин">
                <ChartContainer config={chartConfig}>
                  <RadarChart data={impactData(responses)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={axisStyle} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar dataKey="тоо" fill="#60a5fa" fillOpacity={0.45} stroke="#60a5fa" />
                  </RadarChart>
                </ChartContainer>
              </ChartCard>

              <Card className="flex flex-col justify-center p-6">
                <Badge tone="blue">Loading / error төлөв</Badge>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Самбарын төлөвүүд бэлэн</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Фильтр тохирох өгөгдөлгүй үед empty state харуулна. Бодит API холбох үед энэ картын оронд loading skeleton болон алдааны alert байрлуулах боломжтой.</p>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
