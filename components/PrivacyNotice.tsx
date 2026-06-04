import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function PrivacyNotice() {
  return (
    <Reveal variant="up">
      <Card id="privacy" className="mx-auto max-w-6xl scroll-mt-24 overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <div>
            <ShieldCheck className="h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">Нууцлал хүүхдэд ойлгомжтой байх ёстой</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Энэ загвар нь хувийн мэдээлэл бага цуглуулах зарчимтай. Нэр заавал авахгүй, мэдрэмтгий мэдээлэл бичихийг шаардахгүй.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Хариултыг судалгаа, тусламжийн зорилгоор ашиглана.", "Нэр, утас, гэрийн хаяг шаардлагагүй.", "Аюултай нөхцөлд насанд хүрсэн хүнд шууд хандана.", "Мэдээлэл харуулахдаа бүлэглэсэн статистик ашиглана."].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-600">
                <LockKeyhole className="h-4 w-4 shrink-0 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
