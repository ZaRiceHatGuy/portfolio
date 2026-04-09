"use client";
import React from 'react';
import HeroCanvas from './HeroCanvas';
import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Briefcase, Download, FileText } from 'lucide-react';

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

export default function Hero() {
  const [displayName, setDisplayName] = useState('');

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

  const bridgeTransition = (oldText, text1, text2, duration, onComplete) => {
    const startTime = Date.now();
    const fullText = text1 + ' ' + text2;
    const wrapPoint = text1.length;
    const interval = setInterval(() => {
      let progress = Math.min(1, (Date.now() - startTime) / duration);
      if (progress < 0.35) {
        const dissolveProgress = progress / 0.35;
        const dissolved = oldText.split('').map(char =>
          char === ' ' ? ' ' : (Math.random() < dissolveProgress * 0.9 ? getRandomChar() : char)
        ).join('');
        setDisplayName(dissolved);
      } else {
        const typeProgress = Math.pow((progress - 0.35) / 0.65, 0.7);
        const totalChars = Math.floor(typeProgress * fullText.length);
        let line1Chars = Math.min(totalChars, wrapPoint);
        let line2Chars = Math.max(0, totalChars - wrapPoint);
        const targetLine1 = fullText.substring(0, wrapPoint);
        const targetLine2 = fullText.substring(wrapPoint);
        const isNearWrap = typeProgress > 0.5 && line2Chars === 0;
        const buildLine = (target, typed, isLine1) => target.split('').map((char, i) => {
          if (char === ' ') return ' ';
          const isNearEnd = isLine1 && i >= wrapPoint - 3;
          if (i < typed) {
            const shouldFlicker = (isNearWrap && isNearEnd) ? Math.random() < 0.8 : Math.random() < 0.25 * (1 - typeProgress);
            return shouldFlicker ? getRandomChar() : char;
          }
          if (isLine1) return getRandomChar();
          return (line2Chars > 0 || typeProgress > 0.5) && Math.random() < 0.4 ? '·' : getRandomChar();
        }).join('');
        const line1 = buildLine(targetLine1, line1Chars, true);
        const line2 = buildLine(targetLine2, line2Chars, false);
        setDisplayName(line2Chars > 0 || typeProgress > 0.5 ? line1 + '\n' + line2 : line1);
      }
      if (progress >= 1) { clearInterval(interval); setDisplayName(text1 + '\n' + text2); onComplete?.(); }
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
        bridgeTransition('たいよう(デビッド)げん', 'Thái Dương', '(David) Nguyễn', 1500, () => {});
      }
    };
    processStep();
  };

  return (
    <div id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-[6vw] pt-28 pb-16 relative overflow-hidden">
      <HeroCanvas />
      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-8 md:gap-12">

          {/* Text content */}
          <div className="flex-1">
            <h1 className="text-[clamp(2.2rem,8vw,3.8rem)] font-bold leading-[1.3] tracking-tight text-[var(--text)] mb-4 whitespace-pre-line">
              {displayName.split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < displayName.split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </h1>

            <p className="text-sm text-[var(--muted)] max-w-[480px] mb-5 leading-relaxed">
              SAIT Software Development Student, specializing in front-end development and database systems.
              Passionate and interested in learning about embedded systems, robotics, and artificial intelligence.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <MapPin size={16} className="text-[var(--accent)] shrink-0" />
                <span>Calgary, AB, Canada</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <Phone size={16} className="text-[var(--accent)] shrink-0" />
                <span>+1 (403) 827-2659</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <Mail size={16} className="text-[var(--accent)] shrink-0" />
                <span>davidnguyen107206@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <Briefcase size={16} className="text-[var(--accent)] shrink-0" />
                <span>Open to co-op/internship opportunities</span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="/Resume/David Nguyen - Resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--accent)] bg-transparent text-[var(--accent)] text-sm font-medium transition-all duration-300 hover:border-[#f5c842] hover:text-[#f5c842] hover:scale-[1.02]"
              >
                <FileText size={16} />
                <span>Resume</span>
                <Download size={14} />
              </a>
              <a href="https://github.com/ZaRiceHatGuy" target="_blank" rel="noopener noreferrer" title="GitHub"
                className="group flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--accent)] transition-all duration-300 hover:border-[#f5c842] hover:scale-[1.06] bg-transparent">
                <GitHubIcon className="text-[var(--accent)] group-hover:text-[#f5c842] transition-colors duration-300" />
              </a>
              <a href="https://www.linkedin.com/in/david-thai-duong-nguyen-063152325/" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                className="group flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--accent)] transition-all duration-300 hover:border-[#f5c842] hover:scale-[1.06] bg-transparent">
                <LinkedInIcon className="text-[var(--accent)] group-hover:text-[#f5c842] transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Simplified but polished version */}
          <div className="w-[160px] h-[160px] md:w-[320px] md:h-[320px] rounded-full flex-shrink-0 mx-auto md:mx-0 relative group">
            {/* Single smooth rotating gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-blue-500 animate-spin-slow opacity-30 group-hover:opacity-60 transition-all duration-500 blur-lg"></div>
            
            {/* Glass background with shadow */}
            <div className="absolute inset-[3px] rounded-full bg-[var(--card)]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(47,127,255,0.15)] group-hover:shadow-[0_0_30px_rgba(245,200,66,0.25)] transition-all duration-500"></div>
            
            {/* Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 group-hover:border-yellow-500/50 transition-all duration-500">
              <img 
                src="/images/Profile.png"
                alt="David Nguyen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}