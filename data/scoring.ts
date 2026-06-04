import { questionsByBand } from "@/data/questions";
import { bullyingTypes } from "@/data/bullyingTypes";
import { mockResponses } from "@/data/mockResponses";
import type { AgeBand, Question, ResponseAnswer, RiskLevel } from "@/types/survey";

export type AssessmentValues = Record<string, ResponseAnswer>;

/** Нэг асуултад сонгосон утга(ууд)-ыг массив болгож авна. */
function selected(values: AssessmentValues, id: string): string[] {
  const answer = values[id];
  if (Array.isArray(answer)) return answer;
  return answer ? [answer] : [];
}

/** Эхний (эсвэл цорын ганц) сонголтыг авах. */
function single(values: AssessmentValues, id: string): string {
  return selected(values, id)[0] ?? "";
}

/** Нэг асуултын авсан оноо (checkbox бол сонгосон бүх сонголтын нийлбэр). */
function questionScore(question: Question, values: AssessmentValues): number {
  if (!question.scores) return 0;
  return selected(values, question.id).reduce((sum, option) => sum + (question.scores![option] ?? 0), 0);
}

export function calculateRiskScore(values: AssessmentValues, band: AgeBand): number {
  return questionsByBand[band].reduce((sum, question) => sum + questionScore(question, values), 0);
}

/** Тухайн бүлгийн оноотой асуултуудын дээд боломжит нийлбэр. */
export function maxRiskScore(band: AgeBand): number {
  return questionsByBand[band].reduce((sum, question) => {
    if (!question.scores) return sum;
    const values = Object.values(question.scores);
    return sum + (values.length ? Math.max(...values) : 0);
  }, 0);
}

export function getRiskLevel(score: number, band: AgeBand): RiskLevel {
  const max = maxRiskScore(band) || 1;
  const pct = (score / max) * 100;
  if (pct <= 22) return "Бага";
  if (pct <= 48) return "Дунд";
  return "Өндөр";
}

export function getRiskAdvice(level: RiskLevel, band: AgeBand) {
  if (band === "parent") {
    if (level === "Өндөр") {
      return {
        title: "Хүүхэд тань яаралтай дэмжлэг шаардаж болзошгүй.",
        text: "Хүүхэдтэйгээ тайван, буруутгалгүйгээр ярилцаж, мессеж, зургийн нотолгоог хадгална. Сургуулийн нийгмийн ажилтан, сэтгэл зүйч эсвэл хүүхдийн тусламжийн 108 утсанд өнөөдөр хандана.",
      };
    }
    if (level === "Дунд") {
      return {
        title: "Урьдчилан сэргийлэх алхмуудаа бэхжүүлэх нь зүйтэй.",
        text: "Цахим хэрэглээний дүрэм тогтоож, хүүхэдтэйгээ эрсдэлийн талаар тогтмол ярилцаарай. Block/report болон нотолгоо хадгалах аргыг хамтдаа сурна.",
      };
    }
    return {
      title: "Та хүүхдээ хамгаалах сайн суурьтай байна.",
      text: "Одоогийн харилцаа, хяналтаа хадгалж, шинэ платформ, эрсдэлийн талаар хүүхэдтэйгээ ярилцсаар байгаарай.",
    };
  }

  if (level === "Өндөр") {
    return {
      title: "Одоо ганцаараа шийдэх гэж бүү оролдоорой.",
      text: "Итгэлтэй насанд хүрсэн хүн, эцэг эх, багш, сургуулийн нийгмийн ажилтанд өнөөдөр хэлээрэй. Аюул занал шууд мэдрэгдэж байвал хүүхдийн тусламжийн 108 утас эсвэл яаралтай тусламжид хандана.",
    };
  }
  if (level === "Дунд") {
    return {
      title: "Дэмжлэг авах нь зөв алхам.",
      text: "Нотолгоогоо хадгалж, тухайн хэрэглэгчийг block/report хийж, итгэдэг хүнтэйгээ тайван ярилцаарай.",
    };
  }
  return {
    title: "Одоогоор эрсдэл бага харагдаж байна.",
    text: "Гэсэн ч эвгүй, айдас төрүүлсэн зүйл давтагдвал screenshot хадгалж, итгэлтэй насанд хүрсэн хүнд хэлээрэй.",
  };
}

const bandRange: Partial<Record<AgeBand, [number, number]>> = {
  "9-12": [9, 12],
  "13-17": [13, 17],
};

/** Тухайн бүлэгт цахим дээрэлхэлтэд өртсөн эсэхийг хариултаас тодорхойлно. */
function detectExperienced(values: AssessmentValues, band: AgeBand): boolean {
  if (band === "9-12") {
    const hl = single(values, "harshLanguage");
    const fh = single(values, "friendsHurt");
    const nf = single(values, "negFeelings");
    return (
      hl === "Байнга таардаг" ||
      hl === "Заримдаа таардаг" ||
      fh.startsWith("Тийм") ||
      nf === "Маш их айж, түгшсэн" ||
      nf === "Уур хүрсэн, гунигласан"
    );
  }
  if (band === "13-17") {
    const ex = single(values, "experienced");
    const sc = single(values, "sexualContent");
    return (ex !== "" && ex !== "Огт өртөж байгаагүй") || sc.startsWith("Тийм");
  }
  return single(values, "childExposed") === "Тийм, өртөж байсан";
}

/** Сэтгэл санааны нөлөөлөл (1–5). */
function detectImpact(values: AssessmentValues, band: AgeBand): number {
  if (band === "9-12") {
    const nf = single(values, "negFeelings");
    if (nf === "Маш их айж, түгшсэн") return 5;
    if (nf === "Уур хүрсэн, гунигласан") return 4;
    if (nf === "Тоогоогүй") return 2;
    return 1;
  }
  if (band === "13-17") {
    const f = single(values, "feelings");
    if (f === "Бүх зүйл дуусаасай гэж бодож байсан") return 5;
    if (f === "Сэтгэл гутралд орж, маш их түгшсэн") return 5;
    if (f === "Хичээлээ хийх сонирхолгүй болсон") return 3;
    return 1;
  }
  const d = single(values, "distressSigns");
  if (d === "Тийм, байнга эсвэл заримдаа илэрдэг") return 5;
  if (d === "Анзаараагүй") return 3;
  return 1;
}

/** Хариултаас илэрсэн бүүллидэлтийн төрлүүдийн id-г буцаана. */
function detectTypeIds(values: AssessmentValues, band: AgeBand): string[] {
  const ids = new Set<string>();
  if (band === "9-12") {
    const hl = single(values, "harshLanguage");
    if (hl === "Байнга таардаг" || hl === "Заримдаа таардаг") ids.add("insults");
    if (single(values, "friendsHurt").startsWith("Тийм")) ids.add("excluded");
  }
  if (band === "13-17") {
    const ex = single(values, "experienced");
    if (ex === "Худал цуурхал, гүтгэлэгт өртөх") ids.add("rumors");
    if (ex === "Чат, группээс зориуд хасагдах") ids.add("excluded");
    if (ex === "Гадаад төрхөөрөө доромжлуулах") ids.add("insults");
    if (single(values, "sexualContent").startsWith("Тийм")) ids.add("pressure");
  }
  return [...ids];
}

export type AnalysisResult = ReturnType<typeof analyzeAnswers>;

/**
 * Хариултыг дүгнэж, хүүхэд/өсвөр үед нь үе тэнгийнхэнтэй (mock дата)
 * харьцуулна. Эцэг эхийн бүлэгт харьцуулалт байхгүй, оноо нь хүүхдээ
 * хамгаалах бэлэн байдлыг илэрхийлнэ.
 */
export function analyzeAnswers(values: AssessmentValues, band: AgeBand) {
  const kind = band === "parent" ? "parent" : "child";
  const score = calculateRiskScore(values, band);
  const maxScore = maxRiskScore(band);
  const level = getRiskLevel(score, band);
  const experienced = detectExperienced(values, band);
  const yourImpact = detectImpact(values, band);

  const typeIds = detectTypeIds(values, band);
  const reportedTypes = bullyingTypes.filter((type) => typeIds.includes(type.questionId));

  // Эрсдэлийн индекс (0–100) — өөр өөр асуултын тоотой бүлгүүдийг харьцуулах боломжтой.
  const riskIndex = maxScore ? Math.round((score / maxScore) * 100) : 0;

  const range = bandRange[band];
  if (!range) {
    return { band, kind, score, maxScore, riskIndex, level, experienced, yourImpact, reportedTypes, comparison: null, standing: "around" } as const;
  }

  const [min, max] = range;
  const peers = mockResponses.filter((response) => response.age >= min && response.age <= max);
  const peerCount = peers.length || 1;

  const comparison = {
    peerCount: peers.length,
    peerExperiencedPct: Math.round((peers.filter((p) => p.experienced).length / peerCount) * 100),
    peerHighRiskPct: Math.round((peers.filter((p) => p.riskLevel === "Өндөр").length / peerCount) * 100),
    peerNeedsHelpPct: Math.round((peers.filter((p) => p.needsHelp).length / peerCount) * 100),
  };

  // Түвшнээ үе тэнгийн "өндөр эрсдэлтэй" хувьтай харьцуулж байр сууриа тодорхойлно.
  const standing =
    level === "Өндөр"
      ? "above"
      : level === "Бага"
        ? "below"
        : "around";

  return { band, kind, score, maxScore, riskIndex, level, experienced, yourImpact, reportedTypes, comparison, standing } as const;
}
