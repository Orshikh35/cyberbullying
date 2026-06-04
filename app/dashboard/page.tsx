import { BarChart3 } from "lucide-react";
import { DashboardCharts } from "@/components/DashboardCharts";
import { GlobalDataSection } from "@/components/GlobalDataSection";
import { PageShell } from "@/components/PageShell";

export default function DashboardPage() {
  return (
    <PageShell
      eyebrow="Дата"
      title="Олон улс, Монгол, манай судалгааны датаг нэг дор"
      description="Дэлхий, Монголын лавлагаа статистик болон сайт дээрх нэргүй судалгааны бүлэглэсэн дүнг графикаар харуулна. Хүүхдийг таних мэдээлэл огт харуулахгүй."
      icon={BarChart3}
    >
      <GlobalDataSection />
      <DashboardCharts />
    </PageShell>
  );
}
