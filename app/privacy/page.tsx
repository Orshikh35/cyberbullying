import { LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { Card } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Нууцлал"
        title="Хүүхдийн хувийн мэдээллийг бага цуглуулж, ойлгомжтой хамгаална"
        description="Нэр, утас, гэрийн хаяг шаардахгүй. Хариултыг тусламж, судалгаа, эрсдэлийн ерөнхий ойлголтод ашиглах зарчимтай."
        icon={LockKeyhole}
      />
      <section className="px-5 py-10 sm:px-8">
        <PrivacyNotice />
      </section>
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {["Sensitive data-г бага цуглуулна", "Нэр заавал авахгүй", "Графикт зөвхөн бүлэглэсэн дата харуулна"].map((item) => (
            <Card key={item} className="p-6">
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
              <h2 className="mt-4 text-xl font-black text-slate-900">{item}</h2>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
