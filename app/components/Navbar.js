'use client';

import { useState, useEffect, useRef } from 'react';
import DecryptText from './DecryptText';
import DecryptReveal from './DecryptReveal';

function SectionNavLink({ section, activeSection, onNavigate, variant = 'desktop' }) {
  const isActive = activeSection === section;
  const colorClass = isActive
    ? '!text-[var(--accent)]'
    : 'text-[var(--muted)] hover:!text-[var(--accent2)]';

  const layoutClass =
    variant === 'desktop'
      ? 'group relative font-medium text-base py-5 inline-flex items-center justify-center tracking-wide no-underline cursor-pointer'
      : 'group relative font-medium px-[6vw] text-lg tracking-wide no-underline cursor-pointer block';

  return (
    <a
      href={`#${section}`}
      onClick={(e) => onNavigate(e, section)}
      className={`${layoutClass} ${colorClass}`}
    >
      <span className="relative inline-block uppercase">
        <DecryptText text={section} animateOnMount delay={section === 'home' ? 200 : section === 'about' ? 300 : section === 'projects' ? 400 : 500} />
        <span
          className={`absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-[2px] transition-all duration-300 ease-out ${
            isActive
              ? 'w-full bg-[var(--accent)]'
              : 'w-0 bg-[var(--accent2)] group-hover:w-full'
          }`}
        />
      </span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const links = ['home', 'about', 'projects', 'contact'];

  useEffect(() => {
    const syncNavbarHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          '--navbar-height',
          `${navRef.current.offsetHeight}px`
        );
      }
    };

    syncNavbarHeight();
    window.addEventListener('resize', syncNavbarHeight);
    return () => window.removeEventListener('resize', syncNavbarHeight);
  }, [open]);

  useEffect(() => {
    const getNavbarHeight = () => {
      if (navRef.current?.offsetHeight) {
        return navRef.current.offsetHeight;
      }
      const cssHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
      );
      return cssHeight || 72;
    };

    const handleScroll = () => {
      const navbarHeight = getNavbarHeight();
      const scrollPosition = window.scrollY + navbarHeight + 50;
      
      let currentSection = 'home';
      let minDistance = Infinity;
      
      for (const sectionId of links) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
            currentSection = sectionId;
            break;
          }
          
          const distanceToTop = Math.abs(scrollPosition - offsetTop);
          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    handleScroll();
    
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [links]);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[6vw] py-0 bg-[rgba(13,13,15,0.85)] backdrop-blur-md border-b border-[var(--border)]"
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => handleClick(e, 'home')}
        className="font-medium text-xl text-[var(--text)] no-underline tracking-tight cursor-pointer py-5"
      >
        <DecryptText text="DavidNTD" animateOnMount delay={100} />
      </a>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-12 list-none h-full">
        {links.map(s => (
          <li key={s} className="h-full">
            <SectionNavLink
              section={s}
              activeSection={activeSection}
              onNavigate={handleClick}
              variant="desktop"
            />
          </li>
        ))}

        {/* Resume — special CTA button */}
        <li className="flex items-center">
          <a
            href="/Resume/David Nguyen - Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume"
          >
            <DecryptReveal animateOnMount delay={550}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
            </DecryptReveal>
            <DecryptText text="Resume" animateOnMount delay={600} />
          </a>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(13,13,15,0.97)] border-b border-[var(--border)] flex flex-col gap-4 py-4">
          {links.map(s => (
            <SectionNavLink
              key={s}
              section={s}
              activeSection={activeSection}
              onNavigate={handleClick}
              variant="mobile"
            />
          ))}

          {/* Mobile Resume CTA */}
          <div className="navbar-mobile-resume px-[6vw] pb-1">
            <a
              href="/Resume/David Nguyen - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="navbar-resume"
            >
              <DecryptReveal animateOnMount delay={550}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
              </DecryptReveal>
              <DecryptText text="Resume" animateOnMount delay={600} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}