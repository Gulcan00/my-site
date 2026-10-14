import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Work } from "@/components/Work";
import { Contact, Footer } from "@/components/Contact";
import { Effects } from "@/components/Effects";
import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="progress" aria-hidden />
      <div className="backdrop" aria-hidden>
        <div className="backdrop__grid" />
        <div className="backdrop__glow backdrop__glow--a" />
        <div className="backdrop__glow backdrop__glow--b" />
        <div className="backdrop__noise" />
      </div>

      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <Work />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <Effects />
    </>
  );
}
