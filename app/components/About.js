import DecryptText from './DecryptText';
import { PanelCard, PanelLabel, Chip } from './PanelCard';

const strengths = [
  'Teamwork',
  'Technical communication',
  'Mentorship',
  'Problem-solving',
  'Analytical thinking',
];

const paragraphs = [
  'Hello, my name is Thai Duong Nguyen, commonly known as David. I started exploring programming in high school through Python and Lua for Roblox game development, then expanded into robotics with Arduino and C++.',
  'Studying Software Development at SAIT shifted my focus toward front-end development and database systems, where I work with React, Next.js, Supabase, and PostgreSQL, with a growing interest in artificial intelligence.',
  'Outside of technology, I enjoy playing piano and chess, as well as exploring history and astronomy. Like a pianist performing both solo and with a band, I enjoy both independent work and collaboration.',
];

export default function About() {
  return (
    <div>
      <DecryptText
        text="About Me"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4 text-white"
      />
      <PanelCard className="p-4">
        <PanelLabel>Profile</PanelLabel>
        <div className="space-y-3 mb-4">
          {paragraphs.map((text, idx) => (
            <div
              key={idx}
              className="group relative pl-3 border-l-2 border-[var(--border)] transition-colors duration-300 hover:border-[var(--accent2)]"
            >
              <DecryptText
                text={text}
                as="p"
                className="text-white leading-relaxed text-sm"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[var(--border)] space-y-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-2">Strengths</p>
            <div className="flex flex-wrap gap-1.5">
              {strengths.map((s) => (
                <Chip key={s}>
                  <DecryptText text={s} />
                </Chip>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-2">Languages</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip>English</Chip>
              <Chip>Vietnamese</Chip>
            </div>
          </div>
        </div>
      </PanelCard>
    </div>
  );
}
