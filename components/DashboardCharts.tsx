"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, ClipboardList, HelpCircle, Lightbulb, Users } from "lucide-react";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { Card } from "@/components/ui";
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

function FilterPills({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`h-8 rounded-full border px-3 text-xs font-medium transition ${
                active
                  ? "border-accent bg-accent text-white shadow-sm shadow-accent/30"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
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
        <div className="mb-6">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Манай судалгааны дата</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">Сайт дээр цугларсан нэргүй хариултууд</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Доорх графикууд нь хүүхдүүдийн өгсөн нэргүй судалгаан дээр суурилсан (одоогоор 720 мөр жишээ дата). Зөвхөн бүлэглэсэн, танигдах боломжгүй статистик харуулна.
          </p>
        </div>

        <Card className="mb-6 p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FilterPills label="Платформ" value={platform} options={platforms} onChange={setPlatform} />
            <FilterPills label="Насны бүлэг" value={age} options={ageGroups} onChange={setAge} />
          </div>
        </Card>

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
              <ChartCard
                title="Насны бүлгээр өртсөн хувь"
                subtitle="Шүүлтүүрд тохирох хариулагчдын дотроос"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
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

              <ChartCard
                title="Платформоор тохиолдлын тоо"
                subtitle="Тохиолдол хаана гарсан гэж хариулсан"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
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

              <ChartCard
                title="Сарын өөрчлөлт"
                subtitle="Хариултын тоо ба өндөр эрсдэлтэй хариултын чиг хандлага"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
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

              <ChartCard
                title="Эрсдэлийн түвшний тархалт"
                subtitle="Скорын тооцоогоор: Бага / Дунд / Өндөр"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
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

              <ChartCard
                title="Хэнд хандсан тухай"
                subtitle="Тохиолдсон хүүхдүүд хэнд хэлсэн бэ"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
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

              <ChartCard
                title="Block / report / screenshot хийсэн эсэх"
                subtitle="Хариулагчдын хамгаалалтын үйлдэл"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
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

              <ChartCard
                title="Сэтгэлзүйн нөлөөллийн түвшин"
                subtitle="Хариулагчдад мэдрэгдсэн сэтгэлзүйн шинж тэмдгийн тоо"
                source={`Манай сайтын нэргүй жишээ дата • n=${responses.length}`}
              >
                <ChartContainer config={chartConfig}>
                  <RadarChart data={impactData(responses)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={axisStyle} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar dataKey="тоо" fill="#60a5fa" fillOpacity={0.45} stroke="#60a5fa" />
                  </RadarChart>
                </ChartContainer>
              </ChartCard>

              <Card className="flex flex-col gap-4 bg-gradient-to-br from-accent/[0.06] to-transparent p-6">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                    <Lightbulb className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Юу анхаарах вэ?</p>
                </div>
                <h3 className="text-xl font-black text-slate-900">Гурван гол ажиглалт</h3>
                <ul className="space-y-3 text-sm leading-6 text-slate-700">
                  <li className="flex gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">1</span>
                    <span>Өндөр эрсдэлд орсон хүүхдийн <strong className="font-bold text-slate-900">олонх нь хэн нэгэнд хэлээгүй</strong>. Дуугарах сувгийг хүртээмжтэй болгох нь чухал.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">2</span>
                    <span>Block, report, screenshot хийсэн нь эрсдэл буурахтай <strong className="font-bold text-slate-900">тодорхой холбоотой</strong>.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] font-bold text-accent">3</span>
                    <span>15–17 насны бүлэгт <strong className="font-bold text-slate-900">сэтгэлзүйн нөлөөлөл хамгийн өндөр</strong> — энэ насныханд тусгайлсан зөвлөгөө хэрэгтэй.</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="mt-6 border-slate-200/80 bg-slate-50 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-slate-300 bg-white text-slate-700">
                  <ClipboardList className="h-5 w-5" aria-hidden />
                </div>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-slate-700">Аргачлал</p>
                  <p>
                    Энэ самбарын хариултууд <strong className="font-bold text-slate-900">нэргүй</strong>. Бид хэрэглэгчийн нэр, и-мэйл, IP хадгалдаггүй. Хариулт бүр зөвхөн бүлэглэсэн (≥10 хариулагч) хэлбэрээр харагдана.
                  </p>
                  <p>
                    Одоогийн дүрс зургийг <strong className="font-bold text-slate-900">720 мөр жишээ дата</strong>-аар үзүүлж байна. Бодит хариултуудыг хүлээж авмагц энэ хэсэг нь /assessment-аас цугларсан мэдээлэлд автоматаар суурилна.
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </section>
  );
}
