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

const pages = ['index', 'empresa', 'solucions', 'serveis', 'blog', 'contacta', 'seu-justicia'];

for (const p of pages) {
  let page = fs.readFileSync(path.join(SRC, p + '.jsx'), 'utf-8');
  page = page.replace(/const\s*\{\s*useState,\s*useEffect,\s*useRef\s*\}\s*=\s*React;\s*/g, '');
  const combined = prefix + page;
  const { code } = Babel.transform(combined, { presets: [['react', { runtime: 'classic' }]] });
  fs.writeFileSync(path.join(__dirname, p + '.page.js'), code);
  console.log(`${p}.page.js  ${(code.length/1024).toFixed(1)} KB`);
}

// Compile blog articles using blog-article template
const articleTemplate = fs.readFileSync(path.join(SRC, 'blog-article.jsx'), 'utf-8');
for (let i = 1; i <= 6; i++) {
  const articleFile = `blog-${i}`;
  let articleData = fs.readFileSync(path.join(SRC, articleFile + '.jsx'), 'utf-8');
  articleData = articleData.replace(/const\s*\{\s*useState,\s*useEffect,\s*useRef\s*\}\s*=\s*React;\s*/g, '');
  const combined = prefix + articleData + '\n\n' + articleTemplate;
  const { code } = Babel.transform(combined, { presets: [['react', { runtime: 'classic' }]] });
  fs.writeFileSync(path.join(__dirname, articleFile + '.page.js'), code);
  console.log(`${articleFile}.page.js  ${(code.length/1024).toFixed(1)} KB`);
}

console.log('Build complete.');
