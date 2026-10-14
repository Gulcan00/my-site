import { SectionHead } from "./SectionHead";
import { certifications, languages, profile, skillGroups } from "@/lib/profile";

const spans: Record<string, string> = {
  frontend: "bento--wide",
  backend: "bento--wide",
};

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" label="About" />

        <div className="about__intro">
          <h2 className="section-title" data-reveal>
            Engineering the systems enterprises <span className="muted">run on</span> — with a builder&apos;s
            obsession for <span className="accent-underline">craft</span>.
          </h2>
          <div className="about__copy" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <p>{profile.summary}</p>
            <p>
              Today I work across the full stack at Consolidated Contractors Company — from Angular interfaces and
              TypeScript, through Spring Boot services, down to PostgreSQL. I care about code that is clear to read,
              safe to change, and fast for the people who depend on it.
            </p>
          </div>
        </div>

        <div className="bento">
          {skillGroups.map((g, i) => (
            <article
              key={g.key}
              className={`card spot ${spans[g.key] ?? ""}`}
              data-reveal
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              <p className="card__kicker">{`// ${g.key}`}</p>
              <h3 className="card__title">{g.title}</h3>
              <p className="card__text">{g.blurb}</p>
              <ul className="tags">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}

          <article className="card spot" data-reveal style={{ "--d": "280ms" } as React.CSSProperties}>
            <p className="card__kicker">{"// languages"}</p>
            <h3 className="card__title">Multilingual</h3>
            <ul className="langs">
              {languages.map((l) => (
                <li key={l.name}>
                  <div className="langs__row">
                    <span>{l.name}</span>
                    <span className="langs__level">{l.level}</span>
                  </div>
                  <div className="langs__bar" aria-hidden>
                    <span style={{ "--w": `${l.value}%` } as React.CSSProperties} />
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="card spot bento--full certs" data-reveal style={{ "--d": "350ms" } as React.CSSProperties}>
            <div>
              <p className="card__kicker">{"// certifications"}</p>
              <h3 className="card__title">Always compiling</h3>
              <p className="card__text">Continuous learning across AI-assisted development, deep learning and software engineering.</p>
            </div>
            <ul className="certs__list">
              {certifications.map((c, i) => (
                <li key={c}>
                  <span className="certs__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
