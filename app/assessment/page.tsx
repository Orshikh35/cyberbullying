import { ClipboardCheck } from "lucide-react";
import { AssessmentForm } from "@/components/AssessmentForm";
import { PageHeader } from "@/components/PageHeader";

export default function AssessmentPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Нууцлалтай судалгаа"
        title="Насны бүлэгт тохирсон асуултаар нөхцөл байдлаа тайван шалгаарай"
        description="Хүүхэд (9–12), өсвөр үе (13–17), эцэг эх гэсэн бүлэг тус бүрт тусгай асуумжтай. Энэ судалгаа нь онош биш. Нэр авахгүй, аюулгүй байдлыг нэгдүгээрт тавьж, дараагийн алхмын зөвлөгөө өгнө."
        icon={ClipboardCheck}
      />
      <AssessmentForm />
    </main>
  );
}
