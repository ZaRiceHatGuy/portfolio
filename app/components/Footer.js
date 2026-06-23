'use client';

import DecryptText from './DecryptText';

export default function Footer() {
  return (
    <footer className="text-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-[var(--muted)] text-xs tracking-wide border-t border-[var(--border)]">
      <DecryptText
        text="© 2026 Thái Dương (David) Nguyễn. Designed & built with care."
        className="text-[var(--muted)] text-xs tracking-wide leading-relaxed"
      />
    </footer>
  );
}
