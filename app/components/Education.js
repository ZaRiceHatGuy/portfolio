import DecryptText from './DecryptText';
import { PanelCard, MetaBadge, GpaDisplay, Chip } from './PanelCard';

const education = [
  {
    degree: 'Software Development Diploma',
    school: 'SAIT (Southern Alberta Institute of Technology)',
    year: '2024 - 2026',
    gpa: 3.8,
    status: 'Completed',
    statusVariant: 'accent',
    coursework: [
      'Object-Oriented Programming',
      'Web Development',
      'Mobile Application Development',
      'Database',
      'Cloud Computing',
      'Software Analysis',
      'Software Security',
      'Software Testing and Deployment',
    ],
  },
  {
    degree: 'Integrated Artificial Intelligence Post-Diploma Certificate',
    school: 'SAIT (Southern Alberta Institute of Technology)',
    year: '2026 - 2027',
    gpa: null,
    status: 'Upcoming',
    statusVariant: 'yellow',
    coursework: [],
  },
];

export default function Education() {
  return (
    <div>
      <DecryptText
        text="Education"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="flex flex-col gap-4">
        {education.map((item, idx) => (
          <PanelCard key={idx} className="p-4">
            <DecryptText text={item.degree} className="text-white text-sm font-medium mb-2 block leading-snug" />
            <DecryptText text={item.school} className="text-sm text-[var(--accent2)] mb-3 block leading-snug break-words" />

            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <MetaBadge variant="muted">{item.year}</MetaBadge>
              <MetaBadge variant={item.statusVariant}>{item.status}</MetaBadge>
            </div>

            {item.gpa && (
              <div className="mb-3">
                <GpaDisplay value={item.gpa} />
              </div>
            )}

            {item.coursework.length > 0 && (
              <div className="pt-3 border-t border-[var(--border)]">
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-2">
                  Relevant coursework
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.coursework.map((course) => (
                    <Chip key={course}>
                      <DecryptText text={course} />
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </PanelCard>
        ))}
      </div>
    </div>
  );
}
