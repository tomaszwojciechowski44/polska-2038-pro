import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Printer, ArrowLeft, FileText } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';
import { getMaterial } from '../data/materialsData';
import { useLanguage } from '../context/LanguageContext';

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function MaterialDetailPage() {
  const { slug } = useParams();
  const { t, localePath } = useLanguage();
  const mp = t?.materialPage ?? {};
  const material = useMemo(() => getMaterial(slug), [slug]);
  const docsHref = localePath('/reforma/dokumenty');

  if (!material) {
    return (
      <PublicLayout pageTitle={mp.notFoundTitle} pageSubtitle={mp.notFoundSub}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <Link to={docsHref} className="text-brand-cyan font-mono text-sm hover:text-white transition-colors">
            {mp.backDocs}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout
      pageTitle={material.title}
      pageSubtitle={`${material.subtitle} · ${material.audience}`}
    >
      {/* Breadcrumb */}
      <div className="bg-gray-950 border-b border-gray-800 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm font-mono">
          <Link to={docsHref} className="text-gray-500 hover:text-white transition-colors">{mp.breadcrumbDocs}</Link>
          <span className="text-gray-700">/</span>
          <span className="text-brand-neon">{material.title}</span>
        </div>
      </div>

      <section className="py-12 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">{material.subtitle}</div>
                <div className="text-white font-black text-xl">{material.title}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 rounded-xl font-mono text-sm transition-colors"
              >
                <Printer className="w-4 h-4" /> {mp.printPdf}
              </button>
              <button
                onClick={() => downloadText(`${material.slug}.txt`, material.txt || '')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-neon text-black hover:bg-green-300 rounded-xl font-mono font-bold text-sm transition-colors"
              >
                <Download className="w-4 h-4" /> {mp.downloadTxt}
              </button>
              <Link
                to={docsHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-xl font-mono text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {mp.docsBtn}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {material.sections?.map((s, idx) => (
              <motion.div
                key={s.h}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-white font-black text-lg mb-3">{s.h}</h3>
                <div className="space-y-2">
                  {s.p?.map((line) => (
                    <p key={line} className="text-gray-300 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">{mp.noticeTitle}</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {mp.noticeBody}
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

