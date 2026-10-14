import { marquee } from "@/lib/profile";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-label={`Tech stack: ${marquee.join(", ")}`}>
      <div className="marquee__track" aria-hidden>
        {items.map((item, i) => (
          <span key={i} className={`marquee__item ${i % 2 ? "outline" : ""}`}>
            {item}
            <span className="marquee__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
