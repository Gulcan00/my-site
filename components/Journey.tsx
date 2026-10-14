import { SectionHead } from "./SectionHead";
import { journey } from "@/lib/profile";

export function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <SectionHead index="02" label="Career Journey" />
        <div className="journey__head">
          <h2 className="section-title" data-reveal>
            From the classroom <span className="muted">to</span> <span className="outline">enterprise scale.</span>
          </h2>
          <p className="section-lead" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
            A path built one deliberate step at a time — operations, teaching, frontend craft, and now full-stack
            ownership of enterprise software.
          </p>
        </div>

        <ol className="timeline">
          {journey.map((item, i) => (
            <li
              key={`${item.title}-${item.period}`}
              className={`timeline__item ${item.current ? "is-current" : ""}`}
              data-reveal
              style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
            >
              <div className="timeline__meta">
                <span className="timeline__period">{item.period}</span>
                {item.duration && <span className="timeline__duration">{item.duration}</span>}
              </div>
              <div className="timeline__node" aria-hidden>
                <span />
              </div>
              <article className="card spot timeline__card">
                <div className="timeline__top">
                  <span className={`badge ${item.kind === "education" ? "badge--edu" : ""}`}>
                    {item.current ? "Now" : item.kind === "education" ? "Education" : "Role"}
                  </span>
                  {item.location && <span className="timeline__loc">{item.location}</span>}
                </div>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__org">{item.org}</p>
                <p className="card__text">{item.description}</p>
                {item.tech && (
                  <ul className="tags">
                    {item.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
