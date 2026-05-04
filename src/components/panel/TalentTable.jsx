import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, SortAsc, SortDesc } from 'lucide-react';
import TalentCard from './TalentCard';

const VOIVODESHIPS = [
  { code: '', name: 'Wszystkie' },
  { code: 'DS', name: 'Dolnośląskie' },
  { code: 'KP', name: 'Kujawsko-Pomorskie' },
  { code: 'LU', name: 'Lubelskie' },
  { code: 'LB', name: 'Lubuskie' },
  { code: 'LD', name: 'Łódzkie' },
  { code: 'MA', name: 'Małopolskie' },
  { code: 'MZ', name: 'Mazowieckie' },
  { code: 'OP', name: 'Opolskie' },
  { code: 'PK', name: 'Podkarpackie' },
  { code: 'PD', name: 'Podlaskie' },
  { code: 'PM', name: 'Pomorskie' },
  { code: 'SL', name: 'Śląskie' },
  { code: 'SK', name: 'Świętokrzyskie' },
  { code: 'WN', name: 'Warmińsko-Mazurskie' },
  { code: 'WP', name: 'Wielkopolskie' },
  { code: 'ZP', name: 'Zachodniopomorskie' },
];

export default function TalentTable({ talents = [], loading = false, onFilterChange }) {
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [voivodeship, setVoivodeship] = useState('');
  const [tier, setTier] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [sortDir, setSortDir] = useState('desc');

  const handleApply = () => {
    onFilterChange?.({ voivodeship, tier, age_min: ageMin, age_max: ageMax });
  };

  const filtered = talents
    .filter((t) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        t.first_name?.toLowerCase().includes(q) ||
        t.last_name_initial?.toLowerCase().includes(q) ||
        t.sport?.toLowerCase().includes(q) ||
        t.voivodeship_code?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => sortDir === 'desc' ? b.ai_score - a.ai_score : a.ai_score - b.ai_score);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="p-3 sm:p-4 border border-brand-border bg-brand-card rounded-sm">
        <div className="flex flex-wrap gap-2 items-end">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj..."
              className="w-full bg-brand-dark border border-brand-border text-white font-mono text-xs pl-8 pr-3 py-2 rounded-sm
                focus:outline-none focus:border-brand-cyan/50 transition-colors placeholder-gray-700"
            />
          </div>

          {/* Voivodeship */}
          <select
            value={voivodeship}
            onChange={(e) => setVoivodeship(e.target.value)}
            className="bg-brand-dark border border-brand-border text-gray-300 font-mono text-xs px-3 py-2 rounded-sm
              focus:outline-none focus:border-brand-cyan/50 transition-colors"
          >
            {VOIVODESHIPS.map((v) => (
              <option key={v.code} value={v.code}>{v.name}</option>
            ))}
          </select>

          {/* Tier */}
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="bg-brand-dark border border-brand-border text-gray-300 font-mono text-xs px-3 py-2 rounded-sm
              focus:outline-none focus:border-brand-cyan/50 transition-colors"
          >
            <option value="">Wszystkie tiery</option>
            <option value="ELITE">ELITE</option>
            <option value="PROSPECT">PROSPECT</option>
            <option value="MONITOR">MONITOR</option>
          </select>

          {/* Age range */}
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value)}
              placeholder="Wiek od"
              min={6} max={25}
              className="w-20 bg-brand-dark border border-brand-border text-white font-mono text-xs px-2 py-2 rounded-sm
                focus:outline-none focus:border-brand-cyan/50 transition-colors placeholder-gray-700"
            />
            <span className="text-gray-600 font-mono text-xs">–</span>
            <input
              type="number"
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value)}
              placeholder="do"
              min={6} max={25}
              className="w-16 bg-brand-dark border border-brand-border text-white font-mono text-xs px-2 py-2 rounded-sm
                focus:outline-none focus:border-brand-cyan/50 transition-colors placeholder-gray-700"
            />
          </div>

          {/* Apply filters */}
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-3 py-2 border border-brand-cyan/40 text-brand-cyan font-mono text-xs
              hover:bg-brand-cyan hover:text-brand-dark transition-all rounded-sm"
          >
            <Filter size={11} />
            Filtruj
          </button>

          {/* Sort */}
          <button
            onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1.5 px-3 py-2 border border-brand-border text-gray-400 font-mono text-xs
              hover:border-gray-500 hover:text-white transition-all rounded-sm"
          >
            {sortDir === 'desc' ? <SortDesc size={11} /> : <SortAsc size={11} />}
            AI Score
          </button>

          <span className="ml-auto text-gray-600 text-xs font-mono">
            {filtered.length} wynik{filtered.length !== 1 ? 'ów' : ''}
          </span>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin" />
          <span className="ml-3 text-gray-500 font-mono text-sm">Ładowanie talentów…</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-600 font-mono text-sm">
          Brak talentów spełniających kryteria.
        </div>
      )}

      {/* Cards */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <TalentCard
                talent={t}
                active={activeId === t.id}
                onClick={() => setActiveId(activeId === t.id ? null : t.id)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
