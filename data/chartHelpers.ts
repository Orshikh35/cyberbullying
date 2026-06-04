import type { SurveyResponse } from "@/types/survey";

export function percent(value: number, total: number) {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}

export function ageGroup(age: number) {
  if (age <= 11) return "9-11";
  if (age <= 14) return "12-14";
  return "15-17";
}

export function bullyingByAge(responses: SurveyResponse[]) {
  return ["9-11", "12-14", "15-17"].map((group) => {
    const rows = responses.filter((response) => ageGroup(response.age) === group);
    return { name: group, хувь: percent(rows.filter((row) => row.experienced).length, rows.length) };
  });
}

export function countBy<T extends string>(responses: SurveyResponse[], key: (response: SurveyResponse) => T) {
  const counts = responses.reduce<Record<T, number>>((acc, response) => {
    const value = key(response);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function monthlyTrend(responses: SurveyResponse[]) {
  return Array.from(new Set(responses.map((response) => response.month))).map((month) => {
    const rows = responses.filter((response) => response.month === month);
    return { name: month, тохиолдол: rows.filter((row) => row.experienced).length, өндөр: rows.filter((row) => row.riskLevel === "Өндөр").length };
  });
}

export function actionStack(responses: SurveyResponse[]) {
  return [
    { name: "Block", тийм: responses.filter((r) => r.blocked).length, үгүй: responses.filter((r) => !r.blocked).length },
    { name: "Report", тийм: responses.filter((r) => r.reported).length, үгүй: responses.filter((r) => !r.reported).length },
    { name: "Нотолгоо", тийм: responses.filter((r) => r.evidenceSaved).length, үгүй: responses.filter((r) => !r.evidenceSaved).length },
  ];
}

export function impactData(responses: SurveyResponse[]) {
  return [1, 2, 3, 4, 5].map((level) => ({
    name: `${level}`,
    тоо: responses.filter((response) => response.impact === level).length,
  }));
}
