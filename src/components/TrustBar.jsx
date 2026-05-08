import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { t } = useLanguage();
  const items = t?.trust?.items || [];

  return (
    <div className="border-y border-brand-border bg-brand-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-3">
        {items.map((label) => (
          <span
            key={label}
            className="px-3 py-1 border border-brand-border text-gray-500 font-mono text-[10px] uppercase tracking-widest rounded-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

