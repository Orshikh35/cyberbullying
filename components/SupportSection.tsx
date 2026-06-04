import { AlertTriangle, MessageCircleHeart, PhoneCall, School } from "lucide-react";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

const supportItems = [
  { icon: MessageCircleHeart, title: "Итгэлтэй хүнтэй ярилц", text: "Эцэг эх, ах эгч, багш, найзын эцэг эх гээд чамайг тайван сонсох хүн сонго." },
  { icon: School, title: "Сургуулийн багт мэдэгд", text: "Анги удирдсан багш, нийгмийн ажилтан, сургуулийн сэтгэлзүйчид нотолгоотойгоо ханд." },
  { icon: PhoneCall, title: "Тусламжийн байгууллага", text: "Аюултай, заналхийлсэн, хувийн мэдээлэл тараасан бол холбогдох хүүхдийн тусламжийн байгууллагад ханд." },
];

export function SupportSection() {
  return (
    <section id="support" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="up">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-gradient-to-br from-accent/25 to-accent/[0.05] p-6 sm:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                <AlertTriangle className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-900">Яаралтай аюул мэдрэгдэж байвал</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Заналхийлэл, хувийн зураг/мэдээлэл тараах, уулзахыг шаардах, мөнгө нэхэх зэрэг нөхцөлд ганцаараа шийдэх гэж бүү оролдоорой.
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-3">
              {supportItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-sm border border-accent/30 bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
        </Reveal>
      </div>
    </section>
  );
}
