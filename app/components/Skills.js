'use client';

import { Fragment, useEffect, useState } from 'react';
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

const HEADER_CARD_CLASS =
  'rounded-lg px-3 py-2.5 min-h-[2.875rem] h-full border';

function HintCard() {
  return (
    <div
      className={`${HEADER_CARD_CLASS} flex items-center gap-2 text-[0.65rem] sm:text-[0.7rem] text-[var(--muted)] border-dashed border-[var(--border)] bg-[rgba(var(--accent-rgb),0.04)] w-full lg:w-auto lg:max-w-fit`}
    >
      <MousePointer2 size={14} className="text-[var(--accent2)] shrink-0 animate-pulse" />
      <span className="md:hidden">
        <DecryptText text="Tap any icon for name & proficiency" />
      </span>
      <span className="hidden md:inline">
        <DecryptText text="Hover any icon for name & proficiency" />
      </span>
    </div>
  );
}

function LegendCard() {
  const barTrackClass =
    'w-14 shrink-0 h-1 rounded-full bg-[var(--card)] overflow-hidden border border-[var(--border)]';

  return (
    <div
      className={`${HEADER_CARD_CLASS} flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.65rem] border-[var(--border)] bg-[var(--bg3)] w-full lg:w-auto lg:max-w-fit`}
    >
      {Object.entries(PROFICIENCY).map(([label, style]) => (
        <div key={label} className="flex items-center gap-2">
          <span className={`px-1.5 py-0.5 rounded border whitespace-nowrap ${style.badgeClass}`}>
            {label}
          </span>
          <div className={barTrackClass}>
            <div className={`h-full rounded-full ${style.barClass}`} style={{ width: `${style.fill}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SkillsBlock() {
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    if (!activeSkill) return;

    const handlePointerDown = (e) => {
      if (!e.target.closest('[data-skill-badge]')) {
        setActiveSkill(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeSkill]);

  return (
    <div className="w-full overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-3 lg:gap-4 mb-4 items-stretch">
        <DecryptText
          text="Tech Stack"
          as="h2"
          className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] lg:justify-self-start lg:self-end"
        />
        <div className="lg:justify-self-center w-full lg:w-auto flex lg:justify-center h-full">
          <HintCard />
        </div>
        <div className="lg:justify-self-end w-full lg:w-auto flex lg:justify-end h-full">
          <LegendCard />
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
                <SkillBadge
                  key={s.name}
                  skill={s}
                  revealDelay={skillIdx * 40}
                  isActive={activeSkill === s.name}
                  onActivate={() => setActiveSkill((current) => (current === s.name ? null : s.name))}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ skill, revealDelay = 0, isActive = false, onActivate }) {
  const prof = PROFICIENCY[skill.level];

  return (
    <div
      data-skill-badge
      className={`group/skill relative justify-self-center w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] ${
        isActive ? 'z-50' : 'z-0'
      } hover:z-50 focus-within:z-50`}
    >
      <DecryptReveal delay={revealDelay} className="w-full h-full">
        <button
          type="button"
          onClick={() => {
            if (window.matchMedia('(max-width: 767px)').matches) {
              onActivate();
            }
          }}
          aria-expanded={isActive}
          className={`skill-badge relative w-full h-full rounded-xl bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--accent2)] hover:bg-[rgba(var(--accent2-rgb),0.08)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] max-md:active:border-[var(--accent2)] max-md:active:bg-[rgba(var(--accent2-rgb),0.08)] ${
            isActive
              ? 'max-md:border-[var(--accent2)] max-md:bg-[rgba(var(--accent2-rgb),0.08)] max-md:-translate-y-1 max-md:shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
              : ''
          }`}
          aria-label={`${skill.name}, ${skill.level}`}
        >
          <img
            src={skill.icon}
            alt=""
            width={26}
            height={26}
            className={`object-contain transition-transform duration-300 group-hover/skill:scale-110 ${
              isActive ? 'max-md:scale-110' : ''
            }`}
          />
        </button>
      </DecryptReveal>

      <div
        className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 min-w-[172px] w-max max-w-[220px] transition-all duration-300 max-md:pointer-events-none md:opacity-0 md:translate-y-1 md:group-hover/skill:opacity-100 md:group-hover/skill:translate-y-0 md:group-focus-within/skill:opacity-100 md:group-focus-within/skill:translate-y-0 ${
          isActive ? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:translate-y-1'
        }`}
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
