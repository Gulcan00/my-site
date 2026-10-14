import { SectionHead } from "./SectionHead";
import { CopyEmail } from "./CopyEmail";
import { Clock } from "./Clock";
import { profile } from "@/lib/profile";

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHead index="04" label="Contact" />
        <div className="contact__panel spot" data-reveal>
          <div className="contact__grid-bg" aria-hidden />
          <p className="eyebrow">
            <span className="pulse" aria-hidden /> Inbox open
          </p>
          <h2 className="contact__title">
            Let&apos;s build something <span className="outline">worth</span> <span className="accent">shipping.</span>
          </h2>
          <a href={`mailto:${profile.email}`} className="contact__email">
            {profile.email}
            <span className="arrow" aria-hidden>↗</span>
          </a>
          <div className="contact__actions">
            <a href={`mailto:${profile.email}`} className="btn btn--accent">
              Send an email <span className="arrow" aria-hidden>→</span>
            </a>
            <a href={profile.linkedin} className="btn" target="_blank" rel="noopener noreferrer">
              LinkedIn <span className="arrow" aria-hidden>↗</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="brand__mark">GD</span>
          <span>
            © {year} {profile.name}
          </span>
        </div>
        <span className="footer__built">Designed &amp; engineered in Nicosia · Built with Next.js</span>
        <Clock />
      </div>
      <div className="footer__giant" aria-hidden>
        DAMDELEN
      </div>
    </footer>
  );
}
