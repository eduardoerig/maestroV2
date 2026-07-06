#!/usr/bin/env node
/**
 * build-canva-html.mjs — Monta o carrossel.html pronto para o Canva.
 *
 * Pega os slides autocontidos de um post (imagens/slide-01.html, slide-02.html, ...)
 * e os combina num ÚNICO arquivo `carrossel.html` em que cada slide vira uma
 * "página" do Canva — uma <section data-document-role="page"> irmã das outras.
 * Esse é exatamente o formato que a ferramenta `import-design-from-url` do Canva
 * espera para HTML gerado por agente: cada página vira uma página editável do design.
 *
 * O desafio é que cada slide usa classes CSS globais (.grid, .hook, .content...)
 * com valores DIFERENTES entre slides — concatenar os <style> as-is causaria
 * colisão. Por isso este script ESCOPA o CSS de cada slide automaticamente:
 *   - mapeia a regra `body { ... }` para o próprio container da página (#slide-N);
 *   - prefixa todo seletor com `#slide-N ` (ex.: `.hook` -> `#slide-N .hook`);
 *   - iça os `@import` de fonte para o topo do <head> consolidado (deduplicados).
 * Assim o slide-02 nunca herda o estilo do slide-01. Determinístico e sem regex
 * de reescrita frágil sobre seletores aninhados (os slides são CSS plano).
 *
 * Uso:
 *   node tools/build-canva-html.mjs <pasta-imagens> [--out <arquivo.html>] [--name "<titulo>"]
 *
 * Exemplo:
 *   node tools/build-canva-html.mjs perfis/primodev/posts/2026-06-26-openai-vs-anthropic/imagens
 *   # -> escreve .../imagens/carrossel.html
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// ── args ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const nameIdx = args.indexOf('--name');

if (!dir) {
  console.error('ERRO: informe a pasta dos slides (imagens/).');
  console.error('Uso: node tools/build-canva-html.mjs <pasta-imagens> [--out <arquivo.html>] [--name "<titulo>"]');
  process.exit(1);
}

const outPath = outIdx !== -1 ? path.resolve(args[outIdx + 1]) : path.join(path.resolve(dir), 'carrossel.html');
const title = nameIdx !== -1 ? args[nameIdx + 1] : 'Carrossel';

// ── coleta os slide-XX.html em ordem ─────────────────────────────────────────
let files;
try {
  files = (await readdir(dir))
    .filter((f) => /^slide-\d+\.html$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
} catch (e) {
  console.error(`ERRO: não consegui ler a pasta "${dir}". ${e.message}`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`Nenhum "slide-XX.html" em "${dir}". O Felipe (Diretor de Arte) gera os slides antes.`);
  process.exit(1);
}

/**
 * Escopa um bloco de CSS plano sob um seletor raiz.
 * - `body` / `html` / `html body`  -> o próprio container (scope)
 * - `*`                            -> `scope *`
 * - qualquer outro seletor         -> `scope <seletor>`
 * Listas separadas por vírgula são tratadas parte a parte.
 */
function scopeCss(css, scope, onAdvanced) {
  let out = '';
  const re = /([^{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const selRaw = m[1].trim();
    const decls = m[2].trim();
    if (!selRaw) continue;
    // at-rules com corpo aninhado (@media/@keyframes/@supports) não são suportadas
    // pelo escopo plano — mantém as-is e avisa (os slides do Maestro não usam).
    if (selRaw.startsWith('@')) {
      onAdvanced(selRaw.split(/\s/)[0]);
      out += `${selRaw}{${decls}}\n`;
      continue;
    }
    const scoped = selRaw.split(',').map((s) => {
      s = s.trim();
      if (!s) return s;
      if (s === 'body' || s === 'html' || s === 'html body') return scope;
      if (s === '*') return `${scope} *`;
      return `${scope} ${s}`;
    }).filter(Boolean).join(', ');
    out += `${scoped}{${decls}}\n`;
  }
  return out;
}

const imports = new Set();
const styleBlocks = [];
const sections = [];
const advanced = new Set();

for (let i = 0; i < files.length; i++) {
  const n = i + 1;
  const id = `slide-${n}`;
  const html = await readFile(path.join(dir, files[i]), 'utf8');

  const styleRaw = (html.match(/<style[^>]*>([\s\S]*?)<\/style>/i) || [, ''])[1];
  const bodyRaw = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [, ''])[1];

  // iça e deduplica os @import de fonte; remove do CSS escopável.
  // Atenção: a URL do Google Fonts contém ';' nos pesos (wght@600;700;...), então
  // o terminador da declaração é o ';' DEPOIS do url(...)/string — não qualquer ';'.
  const css = styleRaw.replace(
    /@import\s+(?:url\(\s*['"]?[^)]*['"]?\s*\)|['"][^'"]*['"])[^;]*;/gi,
    (stmt) => { imports.add(stmt.trim()); return ''; },
  );

  // dimensões declaradas no `body { width:..px; height:..px }` (preserva 1:1, 4:5, etc.)
  const bodyRule = (css.match(/(?:^|[}\s])body\s*\{([^}]*)\}/i) || [, ''])[1];
  const w = (bodyRule.match(/width\s*:\s*(\d+)\s*px/i) || [, '1080'])[1];
  const h = (bodyRule.match(/height\s*:\s*(\d+)\s*px/i) || [, '1080'])[1];

  const scoped = scopeCss(css, `#${id}`, (at) => advanced.add(at));
  styleBlocks.push(
    `  /* ${id} — ${w}x${h} (de ${files[i]}) */\n` +
    `  #${id}{position:relative; box-sizing:border-box; overflow:hidden;}\n` +
    scoped.replace(/^/gm, '  ').trimEnd()
  );

  sections.push(
    `<section id="${id}" data-document-role="page" data-label="Slide ${n}" ` +
    `style="width:${w}px; height:${h}px; overflow:hidden;">\n${bodyRaw}\n</section>`
  );
}

const head = [
  '  ' + [...imports].join('\n  '),
  '  *{margin:0;padding:0;box-sizing:border-box;}',
  '  body{margin:0;background:#15151f;display:flex;flex-direction:column;align-items:center;gap:24px;}',
  ...styleBlocks,
].filter(Boolean).join('\n');

const doc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
${head}
</style>
</head>
<body>
${sections.join('\n')}
</body>
</html>
`;

await writeFile(outPath, doc, 'utf8');

const rel = path.relative(process.cwd(), outPath).replace(/\\/g, '/');
console.log(`🎨 Carrossel montado: ${files.length} página(s) -> ${rel}`);
if (advanced.size) {
  console.warn(`⚠️  CSS avançado mantido sem escopo (${[...advanced].join(', ')}): confira o slide se houver herança indesejada.`);
}
console.log('   Próximo passo: publicar numa URL pública (tools/publish.mjs) e importar no Canva.');
