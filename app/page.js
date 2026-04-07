import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SkillsBlock from './components/Skills';
import Education from './components/Education';
import Awards from './components/Awards';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="divider" />

      {/* About section — 2 cols on md+, single col on mobile */}
      <section id="about" className="px-[6vw] py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Column - removed negative margin */}
            <div className="flex flex-col gap-12 md:gap-16">
              <About />
              <SkillsBlock />
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col gap-12 md:gap-16">
              <Education />
              <Awards />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />
      <section id="projects" className="px-[6vw] py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <Projects />
        </div>
      </section>

      <div className="divider" />
      <section id="contact" className="px-[6vw] py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <Contact />
        </div>
      </section>

      <footer className="border-t border-[var(--border)] text-center py-8 px-[6vw] text-[var(--muted)] text-xs tracking-wide">
        © 2026 Thái Dương (David) Nguyễn. Designed & built with care.
      </footer>
    </>
  );
}