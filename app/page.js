import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SkillsBlock from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Awards from './components/Awards';
import HeroCanvas from './components/HeroCanvas';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <HeroCanvas />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />

        <section id="about" className="px-4 sm:px-6 lg:px-8 pt-12 pb-6 md:pt-24 md:pb-8">
          <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-6 md:gap-8 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
              <About />
              <Education />
              <Experience />
              <Awards />
            </div>
            <SkillsBlock />
          </div>
        </section>

        <section id="projects" className="px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-8 md:pb-24">
          <div className="max-w-[1280px] mx-auto">
            <Projects />
          </div>
        </section>

        <div
          id="contact"
          className="bg-[var(--bg)] min-h-[calc(100vh-var(--navbar-height))] flex flex-col"
        >
          <div className="fade-border-top shrink-0" />
          <section className="flex-1 px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 flex flex-col min-h-0">
            <div className="max-w-[1280px] mx-auto w-full flex-1 flex flex-col justify-center min-h-0">
              <Contact />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
