"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About", idx: "01" },
  { href: "#journey", label: "Journey", idx: "02" },
  { href: "#work", label: "Work", idx: "03" },
  { href: "#contact", label: "Contact", idx: "04" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="brand" aria-label="Back to top" onClick={() => setOpen(false)}>
          <span className="brand__mark">GD</span>
          <span className="brand__slash">/</span>
          <span className="brand__text">damdelen</span>
        </a>

        <nav id="primary-nav" className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="nav__idx">{l.idx}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--small btn--accent nav__cta">
          Let&apos;s talk <span className="arrow" aria-hidden>→</span>
        </a>

        <button
          type="button"
          className={`nav__toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
