import { MessageCircleWarning } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ReportForm } from "@/components/ReportForm";

export default function ReportPage() {
  return (
    <PageShell
      eyebrow="Цахим дарамт мэдээлэх"
      title="Болсон явдлаа нэргүй мэдээлж, тусламж аваарай"
      description="Доорх асуултад хариулснаар мэдээлэл холбогдох багт илгээгдэнэ. Та нэрээ нууцлах боломжтой бөгөөд яаралтай аюултай үед холбогдох байгууллагад шууд хандаарай."
      icon={MessageCircleWarning}
    >
      <ReportForm />
    </PageShell>
  );
}
