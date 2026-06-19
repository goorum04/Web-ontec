// Syntax-check a src page (optionally + template) the same way build.mjs combines them.
// Usage: node .i18n-check.cjs src/index.jsx
//        node .i18n-check.cjs src/blog-1.jsx src/blog-article.jsx
const fs = require('fs');
const Babel = require('@babel/standalone');
const strip = (s) => s.replace(/const\s*\{\s*useState,\s*useEffect,\s*useRef\s*\}\s*=\s*React;\s*/g, '');
const shared = fs.readFileSync('src/shared.jsx', 'utf8');
const tweaks = fs.readFileSync('src/tweaks.jsx', 'utf8');
let combined = shared + '\n\n' + tweaks + '\n\n';
for (const f of process.argv.slice(2)) combined += strip(fs.readFileSync(f, 'utf8')) + '\n\n';
try {
  Babel.transform(combined, { presets: [['react', { runtime: 'classic' }]] });
  console.log('OK ' + process.argv.slice(2).join(' '));
} catch (e) {
  console.log('ERROR: ' + e.message);
  process.exit(1);
}
