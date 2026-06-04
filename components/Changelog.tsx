import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export type ChangelogEntry = {
  tag: string;
  sideTitle: string;
  title: string;
  intro: string;
  bullets?: string[];
  /** Хэрэв заасан бол гарчиг линк болж "Унших →" CTA гарна. */
  href?: string;
  /** Жижиг мета (ж: уншиж дуусгах хугацаа). */
  meta?: string;
};

/**
 * Changelog/timeline маягийн layout: зүүн талд tag + хажуугийн гарчиг,
 * баруун талд үндсэн гарчиг + тайлбар + (заавал биш) цэгтэй жагсаалт / линк.
 */
export function Changelog({ entries, eyebrow, heading }: { entries: ChangelogEntry[]; eyebrow?: string; heading?: string }) {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="relative mx-auto max-w-7xl">
        {eyebrow || heading ? (
          <Reveal className="mb-2 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-16">
            <div />
            <div className="lg:pl-10">
              {eyebrow ? <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p> : null}
              {heading ? <h2 className="mt-2 text-xl font-black tracking-[-0.02em] text-slate-900 sm:text-2xl">{heading}</h2> : null}
            </div>
          </Reveal>
        ) : null}
        {/* Босоо timeline шугам (lg) */}
        <div className="absolute bottom-4 left-[15.5rem] top-4 hidden w-px bg-slate-200 lg:block" />

        {entries.map((entry, index) => {
          return (
            <Reveal
              key={entry.title}
              delay={index * 90}
              className="grid gap-5 border-t border-slate-200/80 py-10 first:border-t-0 lg:grid-cols-[15rem_1fr] lg:gap-16"
            >
              {/* Зүүн багана */}
              <div className="self-start lg:sticky lg:top-24">
                <span className="inline-flex rounded-md bg-accent px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white">
                  {entry.tag}
                </span>
                <h4 className="mt-3 text-lg font-black leading-snug tracking-[-0.01em] text-slate-900">{entry.sideTitle}</h4>
              </div>

              {/* Баруун багана */}
              <div className="group relative lg:pl-10">
                <span className="absolute -left-[2.55rem] top-2 hidden h-3 w-3 rounded-full border-2 border-white bg-accent ring-2 ring-accent/20 lg:block" />
                {entry.href ? (
                  <Link href={entry.href} className="block text-2xl font-black tracking-[-0.02em] text-slate-900 transition hover:text-accent sm:text-3xl">
                    {entry.title}
                  </Link>
                ) : (
                  <h3 className="text-2xl font-black tracking-[-0.02em] text-slate-900 sm:text-3xl">{entry.title}</h3>
                )}
                <p className="mt-3 max-w-2xl leading-7 text-slate-600">{entry.intro}</p>

                {entry.bullets ? (
                  <ul className="mt-5 grid gap-2.5">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-slate-700">
                        <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="leading-7">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {entry.href ? (
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-slate-500">
                    {entry.meta ? (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {entry.meta}
                      </span>
                    ) : null}
                    <Link href={entry.href} className="inline-flex items-center gap-1.5 font-bold uppercase tracking-widest text-accent">
                      Унших <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
