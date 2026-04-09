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
    image: '/images/PingPongPyGame.png'
  },
];

// Map technology names to their icon paths and display names
const getTagDetails = (tag) => {
  const techMap = {
    'Next.js': { name: 'Next.js', icon: '/icons/NextJS.svg' },
    'React': { name: 'React', icon: '/icons/React.svg' },
    'Firebase': { name: 'Firebase', icon: '/icons/Firebase.svg' },
    'Vercel': { name: 'Vercel', icon: '/icons/Vercel.svg' },
    'Python': { name: 'Python', icon: '/icons/Python.svg' },
    'PyQt5': { name: 'Python', icon: '/icons/Python.svg' },
    'PostgreSQL': { name: 'PostgreSQL', icon: '/icons/PostgreSQL.svg' },
    'Tkinter': { name: 'Python', icon: '/icons/Python.svg' },
    'Matplotlib': { name: 'Python', icon: '/icons/Python.svg' },
    'Pygame': { name: 'Python', icon: '/icons/Python.svg' },
  };
  return techMap[tag] || { name: tag, icon: null };
};

// Reusable skill badge component for projects with BLUE hover
function ProjectSkillBadge({ skill }) {
  return (
    <div className="group relative w-[35px] h-[35px] rounded-lg bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center cursor-default transition-all duration-200 hover:border-[var(--accent)] hover:bg-[rgba(47,127,255,0.08)] hover:-translate-y-0.5">
      <img src={skill.icon} alt={skill.name} width={20} height={20} className="object-contain" />
      <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 bg-[#1c1c21] text-[var(--text)] text-[0.68rem] tracking-wide py-1 px-2 rounded-[0.35rem] whitespace-nowrap border border-[var(--border)] opacity-0 transition-all duration-200 pointer-events-none z-10 group-hover:opacity-100 group-hover:translate-y-0">
        {skill.name}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-8 leading-[1.1]">
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {projects.map((p) => {
          // Get unique tech for this project (remove duplicates)
          const uniqueTech = [];
          const seenNames = new Set();
          for (const tag of p.tags) {
            const tech = getTagDetails(tag);
            if (!seenNames.has(tech.name)) {
              seenNames.add(tech.name);
              uniqueTech.push(tech);
            }
          }

          return (
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
                <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2 items-center order-1">
                    {uniqueTech.map((tech) => (
                      tech.icon ? (
                        <ProjectSkillBadge key={tech.name} skill={tech} />
                      ) : (
                        <span key={tech.name} className="tag">{tech.name}</span>
                      )
                    ))}
                  </div>
                  <div className="flex gap-2 flex-shrink-0 order-2">
                    <a 
                      href={p.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="h-[35px] px-3 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 bg-transparent whitespace-nowrap inline-flex items-center"
                    >
                      GitHub →
                    </a>
                    {p.live && (
                      <a 
                        href={p.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="h-[35px] px-3 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 bg-transparent whitespace-nowrap inline-flex items-center"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <a href="https://github.com/ZaRiceHatGuy" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base transition-all border-2 border-blue-500 text-blue-500 hover:border-[#f5c842] hover:text-[#f5c842] hover:bg-transparent bg-transparent font-medium">
          <span>View more on GitHub</span>
          <span>→</span>
        </a>
      </div>
    </>
  );
}