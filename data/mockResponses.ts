import type { RiskLevel, SurveyResponse } from "@/types/survey";

const platforms = ["Facebook", "Instagram", "TikTok", "YouTube", "Discord", "Telegram"];
const toldTo = ["Эцэг эх", "Багш", "Найз", "Ах эгч", "Нийгмийн ажилтан", "Хэлээгүй"];
const months = ["1 сар", "2 сар", "3 сар", "4 сар", "5 сар", "6 сар", "7 сар", "8 сар", "9 сар", "10 сар", "11 сар", "12 сар"];

function seeded(index: number) {
  const x = Math.sin(index * 999) * 10000;
  return x - Math.floor(x);
}

function riskFromScore(score: number): RiskLevel {
  if (score <= 25) return "Бага";
  if (score <= 55) return "Дунд";
  return "Өндөр";
}

export const mockResponses: SurveyResponse[] = Array.from({ length: 720 }, (_, i) => {
  const age = 9 + Math.floor(seeded(i + 2) * 9);
  const platform = platforms[Math.floor(seeded(i + 3) * platforms.length)];
  const base = seeded(i + 4);
  const experienced = base > 0.38;
  const impact = experienced ? Math.ceil(seeded(i + 5) * 5) : Math.ceil(seeded(i + 5) * 2);
  const riskScore = Math.round((experienced ? 22 : 4) + impact * 9 + seeded(i + 6) * 34);
  const riskLevel = riskFromScore(riskScore);

  return {
    id: i + 1,
    age,
    grade: `${Math.min(12, age - 5)}-р анги`,
    platform,
    month: months[i % months.length],
    experienced,
    riskLevel,
    riskScore,
    toldTo: toldTo[Math.floor(seeded(i + 7) * toldTo.length)],
    blocked: seeded(i + 8) > 0.42,
    reported: seeded(i + 9) > 0.55,
    evidenceSaved: seeded(i + 10) > 0.48,
    needsHelp: riskLevel === "Өндөр" || seeded(i + 11) > 0.72,
    impact,
  };
});
