import { motion } from 'framer-motion';
import { useInView } from '../hooks/useCountUp';
import { Building2, Shield } from 'lucide-react';

const AUDIENCES = [
	{
		id: 'ministry',
		emoji: '🏛️',
		title: 'Ministerstwo Sportu i Turystyki',
		subtitle: 'Decydenci i finansowanie publiczne',
		color: 'red',
		pitch: 'System gotowy do wdrożenia na 10 000 Orlików w ramach programu SportPL2030. Pilotaż Q1 2026 w 50 lokalizacjach.',
		benefits: [
			'Dane do kształtowania polityki sportowej w czasie rzeczywistym',
			'Wskaźnik wykrycia talentów: z 0,1% do ponad 12%',
			'Zgodność z GDPR Art.25 i normą ISO 27001',
			'Integracja z KPO i funduszami EU Digital',
		],
		sectionLabels: ['Executive Summary', 'Kalkulator ROI', 'Roadmap 2038'],
		sections: ['#executive', '#roi', '#roadmap'],
	},
	{
		id: 'pzpn',
		emoji: '⚽',
		title: 'PZPN i Federacje Sportowe',
		subtitle: 'Skauci, trenerzy, akademie',
		color: 'neon',
		pitch: 'API skauta — 25 najlepszych talentów w promieniu 50km w 3 kliknięciach. Real-time. Bez wideo. Bez naruszenia RODO.',
		benefits: [
			'TalentRadar: geolokalizacyjna mapa zawodników',
			'AI Score 0-100 + pełna karta biomechaniczna',
			'Historia treningów i trajektoria kariery od 6 roku życia',
			'Integracja z systemami FIFA Connect i UEFA Elite',
		],
		sectionLabels: ['Demo Skauta', 'AI Engine', 'Mapa Talentów'],
		sections: ['#scout-demo', '#ai-engine', '#mapa'],
	},
	{
		id: 'sponsors',
		emoji: '💎',
		title: 'Sponsorzy i Inwestorzy',
		subtitle: 'Globalne marki i fundusze VC',
		color: 'gold',
		pitch: 'ROI 370% w 8 latach. Rynek docelowy: $100 mld. Infrastruktura której żaden kraj na świecie nie ma — first mover advantage.',
		benefits: [
			'Wycena systemu: 1,1 MLD PLN (zwalidowana)',
			'4 poziomy partnerstwa: od 500K do 5M PLN',
			'Branding na platformie obsługującej 5M zawodników',
			'Co-development i dostęp do anonimizowanych danych',
		],
		sectionLabels: ['Kalkulator ROI', 'Pakiety sponsorskie', 'Executive Summary'],
		sections: ['#roi', '#partnerzy', '#executive'],
	},
	{
		id: 'media',
		emoji: '📰',
		title: 'Media i Dziennikarze',
		subtitle: 'Prasa, TV, portale sportowe',
		color: 'cyan',
		pitch: 'Polska buduje infrastrukturę wykrywania talentów, jakiej nie ma żaden kraj na świecie. LiDAR + AI + 10 000 boisk.',
		benefits: [
			'Gotowe press releases (PL i EN) do kopiowania',
			'Dane, wykresy i infografiki do pobrania',
			'Dostęp do dema i możliwość wywiadu technicznego',
			'Embargo i premiera medialna — pierwsze media dostają exclusivity',
		],
		sectionLabels: ['Media Buzz', 'Press Releases', 'Demo live'],
		sections: ['#media-buzz', '#media', '#scout-demo'],
	},
];

export default function AudienceSection() {
	const [ref, inView] = useInView(0.06);

	return (
		<section
			id="dla-kogo"
			className="py-24 bg-brand-card relative overflow-hidden"
			ref={ref}
		>
			<div className="absolute inset-0 bg-grid-pattern opacity-20" />
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
			<div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					className="text-center mb-14"
				>
					<span className="inline-flex items-center gap-2 text-brand-red font-mono text-sm tracking-widest uppercase mb-3">
						<Building2 size={14} />
						DLA KOGO
					</span>
					<h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
						Znajdź swoją{' '}
						<span
							className="text-brand-red"
							style={{
								textShadow: '0 0 20px rgba(220,20,60,0.4)',
							}}
						>
							ścieżkę
						</span>
					</h2>
					<p className="text-gray-400 text-lg max-w-2xl mx-auto">
						#Polska2038 jest zaprojektowany dla każdego, kto ma wpływ na
						polskie sukcesy sportowe. Wybierz swoją rolę i zobacz co system
						robi dla Ciebie.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-5">
					{AUDIENCES.map((a, i) => {
						const colorBorder =
							a.color === 'neon'
								? 'border-brand-neon/30 hover:border-brand-neon/60'
								: a.color === 'cyan'
								? 'border-brand-cyan/30 hover:border-brand-cyan/60'
								: a.color === 'gold'
								? 'border-brand-gold/30 hover:border-brand-gold/60'
								: 'border-brand-red/30 hover:border-brand-red/60';
						const colorBg =
							a.color === 'neon'
								? 'bg-brand-neon/5'
								: a.color === 'cyan'
								? 'bg-brand-cyan/5'
								: a.color === 'gold'
								? 'bg-brand-gold/5'
								: 'bg-brand-red/5';
						const colorAccentHex =
							a.color === 'neon'
								? '#00FF88'
								: a.color === 'cyan'
								? '#00E5FF'
								: a.color === 'gold'
								? '#FFD700'
								: '#DC143C';
						const colorText =
							a.color === 'neon'
								? 'text-brand-neon'
								: a.color === 'cyan'
								? 'text-brand-cyan'
								: a.color === 'gold'
								? 'text-brand-gold'
								: 'text-brand-red';
						const colorBadge =
							a.color === 'neon'
								? 'text-brand-neon bg-brand-neon/10 border-brand-neon/20'
								: a.color === 'cyan'
								? 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20'
								: a.color === 'gold'
								? 'text-brand-gold bg-brand-gold/10 border-brand-gold/20'
								: 'text-brand-red bg-brand-red/10 border-brand-red/20';

						return (
							<motion.div
								key={a.id}
								initial={{ opacity: 0, y: 30 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: i * 0.1 }}
								className={`border ${colorBorder} ${colorBg} relative overflow-hidden transition-all duration-300`}
							>
								<div
									className="h-0.5 w-full"
									style={{ backgroundColor: colorAccentHex }}
								/>
								<div className="p-6">
									<div className="flex items-start gap-4 mb-4">
										<div
											className={`text-3xl w-14 h-14 flex items-center justify-center flex-shrink-0 border ${colorBadge}`}
										>
											{a.emoji}
										</div>
										<div>
											<h3
												className={`font-display font-bold text-lg ${colorText}`}
											>
												{a.title}
											</h3>
											<p className="text-gray-500 font-mono text-xs">
												{a.subtitle}
											</p>
										</div>
									</div>

									<p
										className="text-gray-300 text-sm leading-relaxed mb-4 font-mono border-l-2 pl-3"
										style={{ borderColor: colorAccentHex }}
									>
										{a.pitch}
									</p>

									<ul className="space-y-1.5 mb-5">
										{a.benefits.map((b) => (
											<li
												key={b}
												className="flex items-start gap-2 text-xs font-mono text-gray-400"
											>
												<span
													className={`mt-0.5 flex-shrink-0 ${colorText}`}
												>
													&#10003;
												</span>
												{b}
											</li>
										))}
									</ul>

									<div className="flex flex-wrap gap-2 mb-4">
										{a.sections.map((s, si) => (
											<a
												key={s}
												href={s}
												className={`text-[10px] font-mono px-2 py-1 border transition-colors ${colorBadge} hover:opacity-80`}
											>
												{a.sectionLabels[si]}
											</a>
										))}
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.5 }}
					className="mt-10 p-5 border border-brand-border bg-brand-dark/50 flex flex-col sm:flex-row items-center justify-between gap-4"
				>
					<div className="flex items-center gap-3">
						<Shield size={16} className="text-brand-gold flex-shrink-0" />
						<p className="text-gray-400 font-mono text-xs">
							Wszystkie dane demonstracyjne. System w fazie pilotażu.
							Partnerstwa i wdrożenia na zapytanie.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
