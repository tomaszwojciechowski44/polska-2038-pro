import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, Shield, TrendingUp, Activity, RefreshCw, CheckCircle,
  Clock, MapPin, BarChart2, LogOut, User, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAdminStats, getAdminRegUsers, getAdminRegScouts } from '../api/client';

function StatCard({ label, value, color, icon: Icon, sub }) {
  return (
    <div className="p-5 border border-[#1e2d4a] bg-[#0d1325] rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{label}</span>
        {Icon && <Icon size={14} className={color} />}
      </div>
      <div className={`font-display font-bold text-2xl ${color}`}>{value ?? '—'}</div>
      {sub && <div className="text-gray-600 font-mono text-xs mt-1">{sub}</div>}
    </div>
  );
}

const STATUS_COLORS = { pending: 'text-yellow-400', pending_approval: 'text-orange-400', approved: 'text-green-400', rejected: 'text-red-400' };
const STATUS_LABELS = { pending: 'Oczekuje', pending_approval: 'Do weryfikacji', approved: 'Zaakceptowany', rejected: 'Odrzucony' };

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [regUsers, setRegUsers] = useState([]);
  const [regScouts, setRegScouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [sRes, uRes, sRes2] = await Promise.all([
        getAdminStats(),
        getAdminRegUsers(),
        getAdminRegScouts(),
      ]);
      setStats(sRes.data);
      setRegUsers(uRes.data);
      setRegScouts(sRes2.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Błąd ładowania danych.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: BarChart2 },
    { id: 'users', label: `Zawodnicy (${regUsers.length})`, icon: Users },
    { id: 'scouts', label: `Skauci (${regScouts.length})`, icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#080d1a] text-white">
      {/* Admin navbar */}
      <nav className="border-b border-[#1e2d4a] bg-[#0d1325] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-red-500 font-display font-bold tracking-widest">#POLSKA</span>
              <span className="text-yellow-400 font-display font-bold tracking-widest">2038</span>
            </Link>
            <span className="hidden sm:block text-gray-600 font-mono text-[10px] tracking-widest">|</span>
            <span className="hidden sm:block text-red-400 font-mono text-[10px] uppercase tracking-widest">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#1e2d4a] rounded">
              <User size={12} className="text-red-400" />
              <span className="text-gray-300 font-mono text-xs">{user?.sub}</span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded">
                ADMIN
              </span>
            </div>
            <Link to="/panel" className="text-gray-500 hover:text-cyan-400 font-mono text-xs transition-colors hidden sm:block">
              Panel skautingowy
            </Link>
            <button onClick={logout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-400 font-mono text-xs transition-colors">
              <LogOut size={13} /> Wyloguj
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Panel Administracyjny</h1>
            <p className="text-gray-500 font-mono text-xs mt-1">Polska2038 · System Zarządzania Talentami · v1.0</p>
          </div>
          <button onClick={load} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-[#1e2d4a] text-gray-400 hover:text-white font-mono text-xs rounded transition-colors disabled:opacity-50">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Odśwież
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-sm rounded flex items-center gap-2">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#1e2d4a]">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs transition-colors border-b-2 -mb-px ${
                  activeTab === t.id
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}>
                <Icon size={13} />{t.label}
              </button>
            );
          })}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-24 bg-[#0d1325] border border-[#1e2d4a] rounded-lg animate-pulse" />
                ))}
              </div>
            ) : stats ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard label="Profili talentów" value={stats.total_talents} color="text-cyan-400" icon={Users} sub="Wszystkie województwa" />
                  <StatCard label="ELITE" value={stats.elite_count} color="text-green-400" icon={TrendingUp} sub={`${stats.total_talents > 0 ? Math.round(stats.elite_count / stats.total_talents * 100) : 0}% bazy talentów`} />
                  <StatCard label="Avg AI Score" value={stats.avg_score} color="text-yellow-400" icon={Activity} sub="Średnia systemowa" />
                  <StatCard label="Województwa" value={stats.voivodeships} color="text-gray-300" icon={MapPin} sub="Aktywnych regionów" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard label="Zarejestrowani zawodnicy" value={stats.registered_users} color="text-cyan-400" icon={Users} />
                  <StatCard label="Zarejestrowani skauci" value={stats.registered_scouts} color="text-yellow-400" icon={Shield} />
                  <StatCard label="Do weryfikacji" value={stats.pending_approvals} color="text-orange-400" icon={Clock} sub="Wnioski skautów" />
                  <StatCard label="Status systemu" value="ONLINE" color="text-green-400" icon={CheckCircle} sub="API v1.0 · Demo" />
                </div>

                {/* Quick summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-[#1e2d4a] bg-[#0d1325] rounded-lg p-5">
                    <h3 className="text-white font-display font-bold text-sm mb-4 flex items-center gap-2">
                      <Users size={14} className="text-cyan-400" /> Ostatnie rejestracje zawodników
                    </h3>
                    {regUsers.length === 0 ? (
                      <p className="text-gray-600 font-mono text-xs">Brak rejestracji</p>
                    ) : (
                      <div className="space-y-2">
                        {regUsers.slice(-5).reverse().map((u) => (
                          <div key={u.id} className="flex items-center justify-between py-1.5 border-b border-[#1e2d4a] last:border-0">
                            <div>
                              <span className="text-white font-mono text-xs">{u.first_name} {u.last_name}</span>
                              <span className="text-gray-600 font-mono text-[10px] ml-2">{u.sport}</span>
                            </div>
                            <span className={`font-mono text-[10px] ${STATUS_COLORS[u.status]}`}>{STATUS_LABELS[u.status]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border border-[#1e2d4a] bg-[#0d1325] rounded-lg p-5">
                    <h3 className="text-white font-display font-bold text-sm mb-4 flex items-center gap-2">
                      <Shield size={14} className="text-yellow-400" /> Ostatnie wnioski skautów
                    </h3>
                    {regScouts.length === 0 ? (
                      <p className="text-gray-600 font-mono text-xs">Brak wniosków</p>
                    ) : (
                      <div className="space-y-2">
                        {regScouts.slice(-5).reverse().map((s) => (
                          <div key={s.id} className="flex items-center justify-between py-1.5 border-b border-[#1e2d4a] last:border-0">
                            <div>
                              <span className="text-white font-mono text-xs">{s.first_name} {s.last_name}</span>
                              <span className="text-gray-600 font-mono text-[10px] ml-2">{s.organization}</span>
                            </div>
                            <span className={`font-mono text-[10px] ${STATUS_COLORS[s.status]}`}>{STATUS_LABELS[s.status]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </motion.div>
        )}

        {/* Users tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {regUsers.length === 0 ? (
              <div className="text-center py-16">
                <Users size={40} className="text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 font-mono text-sm">Brak zarejestrowanych zawodników</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e2d4a]">
                      {['ID','Imię i nazwisko','E-mail','Dyscyplina','Klub','Województwo','Rok ur.','Status'].map((h) => (
                        <th key={h} className="text-left py-3 px-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {regUsers.map((u) => (
                      <tr key={u.id} className="border-b border-[#1e2d4a]/50 hover:bg-[#0d1325] transition-colors">
                        <td className="py-3 px-3 text-gray-600 font-mono text-xs">P2038-U-{String(u.id).padStart(4,'0')}</td>
                        <td className="py-3 px-3 text-white font-mono text-xs">{u.first_name} {u.last_name}</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{u.email}</td>
                        <td className="py-3 px-3 text-cyan-400 font-mono text-xs">{u.sport}</td>
                        <td className="py-3 px-3 text-gray-500 font-mono text-xs">{u.club || '—'}</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{u.voivodeship}</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{u.birth_year}</td>
                        <td className="py-3 px-3">
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                            u.status === 'pending' ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400' : 'border-green-400/30 bg-green-400/10 text-green-400'
                          }`}>{STATUS_LABELS[u.status]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Scouts tab */}
        {activeTab === 'scouts' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {regScouts.length === 0 ? (
              <div className="text-center py-16">
                <Shield size={40} className="text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 font-mono text-sm">Brak wniosków o akredytację</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e2d4a]">
                      {['Nr ref.','Imię i nazwisko','E-mail','Organizacja','Specjalizacja','Doświadczenie','Regiony','Status'].map((h) => (
                        <th key={h} className="text-left py-3 px-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {regScouts.map((s) => (
                      <tr key={s.id} className="border-b border-[#1e2d4a]/50 hover:bg-[#0d1325] transition-colors">
                        <td className="py-3 px-3 text-gray-600 font-mono text-xs">P2038-S-{String(s.id).padStart(4,'0')}</td>
                        <td className="py-3 px-3 text-white font-mono text-xs">{s.first_name} {s.last_name}</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{s.email}</td>
                        <td className="py-3 px-3 text-gray-300 font-mono text-xs">{s.organization}</td>
                        <td className="py-3 px-3 text-yellow-400 font-mono text-xs">{s.sports_specialty}</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{s.experience_years}+ lat</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{s.voivodeships?.length || 0} woj.</td>
                        <td className="py-3 px-3">
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                            s.status === 'pending_approval' ? 'border-orange-400/30 bg-orange-400/10 text-orange-400' : 'border-green-400/30 bg-green-400/10 text-green-400'
                          }`}>{STATUS_LABELS[s.status]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
