import DecryptText from './DecryptText';
import { PanelCard, PanelLabel, MetaBadge } from './PanelCard';

const experiences = [
  {
    role: 'Web Designer/Developer Apprentice',
    org: 'Frontier Industries',
    location: 'London, England, UK (Remote)',
    period: 'Apr 2026 - Jul 2026',
    type: 'Tech',
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
    type: 'Leadership',
    bullets: [
      'Led weekly rehearsals for a percussion section with a total of 11 members and mentored 8 junior members throughout the school year.',
      'Ensured the group follows the conductor and stays on track with the rest of the band during rehearsals and concert performances.',
    ],
  },
];

export default function Experience() {
  return (
    <div>
      <DecryptText
        text="Experience"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="flex flex-col gap-4">
        {experiences.map((item, idx) => (
          <PanelCard key={idx} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <PanelLabel>{idx === 0 ? 'Latest role' : 'Prior role'}</PanelLabel>
              <MetaBadge variant={item.type === 'Tech' ? 'accent' : 'yellow'}>
                {item.type}
              </MetaBadge>
            </div>

            <DecryptText text={item.role} className="text-white text-sm font-medium mb-1.5 block leading-snug" />
            <DecryptText text={item.org} className="text-sm text-[var(--accent2)] mb-3 block" />

            <div className="flex flex-wrap gap-1.5 mb-3">
              <MetaBadge variant="muted">{item.period}</MetaBadge>
              <MetaBadge variant="default">{item.location}</MetaBadge>
            </div>

            <ul className="pt-3 border-t border-[var(--border)] space-y-2">
              {item.bullets.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="flex gap-2 text-xs text-[var(--text)] leading-relaxed">
                  <span className="text-[var(--accent)] shrink-0 mt-px">›</span>
                  <DecryptText text={bullet} />
                </li>
              ))}
            </ul>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}
