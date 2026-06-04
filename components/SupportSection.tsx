import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  FileText,
  Globe,
  MessageCircleHeart,
  PhoneCall,
  School,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

const supportItems = [
  { icon: MessageCircleHeart, title: "Итгэлтэй хүнтэй ярилц", text: "Эцэг эх, ах эгч, багш, найзын эцэг эх гээд чамайг тайван сонсох хүн сонго." },
  { icon: School, title: "Сургуулийн багт мэдэгд", text: "Анги удирдсан багш, нийгмийн ажилтан, сургуулийн сэтгэлзүйчид нотолгоотойгоо ханд." },
  { icon: PhoneCall, title: "Тусламжийн байгууллага", text: "Аюултай, заналхийлсэн, хувийн мэдээлэл тараасан бол доорх тусламжийн утсанд ханд." },
];

// Монгол Улсын яаралтай болон хүүхэд хамгааллын тусгай дугаарууд.
const helplines = [
  {
    icon: ShieldCheck,
    name: "Хүүхдийн тусламжийн утас",
    number: "108",
    note: "24 цаг • үнэгүй • нэргүй",
    accent: true,
  },
  {
    icon: PhoneCall,
    name: "Цагдаагийн яаралтай дуудлага",
    number: "102",
    note: "Заналхийлэл, бодит аюул занал",
  },
  {
    icon: Stethoscope,
    name: "Эмнэлгийн яаралтай тусламж",
    number: "103",
    note: "Эрүүл мэндийн яаралтай байдал",
  },
];

const infoLinks = [
  { icon: FileText, label: "Тохиолдлоо мэдээлэх", desc: "Нэргүйгээр мэдээлэл өгөх", href: "/report", external: false },
  { icon: MessageCircleHeart, label: "Зөвлөгөө унших", desc: "Алхам алхмаар юу хийх вэ", href: "/advice", external: false },
  { icon: Globe, label: "ekids.mn", desc: "Цахим аюулгүй байдлын сайт", href: "https://ekids.mn", external: true },
];

export function SupportSection() {
  return (
    <section id="support" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ── яаралтай тусламж + алхмууд ── */}
        <Reveal variant="up">
          <Card className="overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-gradient-to-br from-accent/25 to-accent/[0.05] p-6 sm:p-8">
                <div className="grid h-12 w-12 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                  <AlertTriangle className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="mt-5 text-2xl font-black text-slate-900">Яаралтай аюул мэдрэгдэж байвал</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Заналхийлэл, хувийн зураг/мэдээлэл тараах, уулзахыг шаардах, мөнгө нэхэх зэрэг нөхцөлд ганцаараа шийдэх гэж бүү оролдоорой.
                </p>
              </div>
              <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-3">
                {supportItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <div className="grid h-11 w-11 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </Reveal>

        {/* ── тусламжийн шууд утаснууд ── */}
        <Reveal variant="up" delay={80}>
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Шууд холбогдох</p>
            <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">Тусламжийн утаснууд</h2>
            <p className="mt-1 text-sm text-slate-600">Доорх дугаар дээр дарж шууд залгаарай. Хүссэн үедээ, нэрээ хэлэлгүй ярьж болно.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {helplines.map((line) => {
                const Icon = line.icon;
                return (
                  <a
                    key={line.number}
                    href={`tel:${line.number}`}
                    className={`group flex flex-col rounded-lg border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${
                      line.accent
                        ? "border-accent/40 bg-accent/[0.06] hover:border-accent"
                        : "border-slate-200 bg-slate-50 hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <PhoneCall className="h-4 w-4 text-slate-400 transition group-hover:text-accent" aria-hidden />
                    </div>
                    <p className="mt-4 font-display text-3xl font-black tracking-tight text-slate-900">{line.number}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{line.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{line.note}</p>
                  </a>
                );
              })}
            </div>
          </Card>
        </Reveal>

        {/* ── мэдээллийн товчнууд ── */}
        <Reveal variant="up" delay={160}>
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Дараагийн алхам</p>
            <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">Нэмэлт мэдээлэл, тусламж</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {infoLinks.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    <div className="grid h-10 w-10 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900">{item.label}</h3>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-accent" aria-hidden />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.desc}</p>
                  </>
                );
                const className =
                  "group flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md";
                return item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} className={className}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
