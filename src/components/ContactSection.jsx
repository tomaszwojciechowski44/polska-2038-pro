                    <option value="">Wybierz...</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Wiadomość</label>
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
                  className="w-full py-3 bg-brand-red text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors border-glow-red"
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
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Mail, Building2, Globe, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', org: '', email: '', role: '', message: '' });
  const [ref, inView] = useInView(0.1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const ROLES = ['Ministerstwo Sportu', 'PZPN / Federacja', 'Akademia / Klub', 'Samorząd', 'Inwestor', 'Media / Dziennikarz'];

  return (
    <section id="kontakt" className="py-24 bg-brand-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-brand-red font-mono text-sm tracking-widest uppercase mb-3">
            <Mail size={14} />
            DOŁĄCZ DO INICJATYWY
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Budujemy Fundament.{' '}
            <span className="text-brand-red text-glow-red">Dołącz.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Szukamy partnerów instytucjonalnych, federacji sportowych i samorządów gotowych
            wdrożyć infrastrukturę #Polska2038.
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
                title: 'Dla Ministerstwa i PZPN',
                desc: 'Pełna dokumentacja techniczna, specyfikacja SIWZ, model finansowy ROI. Gotowe do przetargu.',
              },
              {
                icon: <Globe size={20} className="text-brand-neon" />,
                title: 'Dla Samorządów',
                desc: 'Program pilotażowy: 5 Orlików, 500 zawodników, 6 miesięcy. Dane raportowane do gminy.',
              },
              {
                icon: <CheckCircle size={20} className="text-brand-gold" />,
                title: 'Open Source Core',
                desc: 'Rdzeń systemu (modele AI, API) dostępny na licencji MIT dla badaczy i uczelni.',
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

            {/* Social / links */}
            <div className="pt-4 border-t border-brand-border">
              <div className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-3">Dokumentacja Techniczna</div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/projek-polska-2038/polska-2038-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-brand-border text-gray-300 hover:border-brand-neon hover:text-brand-neon transition-colors text-sm font-mono"
                >
                  GitHub →
                </a>
                <a
                  href="https://projek-polska-2038.github.io/polska-2038-pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-brand-border text-gray-300 hover:border-brand-cyan hover:text-brand-cyan transition-colors text-sm font-mono"
                >
                  Demo v1 →
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
                <div className="text-2xl font-display font-bold text-white mb-2">Zgłoszenie wysłane!</div>
                <div className="text-gray-400 font-mono text-sm">
                  Odpiszemy w ciągu 48h. Budujemy razem #Polska2038.
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 border border-brand-border bg-brand-card"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Imię i Nazwisko</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Organizacja</label>
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
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Email</label>
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
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Rola / Instytucja</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-brand-dark border border-brand-border text-white px-3 py-2.5 text-sm font-mono focus:border-brand-neon focus:outline-none transition-colors"
                  >

