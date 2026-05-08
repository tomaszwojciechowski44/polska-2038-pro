import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Brain, MapPin, Shield, Trophy, Zap } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import FaqSection from '../components/FaqSection';

const MILESTONES = [
  { year: '2024', label: 'Faza koncepcyjna', desc: 'Opracowanie metodologii identyfikacji talentów przez interdyscyplinarny zespół naukowców i trenerów kadry narodowej.' },
  { year: '2025', label: 'Pilotaż regionalny', desc: 'Program testowany w 4 województwach: Mazowieckim, Małopolskim, Śląskim i Wielkopolskim. Skanowanie 12 000 zawodników.' },
  { year: '2026', label: 'Wdrożenie ogólnopolskie', desc: 'Rozszerzenie na wszystkie 16 województw. Sieć 847 skautów. 47 388 przeskanowanych profili. Starty w 6 dyscyplinach.' },
  { year: '2028', label: 'Rozszerzenie o sport paraolimpijski', desc: 'Włączenie kategorii para-sportu. Integracja z systemami europejskich federacji.' },
  { year: '2032', label: 'System kontynentalny', desc: 'Eksport modelu TalentRadar do 8 krajów UE. Polska jako europejskie centrum kompetencji.' },
  { year: '2038', label: 'Pełna autonomia AI', desc: 'Cel programowy: samorozwijający się system z 99% precyzją identyfikacji, niezależny od cyklu olimpijskiego.' },
];

const TEAM = [
  { name: 'Inicjatywa Obywatelska', role: 'Koncepcja i Architektura', dept: 'Projekt społeczny · Polska', avatar: '🇵🇱' },
  { name: 'Otwarty Kod', role: 'Platforma technologiczna', dept: 'Open-source · GitHub', avatar: '💻' },
  { name: 'Sieć Wolontariuszy', role: 'Metodologia AI & Sport', dept: 'Interdyscyplinarny zespół', avatar: '🧠' },
  { name: 'Eksperci PZPN', role: 'Doradztwo merytoryczne', dept: 'Zaproszeni konsultanci', avatar: '⚽' },
  { name: 'Rodzice & Trenerzy', role: 'Testy pilotażowe', dept: 'Wolontariusze 4 województw', avatar: '🏃' },
  { name: 'Ty możesz dołączyć', role: 'Twoja rola TBD', dept: 'Aplikuj przez /kontakt', avatar: '✉️' },
];

const PRINCIPLES = [
  { icon: Shield, title: 'Bezpieczeństwo danych', desc: 'Pełna zgodność z RODO i ustawą o sporcie. Dane zawodników szyfrowane metodą AES-256. Prawo do zapomnienia.' },
  { icon: Brain, title: 'Transparentność AI', desc: 'Każda decyzja algorytmu jest wyjaśnialna. Skauci widzą, dlaczego system nadał dany wynik, z możliwością odwołania.' },
  { icon: Users, title: 'Równy dostęp', desc: 'Program dostępny dla zawodników z każdego regionu Polski, niezależnie od statusu materialnego klubu.' },
  { icon: CheckCircle, title: 'Certyfikowani skauci', desc: 'Każdy skaut przechodzi weryfikację i szkolenie. Akredytacja odnawialna co 2 lata.' },
];

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <motion.div {...fade}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-cyan-400" />
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">O programie</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Rewolucja w identyfikacji<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                talentów sportowych
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-mono leading-relaxed max-w-2xl">
              #Polska2038 to pierwszy w Europie projekt systemu identyfikacji talentów sportowych
              oparty na skanowaniu LiDAR, analizie biomechanicznej i uczeniu maszynowym.
              Inicjatywa obywatelska — prezentowana Ministerstwu Sportu RP i PZPN.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#1e2d4a] bg-[#0d1325]">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { v: '47 388', l: 'Przeskanowanych profili' },
            { v: '847', l: 'Certyfikowanych skautów' },
            { v: '16', l: 'Województw aktywnych' },
            { v: '98.7%', l: 'Trafność predykcji' },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-cyan-400">{v}</div>
              <div className="text-gray-600 font-mono text-xs mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fade}>
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Misja</span>
              <h2 className="text-3xl font-display font-bold text-white mt-2 mb-4">
                Żaden talent nie powinien pozostać niezauważony
              </h2>
              <p className="text-gray-400 font-mono text-sm leading-relaxed mb-4">
                Tradycyjny model skautingu opiera się na wiedzy jednostkowych obserwatorów, przypadkowych
                odkryciach i dostępności finansowej rodziców. System #Polska2038 eliminuje te bariery,
                zapewniając każdemu dziecku w Polsce — niezależnie od miejsca zamieszkania i statusu
                materialnego — równą szansę na odkrycie jego sportowego potencjału.
              </p>
              <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                Nasze algorytmy analizują 127 parametrów biomechanicznych, porównując je z bazą 2,3 miliona
                pomiarów sportowców olimpijskich z 48 krajów. Wynik to obiektywna, powtarzalna ocena potencjału,
                niedostępna wcześniej dla żadnego systemu narodowego.
              </p>
            </motion.div>
            <motion.div {...fade} transition={{ delay: 0.1 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: '127', sub: 'parametrów biomechanicznych', color: 'text-cyan-400' },
                  { icon: Brain, label: '2.3M', sub: 'pomiarów wzorcowych w bazie', color: 'text-green-400' },
                  { icon: MapPin, label: '3 214', sub: 'punktów skanowania (Orlik+)', color: 'text-yellow-400' },
                  { icon: Trophy, label: 'Top 5%', sub: 'talentów ubiega się o akademie', color: 'text-red-400' },
                ].map(({ icon: Icon, label, sub, color }) => (
                  <div key={sub} className="p-5 border border-[#1e2d4a] bg-[#0d1325] rounded-lg">
                    <Icon size={18} className={`${color} mb-3`} />
                    <div className={`text-2xl font-display font-bold ${color}`}>{label}</div>
                    <div className="text-gray-600 font-mono text-xs mt-1 leading-relaxed">{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-20 bg-[#0d1325]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fade} className="mb-10">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Zasady</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2">Fundamenty systemu</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPLES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fade} transition={{ delay: i * 0.08 }}
                className="p-5 border border-[#1e2d4a] bg-[#080d1a] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-display font-bold text-sm mb-2">{title}</h3>
                <p className="text-gray-500 font-mono text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fade} className="mb-10">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Roadmapa</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2">Historia i plan rozwoju</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent" />
            <div className="space-y-8">
              {MILESTONES.map(({ year, label, desc }, i) => {
                const isPast = parseInt(year) <= 2026;
                return (
                  <motion.div key={year} {...fade} transition={{ delay: i * 0.06 }} className="flex gap-6">
                    <div className="flex flex-col items-center flex-shrink-0 w-16">
                      <div className={`w-4 h-4 rounded-full border-2 z-10 mt-1 flex-shrink-0 ${
                        isPast ? 'border-cyan-400 bg-cyan-400' : 'border-gray-600 bg-[#080d1a]'
                      }`} />
                      <span className={`font-mono text-xs mt-2 ${isPast ? 'text-cyan-400' : 'text-gray-600'}`}>{year}</span>
                    </div>
                    <div className="pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-display font-bold text-sm ${isPast ? 'text-white' : 'text-gray-500'}`}>{label}</h3>
                        {isPast && <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-green-400/10 text-green-400 border border-green-400/30 rounded">Zrealizowane</span>}
                      </div>
                      <p className={`font-mono text-xs leading-relaxed ${isPast ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-[#0d1325]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fade} className="mb-4">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Zespół</span>
            <h2 className="text-3xl font-display font-bold text-white mt-2">Kto za tym stoi?</h2>
          </motion.div>
          <motion.div {...fade} className="mb-10">
            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-3xl">
              #Polska2038 to inicjatywa obywatelska — projekt przygotowany przez pasjonatów sportu,
              technologii i danych. Nie jesteśmy urzędnikami. Chcemy, żeby Polska wygrała Mistrzostwa Świata
              w 2038. Cały kod jest open-source. Szukamy partnerów: Ministerstwa Sportu, PZPN, UEFA i inwestorów.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map(({ name, role, dept, avatar }, i) => (
              <motion.div key={name} {...fade} transition={{ delay: i * 0.06 }}
                className="p-5 border border-[#1e2d4a] bg-[#080d1a] rounded-lg flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400/20 to-green-400/20 border border-cyan-400/20
                  flex items-center justify-center font-mono font-bold text-cyan-400 text-xs flex-shrink-0">
                  {avatar}
                </div>
                <div>
                  <div className="text-white font-display font-bold text-sm">{name}</div>
                  <div className="text-cyan-400 font-mono text-xs mt-0.5">{role}</div>
                  <div className="text-gray-600 font-mono text-[10px] mt-0.5">{dept}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fade}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Dołącz do programu
            </h2>
            <p className="text-gray-400 font-mono text-sm mb-8 leading-relaxed">
              Skontaktuj się z nami w sprawie partnerstwa, pilotażu lub dołączenia do zespołu.
              Razem budujemy przyszłość polskiego sportu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/kontakt" className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-[#080d1a]
                font-display font-bold text-xs uppercase tracking-widest rounded hover:bg-cyan-300 transition-colors">
                Kontakt <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </PublicLayout>
  );
}
