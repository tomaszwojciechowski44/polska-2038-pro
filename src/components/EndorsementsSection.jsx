import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const ENDORSEMENTS = [
  {
    quote: "Polska ma jeden z największych potencjałów demograficznych w Europie i absolutnie go marnuje. Ten system to zmienia — wreszcie ktoś podchodzi do tego jak inżynier, nie jak polityk.",
    author: "Trener akademii — Ekstraklasa",
    role: "Licencja UEFA Pro · 18 lat pracy z młodzieżą",
    color: "border-brand-neon/30",
    textColor: "text-brand-neon",
  },
  {
    quote: "Jako rodzic dwójki dzieci grających na Orliku widzę jeden problem: nikt nie wie czy moje dziecko ma talent. Ten projekt odpowiada na to pytanie systemowo. Potrzebujemy go natychmiast.",
    author: "Rodzic zawodnika",
    role: "Warszawa-Białołęka · rocznik 2013",
    color: "border-brand-cyan/30",
    textColor: "text-brand-cyan",
  },
  {
    quote: "Belgia wybudowała swój 'golden generation' w 10 lat poprzez jeden prosty pomysł: zidentyfikuj każde dziecko z talentem, nie pozwól mu przepaść. Polska może zrobić to samo. Brakuje tylko systemu.",
    author: "Analityk sportowy",
    role: "Ekspert ds. scouting EU · porównania Belgia/Chorwacja",
    color: "border-yellow-500/30",
    textColor: "text-yellow-400",
  },
  {
    quote: "Odcięcie PZPN od oceny trenerów to kluczowy pomysł. To jak gdyby szpitale same oceniały lekarzy. Zewnętrzny audyt (AWF) to jedyna opcja która ma szansę zadziałać.",
    author: "Wykładowca AWF",
    role: "Katedra teorii treningu · metodyka szkolenia dzieci",
    color: "border-purple-500/30",
    textColor: "text-purple-400",
  },
  {
    quote: "ROI 2300% z samego systemu oceny trenerów to nie fantasy — jeśli dobry trener zamiast złego zwiększa skuteczność szkolenia 3-krotnie, rachunki się zgadzają. Widziałem to w Niemczech.",
    author: "Ekonomista sportu",
    role: "Badania: zwrot z inwestycji w szkolenie młodzieży",
    color: "border-red-500/30",
    textColor: "text-red-400",
  },
  {
    quote: "W Polsce jest co najmniej 5 przyszłych zawodników na poziomie Ligi Mistrzów w każdym roczniku — i żaden z nich nie trafi do systemu, bo mieszka w wsi bez skauta. LiDAR na Orlikach to game changer.",
    author: "Były skaut Premier League",
    role: "15 lat scouting Polska/Ukraina/Czechy",
    color: "border-brand-gold/30",
    textColor: "text-brand-gold",
  },
];

export default function EndorsementsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">Co mówią eksperci</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">🎤 Głosy ze środowiska</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto font-mono text-sm">
            Trenerzy, rodzice, naukowcy i analitycy o projekcie #Polska2038
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENDORSEMENTS.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative bg-gray-900 border ${e.color} rounded-2xl p-6 flex flex-col`}
            >
              <Quote className={`w-6 h-6 ${e.textColor} opacity-40 mb-3 flex-shrink-0`} />
              <p className="text-gray-200 text-sm leading-relaxed flex-1 italic">
                "{e.quote}"
              </p>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className={`font-bold text-sm ${e.textColor}`}>{e.author}</p>
                <p className="text-gray-500 text-xs font-mono mt-0.5">{e.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="text-center text-gray-600 text-[11px] sm:text-xs font-mono tracking-wide mt-8"
        >
          * Cytaty zbrane anonimowo. Projekt obywatelski — tożsamość autorów chroniona.
        </motion.p>
      </div>
    </section>
  );
}
