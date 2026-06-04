import { HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SupportSection } from "@/components/SupportSection";

export default function SupportPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Тусламж авах"
        title="Аюултай санагдвал ганцаараа шийдэх гэж бүү оролдоорой"
        description="Заналхийлэл, хувийн мэдээлэл тараах, мөнгө нэхэх, уулзахыг шаардах зэрэг нөхцөлд итгэлтэй насанд хүрсэн хүнтэй шууд ярилцана."
        icon={HeartHandshake}
      />
      <SupportSection />
    </main>
  );
}
