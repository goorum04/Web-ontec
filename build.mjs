// Build: compiles src/*.jsx (shared + tweaks + page) to <page>.page.js
// Requires @babel/standalone. Run: NODE_PATH=/path/to/node_modules node build.mjs
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const Babel = require('@babel/standalone');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'src');

const shared = fs.readFileSync(path.join(SRC, 'shared.jsx'), 'utf-8');
const tweaks = fs.readFileSync(path.join(SRC, 'tweaks.jsx'), 'utf-8');
const prefix = shared + '\n\n' + tweaks + '\n\n';

const pages = ['index', 'empresa', 'solucions', 'serveis', 'blog', 'contacta', 'article', 'seu-justicia', 'legal', 'privacitat', 'cookies'];

for (const p of pages) {
  let page = fs.readFileSync(path.join(SRC, p + '.jsx'), 'utf-8');
  page = page.replace(/const\s*\{\s*useState,\s*useEffect,\s*useRef\s*\}\s*=\s*React;\s*/g, '');
  const combined = prefix + page;
  const { code } = Babel.transform(combined, { presets: [['react', { runtime: 'classic' }]] });
  fs.writeFileSync(path.join(__dirname, p + '.page.js'), code);
  console.log(`${p}.page.js  ${(code.length/1024).toFixed(1)} KB`);
}

console.log('Build complete.');
