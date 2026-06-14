'use client';

import { useEffect, useRef, useState } from 'react';

const HIDDEN = { opacity: 0, filter: 'blur(4px)', transform: 'translateY(2px)' };
const VISIBLE = { opacity: 1, filter: 'blur(0px)', transform: 'translate(0, 0)' };

export default function DecryptReveal({
  children,
  className = '',
  duration = 700,
  delay = 0,
  animateOnMount = false,
}) {
  const [style, setStyle] = useState(animateOnMount ? HIDDEN : VISIBLE);
  const [settled, setSettled] = useState(!animateOnMount);
  const ref = useRef(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;

    let intervalId;
    let delayId;
    let observer;

    const run = () => {
      hasRunRef.current = true;
      setSettled(false);
      const startTime = Date.now();
      intervalId = setInterval(() => {
        const progress = Math.min(1, (Date.now() - startTime) / duration);
        if (progress >= 1) {
          clearInterval(intervalId);
          setStyle(VISIBLE);
          setSettled(true);
          return;
        }
        const flickerChance = 0.88 * Math.pow(1 - progress, 0.85);
        if (Math.random() < flickerChance) {
          setStyle({
            opacity: Math.random() * 0.45 + 0.1,
            filter: `blur(${Math.random() * 3}px)`,
            transform: `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 3 - 1.5}px)`,
          });
        } else {
          setStyle({
            opacity: Math.min(1, 0.4 + progress * 0.6),
            filter: 'blur(0px)',
            transform: 'translate(0, 0)',
          });
        }
      }, 45);
    };

    const trigger = () => {
      delayId = setTimeout(run, delay);
    };

    if (animateOnMount) {
      trigger();
      return () => {
        clearInterval(intervalId);
        clearTimeout(delayId);
      };
    }

    const node = ref.current;
    if (!node) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);

    return () => {
      clearInterval(intervalId);
      clearTimeout(delayId);
      observer?.disconnect();
    };
  }, [duration, delay, animateOnMount]);

  return (
    <span
      ref={ref}
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        ...style,
        transition: settled ? 'opacity 0.15s ease, filter 0.15s ease, transform 0.15s ease' : 'none',
      }}
    >
      {children}
    </span>
  );
}
