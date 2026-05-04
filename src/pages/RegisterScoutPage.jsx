import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, User, Briefcase, MapPin, FileText } from 'lucide-react';
import { registerScout } from '../api/client';

const ALL_VOIVODESHIPS = [
  'Dolnośląskie','Kujawsko-Pomorskie','Lubelskie','Lubuskie','Łódzkie',
  'Małopolskie','Mazowieckie','Opolskie','Podkarpackie','Podlaskie',
  'Pomorskie','Śląskie','Świętokrzyskie','Warmińsko-Mazurskie',
  'Wielkopolskie','Zachodniopomorskie',
];

const SPECIALTIES = [
  'Piłka nożna','Lekkoatletyka','Koszykówka','Pływanie','Gimnastyka',
  'Siatkówka','Tenis','Sporty walki','Kolarstwo','Wioślarstwo',
  'Sporty zimowe','Wielodyscyplinarne',
];

const EXP_OPTIONS = [
  { value: 1, label: '1–2 lata' },
  { value: 3, label: '3–5 lat' },
  { value: 6, label: '6–10 lat' },
  { value: 11, label: 'Powyżej 10 lat' },
];

const STEPS = [
  { id: 1, label: 'Dane osobowe', icon: User },
  { id: 2, label: 'Doświadczenie', icon: Briefcase },
  { id: 3, label: 'Regiony', icon: MapPin },
  { id: 4, label: 'Wniosek', icon: FileText },
];

const inputCls = `w-full bg-[#0d1325] border border-[#1e2d4a] text-white font-mono text-sm px-4 py-3 rounded
  placeholder-gray-700 focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 transition-colors`;
const labelCls = 'block text-gray-400 font-mono text-xs uppercase tracking-widest mb-1.5';

export default function RegisterScoutPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    organization: '', role_title: '', experience_years: '',
    sports_specialty: '', voivodeships: [], motivation: '',
    consent: false,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleVoiv = (v) => {
    setForm((f) => ({
      ...f,
      voivodeships: f.voivodeships.includes(v)
        ? f.voivodeships.filter((x) => x !== v)
        : [...f.voivodeships, v],
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.first_name.trim()) return 'Podaj imię.';
      if (!form.last_name.trim()) return 'Podaj nazwisko.';
      if (!form.email.includes('@')) return 'Podaj prawidłowy adres e-mail.';
      if (form.phone.length < 9) return 'Podaj numer telefonu (min. 9 cyfr).';
    }
    if (step === 2) {
      if (!form.organization.trim()) return 'Podaj nazwę organizacji / instytucji.';
      if (!form.role_title.trim()) return 'Podaj stanowisko.';
      if (!form.experience_years) return 'Wybierz staż pracy.';
      if (!form.sports_specialty) return 'Wybierz specjalizację.';
    }
    if (step === 3) {
      if (form.voivodeships.length === 0) return 'Wybierz przynajmniej jedno województwo.';
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
      const res = await registerScout({
        ...form,
        experience_years: parseInt(form.experience_years, 10),
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
          <div className="w-20 h-20 rounded-full bg-yellow-400/10 border-2 border-yellow-400/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-yellow-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">Wniosek przyjęty</h1>
          <p className="text-gray-400 font-mono text-sm mb-4 leading-relaxed">{result.message}</p>
          <div className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded font-mono text-yellow-400 text-sm mb-3">
            Nr wniosku: <strong>{result.reference}</strong>
          </div>
          <p className="text-gray-600 font-mono text-xs mb-8">
            Status weryfikacji możesz śledzić po zalogowaniu na swoje konto
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-5 py-2.5 border border-[#1e2d4a] text-gray-400 hover:text-white font-mono text-xs rounded transition-colors">
              Strona główna
            </Link>
            <Link to="/login" className="px-5 py-2.5 bg-yellow-400 text-[#080d1a] font-display font-bold text-xs uppercase tracking-widest rounded hover:bg-yellow-300 transition-colors">
              Zaloguj się
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-white relative overflow-hidden">
      <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div className="border-b border-[#1e2d4a] bg-[#080d1a]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-red-500 font-display font-bold tracking-widest text-lg">#POLSKA</span>
            <span className="text-yellow-400 font-display font-bold tracking-widest text-lg">2038</span>
          </Link>
          <Link to="/login" className="text-gray-500 hover:text-yellow-400 font-mono text-xs transition-colors">
            Masz konto? Zaloguj się →
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest">System Polska2038</span>
            <span className="px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-mono text-[10px] rounded">AKREDYTACJA</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Rejestracja Skauta</h1>
          <p className="text-gray-500 font-mono text-sm mt-2">
            Dołącz do sieci licencjonowanych skautów Ministerstwa Sportu RP
          </p>
        </div>

        {/* Info box */}
        <div className="mb-8 p-4 border border-yellow-400/20 bg-yellow-400/5 rounded-lg">
          <p className="text-yellow-400/80 font-mono text-xs leading-relaxed">
            <strong className="text-yellow-400">Proces akredytacji:</strong> Po złożeniu wniosku dział weryfikacji sprawdzi
            Twoje kwalifikacje w ciągu 3 dni roboczych. Otrzymasz e-mail z decyzją i, w przypadku pozytywnej weryfikacji,
            dostęp do panelu skautingowego.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className={`flex items-center gap-2 ${active ? 'text-yellow-400' : done ? 'text-green-400' : 'text-gray-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-mono font-bold flex-shrink-0
                    ${active ? 'border-yellow-400 bg-yellow-400/10' : done ? 'border-green-400 bg-green-400/10' : 'border-gray-700'}`}>
                    {done ? <CheckCircle size={14} /> : s.id}
                  </div>
                  <span className={`hidden sm:block font-mono text-xs ${active ? 'text-yellow-400' : done ? 'text-green-400' : 'text-gray-600'}`}>
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
            <motion.div key={error} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-5 border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono rounded">
              <AlertCircle size={14} className="flex-shrink-0" />{error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Dane osobowe</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Imię *</label>
                    <input className={inputCls} placeholder="np. Piotr" value={form.first_name} onChange={(e) => set('first_name', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Nazwisko *</label>
                    <input className={inputCls} placeholder="np. Nowak" value={form.last_name} onChange={(e) => set('last_name', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Służbowy adres e-mail *</label>
                    <input type="email" className={inputCls} placeholder="p.nowak@klub.pl" value={form.email} onChange={(e) => set('email', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Numer telefonu *</label>
                    <input className={inputCls} placeholder="+48 600 000 000" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Doświadczenie zawodowe</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Organizacja / Klub / Instytucja *</label>
                    <input className={inputCls} placeholder="np. Legia Warszawa, PZPN, AWF Kraków" value={form.organization} onChange={(e) => set('organization', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Stanowisko *</label>
                    <input className={inputCls} placeholder="np. Trener koordynator, Analityk talentów" value={form.role_title} onChange={(e) => set('role_title', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Staż w skautingu *</label>
                      <select className={inputCls} value={form.experience_years} onChange={(e) => set('experience_years', e.target.value)}>
                        <option value="">— Wybierz —</option>
                        {EXP_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Specjalizacja sportowa *</label>
                      <select className={inputCls} value={form.sports_specialty} onChange={(e) => set('sports_specialty', e.target.value)}>
                        <option value="">— Wybierz —</option>
                        {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-2">Obszar działania</h2>
                <p className="text-gray-500 font-mono text-xs mb-5">Wybierz województwa, w których planujesz prowadzić działalność skautingową</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_VOIVODESHIPS.map((v) => {
                    const checked = form.voivodeships.includes(v);
                    return (
                      <button key={v} type="button" onClick={() => toggleVoiv(v)}
                        className={`px-3 py-2.5 text-left font-mono text-xs rounded border transition-all ${
                          checked
                            ? 'border-yellow-400/60 bg-yellow-400/10 text-yellow-400'
                            : 'border-[#1e2d4a] text-gray-500 hover:border-gray-500 hover:text-gray-300'
                        }`}>
                        {checked && <span className="mr-1">✓</span>}{v}
                      </button>
                    );
                  })}
                </div>
                {form.voivodeships.length > 0 && (
                  <p className="mt-3 text-gray-500 font-mono text-xs">
                    Wybrano: <span className="text-yellow-400">{form.voivodeships.length}</span> województw
                  </p>
                )}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-white font-display font-bold text-lg mb-5">Motywacja i zgody</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Dlaczego chcesz dołączyć do programu? (opcjonalnie)</label>
                    <textarea className={`${inputCls} resize-none`} rows={4}
                      placeholder="Opisz swoje motywacje i doświadczenie w identyfikowaniu talentów..."
                      value={form.motivation} onChange={(e) => set('motivation', e.target.value)} />
                  </div>
                  <div className="p-4 bg-[#080d1a] border border-[#1e2d4a] rounded space-y-2 text-xs font-mono text-gray-500">
                    {[
                      ['Imię i nazwisko', `${form.first_name} ${form.last_name}`],
                      ['E-mail', form.email],
                      ['Organizacja', form.organization],
                      ['Specjalizacja', form.sports_specialty],
                      ['Regiony', `${form.voivodeships.length} województw`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-600">{k}</span>
                        <span className="text-gray-300">{v}</span>
                      </div>
                    ))}
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-yellow-400 flex-shrink-0" />
                    <span className="text-gray-400 font-mono text-xs leading-relaxed">
                      Wyrażam zgodę na przetwarzanie danych osobowych i zawodowych w celu weryfikacji akredytacji
                      skautingowej w ramach programu #Polska2038. Potwierdzam, że podane informacje są prawdziwe.
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
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
              className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-[#080d1a]
                font-display font-bold text-xs uppercase tracking-widest rounded
                hover:bg-yellow-300 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#080d1a]/40 border-t-[#080d1a] rounded-full animate-spin" />
              ) : (
                <>{step === 4 ? 'Złóż wniosek' : 'Dalej'}{step < 4 && <ChevronRight size={14} />}</>
              )}
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-gray-600 font-mono text-xs">
          Rejestrujesz zawodnika?{' '}
          <Link to="/rejestracja" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Formularz rejestracji zawodnika →
          </Link>
        </p>
      </div>
    </div>
  );
}
