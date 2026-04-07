export default function Education() {
  const education = [
    {
      degree: 'Software Development Diploma',
      school: 'SAIT (Southern Alberta Institute of Technology)',
      year: '2024 - 2026',
      gpa: '3.7',
      coursework: ['Web Development', 'Object-Oriented Programming', 'Database', 'Cloud Computing', 'Software Analysis', 'Security', 'Testing and Deployment']
    },
    {
      degree: 'Integrated Artificial Intelligence Post-Diploma Certificate',
      school: 'SAIT (Southern Alberta Institute of Technology)',
      year: '2026 - 2027',
      gpa: null,
      coursework: []
    },
  ];

  return (
    <div>
      <h2 className="font-['Syne'] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-[1.1] mb-6">
        Education
      </h2>
      <div className="flex flex-col gap-4">
        {education.map((item, idx) => (
          <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-['Syne'] font-semibold text-[var(--text)] text-sm mb-1">{item.degree}</div>
            <div className="font-['Syne'] text-sm text-[var(--accent2)] mb-1">{item.school}</div>
            <div className={`font-['Syne'] text-xs text-[var(--muted)] ${item.gpa || item.coursework.length ? 'mb-3' : ''}`}>{item.year}</div>
            {item.gpa && (
              <div className="font-['Syne'] text-xs text-[var(--text)] mb-2 pt-1 border-t border-[var(--border)]">
                <strong>GPA:</strong> {item.gpa}
              </div>
            )}
            {item.coursework.length > 0 && (
              <div className="font-['Syne'] text-xs text-[var(--muted)] mt-1 leading-relaxed">
                <strong className="text-[var(--text)]">Relevant Coursework:</strong>{' '}
                {item.coursework.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}