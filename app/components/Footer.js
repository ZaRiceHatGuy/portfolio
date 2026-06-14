'use client';

import DecryptText from './DecryptText';

export default function Footer() {
  return (
    <footer className="text-center py-8 px-[6vw] text-[var(--muted)] text-xs tracking-wide border-t border-[var(--border)]">
      <DecryptText
        text="© 2026 Thái Dương (David) Nguyễn. Designed & built with care."
        className="text-[var(--muted)] text-xs tracking-wide"
      />
    </footer>
  );
}
