export function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-head" data-reveal>
      <span className="section-head__index">{index}</span>
      <span className="section-head__rule" aria-hidden />
      <span className="section-head__label">{label}</span>
    </div>
  );
}
