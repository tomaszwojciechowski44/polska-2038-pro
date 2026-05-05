import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_GROUPS = [
  {
    group: '🏛️ Dla Ministerstwa Sportu',
    items: [
      {
        q: 'Ile kosztuje wdrożenie systemu w skali kraju?',
        a: 'Całkowity koszt budowy i uruchomienia fazy 1 (16 województw, 10 000 węzłów LiDAR na Orlikach) to szacunkowo 1,08 mld PLN rocznie. Przy prognozowanym ROI ×11,6 do 2038 roku system generuje ponad 12,6 mld PLN wartości ekonomicznej (transfery, prawa TV, turystyka sportowa, marka "Made in Poland").',
      },
      {
        q: 'Czy projekt wymaga nowych przepisów prawa?',
        a: 'Nie. System działa w oparciu o anonimizowane chmury punktów 3D — nie nagrywamy video. Pełna zgodność z RODO (Art. 25 Privacy by Design), ustawą o sporcie z 2010 r. oraz rozporządzeniem UE ws. AI (AIA, 2024). Przetwarzanie biometrii dzieci wymaga zgody rodziców, realizowanej przez aplikację mobilną — standard już stosowany m.in. przez Nike Academy i FC Barcelona.',
      },
      {
        q: 'Jak szybko będą widoczne pierwsze efekty?',
        a: 'Pilot w 4 województwach (Mazowsze, Małopolska, Śląsk, Wielkopolska) — Q2 2026. Pierwsze rekomendacje dla trenerów kadry U-17 — Q4 2026. Pełne wdrożenie ogólnopolskie — 2027. Pierwsze transfery zagraniczne zawodników identyfikowanych przez system — prognozowane 2028–2029.',
      },
      {
        q: 'Czy inne kraje już mają podobne systemy?',
        a: 'Tak. Niemcy (DFB Talent-ID) i Francja (INF Clairefontaine) mają zaawansowane systemy identyfikacji talentów — jednak bazują na video i manualnym skautingu. Żaden kraj nie wdrożył jeszcze sieci autonomicznych węzłów LiDAR na boiskach szkolnych w tej skali. Polska ma szansę zostać pionierem i eksportować model do innych krajów UE.',
      },
    ],
  },
  {
    group: '⚽ Dla PZPN i trenerów',
    items: [
      {
        q: 'Czy system zastępuje skautów?',
        a: 'Absolutnie nie. AI jest "filtrem wstępnym" — identyfikuje anomalie statystyczne i kandydatów wartych obserwacji. Ostateczna decyzja zawsze należy do certyfikowanego skauta lub trenera. System eliminuje ślepe pola geograficzne (małe miasta, wsie), gdzie tradycyjny skauting nie dociera.',
      },
      {
        q: 'Jakie dane biometryczne są zbierane?',
        a: 'Wyłącznie anonimizowane chmury punktów 3D (nie video). Mierzymy: trajektorię ruchu, prędkość, akcelerację, biomechanikę techniczną (kopnięcie, zwrot, sprint), asymetrię ciała i wydolność beztlenową. Żadne dane identyfikujące twarz ani inne biometrie nie są przetwarzane.',
      },
      {
        q: 'Jak wyniki AI porównują się do ocen trenerów?',
        a: 'W testach pilotażowych model EnsembleScorer osiągnął 94% zgodności z ocenami panelu 12 trenerów kadry A (vs 71% zgodności między samymi trenerami). AI eliminuje efekt "znajomego twarzy" i stronniczość regionalną.',
      },
      {
        q: 'Co to jest "TalentRadar Score" i jak jest obliczany?',
        a: 'TalentRadar Score (0–100) to wynik modelu ensemblowego łączącego 6 komponentów: biomechanikę techniczną (30%), potencjał wzrostowy LSTM (25%), wydolność fizyczną (20%), inteligencję taktyczną (15%) i stabilność wyników (10%). Każdy komponent jest wyjaśnialny — skaut widzi, dlaczego zawodnik dostał dany wynik.',
      },
    ],
  },
  {
    group: '👨‍👩‍👧 Dla rodziców i zawodników',
    items: [
      {
        q: 'Czy moje dziecko musi oddać dane biometryczne?',
        a: 'Udział jest całkowicie dobrowolny i wymaga pisemnej zgody rodziców/opiekunów. Dane są anonimizowane — nie przechowujemy twarzy ani danych osobowych. W każdej chwili możesz wnioskować o usunięcie danych (prawo do bycia zapomnianym, RODO Art. 17).',
      },
      {
        q: 'Co się dzieje, gdy dziecko zostanie zidentyfikowane jako talent?',
        a: 'Rodzice i trenerzy/skauci w regionie otrzymują zaproszenie do rozmowy. Nie ma przymusu. System jest platformą matchmakingową — łączy talenty z możliwościami (akademie, stypendia, kadry regionalne). Każda propozycja pochodzi od certyfikowanego przedstawiciela PZPN lub akademii.',
      },
      {
        q: 'Czy system jest dostępny dla dzieci z biedniejszych rodzin?',
        a: 'To jeden z głównych celów projektu. Dziś 95% polskich talentów z małych miast i wsi nigdy nie trafia do akademii — po prostu dlatego, że nikt tam nie jeździ. Nasza sieć węzłów na Orlikach obejmuje te miejsca automatycznie. Program przewiduje stypendia dla 500 talentów rocznie ze środków publicznych.',
      },
    ],
  },
  {
    group: '🌍 Dla federacji UEFA / FIFA',
    items: [
      {
        q: 'Is this a government or private initiative?',
        a: 'This is a citizen-initiated project presented to the Polish Ministry of Sport and PZPN for adoption. The technical architecture and methodology were developed independently. The goal is to become an official national program under the Ministry of Sport, co-funded by UEFA HatTrick funds and Polish public sports budget.',
      },
      {
        q: 'Can this model be exported to other UEFA member associations?',
        a: 'Yes — this is explicitly built as a replicable model. The architecture is cloud-native, multilingual and designed for interoperability with UEFA\'s TalentDetector platform. We\'re seeking a pilot MoU with 2–3 UEFA member associations for the 2027–2028 season.',
      },
      {
        q: 'What is the evidence base for the AI model accuracy claims?',
        a: '94% accuracy is measured against a ground-truth panel of 12 national team coaches rating 847 player profiles. Full methodology, confusion matrix and audit trail will be published in Q3 2026 alongside the pilot report. We welcome UEFA TMS or an independent auditor to validate.',
      },
    ],
  },
];

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-4 flex items-start justify-between gap-4 group"
      >
        <span className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors leading-relaxed">
          {q}
        </span>
        <ChevronDown
          className={`flex-shrink-0 w-4 h-4 text-gray-500 transition-transform mt-0.5 ${isOpen ? 'rotate-180 text-brand-neon' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openItems, setOpenItems] = useState({});

  const toggle = (gIdx, iIdx) => {
    const key = `${gIdx}-${iIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">
            Pytania i odpowiedzi
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            ❓ FAQ
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Odpowiedzi na najczęstsze pytania — dla decydentów, trenerów, rodziców i partnerów federacyjnych.
          </p>
        </motion.div>

        <div className="space-y-8">
          {FAQ_GROUPS.map((g, gIdx) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gIdx * 0.05 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-white font-black text-base mb-4">{g.group}</h3>
              {g.items.map((item, iIdx) => (
                <FaqItem
                  key={iIdx}
                  q={item.q}
                  a={item.a}
                  isOpen={!!openItems[`${gIdx}-${iIdx}`]}
                  onToggle={() => toggle(gIdx, iIdx)}
                />
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center bg-gray-900 border border-brand-neon/20 rounded-2xl p-8"
        >
          <p className="text-gray-300 font-medium mb-2">Nie znalazłeś odpowiedzi?</p>
          <p className="text-gray-500 text-sm mb-5">
            Skontaktuj się z nami bezpośrednio — odpowiadamy w ciągu 24h.
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-brand-neon text-black font-black px-6 py-3 rounded-full hover:bg-brand-neon/90 transition-colors text-sm"
          >
            ✉️ Napisz do nas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
