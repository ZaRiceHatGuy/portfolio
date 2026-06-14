import DecryptText from './DecryptText';

const strengths = [
  'Teamwork',
  'Technical communication',
  'Mentorship',
  'Problem-solving',
  'Analytical thinking',
];

export default function About() {
  return (
    <div>
      <DecryptText
        text="About Me"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4 text-white"
      />
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className="space-y-3">
          <DecryptText
            text="Hello, my name is Thai Duong Nguyen, commonly known as David, and I am a Software Development student from SAIT. I began exploring programming in high school, picking up various languages, while checking out embedded systems with Arduino."
            as="p"
            className="text-white leading-relaxed text-sm"
          />
          <DecryptText
            text="I focus on front-end development and database systems, with growing interests in AI and embedded/robotics systems. I enjoy working across the full development process, from planning and design to testing and deployment."
            as="p"
            className="text-white leading-relaxed text-sm"
          />
          <DecryptText
            text="Outside of tech, I enjoy playing piano and chess, and exploring history and astronomy."
            as="p"
            className="text-white leading-relaxed text-sm"
          />

          <div className="border-t border-[var(--border)]">
            <DecryptText
              text={`Strengths: ${strengths.join(', ')}`}
              as="p"
              className="text-xs text-[var(--text)] pt-5"
            />
            <DecryptText
              text="Languages: English, Vietnamese"
              as="p"
              className="text-xs text-[var(--text)] pt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
