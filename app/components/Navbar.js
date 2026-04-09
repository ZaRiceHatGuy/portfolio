'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const links = ['home', 'about', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 80;
      const scrollPosition = window.scrollY + navbarHeight + 50; // Add offset for better detection
      
      // Find which section is currently in view
      let currentSection = 'home';
      let minDistance = Infinity;
      
      for (const sectionId of links) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          // Check if scroll position is within this section
          if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
            currentSection = sectionId;
            break;
          }
          
          // Find closest section if between sections
          const distanceToTop = Math.abs(scrollPosition - offsetTop);
          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener with throttling for performance
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
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [links]);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[6vw] py-0 bg-[rgba(13,13,15,0.85)] backdrop-blur-md border-b border-[var(--border)]">
      <a 
        href="#home" 
        onClick={(e) => handleClick(e, 'home')}
        className="font-['Syne'] font-extrabold text-lg text-[var(--text)] no-underline tracking-tight cursor-pointer py-5"
      >
        DavidNTD<span className="text-[var(--accent)]"></span>
      </a>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-0 list-none h-full">
        {links.map(s => (
          <li key={s} className="h-full flex-1 min-w-[100px]">
            <a 
              href={`#${s}`} 
              onClick={(e) => handleClick(e, s)}
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              className={`nav-link capitalize text-sm md:text-base px-6 py-5 inline-flex items-center justify-center w-full h-full ${
                activeSection === s 
                  ? '!text-blue-500 bg-blue-500/20 border-b-2 border-blue-500' 
                  : 'text-[var(--muted)] hover:!text-[#f5c842] hover:bg-yellow-500/20 hover:border-b-2 hover:border-[#f5c842]'
              }`}
            >
              {s}
            </a>
          </li>
        ))}
        <li className="h-full flex-1 min-w-[100px]">
          <a 
            href="/Resume/David Nguyen - Resume.pdf" 
            target="_blank" 
            style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            className="nav-link text-sm md:text-base px-6 py-5 inline-flex items-center justify-center w-full h-full text-[var(--muted)] hover:!text-[#f5c842] hover:bg-yellow-500/20 hover:border-b-2 hover:border-[#f5c842]"
          >
            resume
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(13,13,15,0.97)] border-b border-[var(--border)] flex flex-col py-4">
          {links.map(s => (
            <a 
              key={s} 
              href={`#${s}`} 
              onClick={(e) => handleClick(e, s)}
              style={{ transition: 'all 0.3s ease' }}
              className={`nav-link px-[6vw] py-3 text-base md:text-lg capitalize ${
                activeSection === s 
                  ? '!text-blue-500 bg-blue-500/20 border-l-4 border-blue-500' 
                  : 'text-[var(--muted)] hover:!text-[#f5c842] hover:bg-yellow-500/20'
              }`}
            >
              {s}
            </a>
          ))}
          <a 
            href="/Resume/David Nguyen - Resume.pdf" 
            target="_blank" 
            style={{ transition: 'all 0.3s ease' }}
            className="nav-link px-[6vw] py-3 text-base md:text-lg text-[var(--muted)] hover:!text-[#f5c842] hover:bg-yellow-500/20"
            onClick={() => setOpen(false)}
          >
            resume
          </a>
        </div>
      )}
    </nav>
  );
}