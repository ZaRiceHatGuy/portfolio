import Decrypt from './Decrypt';
import { PanelCard } from './PanelCard';
import Reveal from './Reveal';
import { Section } from './SectionTitle';

// @sync-start career
export const DEFAULT_ITEMS = [
  {
    "category": "Experience",
    "org": "Frontier Industries",
    "location": "London, England, UK (Remote)",
    "role": "Web Development Intern",
    "period": "Apr 2026 - Jul 2026",
    "bullets": [
      "Audited the existing site, documented findings, and built a full redesign from scratch aligned with the existing brand structure.",
      "Learned Framer and TypeScript to develop custom code components, enabling more flexible and dynamic UI within Framer's environment."
    ]
  },
  {
    "category": "Activity",
    "org": "Centennial High School Band",
    "location": "Calgary, Alberta, Canada",
    "role": "Section Leader - Percussion",
    "period": "Sep 2023 - Jun 2024",
    "bullets": [
      "Led weekly rehearsals for a percussion section with a total of 11 members and mentored 8 junior members throughout the school year.",
      "Ensured the group follows the conductor and stays on track with the rest of the band during rehearsals and concert performances."
    ]
  },
  {
    "category": "Activity",
    "role": "MegaByte Hackathon",
    "org": "MegaHacks",
    "location": "Calgary, Alberta, Canada",
    "period": "January 2026",
    "bullets": [
      "Owned UI design and implementation across the entire platform, translating the team's job-matching concept into a functional interface connecting shelter residents with local employers",
      "Contributed to shaping the product direction through team discussions and ideation, helping define how the platform would address the shelter-to-employment matching problem",
      "Competed against 17 teams in a 2-day build sprint, placing close to the top 8 in a competitive field"
    ]
  },
  {
    "category": "Activity",
    "role": "Cursor Calgary Hackathon",
    "org": "MegaHacks and Cursor",
    "location": "Calgary, Alberta, Canada",
    "period": "May 2026",
    "bullets": [
      "Built UI across all pages except the account page, and led QA testing to ensure smooth, correct end-to-end user flows before submission",
      "Competed in a hackathon format requiring Cursor as the sole development tool, adapting to an AI-assisted coding workflow under time pressure",
      "Scored 75 against a top-8 cutoff of 80, competing against 37 teams"
    ]
  }
];
// @sync-end

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
