import Decrypt from './Decrypt';
import { PanelCard } from './PanelCard';
import Reveal from './Reveal';
import { Section } from './SectionTitle';

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
export default function Career({ items = [] }) {
  return (
    <Section id="experience" title="Career Log">
      <CareerEntries items={items} />
    </Section>
  );
}
