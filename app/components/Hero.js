"use client";
import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Mail, Phone, FileText } from 'lucide-react';
import DecryptText from './DecryptText';
import DecryptReveal from './DecryptReveal';
import { PanelCard, PanelLabel } from './PanelCard';

const GitHubIcon = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const contactItems = [
  { Icon: MapPin, text: 'Calgary, AB, Canada', href: null, delay: 1400 },
  { Icon: Phone, text: '+1 (403) 827-2659', href: 'tel:+14038272659', delay: 1500 },
  { Icon: Mail, text: 'davidnguyen107206@gmail.com', href: 'mailto:davidnguyen107206@gmail.com', delay: 1600 },
];

const contactCardBase =
  'group flex gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--bg3)] hover:border-[rgba(var(--accent2-rgb),0.55)] transition-all duration-300 h-full min-w-0';

const contactCardClass = `${contactCardBase} items-center`;

const iconSlotClass = 'w-8 h-8 shrink-0 flex items-center justify-center';

const iconBoxClass =
  `${iconSlotClass} rounded-lg bg-[var(--bg3)] border border-[var(--border)] group-hover:border-[var(--accent2)] group-hover:bg-[rgba(var(--accent2-rgb),0.08)] transition-colors duration-300`;

const iconClass =
  'text-[var(--accent)] group-hover:text-[var(--accent2)] transition-colors duration-300';

function ContactRow({ Icon, text, href, delay }) {
  const content = (
    <>
      <DecryptReveal animateOnMount delay={delay}>
        <div className={iconBoxClass}>
          <Icon size={15} className={iconClass} />
        </div>
      </DecryptReveal>
      <DecryptText text={text} animateOnMount delay={delay} className="text-[0.7rem] sm:text-xs text-[var(--text)] leading-snug min-w-0 break-words" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${contactCardClass} no-underline`}>
        {content}
      </a>
    );
  }

  return <div className={contactCardClass}>{content}</div>;
}

function HeroActions() {
  return (
    <div className="flex items-stretch gap-2 h-full min-h-[2.75rem] sm:min-h-0 self-stretch w-full">
      <a
        href="/Resume/David Nguyen - Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={`${contactCardClass} flex-1 min-w-0 h-full no-underline`}
      >
        <DecryptReveal animateOnMount delay={1750}>
          <span className={iconSlotClass}>
            <FileText size={15} className={iconClass} />
          </span>
        </DecryptReveal>
        <DecryptText text="Resume" animateOnMount delay={1800} className="text-[0.7rem] sm:text-xs text-[var(--text)] leading-snug" />
      </a>
      <a
        href="https://github.com/ZaRiceHatGuy"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        className={`${contactCardClass} aspect-square h-full min-w-[2.75rem] shrink-0 justify-center no-underline`}
      >
        <DecryptReveal animateOnMount delay={1900}>
          <GitHubIcon className={iconClass} />
        </DecryptReveal>
      </a>
      <a
        href="http://www.linkedin.com/in/davidntd"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        className={`${contactCardClass} aspect-square h-full min-w-[2.75rem] shrink-0 justify-center no-underline`}
      >
        <DecryptReveal animateOnMount delay={2000}>
          <LinkedInIcon className={iconClass} />
        </DecryptReveal>
      </a>
    </div>
  );
}

export default function Hero() {
  const [displayName, setDisplayName] = useState('');
  const nameRef = useRef(null);
  const introCardRef = useRef(null);

  const fitNameToIntro = useCallback(() => {
    const nameEl = nameRef.current;
    const introEl = introCardRef.current;
    if (!nameEl || !introEl || !displayName) return;

    if (window.matchMedia('(max-width: 767px)').matches) {
      nameEl.style.fontSize = '';
      return;
    }

    const maxWidth = introEl.getBoundingClientRect().width;
    if (maxWidth <= 0) return;

    nameEl.style.fontSize = '16px';
    const baseWidth = nameEl.scrollWidth;
    if (baseWidth <= 0) return;

    let size = Math.floor((16 * maxWidth) / baseWidth);
    size = Math.max(16, Math.min(size, 128));
    nameEl.style.fontSize = `${size}px`;

    while (nameEl.scrollWidth <= maxWidth && size < 128) {
      size += 1;
      nameEl.style.fontSize = `${size}px`;
    }
    if (nameEl.scrollWidth > maxWidth) {
      nameEl.style.fontSize = `${size - 1}px`;
    }
  }, [displayName]);

  useEffect(() => {
    let cancelled = false;
    const runFit = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) fitNameToIntro();
        });
      });
    };

    runFit();
    document.fonts?.ready.then(runFit);

    const introEl = introCardRef.current;
    const observer = introEl ? new ResizeObserver(runFit) : null;
    observer?.observe(introEl);
    window.addEventListener('resize', runFit);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener('resize', runFit);
    };
  }, [fitNameToIntro]);

  useEffect(() => { setTimeout(() => startFullTransition(), 500); }, []);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const smoothFlicker = (targetText, duration, onComplete) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      const flickeredText = targetText.split('').map(char =>
        char === ' ' ? ' ' : (Math.random() < 0.9 * Math.pow(1 - progress, 0.8) ? getRandomChar() : char)
      ).join('');
      setDisplayName(flickeredText);
      if (progress >= 1) { clearInterval(interval); setDisplayName(targetText); onComplete?.(); }
    }, 60);
  };

  const bridgeTransition = (oldText, targetText, duration, onComplete) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      if (progress < 0.35) {
        const dissolveProgress = progress / 0.35;
        const dissolved = oldText.split('').map(char =>
          char === ' ' ? ' ' : (Math.random() < dissolveProgress * 0.9 ? getRandomChar() : char)
        ).join('');
        setDisplayName(dissolved);
      } else {
        const typeProgress = Math.pow((progress - 0.35) / 0.65, 0.7);
        const typed = Math.floor(typeProgress * targetText.length);
        const flickered = targetText.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < typed) return Math.random() < 0.25 * (1 - typeProgress) ? getRandomChar() : char;
          return Math.random() < 0.4 ? getRandomChar() : '·';
        }).join('');
        setDisplayName(flickered);
      }
      if (progress >= 1) { clearInterval(interval); setDisplayName(targetText); onComplete?.(); }
    }, 35);
  };

  const startFullTransition = () => {
    const steps = [
      { text: '太陽(大衛)阮', duration: 500 },
      { text: '태양(데이비드)원', duration: 500 },
      { text: 'たいよう(デビッド)げん', duration: 500 },
    ];
    let stepIndex = 0;
    const processStep = () => {
      if (stepIndex < steps.length) {
        smoothFlicker(steps[stepIndex].text, steps[stepIndex].duration, () => { stepIndex++; processStep(); });
      } else {
        bridgeTransition('たいよう(デビッド)げん', 'Thái Dương (David) Nguyễn', 1500, () => {});
      }
    };
    processStep();
  };

  return (
    <div id="home" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 relative">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-6 md:gap-10 items-stretch">
          <div className="order-2 md:order-none flex flex-col min-w-0 gap-3 sm:gap-4 overflow-hidden">
            <div className="w-full min-w-0 overflow-hidden md:overflow-visible">
              <h1
                ref={nameRef}
                className="w-full md:w-max max-w-full min-w-0 max-md:text-[clamp(1.75rem,7.5vw,2.5rem)] leading-tight tracking-tight text-[var(--text)] max-md:whitespace-normal md:whitespace-nowrap"
              >
                {displayName}
              </h1>
            </div>
            <PanelCard ref={introCardRef} className="flex-1 flex flex-col px-3.5 sm:px-4 pt-4 pb-3 min-w-0" hover={false}>
              <PanelLabel>Introduction</PanelLabel>
              <div className="pl-3 border-l-2 border-[var(--border)] mb-3">
                <DecryptText
                  as="p"
                  animateOnMount
                  delay={1200}
                  text="Junior Web Developer specializing in React and Next.js. Experience integrating Supabase and PostgreSQL for data and backend services. Interested in robotics and artificial intelligence. Open to co-op/internship opportunities."
                  className="text-sm text-[var(--text)] leading-relaxed"
                />
              </div>
              <div className="pt-3 border-t border-[var(--border)]">
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-2">Contact</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
                  {contactItems.map((item) => (
                    <ContactRow key={item.text} {...item} />
                  ))}
                  <HeroActions />
                </div>
              </div>
            </PanelCard>
          </div>

          <PanelCard className="order-1 md:order-none md:col-start-2 px-3.5 sm:px-4 pt-4 pb-3 shrink-0 mx-auto md:mx-0 w-full max-w-sm md:max-w-none md:w-auto flex flex-col min-w-0" hover={false}>
            <PanelLabel>Profile</PanelLabel>
            <DecryptReveal
              animateOnMount
              delay={900}
              className="w-[min(240px,72vw)] h-[min(240px,72vw)] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] relative group mx-auto"
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-[var(--accent)] animate-spin-slow opacity-30 group-hover:opacity-60 transition-all duration-500 blur-lg" />
                <div className="absolute inset-[3px] rounded-full bg-[var(--card)]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)] group-hover:shadow-[0_0_30px_rgba(var(--accent2-rgb),0.25)] transition-all duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 group-hover:border-[var(--accent2)]/50 transition-all duration-500">
                  <img
                    src="/images/Profile.png"
                    alt="David Nguyen"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </DecryptReveal>
          </PanelCard>
        </div>
      </div>
    </div>
  );
}
