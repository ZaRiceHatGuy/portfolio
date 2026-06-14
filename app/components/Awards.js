import DecryptText from './DecryptText';

export default function Awards() {
  const achievements = [
    { name: 'Team Award for Leadership, Resilience, and Community-Building', issuer: 'Centennial High School Band Award', year: '2024' },
    { name: 'Schulich Ignite', issuer: 'University of Calgary', year: '2022' },
    { name: 'Git Essential Training', issuer: 'LinkedIn Learning', year: '2024' },
    { name: 'Learning Git & GitHub (2021)', issuer: 'LinkedIn Learning', year: '2024' },
  ];

  return (
    <div className="w-full">
      <DecryptText
        text="Awards & Certifications"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="flex flex-col gap-3">
        {achievements.map((item, idx) => (
          <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3">
            <DecryptText text={item.name} className="text-[var(--text)] text-sm mb-1 block" />
            <div className="text-xs">
              <DecryptText text={item.issuer} className="text-[var(--accent2)]" />
              {item.year && (
                <DecryptText text={item.year} className="text-[var(--muted)] block" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
