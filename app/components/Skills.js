'use client';

import { Fragment } from 'react';
import DecryptText from './DecryptText';
import DecryptReveal from './DecryptReveal';

const skillGroups = [
  {
    label: 'Languages & data',
    skills: [
      { name: 'Python', icon: '/icons/Python.svg' },
      { name: 'C#', icon: '/icons/CSharp.svg' },
      { name: 'Java', icon: '/icons/Java.svg' },
      { name: 'HTML', icon: '/icons/HTML.svg' },
      { name: 'CSS', icon: '/icons/CSS.svg' },
      { name: 'JavaScript', icon: '/icons/JavaScript.svg' },
      { name: 'TypeScript', icon: '/icons/TypeScript.svg' },
      { name: 'PostgreSQL', icon: '/icons/PostgreSQL.svg' },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'React', icon: '/icons/React.svg' },
      { name: 'Next.js', icon: '/icons/NextJS.svg' },
    ],
  },
  {
    label: 'Tools & platforms',
    skills: [
      { name: 'Git', icon: '/icons/Git.svg' },
      { name: 'Vercel', icon: '/icons/Vercel.svg' },
      { name: 'Framer', icon: '/icons/Framer.svg' },
      { name: 'Supabase', icon: '/icons/Supabase.svg' },
    ],
  },
];

const GRID_CLASS = 'grid grid-cols-4 sm:grid-cols-8 gap-2';

export default function SkillsBlock() {
  return (
    <div className="w-full">
      <DecryptText
        text="Tech Stack"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className={GRID_CLASS}>
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
      </div>
    </div>
  );
}

function SkillBadge({ skill, revealDelay = 0 }) {
  return (
    <DecryptReveal delay={revealDelay} className="group relative justify-self-center w-[50px] h-[50px] rounded-xl bg-[var(--bg3)] border border-[var(--border)] cursor-default transition-all duration-200 hover:border-[var(--accent2)] hover:bg-[rgba(var(--accent2-rgb),0.08)] hover:-translate-y-1">
      <img src={skill.icon} alt={skill.name} width={26} height={26} className="object-contain" />
      <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 bg-[#1c1c21] text-[var(--text)] text-[0.68rem] tracking-wide py-1 px-2 rounded-[0.35rem] whitespace-nowrap border border-[var(--border)] opacity-0 transition-all duration-200 pointer-events-none z-10 group-hover:opacity-100 group-hover:translate-y-0">
        <DecryptText text={skill.name} />
      </div>
    </DecryptReveal>
  );
}
