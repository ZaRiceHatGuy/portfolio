"use client";

const projects = [
  {
    name: 'HomeFull',
    desc: 'Full-stack web application connecting homeless individuals with job opportunities. Features search and filtering by city, skill, and shelter for improved job accessibility.',
    tags: ['Next.js', 'React', 'Firebase', 'Vercel'],
    github: 'https://github.com/Haedyn06/Project-HomeFull.git',
    live: 'https://project-homefull.vercel.app/',
    year: '2026',
    image: '/images/HomeFull.png'
  },
  {
    name: 'Village Rental',
    desc: 'Desktop application for rental management with CRUD operations across a 5-table relational database. Features real-time cost calculations and interactive reporting dashboard.',
    tags: ['Python', 'PyQt5', 'PostgreSQL'],
    github: 'https://github.com/ZaRiceHatGuy/VillageRental.git',
    live: null,
    year: '2025',
    video: '/videos/VillageRental.mp4'
  },
  {
    name: 'Quadratic Solver',
    desc: 'Interactive GUI application for solving quadratic equations with real-time graphing. Supports linear, quadratic, and complex root cases with adjustable axis ranges.',
    tags: ['Python', 'Tkinter', 'Matplotlib'],
    github: 'https://github.com/ZaRiceHatGuy/Quadratic-Calculator.git',
    live: null,
    year: '2022-2026',
    image: '/images/QuadraticCalculator.png'
  },
  {
    name: 'PingPongPyGame',
    desc: 'Classic arcade game built with Python and Pygame. Features real-time input handling, collision detection, randomized ball direction, and physics-based ball-paddle mechanics.',
    tags: ['Python', 'Pygame'],
    github: 'https://github.com/ZaRiceHatGuy/PingPongPyGame.git',
    live: null,
    year: '2026',
    image: '/images/PingPongPygame.png'
  },
];

export default function Projects() {
  return (
    <>
      <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-8 leading-[1.1]">
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {projects.map((p) => (
          <div key={p.name} className="project-card overflow-hidden !p-0">
            {p.video && (
              <video src={p.video} className="w-full h-44 object-cover" autoPlay muted loop playsInline />
            )}
            {p.image && !p.video && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.name} className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105" />
            )}
            <div className="p-5">
              <div className="font-['Syne',sans-serif] text-base font-bold mb-2">{p.name}</div>
              <div className="text-[0.82rem] text-[var(--muted)] leading-relaxed mb-4">{p.desc}</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="flex gap-4">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[0.72rem] text-[var(--muted)] no-underline tracking-[0.05em] hover:text-[var(--accent)] transition-colors">
                  GitHub →
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-[0.72rem] text-[var(--muted)] no-underline tracking-[0.05em] hover:text-[var(--accent)] transition-colors">
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a href="https://github.com/ZaRiceHatGuy" target="_blank" rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-full text-sm text-[var(--text)] no-underline hover:border-[rgba(47,127,255,0.5)] hover:text-[var(--accent)] transition-all">
          <span>View more on GitHub</span>
          <span>→</span>
        </a>
      </div>
    </>
  );
}