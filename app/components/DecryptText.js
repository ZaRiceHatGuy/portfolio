'use client';

import { useEffect, useRef, useState } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function scramble(text) {
  return text
    .split('')
    .map((char) => (char === ' ' || char === '\n' ? char : randomChar()))
    .join('');
}

export default function DecryptText({
  text,
  className = '',
  as: Component = 'span',
  duration = 700,
  delay = 0,
  animateOnMount = false,
}) {
  const [output, setOutput] = useState(animateOnMount ? '' : text);
  const ref = useRef(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;

    let intervalId;
    let delayId;
    let observer;

    const run = () => {
      hasRunRef.current = true;
      setOutput(scramble(text));
      const startTime = Date.now();
      intervalId = setInterval(() => {
        const progress = Math.min(1, (Date.now() - startTime) / duration);
        const flickered = text
          .split('')
          .map((char) => {
            if (char === ' ' || char === '\n') return char;
            if (Math.random() < 0.88 * Math.pow(1 - progress, 0.85)) return randomChar();
            return char;
          })
          .join('');
        setOutput(flickered);
        if (progress >= 1) {
          clearInterval(intervalId);
          setOutput(text);
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
  }, [text, duration, delay, animateOnMount]);

  return (
    <Component ref={ref} className={className} aria-label={text}>
      {output}
    </Component>
  );
}
