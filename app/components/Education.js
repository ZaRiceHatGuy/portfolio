import DecryptText from './DecryptText';

export default function Education() {
  const education = [
    {
      degree: 'Software Development Diploma',
      school: 'SAIT (Southern Alberta Institute of Technology)',
      year: '2024 - 2026',
      gpa: '3.8',
      coursework: ['Object-Oriented Programming', 'Web Development','Mobile Application Development', 'Database', 'Cloud Computing', 'Software Analysis', 'Software Security', 'Software Testing and Deployment']
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
      <DecryptText
        text="Education"
        as="h2"
        className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] mb-4"
      />
      <div className="flex flex-col gap-4">
        {education.map((item, idx) => (
          <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <DecryptText text={item.degree} className="text-[var(--text)] text-sm mb-1 block" />
            <DecryptText text={item.school} className="text-sm text-[var(--accent2)] mb-1 block" />
            <DecryptText
              text={item.year}
              className={`text-xs text-[var(--muted)] block ${item.gpa || item.coursework.length ? 'mb-3' : ''}`}
            />
            {item.gpa && (
              <DecryptText
                text={`GPA: ${item.gpa}`}
                className="text-xs text-[var(--text)] mb-2 pt-1 border-t border-[var(--border)] block"
              />
            )}
            {item.coursework.length > 0 && (
              <DecryptText
                text={`Relevant Coursework: ${item.coursework.join(', ')}`}
                className="text-xs text-[var(--text)] mt-1 leading-relaxed block"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
