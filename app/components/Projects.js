'use client';

import Decrypt from './Decrypt';
import Reveal from './Reveal';
import { Section } from './SectionTitle';

const DEFAULT_ITEMS = [
  {
    name: 'HomeFull',
    desc: 'Full-stack web application connecting homeless individuals with job opportunities. Features search and filtering by city, skill, and shelter for improved job accessibility.',
    github: 'https://github.com/Haedyn06/Project-HomeFull.git',
    live: 'https://project-homefull.vercel.app/',
    image: null,
    video: null,
  },
  {
    name: 'Village Rental',
    desc: 'Desktop application for rental management with CRUD operations across a 5-table relational database. Features real-time cost calculations and an interactive reporting dashboard.',
    github: 'https://github.com/ZaRiceHatGuy/VillageRental.git',
    live: null,
    image: null,
    video: null,
  },
  {
    name: 'Quadratic Solver',
    desc: 'Interactive GUI application for solving quadratic equations with real-time graphing. Supports linear, quadratic, and complex root cases with adjustable axis ranges.',
    github: 'https://github.com/ZaRiceHatGuy/Quadratic-Calculator.git',
    live: null,
    image: null,
    video: null,
  },
  {
    name: 'PingPongPyGame',
    desc: 'Classic arcade game built with Python and Pygame. Features real-time input handling, collision detection, randomized ball direction, and physics-based ball-paddle mechanics.',
    github: 'https://github.com/ZaRiceHatGuy/PingPongPyGame.git',
    live: null,
    image: null,
    video: null,
  },
];

function ProjectLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-pixel text-[0.55rem] px-3 py-2 border-2 border-[var(--accent)] text-[var(--accent)] hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-colors duration-300 inline-flex items-center gap-1.5"
    >
      <Decrypt text={children} />
    </a>
  );
}

/**
 * Projects — the project grid plus the "View more on GitHub" button.
 */
export default function Projects({ items = DEFAULT_ITEMS }) {
  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8 items-start">
          {items.map((p, idx) => (
            <Reveal key={p.name} delay={idx * 90}>
            <article
              className="pixel-border bg-[var(--card)] p-3 sm:p-3.5 flex flex-col gap-2.5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <Decrypt
                  text={p.name}
                  as="h3"
                  className="text-[var(--text)] text-base md:text-lg leading-snug min-w-0"
                />
                <span className="shrink-0 font-pixel text-[0.5rem] px-1.5 py-1 border-2 border-[#000] bg-[var(--bg3)] text-[var(--accent2)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.3)]">
                  LV.{String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {(p.image || p.video) && (
                <div className="relative rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg3)] aspect-video">
                  {p.video ? (
                    <video src={p.video} controls preload="metadata" className="w-full h-full object-contain" />
                  ) : (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  )}
                </div>
              )}

              <Decrypt
                text={p.desc}
                as="p"
                className="text-xs text-[var(--muted)] leading-relaxed"
              />

              <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
                <ProjectLink href={p.github}>GitHub →</ProjectLink>
                {p.live && <ProjectLink href={p.live}>▶ Play</ProjectLink>}
              </div>
            </article>
            </Reveal>
          ))}
        </div>

      <div className="text-center">
        <a
          href="https://github.com/ZaRiceHatGuy"
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn px-6 py-3"
        >
          <Decrypt text="View more on GitHub →" />
        </a>
      </div>
    </Section>
  );
}
