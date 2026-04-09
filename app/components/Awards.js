export default function Awards() {
  const achievements = [
    { name: 'Team Award for Leadership, Resilience, and Community-Building', issuer: 'Centennial High School Band Award', year: '2024' },
    { name: 'Schulich Ignite', issuer: 'University of Calgary', year: '2022' },
    { name: 'Git Essential Training', issuer: 'LinkedIn Learning', year: '2024' },
    { name: 'Learning Git & GitHub (2021)', issuer: 'LinkedIn Learning', year: '2024' },
  ];

  return (
    <div className="w-full">
      {/* Add mt-8 or adjust this value to push heading down */}
      <div className="h-[clamp(2rem,4vw,3rem)] mb-6 flex items-center mt-9.5">
        <h2 className="font-['Syne'] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-[1.1] whitespace-nowrap">
          Awards & Certifications
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {achievements.map((item, idx) => (
          <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3">
            <div className="font-['Syne'] font-medium text-[var(--text)] text-sm mb-1">{item.name}</div>
            <div className="font-['Syne'] text-xs">
              <span className="text-[#f5c842]">{item.issuer}</span>
              {item.year && <span className="text-[var(--muted)]"> <br />{item.year}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}