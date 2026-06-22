import { forwardRef } from 'react';

export const PanelCard = forwardRef(function PanelCard({ children, className = '', hover = true }, ref) {
  return (
    <div
      ref={ref}
      className={`relative bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 ${
        hover
          ? 'hover:border-[rgba(var(--accent-rgb),0.35)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:-translate-y-0.5'
          : ''
      } ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent opacity-80" />
      {children}
    </div>
  );
});

export function PanelLabel({ children }) {
  return (
    <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-3">
      {children}
    </p>
  );
}

const BADGE_VARIANTS = {
  default: 'text-[var(--text)] border-[var(--border)] bg-[var(--bg3)]',
  accent: 'text-[var(--accent)] border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]',
  yellow: 'text-[var(--accent2)] border-[rgba(var(--accent2-rgb),0.45)] bg-[rgba(var(--accent2-rgb),0.1)]',
  muted: 'text-[var(--muted)] border-[var(--muted)]/40 bg-[var(--muted)]/10',
};

export function MetaBadge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex text-[0.65rem] uppercase tracking-wide px-2 py-0.5 rounded border max-w-full ${BADGE_VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function MetaRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-[var(--border)] last:border-0">
      <span className="text-[0.65rem] text-[var(--muted)] shrink-0">{label}</span>
      <span className="text-xs text-white text-right">{children}</span>
    </div>
  );
}

export function Chip({ children }) {
  return (
    <span className="text-[0.65rem] px-2 py-1 rounded-md border border-[var(--border)] bg-[var(--bg3)] text-[var(--text)] transition-colors duration-200 hover:border-[var(--accent2)] hover:text-[var(--accent2)]">
      {children}
    </span>
  );
}

export function GpaDisplay({ value, max = 4.0 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg3)] p-3">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] mb-1">GPA</p>
          <p className="text-2xl text-white font-medium tabular-nums leading-none">
            {value}
            <span className="text-sm text-[var(--muted)] font-normal"> / {max.toFixed(1)}</span>
          </p>
        </div>
        <span className="text-[0.65rem] uppercase tracking-wide px-2 py-0.5 rounded border text-[var(--accent)] border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.12)]">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--card)] overflow-hidden border border-[var(--border)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 px-0.5">
        <span className="text-[0.55rem] text-[var(--muted)] tabular-nums">0.0</span>
        <span className="text-[0.55rem] text-[var(--muted)] tabular-nums">2.0</span>
        <span className="text-[0.55rem] text-[var(--muted)] tabular-nums">3.0</span>
        <span className="text-[0.55rem] text-[var(--muted)] tabular-nums">4.0</span>
      </div>
    </div>
  );
}
