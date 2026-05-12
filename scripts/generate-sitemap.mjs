import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outPath = path.join(publicDir, 'sitemap.xml');

const baseUrl = 'https://polska2038.pl';

// Keep in sync with scripts/prerender.mjs
const routes = [
  '/',
  '/en',
  '/login',
  '/mapa-talentow',
  '/technologia',
  '/reforma',
  '/reforma/dokumenty',
  '/reforma/en',
  '/dla-kogo',
  '/dla-federacji',
  '/wyniki',
  '/partnerzy',
  '/kontakt',
  '/o-programie',
];

const lastmod = new Date().toISOString().slice(0, 10);
const urls = routes.map((r) => {
  const loc = r === '/' ? baseUrl : `${baseUrl}${r}`;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </url>',
  ].join('\n');
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  '',
].join('\n');

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`[sitemap] wrote ${routes.length} routes to ${outPath}`);

