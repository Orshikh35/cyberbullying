export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  text: string;
  readTime: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "group-chat-signs",
    date: "2026.06.01",
    category: "Сургуулийн орчин",
    title: "Групп чат дахь дарамтыг эрт таних 5 шинж",
    text: "Давтагдсан доромжлол, зориуд хасах, screenshot тараах зэрэг үйлдлийг багш, эцэг эх хамт анзаарах хэрэгтэй.",
    readTime: "4 мин",
  },
  {
    slug: "how-to-listen",
    date: "2026.05.24",
    category: "Эцэг эхэд",
    title: "Хүүхэд хэлэхээс айж байвал яаж сонсох вэ?",
    text: "Шууд загнахгүй, буруутгахгүй, эхлээд аюулгүй байдлыг нь баталгаажуулж, нотолгоог хамт хадгална.",
    readTime: "3 мин",
  },
  {
    slug: "password-safety",
    date: "2026.05.18",
    category: "Цахим дадал",
    title: "Нууц үг, хоёр шатлалт хамгаалалт яагаад чухал вэ?",
    text: "Аккаунт булаах оролдлого нь цахим дарамтын нэг хэлбэр байж болдог тул хамгаалалтын тохиргоо тогтмол шалгана.",
    readTime: "5 мин",
  },
  {
    slug: "reporting-guide",
    date: "2026.05.09",
    category: "Платформ",
    title: "Report хийхдээ юу бичих вэ?",
    text: "Огноо, болсон газар, хэрэглэгчийн нэр, хадгалсан screenshot-оо эмхэлж тайлбарлавал шалгах боломж нэмэгдэнэ.",
    readTime: "3 мин",
  },
  {
    slug: "teacher-response",
    date: "2026.04.28",
    category: "Багшид",
    title: "Анги дотор цахим дарамтын яриаг хэрхэн эхлүүлэх вэ?",
    text: "Нэг хүүхдийг заахгүйгээр дүрэм, хүндлэл, тусламж хүсэх сувгийг нийтэд нь тайлбарлах нь илүү аюулгүй.",
    readTime: "4 мин",
  },
  {
    slug: "evidence-checklist",
    date: "2026.04.15",
    category: "Нотолгоо",
    title: "Screenshot хадгалах богино checklist",
    text: "Мессеж, хэрэглэгчийн нэр, огноо, URL, платформын нэр харагдаж байгаа эсэхийг шалгана.",
    readTime: "2 мин",
  },
];
