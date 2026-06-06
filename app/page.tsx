import Link from "next/link";
import { ScrambleText } from "@/components/ScrambleText";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  HeartHandshake,
  Phone,
  Scale,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const navTiles = [
  { href: "/", label: "Нүүр" },
  { href: "/info", label: "Мэдээлэл" },
  { href: "/advice", label: "Зөвлөгөө" },
  { href: "/report", label: "Мэдээлэх" },
  { href: "/dashboard", label: "Дата" },
];

const features = [
  "Нэргүй 22 асуулттай судалгаа",
  "Насанд тохирсон асуултууд",
  "Бусадтай харьцуулсан үр дүн",
  "Олон улс + Монголын дата график",
];

const partners = [
  { icon: GraduationCap, label: "Сургууль" },
  { icon: UsersRound, label: "Эцэг эх" },
  { icon: HeartHandshake, label: "Нийгмийн ажилтан" },
  { icon: Stethoscope, label: "Сэтгэл зүйч" },
  { icon: Scale, label: "Хууль зүй" },
  { icon: Building2, label: "Төрийн байгууллага" },
  { icon: Phone, label: "Тусламжийн утас" },
  { icon: ShieldCheck, label: "Хамгаалал" },
];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen w-full overflow-hidden bg-white font-mono text-slate-900">
        {/* faint grid + warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(37,99,235,0.12),transparent_26rem),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[length:auto,92px_92px,92px_92px]" />
        {/* хэлбэрээ хувиргаж урсах gradient blob-ууд */}
        <div className="hero-blob absolute right-[-6%] top-[4%] h-[560px] w-[560px] opacity-80 blur-[4px]" />
        <div className="hero-blob absolute right-[18%] top-[34%] hidden h-[260px] w-[260px] opacity-50 blur-[8px] [animation-delay:-4s,-6s,-3s] lg:block" />

        <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto]">
          {/* ── header ── */}
          <header className="animate-fade-up flex flex-col gap-4 px-6 py-5 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-mono">
              <span className="grid h-7 w-7 place-items-center rounded-sm bg-accent text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.28em] text-slate-900">
                Цахим хамгаалал
              </span>
            </Link>

            <nav className="grid grid-cols-3 font-mono sm:flex sm:flex-wrap" aria-label="Нүүр хуудасны цэс">
              {navTiles.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative grid min-h-[2.6rem] min-w-0 place-items-center border border-slate-200 bg-white/70 px-2 text-[0.62rem] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:min-h-[3.25rem] sm:min-w-[5.5rem] sm:px-4 sm:text-[0.7rem]"
                >
                  <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-slate-400" />
                  {item.label}
                </Link>
              ))}
              <Link
                href="/assessment"
                className="relative grid min-h-[2.6rem] place-items-center bg-accent px-2 text-center text-[0.62rem] font-bold leading-tight text-white transition hover:bg-accent-bright sm:col-auto sm:min-h-[3.25rem] sm:min-w-[8.5rem] sm:px-5 sm:text-[0.7rem]"
              >
                <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-white" />
                Судалгаа өгөх
              </Link>
            </nav>
          </header>

          {/* ── center: heading + CTAs ── */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:ml-24">
            <p className="animate-fade-up mb-5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.24em] text-accent">
              Цахим дээрэлхэлтийн эсрэг хамтдаа
            </p>
            <h1 className="animate-fade-up font-sans max-w-3xl text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-slate-900 [animation-delay:0.1s] sm:text-4xl lg:text-5xl">
              Цахим орчны дээрэлхэлтээс
              <br />
              <span className="text-accent">урьдчилан сэргийлцгээе</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-xs leading-5 text-slate-600 [animation-delay:0.2s] sm:text-sm">
              Хүүхэд бүр цахим орчинд аюулгүй, хүндлэлтэй байх эрхтэй. Нэргүй судалгаа
              өгч, өөрийн нөхцөлийг бусадтай харьцуулан ойлгож, дараагийн алхмаа мэд.
            </p>

            <div className="animate-fade-up mt-9 flex flex-col gap-3 font-mono [animation-delay:0.3s] sm:flex-row">
              <Link
                href="/assessment"
                className="group grid h-12 grid-cols-[1fr_3rem] overflow-hidden bg-accent text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white"
              >
                <span className="flex items-center px-5">Судалгаа өгөх</span>
                <span className="grid place-items-center bg-slate-900 text-white transition group-hover:bg-black">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/dashboard"
                className="group grid h-12 grid-cols-[1fr_3rem] overflow-hidden border border-slate-300 bg-white text-[0.62rem] font-bold uppercase tracking-[0.12em] text-slate-900"
              >
                <span className="flex items-center px-5">Дата харах</span>
                <span className="grid place-items-center bg-accent text-white transition group-hover:bg-accent-bright">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* ── bottom band ── */}
          <div className="grid border-t border-slate-200 bg-white/60 font-mono backdrop-blur-sm lg:grid-cols-2">
            <div className="animate-fade-up flex flex-col justify-between gap-8 border-b border-slate-200 p-6 [animation-delay:0.4s] sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
                  <ScrambleText text="Танилцуулга" />
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                  <ScrambleText
                    delay={150}
                    text="Хүүхэд, эцэг эх, багш нарт зориулсан энэ систем нь цахим дээрэлхэлтийн эрсдэлийг айдас төрүүлэхгүйгээр ойлгуулж, тусламж авах замыг тодорхой болгоно."
                  />
                </p>
              </div>
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
                  <ScrambleText text="Идэвхтэй боломжууд:" delay={300} />
                </p>
                <ul className="mt-3 grid gap-1.5 text-sm text-slate-700">
                  {features.map((item, i) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <ScrambleText text={item} delay={420 + i * 140} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="animate-fade-up flex flex-col justify-between gap-8 p-6 [animation-delay:0.5s] sm:p-8">
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
                  Итгэлтэй хамтрагчид
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                  Хүүхэд хамгааллын салбарт итгэл хүлээсэн байгууллага,
                  мэргэжилтнүүдтэй хамтран ажиллаж, тусламжийг хүүхэд бүрд
                  хүргэхээр зорьж байна.
                </p>
              </div>
              <div className="grid grid-cols-4 border-t border-l border-slate-200 sm:grid-cols-8">
                {partners.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href="/support"
                      title={item.label}
                      className="grid aspect-square place-items-center border-b border-r border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 hover:text-accent"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
