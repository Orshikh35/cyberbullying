/**
 * Цахим бүүллидэлтийн төрлүүд. Судалгааны асуултын id-тэй холбоотой —
 * үр дүн дээр хүүхдийн өртсөн төрлийг тодотгон тайлбарлахад ашиглана.
 */
export type BullyingType = {
  /** Холбогдох асуултын id (өндөр оноо авбал тухайн төрөлд өртсөн гэж үзнэ). */
  questionId: string;
  /** Icon-ийн түлхүүр (RiskResultCard/InfoPage дотор lucide icon-той тааруулна). */
  icon: "insult" | "share" | "exclude" | "rumor" | "account" | "pressure";
  title: string;
  description: string;
};

export const bullyingTypes: BullyingType[] = [
  {
    questionId: "insults",
    icon: "insult",
    title: "Доромжлох, заналхийлэх",
    description: "Муухай үг, хоч, сүрдүүлэг, заналхийлсэн мессеж дахин дахин илгээх.",
  },
  {
    questionId: "privateShared",
    icon: "share",
    title: "Хувийн мэдээлэл тараах",
    description: "Зураг, бичлэг, чат, нууц мэдээллийг зөвшөөрөлгүй ил болгох, тараах.",
  },
  {
    questionId: "excluded",
    icon: "exclude",
    title: "Гадуурхах, ганцаардуулах",
    description: "Групп чат, онлайн тоглоом, ангийн бүлгээс зориуд хасах, үл тоомсорлох.",
  },
  {
    questionId: "rumors",
    icon: "rumor",
    title: "Нэр хүнд гутаах",
    description: "Худал мэдээлэл, цуурхал тарааж бусдын дунд гутаах, гүтгэх.",
  },
  {
    questionId: "password",
    icon: "account",
    title: "Аккаунтын халдлага",
    description: "Нууц үг асуух, аккаунт руу нэвтрэх, бусдын нэрээр хуурамчаар бичих.",
  },
  {
    questionId: "pressure",
    icon: "pressure",
    title: "Шахалт, дарамт",
    description: "Зураг, бичлэг, мөнгө нэхэж айлган сүрдүүлэх, дарамтлах (grooming/sextortion).",
  },
];
