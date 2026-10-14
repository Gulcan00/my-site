import { Terminal } from "./Terminal";
import { AskTwinButton } from "./AskTwinButton";
import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>
            <span className="pulse" aria-hidden />
            {profile.role} · Nicosia, CY
          </p>

          <h1 className="hero__title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="line">Enterprise</span>
            <span className="line">systems.</span>
            <span className="line">
              <span className="outline">Built with</span>
            </span>
            <span className="line">
              <span className="accent">an edge.</span>
            </span>
          </h1>

          <p className="hero__lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            I&apos;m <strong>{profile.name}</strong> — I build scalable web applications with Angular and
            Spring Boot. Rigorous architecture on the inside. Sharp, considered experiences on the outside.
          </p>

          <div className="hero__actions" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
            <a href="#journey" className="btn btn--accent">
              Explore my journey <span className="arrow" aria-hidden>→</span>
            </a>
            <AskTwinButton />
            <a href="#contact" className="btn">
              Get in touch
            </a>
          </div>

          <dl className="hero__stats" data-reveal style={{ "--d": "320ms" } as React.CSSProperties}>
            <div>
              <dt>Experience</dt>
              <dd>
                2<span>+</span> <small>yrs</small>
              </dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd>
                UI<span>→</span>DB
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>
                3 <small>spoken</small>
              </dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual" data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
          <div className="hero__orb" aria-hidden />
          <Terminal />
          <span className="chip chip--float chip--a" aria-hidden>
            <i /> Angular 16+
          </span>
          <span className="chip chip--float chip--b" aria-hidden>
            <i /> Spring Boot
          </span>
          <span className="chip chip--float chip--c" aria-hidden>
            <i /> PostgreSQL
          </span>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span>Scroll</span>
        <i aria-hidden />
      </a>
    </section>
  );
}
