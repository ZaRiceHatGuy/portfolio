"use client";

import { useState } from 'react';
import { FiPhone, FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left — contact info */}
        <div>
          <h2 className="font-['Syne',sans-serif] text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-8 leading-[1.1] text-white">
            Contact Me
          </h2>
          <div className="flex flex-col gap-5">
            {[
              { icon: <FiPhone size={20} className="text-[#f5c842] shrink-0" />, href: 'tel:+14038272659', label: '+1 (403) 827-2659' },
              { icon: <FiMail size={20} className="text-[#f5c842] shrink-0" />, href: 'mailto:davidnguyen107206@gmail.com', label: 'davidnguyen107206@gmail.com' },
              { icon: <FiLinkedin size={20} className="text-[#f5c842] shrink-0" />, href: 'http://www.linkedin.com/in/davidntd', label: 'LinkedIn' },
              { icon: <FiGithub size={20} className="text-[#f5c842] shrink-0" />, href: 'https://github.com/ZaRiceHatGuy', label: 'GitHub' },
            ].map(({ icon, href, label }) => (
              <div key={label} className="flex items-center gap-3 min-w-0">
                {icon}
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="text-white no-underline hover:underline text-sm break-all">
                  {label}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-sm text-white">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-4 py-3 bg-[var(--bg3)] border border-[var(--border)] rounded-lg text-sm outline-none transition-colors focus:border-[#f5c842] text-white" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-sm text-white">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full px-4 py-3 bg-[var(--bg3)] border border-[var(--border)] rounded-lg text-sm outline-none transition-colors focus:border-[#f5c842] text-white" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-sm text-white">Message</label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required
                className="w-full px-4 py-3 bg-[var(--bg3)] border border-[var(--border)] rounded-lg text-sm font-inherit resize-y outline-none transition-colors focus:border-[#f5c842] text-white" />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="px-6 py-3 bg-transparent border-2 border-[#f5c842] text-[#f5c842] rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 self-start flex items-center gap-2 disabled:opacity-50 hover:border-[var(--accent)] hover:text-[var(--accent)]">
              <FiSend size={16} />
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            {status === 'success' && (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-green-400 text-sm">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
                ✗ Failed to send. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}