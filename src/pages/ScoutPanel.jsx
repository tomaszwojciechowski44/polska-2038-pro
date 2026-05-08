import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, MapPin, Activity, RefreshCw } from 'lucide-react';
import PanelNavbar from '../components/panel/PanelNavbar';
import TalentTable from '../components/panel/TalentTable';
import VoivodeshipMapCard from '../components/panel/VoivodeshipMapCard';
import { getTalents, getScoutStats, getVoivodeships } from '../api/client';
import { useAuth } from '../context/AuthContext';

function StatCard({ label, value, color, icon: Icon, loading }) {
  return (
    <div className="p-4 sm:p-5 border border-brand-border bg-brand-card rounded-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{label}</span>
        {Icon && <Icon size={14} className={color} />}
      </div>
      {loading ? (
        <div className="h-7 w-16 bg-brand-border animate-pulse rounded-sm" />
      ) : (
        <div className={`font-display font-bold text-2xl ${color}`}>{value ?? '—'}</div>
      )}
    </div>
  );
}

export default function ScoutPanel() {
  const { user } = useAuth();
  const [talents, setTalents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [voivodeships, setVoivodeships] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  const fetchTalents = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const res = await getTalents(params);
      setTalents(res.data);
    } catch {
      setError('Nie udało się załadować talentów. Sprawdź połączenie z API.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await getScoutStats();
      setStats(res.data);
    } catch {
      // Stats are non-critical
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTalents(filters);
    fetchStats();
  }, [fetchTalents, fetchStats, filters]);

  useEffect(() => {
    getVoivodeships()
      .then((res) => setVoivodeships(res.data || []))
      .catch(() => setVoivodeships([]));
  }, []);

  const handleFilterChange = (newFilters) => {
    const clean = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v !== '' && v != null)
    );
    setFilters(clean);
  };

  const eliteCount = talents.filter((t) => t.ai_tier === 'ELITE').length;
  const avgScore = talents.length
    ? Math.round(talents.reduce((s, t) => s + t.ai_score, 0) / talents.length)
    : null;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <PanelNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Panel Skautingowy
              </h1>
              <p className="text-gray-500 font-mono text-xs mt-1">
                Witaj, <span className="text-brand-cyan">{user?.sub || 'Skaut'}</span> · Polska2038 TalentRadar
              </p>
            </div>
            <button
              onClick={() => fetchTalents(filters)}
              className="flex items-center gap-2 px-4 py-2 border border-brand-border text-gray-400 hover:text-white
                font-mono text-xs rounded-sm transition-colors self-start sm:self-auto"
            >
              <RefreshCw size={12} />
              Odśwież
            </button>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <StatCard
            label="Talentów łącznie"
            value={stats?.total_talents ?? talents.length}
            color="text-brand-cyan"
            icon={Users}
            loading={statsLoading && !talents.length}
          />
          <StatCard
            label="ELITE w regionie"
            value={stats?.elite_count ?? eliteCount}
            color="text-brand-neon"
            icon={TrendingUp}
            loading={statsLoading && !talents.length}
          />
          <StatCard
            label="Avg AI Score"
            value={stats?.avg_score ?? avgScore}
            color="text-brand-gold"
            icon={Activity}
            loading={statsLoading && !talents.length}
          />
          <StatCard
            label="Województw"
              value={stats?.voivodeships ?? (new Set(talents.map((t) => t.voivodeship_code)).size || 16)}
            color="text-gray-300"
            icon={MapPin}
            loading={statsLoading && !talents.length}
          />
        </motion.div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 border border-brand-red/40 bg-brand-red/10 text-brand-red font-mono text-sm rounded-sm">
            {error}
          </div>
        )}

        {/* Talent table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4">
            <VoivodeshipMapCard
              voivodeships={voivodeships}
              onSelect={(code) => handleFilterChange({ ...filters, voivodeship: code })}
            />
          </div>
          <TalentTable
            talents={talents}
            loading={loading}
            onFilterChange={handleFilterChange}
          />
        </motion.div>
      </main>
    </div>
  );
}
