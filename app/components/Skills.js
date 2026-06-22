'use client';

import { Fragment } from 'react';
import { MousePointer2 } from 'lucide-react';
import DecryptText from './DecryptText';
import DecryptReveal from './DecryptReveal';

const PROFICIENCY = {
  Basic: {
    fill: 33,
    barClass: 'bg-[var(--muted)]',
    badgeClass: 'text-[var(--muted)] border-[var(--muted)]/40 bg-[var(--muted)]/10',
  },
  Intermediate: {
    fill: 66,
    barClass: 'bg-[var(--accent2)]',
    badgeClass: 'text-[var(--accent2)] border-[rgba(var(--accent2-rgb),0.45)] bg-[rgba(var(--accent2-rgb),0.1)]',
  },
  Proficient: {
    fill: 100,
    barClass: 'bg-[var(--accent)]',
    badgeClass: 'text-[var(--accent)] border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]',
  },
};

const skillGroups = [
  {
    label: 'Languages & data',
    skills: [
      { name: 'Python', icon: '/icons/Python.svg', level: 'Proficient' },
      { name: 'C#', icon: '/icons/CSharp.svg', level: 'Intermediate' },
      { name: 'Java', icon: '/icons/Java.svg', level: 'Basic' },
      { name: 'HTML', icon: '/icons/HTML.svg', level: 'Proficient' },
      { name: 'CSS', icon: '/icons/CSS.svg', level: 'Proficient' },
      { name: 'JavaScript', icon: '/icons/JavaScript.svg', level: 'Proficient' },
      { name: 'TypeScript', icon: '/icons/TypeScript.svg', level: 'Intermediate' },
      { name: 'PostgreSQL', icon: '/icons/PostgreSQL.svg', level: 'Intermediate' },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'React', icon: '/icons/React.svg', level: 'Proficient' },
      { name: 'Next.js', icon: '/icons/NextJS.svg', level: 'Proficient' },
    ],
  },
  {
    label: 'Tools & platforms',
    skills: [
      { name: 'Git', icon: '/icons/Git.svg', level: 'Intermediate' },
      { name: 'Vercel', icon: '/icons/Vercel.svg', level: 'Intermediate' },
      { name: 'Framer', icon: '/icons/Framer.svg', level: 'Intermediate' },
      { name: 'Supabase', icon: '/icons/Supabase.svg', level: 'Intermediate' },
    ],
  },
];

const GRID_CLASS = 'grid grid-cols-4 min-[420px]:grid-cols-6 sm:grid-cols-8 gap-x-1.5 sm:gap-x-2 gap-y-3';

export default function SkillsBlock() {
  return (
    <div className="w-full overflow-visible">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <DecryptText
          text="Tech Stack"
          as="h2"
          className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1]"
        />
        <div className="flex items-center gap-2 text-[0.65rem] sm:text-[0.7rem] text-[var(--muted)] border border-dashed border-[var(--border)] rounded-lg px-3 py-2 bg-[rgba(var(--accent-rgb),0.04)] w-full sm:w-auto sm:max-w-fit">
          <MousePointer2 size={14} className="text-[var(--accent2)] shrink-0 animate-pulse" />
          <DecryptText text="Hover any icon for name & proficiency" />
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3.5 sm:p-4 pt-4 sm:pt-5 overflow-visible">
        <div className={`${GRID_CLASS} overflow-visible`}>
          {skillGroups.map((group, groupIdx) => (
            <Fragment key={group.label}>
              <DecryptText
                text={group.label}
                as="p"
                className={`col-span-full w-full text-left text-[0.65rem] text-[var(--muted)] tracking-wide uppercase ${
                  groupIdx > 0 ? 'mt-2 pt-4 border-t border-[var(--border)]' : ''
                }`}
              />
              {group.skills.map((s, skillIdx) => (
                <SkillBadge key={s.name} skill={s} revealDelay={skillIdx * 40} />
              ))}
            </Fragment>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5">
          <span className="text-[0.65rem] uppercase tracking-wide text-[var(--muted)]">Legend</span>
          {Object.entries(PROFICIENCY).map(([label, style]) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-14 h-1 rounded-full bg-[var(--bg3)] overflow-hidden border border-[var(--border)]">
                <div className={`h-full rounded-full ${style.barClass}`} style={{ width: `${style.fill}%` }} />
              </div>
              <span className={`text-[0.65rem] px-1.5 py-0.5 rounded border ${style.badgeClass}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ skill, revealDelay = 0 }) {
  const prof = PROFICIENCY[skill.level];

  return (
    <div className="group/skill relative justify-self-center w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] z-0 hover:z-50 focus-within:z-50">
      <DecryptReveal delay={revealDelay} className="w-full h-full">
        <button
          type="button"
          className="skill-badge relative w-full h-full rounded-xl bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--accent2)] hover:bg-[rgba(var(--accent2-rgb),0.08)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label={`${skill.name}, ${skill.level}`}
        >
          <img
            src={skill.icon}
            alt=""
            width={26}
            height={26}
            className="object-contain transition-transform duration-300 group-hover/skill:scale-110"
          />
        </button>
      </DecryptReveal>

      <div
        className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 min-w-[172px] w-max max-w-[220px] opacity-0 translate-y-1 pointer-events-none transition-all duration-300 group-hover/skill:opacity-100 group-hover/skill:translate-y-0 group-focus-within/skill:opacity-100 group-focus-within/skill:translate-y-0"
        role="tooltip"
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45 bg-[#121218] border-l border-t border-[var(--border)]" />
        <div className="relative rounded-lg border border-[var(--border)] bg-[#121218] px-3 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent opacity-80" />
          <p className="text-xs text-white font-medium mb-2 text-center leading-snug">{skill.name}</p>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[0.65rem] text-[var(--muted)] shrink-0">Proficiency</span>
            <span className={`text-[0.65rem] uppercase tracking-wide px-2 py-0.5 rounded border whitespace-nowrap ${prof.badgeClass}`}>
              {skill.level}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg3)] overflow-hidden border border-[var(--border)]">
            <div className={`h-full rounded-full ${prof.barClass}`} style={{ width: `${prof.fill}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
