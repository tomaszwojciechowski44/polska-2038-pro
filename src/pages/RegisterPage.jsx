import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, User, Phone, MapPin, Trophy } from 'lucide-react';
import { registerUser } from '../api/client';

const VOIVODESHIPS = [
  'Dolnośląskie','Kujawsko-Pomorskie','Lubelskie','Lubuskie','Łódzkie',
  'Małopolskie','Mazowieckie','Opolskie','Podkarpackie','Podlaskie',
  'Pomorskie','Śląskie','Świętokrzyskie','Warmińsko-Mazurskie',
  'Wielkopolskie','Zachodniopomorskie',
];

const SPORTS = [
  'Piłka nożna','Lekkoatletyka','Koszykówka','Pływanie','Gimnastyka',
  'Siatkówka','Tenis','Judo','Wioślarstwo','Kolarstwo',
  'Łyżwiarstwo','Narciarstwo','Boks','Zapasy','Strzelectwo','Inne',
];

const STEPS = [
  { id: 1, label: 'Dane osobowe', icon: User },
  { id: 2, label: 'Dyscyplina', icon: Trophy },
  { id: 3, label: 'Lokalizacja', icon: MapPin },
  { id: 4, label: 'Potwierdzenie', icon: CheckCircle },
];

const inputCls = `w-full bg-[#0d1325] border border-[#1e2d4a] text-white font-mono text-sm px-4 py-3 rounded
  placeholder-gray-700 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-colors`;
const labelCls = 'block text-gray-400 font-mono text-xs uppercase tracking-widest mb-1.5';
const errCls = 'text-red-400 font-mono text-xs mt-1';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', birth_year: '',
    sport: '', position: '', club: '',
    voivodeship: '', city: '', achievements: '',
    consent: false,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep = () => {
    if (step === 1) {
      if (!form.first_name.trim()) return 'Podaj imię.';
      if (!form.last_name.trim()) return 'Podaj nazwisko.';
      if (!form.email.includes('@')) return 'Podaj prawidłowy adres e-mail.';
      if (form.phone.length < 9) return 'Podaj numer telefonu (min. 9 cyfr).';
      if (!form.birth_year || form.birth_year < 2000 || form.birth_year > 2018) return 'Podaj rok urodzenia (2000–2018).';
    }
    if (step === 2) {
      if (!form.sport) return 'Wybierz dyscyplinę sportową.';
    }
    if (step === 3) {
      if (!form.voivodeship) return 'Wybierz województwo.';
      if (!form.city.trim()) return 'Podaj miasto.';
    }
    if (step === 4) {
      if (!form.consent) return 'Wymagana zgoda na przetwarzanie danych.';
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    if (step < 4) { setStep((s) => s + 1); return; }
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await registerUser({
        ...form,
        birth_year: parseInt(form.birth_year, 10),
        phone: form.phone,
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-400/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">Rejestracja przyjęta</h1>
          <p className="text-gray-400 font-mono text-sm mb-4">{result.message}</p>
          <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded font-mono text-cyan-400 text-sm mb-8">
            Nr referencyjny: <strong>{result.reference}</strong>
          </div>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-5 py-2.5 border border-[#1e2d4a] text-gray-400 hover:text-white font-mono text-xs rounded transition-colors">
              Strona główna
            </Link>
            <Link to="/login" className="px-5 py-2.5 bg-cyan-400 text-[#080d1a] font-display font-bold text-xs uppercase tracking-widest rounded hover:bg-cyan-300 transition-colors">
              Zaloguj się
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-white relative overflow-hidden">
      <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div className="border-b border-[#1e2d4a] bg-[#080d1a]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-red-500 font-display font-bold tracking-widest text-lg">#POLSKA</span>
            <span className="text-yellow-400 font-display font-bold tracking-widest text-lg">2038</span>
          </Link>
          <Link to="/login" className="text-gray-500 hover:text-cyan-400 font-mono text-xs transition-colors">
            Masz konto? Zaloguj się →
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">System Polska2038 · TalentRadar</p>
          <h1 className="text-3xl font-display font-bold text-white">Rejestracja Zawodnika</h1>
          <p className="text-gray-500 font-mono text-sm mt-2">Zarejestruj się w ogólnopolskim systemie identyfikacji talentów sportowych</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className={`flex items-center gap-2 ${active ? 'text-cyan-400' : done ? 'text-green-400' : 'text-gray-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-mono font-bold flex-shrink-0
                    ${active ? 'border-cyan-400 bg-cyan-400/10' : done ? 'border-green-400 bg-green-400/10' : 'border-gray-700 bg-transparent'}`}>
                    {done ? <CheckCircle size={14} /> : s.id}
                  </div>
                  <span className={`hidden sm:block font-mono text-xs ${active ? 'text-cyan-400' : done ? 'text-green-400' : 'text-gray-600'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-3 ${step > s.id ? 'bg-green-400/40' : 'bg-gray-700'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <div className="border border-[#1e2d4a] bg-[#0d1325] rounded-lg p-6 sm:p-8">
          {error && (
            <motion.div
              key={error}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-5 border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono rounded"
            >
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Dane osobowe</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Imię *</label>
                    <input className={inputCls} placeholder="np. Kamil" value={form.first_name} onChange={(e) => set('first_name', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Nazwisko *</label>
                    <input className={inputCls} placeholder="np. Kowalski" value={form.last_name} onChange={(e) => set('last_name', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Adres e-mail *</label>
                    <input type="email" className={inputCls} placeholder="adres@email.pl" value={form.email} onChange={(e) => set('email', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Telefon kontaktowy *</label>
                    <input className={inputCls} placeholder="+48 600 000 000" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Rok urodzenia zawodnika *</label>
                    <input type="number" className={inputCls} placeholder="np. 2010" min="2000" max="2018"
                      value={form.birth_year} onChange={(e) => set('birth_year', e.target.value)} />
                    <p className="text-gray-600 font-mono text-xs mt-1">Program obejmuje roczniki 2000–2018</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Dyscyplina sportowa</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Dyscyplina *</label>
                    <select className={inputCls} value={form.sport} onChange={(e) => set('sport', e.target.value)}>
                      <option value="">— Wybierz dyscyplinę —</option>
                      {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Pozycja / specjalizacja</label>
                    <input className={inputCls} placeholder="np. Napastnik, Sprinter, itd." value={form.position} onChange={(e) => set('position', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Klub / sekcja sportowa</label>
                    <input className={inputCls} placeholder="np. Legia Warszawa U-16" value={form.club} onChange={(e) => set('club', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Osiągnięcia / wyniki (opcjonalnie)</label>
                    <textarea className={`${inputCls} resize-none`} rows={3}
                      placeholder="np. Mistrz województwa 2025, czas 60m: 7.2s"
                      value={form.achievements} onChange={(e) => set('achievements', e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Lokalizacja</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Województwo *</label>
                    <select className={inputCls} value={form.voivodeship} onChange={(e) => set('voivodeship', e.target.value)}>
                      <option value="">— Wybierz województwo —</option>
                      {VOIVODESHIPS.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Miasto *</label>
                    <input className={inputCls} placeholder="np. Warszawa" value={form.city} onChange={(e) => set('city', e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Potwierdzenie danych</h2>
                <div className="space-y-3 mb-6">
                  {[
                    ['Imię i nazwisko', `${form.first_name} ${form.last_name}`],
                    ['E-mail', form.email],
                    ['Telefon', form.phone],
                    ['Rok urodzenia', form.birth_year],
                    ['Dyscyplina', form.sport],
                    ['Klub', form.club || '—'],
                    ['Województwo', form.voivodeship],
                    ['Miasto', form.city],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-[#1e2d4a]">
                      <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">{k}</span>
                      <span className="text-white font-mono text-xs text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-cyan-400 flex-shrink-0" />
                  <span className="text-gray-400 font-mono text-xs leading-relaxed">
                    Wyrażam zgodę na przetwarzanie danych osobowych w celu uczestnictwa w programie #Polska2038 zgodnie z RODO
                    i ustawą o sporcie. Dane będą przetwarzane wyłącznie przez Ministerstwo Sportu i upoważnionych skautów.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-5 border-t border-[#1e2d4a]">
            <button
              onClick={() => { setError(''); setStep((s) => Math.max(1, s - 1)); }}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#1e2d4a] text-gray-400 hover:text-white
                font-mono text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} /> Wstecz
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 text-[#080d1a]
                font-display font-bold text-xs uppercase tracking-widest rounded
                hover:bg-cyan-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#080d1a]/40 border-t-[#080d1a] rounded-full animate-spin" />
              ) : (
                <>
                  {step === 4 ? 'Wyślij zgłoszenie' : 'Dalej'}
                  {step < 4 && <ChevronRight size={14} />}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scout link */}
        <p className="text-center mt-6 text-gray-600 font-mono text-xs">
          Jesteś skautem?{' '}
          <Link to="/rejestracja/skaut" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Zarejestruj się jako skaut →
          </Link>
        </p>
      </div>
    </div>
  );
}
