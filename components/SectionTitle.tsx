export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-slate-600">{text}</p>
    </div>
  );
}
