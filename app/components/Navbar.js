'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ['home', 'about', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[6vw] py-5 bg-[rgba(13,13,15,0.85)] backdrop-blur-md border-b border-[var(--border)]">
      <Link href="#home" className="font-['Syne'] font-extrabold text-base text-[var(--text)] no-underline tracking-tight">
        DavidNTD<span className="text-[var(--accent)]"></span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map(s => (
          <li key={s}><a href={`#${s}`} className="nav-link">{s}</a></li>
        ))}
        <li>
          <a href="/Resume/David Nguyen - Resume.pdf" target="_blank" className="nav-link">resume</a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer bg-transparent border-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-[2px] bg-[var(--text)] transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block w-5 h-[2px] bg-[var(--text)] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-[2px] bg-[var(--text)] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(13,13,15,0.97)] border-b border-[var(--border)] flex flex-col py-4">
          {links.map(s => (
            <a key={s} href={`#${s}`} className="nav-link px-[6vw] py-3 text-base" onClick={() => setOpen(false)}>{s}</a>
          ))}
          <a href="/Resume/David Nguyen - Resume.pdf" target="_blank" className="nav-link px-[6vw] py-3 text-base" onClick={() => setOpen(false)}>resume</a>
        </div>
      )}
    </nav>
  );
}