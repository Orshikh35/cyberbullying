"use client";

import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Megaphone,
  MessageCircleWarning,
  RotateCcw,
  Share2,
  ShieldAlert,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { getRiskAdvice, type AnalysisResult } from "@/data/scoring";
import type { RiskLevel } from "@/types/survey";
import type { BullyingType } from "@/data/bullyingTypes";

const tone: Record<RiskLevel, "green" | "amber" | "rose"> = {
  Бага: "green",
  Дунд: "amber",
  Өндөр: "rose",
};

const typeIcon: Record<BullyingType["icon"], typeof ShieldAlert> = {
  insult: MessageCircleWarning,
  share: Share2,
  exclude: UserX,
  rumor: Megaphone,
  account: KeyRound,
  pressure: ShieldAlert,
};

const standingText: Record<AnalysisResult["standing"], string> = {
  above: "Чиний түвшин үе тэнгийнхэнтэй харьцуулахад өндөр байна — дэмжлэг авах нь чухал.",
  around: "Чиний түвшин үе тэнгийнхэнтэйгээ ойролцоо байна.",
  below: "Чиний түвшин үе тэнгийнхнийхээс доогуур байна — энэ сайн дохио.",
};

const bandLabel: Record<AnalysisResult["band"], string> = {
  "9-12": "9–12 насны",
  "13-17": "13–17 насны",
  parent: "эцэг эхийн",
};

export function RiskResultCard({ result, onRestart }: { result: AnalysisResult; onRestart?: () => void }) {
  const advice = getRiskAdvice(result.level, result.band);
  const { comparison } = result;
  const isParent = result.kind === "parent";

  return (
    <div className="space-y-6">
      {/* Үр дүн ба түвшин */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge tone={tone[result.level]}>Эрсдэлийн түвшин: {result.level}</Badge>
            <h3 className="mt-4 text-2xl font-black text-slate-900">{advice.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Энэ нь онош биш, зөвхөн анхан шатны үнэлгээ. Эрсдэлийн индекс: {result.riskIndex}/100.
            </p>
          </div>
          <ShieldCheck className="h-12 w-12 shrink-0 text-accent" aria-hidden />
        </div>
        <p className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">{advice.text}</p>
      </Card>

      {/* Харьцуулалт / нэгтгэл */}
      <Card className="p-6">
        {comparison ? (
          <>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">Чиний түвшин vs бусад</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Ижил насны хүүхдүүдтэй харьцуулбал</h3>
            <p className="mt-1 text-sm text-slate-600">
              {bandLabel[result.band]} {comparison.peerCount} хүүхдийн нэргүй хариулттай харьцуулав. {standingText[result.standing]}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Цахим дээрэлхэлтэд өртсөн (үе тэнгийнхэн)", value: comparison.peerExperiencedPct, mine: result.experienced ? "Чи: Тийм" : "Чи: Үгүй" },
                { label: "Өндөр эрсдэлтэй (үе тэнгийнхэн)", value: comparison.peerHighRiskPct, mine: `Чи: ${result.level}` },
                { label: "Тусламж хүссэн (үе тэнгийнхэн)", value: comparison.peerNeedsHelpPct, mine: `Нөлөө: ${result.yourImpact}/5` },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-mono text-2xl font-black text-slate-900">{item.value}%</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{item.label}</p>
                  <p className="mt-2 inline-flex rounded-sm border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-accent">{item.mine}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">Таны үнэлгээ</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Хүүхдээ хамгаалах бэлэн байдал</h3>
            <p className="mt-1 text-sm text-slate-600">
              Таны хариултаас харахад дараах түвшинд байна. Индекс өндөр байх тусам анхаарал, дэмжлэг шаардлагатай.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-mono text-2xl font-black text-slate-900">{result.riskIndex}/100</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Анхаарал шаардсан индекс</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-mono text-2xl font-black text-slate-900">{result.experienced ? "Тийм" : "Үгүй / мэдэгдээгүй"}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Хүүхэд тань цахим дээрэлхэлтэд өртсөн эсэх</p>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-slate-900">Эрсдэлийн индекс</span>
            <span className="font-mono font-bold text-slate-900">{result.riskIndex}/100</span>
          </div>
          <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-accent" style={{ width: `${result.riskIndex}%` }} />
          </div>
        </div>
      </Card>

      {/* Өртсөн дээрэлхэлтийн төрөл / тайлбар */}
      <Card className="p-6">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">Бүүллидэлтийн төрөл</p>
        <h3 className="mt-2 text-xl font-black text-slate-900">
          {result.reportedTypes.length > 0 ? "Чиний хариултаас илэрсэн төрлүүд" : "Цахим дээрэлхэлт ийм хэлбэрээр илэрдэг"}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {result.reportedTypes.length > 0
            ? "Доорх төрлүүд чиний хариултад илэрсэн. Эдгээр нь бүгд тусламж авах боломжтой нөхцөл."
            : isParent
              ? "Дараах хэлбэрүүдийг таньж мэдэх нь хүүхдээ хамгаалахад чухал."
              : "Чиний хариултад тод илэрсэн төрөл бага байна. Гэхдээ дараах хэлбэрүүдийг таньж байх нь хэрэгтэй."}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {result.reportedTypes.map((type) => {
            const Icon = typeIcon[type.icon];
            return (
              <div key={type.questionId} className="flex gap-3 rounded-lg border border-accent/30 bg-accent/6 p-4">
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{type.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{type.description}</p>
                </div>
              </div>
            );
          })}
          {result.reportedTypes.length === 0 ? (
            <p className="text-sm text-slate-600 sm:col-span-2">
              Доромжлох, хувийн мэдээлэл тараах, гадуурхах, нэр хүнд гутаах, аккаунтын халдлага зэрэг хэлбэрүүд байдаг.{" "}
              <a href="/info" className="font-bold text-accent hover:underline">Дэлгэрэнгүй мэдээлэл →</a>
            </p>
          ) : null}
        </div>
      </Card>

      {/* Аюулгүй алхмууд */}
      <Card className="p-6">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent">Дараагийн алхам</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Нотолгоо хадгалах", "Block болон report хийх", "Итгэлтэй насанд хүрсэн хүнд хэлэх"].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
              {index === 2 && result.level === "Өндөр" ? <AlertTriangle className="h-4 w-4 text-rose-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              {item}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={() => (window.location.href = "/support")}>
            Тусламж авах
          </Button>
          {onRestart ? (
            <Button type="button" variant="secondary" onClick={onRestart}>
              <RotateCcw className="h-4 w-4" /> Дахин бөглөх
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
