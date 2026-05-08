import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');

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

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function routeToOutPath(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(distDir, clean, 'index.html');
}

function injectAppHtml(html, appHtml) {
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

async function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing template: ${templatePath}`);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  // Load SSR bundle produced by `vite build --ssr`.
  const ssrEntry = path.join(distDir, 'server', 'entry-server.js');
  if (!fs.existsSync(ssrEntry)) {
    throw new Error(`Missing SSR bundle: ${ssrEntry}`);
  }

  const mod = await import(pathToFileURL(ssrEntry).toString());
  if (typeof mod.render !== 'function') {
    throw new Error('SSR entry does not export render(url)');
  }

  for (const r of routes) {
    const { appHtml } = await mod.render(r);
    const outPath = routeToOutPath(r);
    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, injectAppHtml(template, appHtml), 'utf8');
  }

  // 404 page for static hosts
  fs.writeFileSync(path.join(distDir, '404.html'), fs.readFileSync(path.join(distDir, 'index.html'), 'utf8'), 'utf8');
  console.log(`[prerender] rendered ${routes.length} routes`);
}

main().catch((e) => {
  console.error('[prerender] failed', e);
  process.exit(1);
});

