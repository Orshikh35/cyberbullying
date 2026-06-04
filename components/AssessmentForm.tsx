"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, LockKeyhole, Send } from "lucide-react";
import { ageBands, getQuestionsForBand } from "@/data/questions";
import { analyzeAnswers, type AnalysisResult, type AssessmentValues } from "@/data/scoring";
import type { AgeBand } from "@/types/survey";
import { Button, Card, Progress } from "@/components/ui";
import { RiskResultCard } from "@/components/RiskResultCard";
import { Reveal } from "@/components/Reveal";

const schema = z.record(z.string(), z.union([z.string(), z.array(z.string())]).optional());
const perStep = 5;

export function AssessmentForm() {
  const [band, setBand] = useState<AgeBand | null>(null);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const form = useForm<AssessmentValues>({ resolver: zodResolver(schema), defaultValues: {} });
  const watchedValues = useWatch({ control: form.control });

  // Сонгосон насны бандад тохирсон асуултууд.
  const questions = useMemo(() => (band ? getQuestionsForBand(band) : []), [band]);
  const totalSteps = Math.max(1, Math.ceil(questions.length / perStep));
  const visibleQuestions = questions.slice(step * perStep, step * perStep + perStep);
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const requiredMissing = visibleQuestions.some((question) => {
    if (!question.required) return false;
    const value = watchedValues?.[question.id];
    return Array.isArray(value) ? value.length === 0 : !value;
  });

  function submit(values: AssessmentValues) {
    if (!band) return;
    setResult(analyzeAnswers(values, band));
  }

  function chooseBand(next: AgeBand) {
    setBand(next);
    setStep(0);
    setResult(null);
    form.reset({});
  }

  return (
    <section id="assessment" className="scroll-mt-24 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 max-w-3xl">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Нууцлалтай судалгаа</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">Өөрийн нөхцөл байдлыг тайван шалгаарай</h2>
          <p className="mt-3 text-slate-600">Нэр, утас, гэрийн хаяг авахгүй. Эхлээд бүлгээ сонгоход тохирсон асуултууд гарч ирнэ.</p>
        </div>

        {!band ? (
          // 1-р алхам: насны бүлэг сонгох
          <Card className="p-6 sm:p-8">
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-500">Эхлэл</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Та аль бүлэгт хамаарах вэ?</h3>
            <p className="mt-1 text-sm text-slate-600">Сонгосон бүлэгт тохирсон, ойлгомжтой асуултууд бэлдсэн.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ageBands.map((item, i) => (
                <Reveal key={item.id} delay={i * 90} variant="up">
                <button
                  type="button"
                  onClick={() => chooseBand(item.id)}
                  className="group h-full w-full rounded-lg border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-md"
                >
                  <p className="font-mono text-2xl font-black text-accent">{item.label}</p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{item.grade}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-500 transition group-hover:text-accent">
                    Сонгох <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
                </Reveal>
              ))}
            </div>
          </Card>
        ) : result ? (
          <RiskResultCard result={result} onRestart={() => chooseBand(band)} />
        ) : (
          <Card className="p-5 sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-700">
                <LockKeyhole className="h-4 w-4 text-accent" />
                Алхам {step + 1}/{totalSteps}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">{progress}% бөглөгдсөн</span>
                <button
                  type="button"
                  onClick={() => setBand(null)}
                  className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-500 underline-offset-4 hover:text-accent hover:underline"
                >
                  Бүлэг солих
                </button>
              </div>
            </div>
            <Progress value={progress} />

            <form className="mt-7 space-y-7" onSubmit={form.handleSubmit(submit)}>
              {visibleQuestions.map((question) => (
                <fieldset key={question.id} className="space-y-3">
                  <legend className="text-base font-bold text-slate-900">{question.label}</legend>
                  {question.helper ? <p className="text-sm text-slate-500">{question.helper}</p> : null}

                  {question.type === "select" ? (
                    <select className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-accent" {...form.register(question.id)}>
                      <option value="">Сонгох</option>
                      {question.options?.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  ) : null}

                  {question.type === "radio" ? (
                    <div className="grid gap-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700 transition has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-slate-900">
                          <input type="radio" value={option} className="shrink-0 accent-[#2563eb]" {...form.register(question.id)} />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : null}

                  {question.type === "checkbox" ? (
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {question.options?.map((option) => (
                        <label key={option} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 transition has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-slate-900">
                          <input type="checkbox" value={option} className="accent-[#2563eb]" {...form.register(question.id)} />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : null}

                  {question.type === "textarea" ? (
                    <textarea className="min-h-28 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-accent" placeholder="Хүсвэл энд бичээрэй" {...form.register(question.id)} />
                  ) : null}
                </fieldset>
              ))}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
                <Button type="button" variant="secondary" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>
                  <ArrowLeft className="h-4 w-4" /> Буцах
                </Button>
                {step < totalSteps - 1 ? (
                  <Button type="button" disabled={requiredMissing} onClick={() => setStep((current) => current + 1)}>
                    Дараах <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    Үр дүн харах <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}
