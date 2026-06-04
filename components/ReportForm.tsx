"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AlertTriangle, CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

const REPORT_EMAIL = "batorshikh35@gmail.com";
// Web3Forms access key (batorshikh35@gmail.com-д холбоотой). .env.local-д тохируулна.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Group = {
  id: string;
  q: string;
  type: "radio" | "checkbox";
  options: string[];
  note?: string;
};

const groups: Group[] = [
  { id: "reporter", q: "1. Та хэн бэ?", type: "radio", options: ["Би өөрөө", "Найз нь", "Эцэг эх / Асран хамгаалагч", "Багш", "Бусад"] },
  { id: "victim", q: "2. Энэ асуудал хэнд тохиолдсон бэ?", type: "radio", options: ["Надад", "Миний хүүхдэд", "Миний сурагчид", "Найзад минь", "Бусад"] },
  { id: "where", q: "3. Энэ хаана болсон бэ?", type: "checkbox", options: ["Facebook", "Instagram", "TikTok", "Messenger", "Telegram", "Discord", "Онлайн тоглоом", "Бусад"], note: "Олон сонголт" },
  { id: "what", q: "4. Юу болсон бэ?", type: "checkbox", options: ["Намайг доромжилсон", "Айлгаж сүрдүүлсэн", "Худал мэдээлэл тараасан", "Зураг/видео зөвшөөрөлгүй нийтэлсэн", "Хуурамч хаяг нээсэн", "Онлайн гадуурхсан", "Өөр зүйл болсон"], note: "Олон сонголт" },
  { id: "when", q: "5. Энэ хэдийд болсон бэ?", type: "radio", options: ["Өнөөдөр", "Сүүлийн 7 хоногт", "Сүүлийн 1 сард", "Илүү өмнө"] },
  { id: "evidence", q: "6. Танд нотлох баримт байна уу?", type: "checkbox", options: ["Screenshot", "Фото зураг", "Видео", "Линк", "Байхгүй"], note: "Олон сонголт" },
  { id: "ongoing", q: "7. Одоо ч үргэлжилж байна уу?", type: "radio", options: ["Тийм", "Үгүй", "Мэдэхгүй"] },
  { id: "danger", q: "8. Танд эсвэл тухайн хүнд аюултай санагдаж байна уу?", type: "radio", options: ["Тийм", "Үгүй"] },
];

type FormValues = Record<string, string | string[] | boolean | undefined>;

function val(x: string | string[] | boolean | undefined) {
  if (Array.isArray(x)) return x.length ? x.join(", ") : "—";
  if (typeof x === "boolean") return x ? "Тийм" : "Үгүй";
  return x ? String(x) : "—";
}

function buildBody(v: FormValues) {
  return [
    "ЦАХИМ ДАРАМТЫН МЭДЭЭЛЭЛ",
    "========================",
    "",
    `1. Та хэн бэ?: ${val(v.reporter)}`,
    `2. Хэнд тохиолдсон бэ?: ${val(v.victim)}`,
    `3. Хаана болсон бэ?: ${val(v.where)}`,
    `4. Юу болсон бэ?: ${val(v.what)}`,
    `5. Хэдийд болсон бэ?: ${val(v.when)}`,
    `6. Нотлох баримт: ${val(v.evidence)}`,
    `7. Одоо ч үргэлжилж байна уу?: ${val(v.ongoing)}`,
    `8. Аюултай санагдаж байна уу?: ${val(v.danger)}`,
    "",
    "9. Холбоо барих мэдээлэл:",
    `   Нэр: ${val(v.name)}`,
    `   Утас: ${val(v.phone)}`,
    `   И-мэйл: ${val(v.email)}`,
    `   Нэрээ нууцлах хүсэлтэй: ${v.anonymous ? "Тийм" : "Үгүй"}`,
    "",
    "10. Нэмэлт тайлбар:",
    (v.note as string) || "—",
  ].join("\n");
}

function mailtoUrl(v: FormValues) {
  return `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent("Цахим дарамтын мэдээлэл")}&body=${encodeURIComponent(buildBody(v))}`;
}

const adviceSteps = [
  { icon: ShieldCheck, text: "Нотолгоогоо (screenshot, линк) аюулгүй хадгалаарай." },
  { icon: ShieldCheck, text: "Тухайн хэрэглэгчийг block хийж, платформд report илгээгээрэй." },
  { icon: ShieldCheck, text: "Итгэлтэй насанд хүрсэн хүн, багш, эцэг эхдээ хэлээрэй." },
  { icon: AlertTriangle, text: "Яаралтай аюултай бол цагдаа 102, хүүхдийн тусламжийн утас 108 руу залгаарай." },
];

export function ReportForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, control, getValues } = useForm<FormValues>({ defaultValues: {} });
  const danger = useWatch({ control, name: "danger" });
  const reporter = useWatch({ control, name: "reporter" });
  const victim = useWatch({ control, name: "victim" });
  const what = useWatch({ control, name: "what" });

  const canSubmit = !!reporter && !!victim && Array.isArray(what) && what.length > 0;

  async function submit() {
    setStatus("sending");
    const values = getValues();
    try {
      if (!ACCESS_KEY) throw new Error("no-key");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Цахим дарамтын мэдээлэл",
          from_name: "Цахим хамгаалал — Мэдээлэх",
          email: (values.email as string) || "no-reply@cyber-protect.mn",
          message: buildBody(values),
        }),
      });
      const data = await res.json();
      if (data.success) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  // ── Амжилттай: илгээгдлээ + зөвлөгөө (мэйл апп нээхгүй) ──
  if (status === "success") {
    return (
      <section className="px-5 pb-24 pt-2 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card className="p-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
            <h2 className="mt-4 text-2xl font-black text-slate-900">Мэдээлэл амжилттай илгээгдлээ</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Баярлалаа — чи зөв алхам хийлээ. Мэдээллийг холбогдох баг хүлээн авлаа. Дараах зөвлөгөөг анхаараарай.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">Дараагийн алхам</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Өөрийгөө хамгаалах зөвлөгөө</h3>
            <ul className="mt-5 grid gap-3">
              {adviceSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.text} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${step.icon === AlertTriangle ? "text-rose-500" : "text-accent"}`} />
                    {step.text}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/advice" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-accent px-5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-accent-bright">
                Зөвлөгөө дэлгэрэнгүй
              </Link>
              <Link href="/support" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.08em] text-slate-900 transition hover:bg-slate-50">
                Тусламж авах
              </Link>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 pb-24 pt-2 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Card className="p-5 sm:p-8">
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            {groups.map((group) => (
              <fieldset key={group.id} className="space-y-3">
                <legend className="text-base font-bold text-slate-900">{group.q}</legend>
                {group.note ? <p className="text-sm text-slate-500">{group.note}</p> : null}
                <div className="grid gap-2 sm:grid-cols-2">
                  {group.options.map((option) => (
                    <label
                      key={option}
                      className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 transition has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-slate-900"
                    >
                      <input type={group.type} value={option} className="accent-[#2563eb]" {...register(group.id)} />
                      {option}
                    </label>
                  ))}
                </div>

                {group.id === "danger" && danger === "Тийм" ? (
                  <div className="flex gap-3 rounded-lg border border-rose-300 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
                    <span>Яаралтай тусламж хэрэгтэй бол холбогдох байгууллага (цагдаа 102, хүүхдийн тусламжийн утас 108)-д нэн даруй хандана уу.</span>
                  </div>
                ) : null}
              </fieldset>
            ))}

            <fieldset className="space-y-3">
              <legend className="text-base font-bold text-slate-900">9. Бид тантай холбогдох шаардлагатай бол мэдээллээ үлдээнэ үү.</legend>
              <p className="text-sm text-slate-500">Заавал биш.</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <input placeholder="Нэр" className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-accent" {...register("name")} />
                <input placeholder="Утас" className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-accent" {...register("phone")} />
                <input placeholder="И-мэйл" className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-accent" {...register("email")} />
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 accent-[#2563eb]" {...register("anonymous")} />
                Би нэрээ нууцлахыг хүсэж байна.
              </label>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-base font-bold text-slate-900">10. Нэмэлт тайлбар</legend>
              <textarea
                placeholder="Болсон явдлыг өөрийн үгээр тайлбарлана уу."
                className="min-h-32 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-accent"
                {...register("note")}
              />
            </fieldset>

            {status === "error" ? (
              <div className="flex flex-col gap-3 rounded-lg border border-rose-300 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
                <span className="flex items-center gap-2 font-bold"><AlertTriangle className="h-4 w-4" /> Илгээхэд алдаа гарлаа.</span>
                <span>Та дараах товчоор имэйлээр шууд илгээж болно:</span>
                <a href={mailtoUrl(getValues())} className="inline-flex w-fit items-center gap-2 rounded-sm bg-rose-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-white hover:bg-rose-700">
                  <Send className="h-3.5 w-3.5" /> Имэйлээр илгээх
                </a>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6">
              <Button type="submit" disabled={!canSubmit || status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Илгээж байна…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Мэдээлэл илгээх
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-slate-400">
                {canSubmit ? "Илгээх дээр дарвал мэдээлэл шууд илгээгдэнэ." : "1, 2, 4-р асуултад хариулсны дараа илгээх боломжтой."}
              </p>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
