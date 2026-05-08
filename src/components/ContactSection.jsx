import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Mail, Building2, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ROLES_PL = [
  'Ministerstwo Sportu',
  'PZPN / Federacja',
  'Akademia / Klub',
  'Samorząd',
  'Inwestor',
  'Media / Dziennikarz',
];
const ROLES_EN = [
  'Ministry of Sport',
  'FA / Federation',
  'Academy / Club',
  'Local government',
  'Investor',
  'Media / Journalist',
];

export default function ContactSection() {
  const { lang } = useLanguage();
  const ROLES = lang === 'en' ? ROLES_EN : ROLES_PL;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', org: '', email: '', role: '', message: '' });
  const [ref, inView] = useInView(0.1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-brand-red font-mono text-sm tracking-widest uppercase mb-3">
            <Mail size={14} />
            {lang === 'en' ? 'JOIN THE INITIATIVE' : 'DOŁĄCZ DO INICJATYWY'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            {lang === 'en' ? 'We’re building the foundation.' : 'Budujemy Fundament.'}{' '}
            <span className="text-brand-red text-glow-red">{lang === 'en' ? 'Join.' : 'Dołącz.'}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {lang === 'en'
              ? 'We’re looking for institutional partners, sports federations and local governments ready to deploy #Polska2038.'
              : 'Szukamy partnerów instytucjonalnych, federacji sportowych i samorządów gotowych wdrożyć infrastrukturę #Polska2038.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: <Building2 size={20} className="text-brand-cyan" />,
                title: lang === 'en' ? 'For the Ministry & the FA' : 'Dla Ministerstwa i PZPN',
                desc: lang === 'en'
                  ? 'Full technical documentation, procurement-ready specification and ROI financial model.'
                  : 'Pełna dokumentacja techniczna, specyfikacja SIWZ, model finansowy ROI. Gotowe do przetargu.',
              },
              {
                icon: <Globe size={20} className="text-brand-neon" />,
                title: lang === 'en' ? 'For local governments' : 'Dla Samorządów',
                desc: lang === 'en'
                  ? 'Pilot program: 5 pitches, 500 players, 6 months. Data reported to the municipality.'
                  : 'Program pilotażowy: 5 Orlików, 500 zawodników, 6 miesięcy. Dane raportowane do gminy.',
              },
              {
                icon: <CheckCircle size={20} className="text-brand-gold" />,
                title: 'Open Source Core',
                desc: lang === 'en'
                  ? 'The core (AI models, API) is MIT-licensed for researchers and universities.'
                  : 'Rdzeń systemu (modele AI, API) dostępny na licencji MIT dla badaczy i uczelni.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 border border-brand-border bg-brand-card hover:border-gray-600 transition-colors">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <div className="font-display font-bold text-white mb-1 uppercase tracking-wide text-sm">{item.title}</div>
                  <div className="text-gray-400 text-sm leading-relaxed font-mono">{item.desc}</div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-brand-border">
              <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-3">
                {lang === 'en' ? 'Contact details' : 'Dane Kontaktowe'}
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'E-mail', val: 'kontakt@polska2038.pl', href: 'mailto:kontakt@polska2038.pl', color: 'text-brand-neon' },
                  { label: 'LinkedIn', val: 'linkedin.com/company/polska2038', href: 'https://linkedin.com/company/polska2038', color: 'text-blue-400' },
                  { label: 'GitHub', val: 'github.com/Polska-2038', href: 'https://github.com/Polska-2038', color: 'text-gray-300' },
                  { label: 'X / Twitter', val: '@Polska2038', href: 'https://x.com/polska2038', color: 'text-brand-cyan' },
                ].map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 group">
                    <span className="text-gray-600 font-mono text-[10px] w-16 flex-shrink-0">{c.label}:</span>
                    <span className={`font-mono text-xs group-hover:underline ${c.color}`}>{c.val}</span>
                  </a>
                ))}
              </div>
              <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-3 mt-4">
                {lang === 'en' ? 'Technical docs' : 'Dokumentacja Techniczna'}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Polska-2038/projekt-polska-2038-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-brand-border text-gray-300 hover:border-brand-neon hover:text-brand-neon transition-colors text-sm font-mono"
                >
                  GitHub →
                </a>
                <a
                  href="https://github.com/Polska-2038/projekt-polska-2038-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-brand-border text-gray-300 hover:border-brand-cyan hover:text-brand-cyan transition-colors text-sm font-mono"
                >
                  {lang === 'en' ? 'Demo v1 →' : 'Demo v1 →'}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-10 border border-brand-neon/40 bg-brand-neon/5 text-center"
              >
                <CheckCircle size={48} className="text-brand-neon mb-4" />
                <div className="text-2xl font-display font-bold text-white mb-2">
                  {lang === 'en' ? 'Message sent!' : 'Zgłoszenie wysłane!'}
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  {lang === 'en'
                    ? 'We’ll reply within 48 hours. We’re building #Polska2038 together.'
                    : 'Odpiszemy w ciągu 48h. Budujemy razem #Polska2038.'}
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 border border-brand-border bg-brand-card"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                      Imię i Nazwisko
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                      Organizacja
                    </label>
                    <input
                      required
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors"
                      placeholder="PZPN / Ministerstwo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors"
                    placeholder="j.kowalski@pzpn.pl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Rola / Instytucja
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors"
                  >
                    <option value="">Wybierz...</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Wiadomość
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors resize-none"
                    placeholder="Opisz swoje potrzeby lub obszar współpracy..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-red text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                  Wyślij Zgłoszenie →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

