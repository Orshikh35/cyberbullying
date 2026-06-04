export type RiskLevel = "Бага" | "Дунд" | "Өндөр";

export type QuestionType = "select" | "radio" | "checkbox" | "textarea";

/**
 * Респондентийн бүлэг. Гурван Google Form-той тааруулсан:
 * хүүхэд (9-12), өсвөр үе (13-17), эцэг эх/асран хамгаалагч.
 */
export type AgeBand = "9-12" | "13-17" | "parent";

export type Question = {
  id: string;
  label: string;
  helper?: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
  /**
   * Сонголтын текст → эрсдэл/анхаарал шаардсан оноо.
   * Байвал тухайн асуулт нийт оноонд тооцогдоно. Сонголтын
   * жагсаалт энэ объектын түлхүүрүүдээс үүсдэг тул хоорондоо зөрөхгүй.
   */
  scores?: Record<string, number>;
};

export type ResponseAnswer = string | string[] | undefined;

export type SurveyResponse = {
  id: number;
  age: number;
  grade: string;
  platform: string;
  month: string;
  experienced: boolean;
  riskLevel: RiskLevel;
  riskScore: number;
  toldTo: string;
  blocked: boolean;
  reported: boolean;
  evidenceSaved: boolean;
  needsHelp: boolean;
  impact: number;
};

export type ChartData = Record<string, string | number>;
