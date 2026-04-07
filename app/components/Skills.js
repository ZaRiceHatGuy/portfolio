// Skills.js
'use client';

const skills = [
  { name: 'HTML5', icon: '/icons/HTML.svg' },
  { name: 'CSS3', icon: '/icons/CSS.svg' },
  { name: 'JavaScript', icon: '/icons/JavaScript.svg' },
  { name: 'Python', icon: '/icons/Python.svg' },
  { name: 'C#', icon: '/icons/CSharp.svg' },
  { name: 'Java', icon: '/icons/Java.svg' },
  { name: 'PostgreSQL', icon: '/icons/PostgreSQL.svg' },
  { name: 'React', icon: '/icons/React.svg' },
  { name: 'Next.js', icon: '/icons/Next.js.svg' },
  { name: 'Vercel', icon: '/icons/Vercel.svg' },
  { name: 'Firebase', icon: '/icons/Firebase.svg' },
  { name: 'Supabase', icon: '/icons/Supabase.svg' },
  { name: 'VS Code', icon: '/icons/VSCode.svg' },
  { name: 'Git', icon: '/icons/Git.svg' },
];

export default function SkillsBlock() {
  const columnsPerRow = 7;
  const remainingItems = columnsPerRow - (skills.length % columnsPerRow);
  const placeholders = remainingItems === columnsPerRow ? 0 : remainingItems;

  return (
    <div className="w-full flex flex-col">
      <div className="h-[clamp(2rem,4vw,3rem)] mb-6 flex items-center">
        <h2 className="font-['Syne'] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-[1.1]">
          Tech Stack
        </h2>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 md:p-5">
        <div className="grid grid-cols-7 gap-2 md:gap-2.5 justify-items-center">
          {skills.map((s) => <SkillBadge key={s.name} skill={s} />)}
          {[...Array(placeholders)].map((_, i) => (
            <div key={`placeholder-${i}`} className="w-full aspect-square max-w-[50px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ skill }) {
  return (
    <div className="group relative w-full aspect-square max-w-[50px] rounded-xl bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center cursor-default transition-all duration-200 hover:border-[rgba(47,127,255,0.5)] hover:bg-[rgba(47,127,255,0.08)] hover:-translate-y-1">
      <img src={skill.icon} alt={skill.name} width={26} height={26} className="object-contain" />
      <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 bg-[#1c1c21] text-[var(--text)] text-[0.68rem] tracking-wide py-1 px-2 rounded-[0.35rem] whitespace-nowrap border border-[var(--border)] opacity-0 transition-all duration-200 pointer-events-none z-10 group-hover:opacity-100 group-hover:translate-y-0">
        {skill.name}
      </div>
    </div>
  );
}