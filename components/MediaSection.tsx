import Image from "next/image";
import { ExternalLink, Film, Newspaper } from "lucide-react";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

type Infographic = {
  src: string;
  alt: string;
  title: string;
  source: string;
  sourceHref?: string;
};

type Reel = {
  id: string;
  title: string;
  source: string;
};

const infographics: Infographic[] = [
  {
    src: "/info/stat-1.jpg",
    alt: "Цахим орчинд хүүхдүүдийн 37.3 хувь нь танихгүй хүнээс чат, мессеж хүлээн авч байжээ.",
    title: "37.3% хүүхэд танихгүй хүнээс чат, мессеж хүлээн авдаг",
    source: "time.mn",
    sourceHref: "https://time.mn",
  },
  {
    src: "/info/stat-2.jpg",
    alt: "Цахим хэрэглээтэй холбоотойгоор 15-29 насныхны амиа хорлолт нь нас баралтын 3 дахь гол шалтгаан хэвээр байна.",
    title: "15–29 насныхны амиа хорлолт — нас баралтын 3 дахь шалтгаан",
    source: "Танин Мэдэхүй",
  },
];

const reels: Reel[] = [
  { id: "1487231732375799", title: "Цахим дарамтын тойм • 1", source: "Facebook Reels" },
  { id: "2051760259094259", title: "Цахим дарамтын тойм • 2", source: "Facebook Reels" },
  { id: "3550681338403914", title: "Цахим дарамтын тойм • 3", source: "Facebook Reels" },
  { id: "1008637611630835", title: "Цахим дарамтын тойм • 4", source: "Facebook Reels" },
];

function reelEmbedUrl(id: string) {
  const href = encodeURIComponent(`https://www.facebook.com/reel/${id}`);
  return `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false`;
}

function reelOpenUrl(id: string) {
  return `https://www.facebook.com/reel/${id}`;
}

export function MediaSection() {
  return (
    <section className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ── Инфографик ── */}
        <Reveal variant="up">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                  <Newspaper className="h-4 w-4" aria-hidden />
                </div>
                <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Инфографик</p>
              </div>
              <h2 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">Монголын цахим орчны тоо баримт</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                Хэвлэл мэдээллээс түүвэрлэсэн сүүлийн үеийн судалгаа, мэдээллийн тойм.
              </p>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              {infographics.map((item) => (
                <figure
                  key={item.src}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                >
                  <div className="relative aspect-square bg-slate-900">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <figcaption className="space-y-2 border-t border-slate-200 bg-white p-4">
                    <p className="text-sm font-bold leading-6 text-slate-900">{item.title}</p>
                    <div className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                      Эх сурвалж:{" "}
                      {item.sourceHref ? (
                        <a
                          href={item.sourceHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-600 transition hover:text-accent"
                        >
                          {item.source}
                          <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                      ) : (
                        <span>{item.source}</span>
                      )}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* ── Reels ── */}
        <Reveal variant="up" delay={80}>
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                  <Film className="h-4 w-4" aria-hidden />
                </div>
                <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Богино бичлэг</p>
              </div>
              <h2 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">Цахим дарамтын тухай Reels</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                Facebook-ээс түүвэрлэсэн богино бичлэг. Дарж тоглуулна уу — нэг бичлэг ихэвчлэн 1 минутаас бага үргэлжилнэ.
              </p>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
              {reels.map((reel) => (
                <figure
                  key={reel.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-slate-900 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                >
                  <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
                    <iframe
                      src={reelEmbedUrl(reel.id)}
                      title={reel.title}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="space-y-2 border-t border-slate-200 bg-white p-4">
                    <p className="text-sm font-bold text-slate-900">{reel.title}</p>
                    <a
                      href={reelOpenUrl(reel.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-500 transition hover:text-accent"
                    >
                      {reel.source}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
