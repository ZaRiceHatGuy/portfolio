'use client';

import DecryptText from './DecryptText';

const projects = [
  {
    name: 'HomeFull',
    desc: 'Full-stack web application connecting homeless individuals with job opportunities. Features search and filtering by city, skill, and shelter for improved job accessibility.',
    github: 'https://github.com/Haedyn06/Project-HomeFull.git',
    live: 'https://project-homefull.vercel.app/',
  },
  {
    name: 'Village Rental',
    desc: 'Desktop application for rental management with CRUD operations across a 5-table relational database. Features real-time cost calculations and an interactive reporting dashboard.',
    github: 'https://github.com/ZaRiceHatGuy/VillageRental.git',
    live: null,
  },
  {
    name: 'Quadratic Solver',
    desc: 'Interactive GUI application for solving quadratic equations with real-time graphing. Supports linear, quadratic, and complex root cases with adjustable axis ranges.',
    github: 'https://github.com/ZaRiceHatGuy/Quadratic-Calculator.git',
    live: null,
  },
  {
    name: 'PingPongPyGame',
    desc: 'Classic arcade game built with Python and Pygame. Features real-time input handling, collision detection, randomized ball direction, and physics-based ball-paddle mechanics.',
    github: 'https://github.com/ZaRiceHatGuy/PingPongPyGame.git',
    live: null,
  },
];

function ProjectLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-3 py-1.5 rounded-md border border-[var(--accent)] text-[var(--accent)] hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-all duration-300 inline-flex items-center gap-1.5"
    >
      <DecryptText text={children} />
    </a>
  );
}

export default function Projects() {
  return (
    <div>
      <DecryptText
        text="Projects"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {projects.map((p) => (
          <article
            key={p.name}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.35)] hover:-translate-y-1"
          >
            <DecryptText
              text={p.name}
              as="h3"
              className="text-[var(--text)] text-base md:text-lg leading-snug"
            />

            <DecryptText
              text={p.desc}
              as="p"
              className="text-xs text-[var(--muted)] leading-relaxed"
            />

            <div className="flex flex-wrap gap-2 pt-3 mt-auto border-t border-[var(--border)]">
              <ProjectLink href={p.github}>GitHub →</ProjectLink>
              {p.live && <ProjectLink href={p.live}>Live demo →</ProjectLink>}
            </div>
          </article>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://github.com/ZaRiceHatGuy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm border border-[var(--accent)] text-[var(--accent)] hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-all duration-300"
        >
          <DecryptText text="View more on GitHub →" />
        </a>
      </div>
    </div>
  );
}
