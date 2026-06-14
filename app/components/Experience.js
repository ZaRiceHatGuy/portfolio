import DecryptText from './DecryptText';

export default function Experience() {
  const experiences = [
    {
      role: 'Web Designer/Developer Apprentice',
      org: 'Frontier Industries',
      location: 'London, England, UK (Remote)',
      period: 'Apr 2026 - Jul 2026',
      bullets: [
        'Audited the existing site, documented findings, and built a full redesign from scratch aligned with the existing brand structure.',
        "Learned Framer and TypeScript to develop custom code components, enabling more flexible and dynamic UI within Framer's environment.",
      ],
    },
    {
      role: 'Section Leader - Percussion',
      org: 'Centennial High School Band',
      location: 'Calgary, AB',
      period: 'Sep 2023 - Jun 2024',
      bullets: [
        "Led weekly rehearsals for a percussion section with a total of 11 members and mentored 8 junior members throughout the school year.",
        'Ensure the group follows the conductor and stays on track with the rest of the band during rehearsals and concert performances.',
      ],
    },
  ];

  return (
    <div>
      <DecryptText
        text="Experience"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="flex flex-col gap-4">
        {experiences.map((item, idx) => (
          <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <DecryptText text={item.role} className="text-[var(--text)] text-sm mb-1 block" />
            <DecryptText text={item.org} className="text-sm text-[var(--accent2)] mb-1 block" />
            <DecryptText
              text={`${item.location} · ${item.period}`}
              className="text-xs text-[var(--muted)] mb-2 block"
            />
            <ul className="text-xs text-[var(--text)] leading-relaxed space-y-1.5 list-disc pl-4">
              {item.bullets.map((bullet, bulletIdx) => (
                <li key={bulletIdx}>
                  <DecryptText text={bullet} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
