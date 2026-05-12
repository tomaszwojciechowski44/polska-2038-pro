/**
 * Rasterizes public/og-image.svg → public/og-image-v2.png for Twitter/X and OG crawlers
 * (many platforms ignore SVG in twitter:image / og:image).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svgPath = path.join(root, 'public', 'og-image.svg');
const outPath = path.join(root, 'public', 'og-image-v2.png');

const svg = fs.readFileSync(svgPath, 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
});
const pngData = resvg.render();
fs.writeFileSync(outPath, pngData.asPng());
console.log('OG raster:', outPath);
