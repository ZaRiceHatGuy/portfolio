"use client";

import { useState } from 'react';
import { FiPhone, FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';
import DecryptText from './DecryptText';
import DecryptReveal from './DecryptReveal';

const inputClass =
  'w-full px-3 py-2.5 bg-white border border-[var(--border)] rounded-lg text-sm outline-none transition-colors focus:border-[var(--accent2)] text-[var(--bg)] placeholder:text-[var(--muted)]';

const phoneLink = {
  Icon: FiPhone,
  href: 'tel:+14038272659',
  value: '+1 (403) 827-2659',
};

const emailLink = {
  Icon: FiMail,
  href: 'mailto:davidnguyen107206@gmail.com',
  value: 'davidnguyen107206@gmail.com',
};

const linkedinLink = {
  Icon: FiLinkedin,
  href: 'http://www.linkedin.com/in/davidntd',
  value: 'davidntd',
};

const githubLink = {
  Icon: FiGithub,
  href: 'https://github.com/ZaRiceHatGuy',
  value: 'ZaRiceHatGuy',
};

function ContactLinkCard({ Icon, href, value, delay = 0, compactText = false }) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg3)] border border-[var(--border)] no-underline w-full min-w-0 transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
    >
      <DecryptReveal delay={delay}>
        <div className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-[var(--card)] border border-[var(--border)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:bg-[rgba(var(--accent-rgb),0.08)]">
          <Icon size={17} className="text-[var(--accent2)] transition-colors duration-300 group-hover:text-[var(--accent)]" />
        </div>
      </DecryptReveal>
      <DecryptText
        text={value}
        className={`text-white min-w-0 flex-1 leading-snug block text-[14px] ${
          compactText ? 'whitespace-nowrap' : ''
        }`}
      />
    </a>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'ebd85c14-aad4-47af-bc5c-45302e160274',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio message from ${formData.name}`,
          from_name: formData.name,
          to_email: 'davidnguyen107206@gmail.com'
        })
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 sm:items-end">
      <div className="flex flex-col gap-4 min-w-0">
        <DecryptText
          text="Contact Me"
          as="h2"
          className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight leading-[1.1] text-white"
        />
        <DecryptText
          as="p"
          text="Send a message or reach out — I'd love to hear from you."
          className="text-base text-[var(--muted)] leading-relaxed whitespace-nowrap"
        />

        <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] gap-3 min-w-0">
          <div className="flex flex-col gap-4 min-w-0">
            <ContactLinkCard {...phoneLink} delay={0} />
            <ContactLinkCard {...emailLink} delay={160} compactText />
          </div>
          <div className="flex flex-col gap-4 min-w-0">
            <ContactLinkCard {...linkedinLink} delay={80} />
            <ContactLinkCard {...githubLink} delay={240} />
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 sm:p-4 min-w-0 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block mb-1.5 text-sm text-white">
                <DecryptText text="Name" />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1.5 text-sm text-white">
                <DecryptText text="Email" />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block mb-1.5 text-sm text-white">
              <DecryptText text="Message" />
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputClass} resize-y`}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-5 py-2 bg-transparent border-2 border-[var(--accent2)] text-[var(--accent2)] rounded-lg text-sm cursor-pointer transition-all duration-300 self-start flex items-center gap-2 disabled:opacity-50 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <DecryptReveal>
              <FiSend size={16} />
            </DecryptReveal>
            {status === 'sending' ? (
              <DecryptText text="Sending..." animateOnMount />
            ) : (
              <DecryptText text="Send message" />
            )}
          </button>
          {status === 'success' && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-2.5 text-green-400 text-sm">
              <DecryptText text="✓ Message sent successfully! I'll get back to you soon." animateOnMount />
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-2.5 text-red-400 text-sm">
              <DecryptText text="✗ Failed to send. Please try again or email me directly." animateOnMount />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
