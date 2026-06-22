import DecryptText from './DecryptText';
import { PanelCard, PanelLabel, MetaBadge } from './PanelCard';

const achievements = [
  {
    name: 'Team Award for Leadership, Resilience, and Community-Building',
    issuer: 'Centennial High School Band Award',
    year: '2024',
    type: 'Award',
  },
  {
    name: 'Schulich Ignite',
    issuer: 'University of Calgary',
    year: '2022',
    type: 'ProgramCert',
  },
  {
    name: 'Git Essential Training',
    issuer: 'LinkedIn Learning',
    year: '2024',
    type: 'Certificate',
  },
  {
    name: 'Learning Git & GitHub (2021)',
    issuer: 'LinkedIn Learning',
    year: '2024',
    type: 'Certificate',
  },
];

const TYPE_LABEL = {
  Award: 'Recognition',
  ProgramCert: 'Program certification',
  Certificate: 'Certification',
};

const TYPE_VARIANT = {
  Award: 'yellow',
  ProgramCert: 'accent',
  Certificate: 'default',
};

const TYPE_BADGE = {
  Award: 'Award',
  ProgramCert: 'Program certification',
  Certificate: 'Certificate',
};

export default function Awards() {
  return (
    <div className="w-full">
      <DecryptText
        text="Awards & Certifications"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="flex flex-col gap-3">
        {achievements.map((item, idx) => (
          <PanelCard key={idx} className="p-3.5 group">
            <div className="flex items-start justify-between gap-2 mb-2">
              <PanelLabel>{TYPE_LABEL[item.type]}</PanelLabel>
              <MetaBadge variant={TYPE_VARIANT[item.type]}>{TYPE_BADGE[item.type]}</MetaBadge>
            </div>

            <DecryptText
              text={item.name}
              className="text-white text-sm font-medium mb-2 block leading-snug group-hover:text-[var(--accent2)] transition-colors duration-300"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--border)]">
              <DecryptText text={item.issuer} className="text-xs text-[var(--accent2)] min-w-0 break-words" />
              <MetaBadge variant="muted">{item.year}</MetaBadge>
            </div>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}
