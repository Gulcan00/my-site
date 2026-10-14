import { SectionHead } from "./SectionHead";
import { projects, type Project } from "@/lib/profile";

function ProjectCard({ p }: { p: Project }) {
  const live = Boolean(p.href);
  const body = (
    <>
      <div className="work__top">
        <span className="work__id">{p.id}</span>
        <span className={`status status--${p.status.replace(" ", "-").toLowerCase()}`}>{p.status}</span>
      </div>

      <div className="work__preview" aria-hidden>
        {!live && (
          <>
            <span className="redact" style={{ width: "72%" }} />
            <span className="redact" style={{ width: "54%" }} />
            <span className="redact" style={{ width: "86%" }} />
            <span className="work__stamp">Classified</span>
          </>
        )}
      </div>

      <p className="work__cat">{p.category}</p>
      <h3 className="work__title">{p.title}</h3>
      <p className="card__text">{p.summary ?? "Write-up in progress. Details are being declassified soon."}</p>
      {p.tags && (
        <ul className="tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      <span className="work__link">
        {live ? "View case study" : "Coming soon"} <span className="arrow" aria-hidden>→</span>
      </span>
    </>
  );

  return live ? (
    <a href={p.href} className="card spot work__card is-live" target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <article className="card spot work__card" aria-disabled="true">
      {body}
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead index="03" label="Portfolio" />
        <div className="journey__head">
          <h2 className="section-title" data-reveal>
            Selected work. <span className="outline">Compiling.</span>
          </h2>
          <p className="section-lead" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
            Case studies are on the way. Much of my day-to-day lives behind enterprise firewalls — public builds
            will land here as they ship.
          </p>
        </div>

        <div className="work__grid">
          {projects.map((p, i) => (
            <div key={p.id} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
