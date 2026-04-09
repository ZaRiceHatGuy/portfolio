export default function About() {
  return (
    <div>
      <h2 className="font-['Syne'] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-[1.1] mb-6">
        About Me
      </h2>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className="space-y-3">
          <p className="text-[var(--muted)] leading-relaxed text-sm">
            Hello, I&apos;m <strong className="text-[var(--text)] font-medium">Thai Duong (David) Nguyen</strong>, a Software Development student at SAIT.
            I began programming with Python in high school, and Lua for making Roblox games,
            while also exploring embedded systems with Arduino and C++.
          </p>
          <p className="text-[var(--muted)] leading-relaxed text-sm">
            I focus on front-end development and database systems, with growing interests in AI and embedded/robotics systems.
            I enjoy working across the full development process, from planning and design to testing and deployment.
          </p>
          <p className="text-[var(--muted)] leading-relaxed text-sm">
            Outside of tech, I enjoy <strong className="text-[var(--text)] font-medium">piano, chess, and exploring history, philosophy, and astronomy</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}