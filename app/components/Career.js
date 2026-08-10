import Decrypt from './Decrypt';
import { PanelCard } from './PanelCard';
import Reveal from './Reveal';
import { Section } from './SectionTitle';

const DEFAULT_ITEMS = [
  {
    category: 'Experience',
    org: 'Frontier Industries',
    location: 'London, England, UK (Remote)',
    role: 'Web Designer/Developer Apprentice',
    period: 'Apr 2026 - Jul 2026',
    bullets: [
      'Audited the existing site, documented findings, and built a full redesign from scratch aligned with the existing brand structure.',
      "Learned Framer and TypeScript to develop custom code components, enabling more flexible and dynamic UI within Framer's environment.",
    ],
  },
  {
    category: 'Activities',
    org: 'Centennial High School Band',
    location: 'Calgary, Alberta, Canada',
    role: 'Section Leader - Percussion',
    period: 'Sep 2023 - Jun 2024',
    bullets: [
      'Led weekly rehearsals for a percussion section with a total of 11 members and mentored 8 junior members throughout the school year.',
      'Ensured the group follows the conductor and stays on track with the rest of the band during rehearsals and concert performances.',
    ],
  },
  {
    category: 'Activities',
    role: 'MegaHacks Hackathon',
    org: 'MegaHacks',
    location: 'Calgary, Alberta, Canada',
    period: 'January 2026',
    bullets: [
      'Job-matching platform connecting shelter residents with local businesses offering employment opportunities, built in 2 days',
      'Contributed frontend pages as part of a small team under tight hackathon constraints',
    ],
  },
];

function CareerEntries({ items }) {
  return (
    <div className="h-full min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {items.map((item, idx) => (
          <Reveal key={idx} delay={idx * 90}>
          <PanelCard hover={false} className="p-3 flex flex-col">
            <div className="mb-2">
              <Decrypt
                text={item.category || 'Career'}
                className="font-pixel text-[0.7rem] uppercase tracking-[0.14em] text-[var(--accent2)]"
              />
            </div>

            <div className="flex items-start justify-between gap-2 mb-1.5">
              <Decrypt text={item.org} className="text-lg text-white font-medium leading-snug min-w-0" />
              <Decrypt text={item.location} className="text-base text-[var(--muted)] shrink-0" />
            </div>

            <div className="flex items-start justify-between gap-2 mb-3">
              <Decrypt text={item.role} className="text-lg text-[var(--accent2)] leading-snug min-w-0" />
              <Decrypt text={item.period} className="text-base text-[var(--muted)] shrink-0" />
            </div>

            {item.bullets?.length > 0 && (
              <ul className="pt-2.5 border-t border-[var(--border)] space-y-2">
                {item.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex gap-2 text-base text-[var(--text)] leading-relaxed">
                    <span className="text-[var(--accent)] shrink-0 mt-px">›</span>
                    <Decrypt text={bullet} />
                  </li>
                ))}
              </ul>
            )}
          </PanelCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Career — one list of every professional entry (jobs, internships,
 * leadership, activities). Each entry is its own card, titled by its
 * category, with company left / location right and role left / period right.
 */
export default function Career({ items = DEFAULT_ITEMS }) {
  return (
    <Section id="experience" title="Career Log">
      <CareerEntries items={items} />
    </Section>
  );
}
