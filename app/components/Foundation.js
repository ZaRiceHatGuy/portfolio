import Decrypt from "./Decrypt";
import { PanelCard, PanelLabel, MetaBadge, GpaDisplay, Chip } from "./PanelCard";
import Reveal from "./Reveal";
import { Section } from "./SectionTitle";

const TYPE_VARIANT = {
  Award: "yellow",
  ProgramCert: "accent",
  Certificate: "default",
};

const TYPE_BADGE = {
  Award: "Award",
  ProgramCert: "Program certification",
  Certificate: "Certificate",
};

function EducationCard({ item }) {
  return (
    <PanelCard hover={false} className="p-3 flex flex-col">
      <div className="mb-2">
        <Decrypt text={item.school} className="text-lg text-[var(--accent2)] leading-snug break-words" />
      </div>

      <div className="flex items-start justify-between gap-2 mb-2.5">
        <Decrypt text={item.degree} className="text-white text-xl font-medium leading-snug min-w-0" />
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <MetaBadge variant="muted">{item.year}</MetaBadge>
          <MetaBadge variant={item.statusVariant}>{item.status}</MetaBadge>
        </div>
      </div>

      {item.gpa && (
        <div className="mb-2.5">
          <GpaDisplay value={item.gpa} />
        </div>
      )}

      {item.coursework.length > 0 && (
        <div className="pt-2.5 border-t border-[var(--border)]">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-2">
            <Decrypt text="Relevant coursework" />
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.coursework.map((course) => (
              <Chip key={course}>{course}</Chip>
            ))}
          </div>
        </div>
      )}
    </PanelCard>
  );
}

function AwardCard({ item }) {
  return (
    <PanelCard hover={false} className="p-3 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Decrypt text={item.name} className="text-white text-lg font-medium leading-snug min-w-0" />
        <MetaBadge variant={TYPE_VARIANT[item.type] || "default"}>
          {TYPE_BADGE[item.type] || "Award"}
        </MetaBadge>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
        <Decrypt text={item.issuer} className="text-base text-[var(--accent2)] min-w-0 break-words" />
        <MetaBadge variant="muted">{item.year}</MetaBadge>
      </div>
    </PanelCard>
  );
}

/**
 * Foundation — the Education (left) and Awards & Certifications (right)
 * columns. Every degree and award is its own card under its column label.
 */
export default function Foundation({ education = [], awards = [] }) {
  return (
    <Section id="about" title="Foundations">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="flex flex-col gap-3 h-full min-w-0">
            <PanelLabel>Education</PanelLabel>
            <div className="flex flex-col gap-4">
              {education.map((item, idx) => (
                <Reveal key={idx} delay={idx * 90}>
                  <EducationCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 h-full min-w-0">
            <PanelLabel>Awards & Certifications</PanelLabel>
            <div className="flex flex-col gap-4">
              {awards.map((item, idx) => (
                <Reveal key={idx} delay={idx * 90}>
                  <AwardCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
    </Section>
  );
}
