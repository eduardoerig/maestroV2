#!/usr/bin/env node
/**
 * render.mjs — Motor de geração de imagem 100% GRATUITO.
 *
 * Não usa nenhuma API paga. Renderiza arquivos HTML autocontidos
 * (slide-01.html, slide-02.html, ...) num navegador Chromium headless
 * via Playwright e captura um screenshot PNG pixel-perfect de cada um.
 *
 * O fluxo de arte do Maestro é livre por design: o "prompt" de imagem do
 * Felipe vira um HTML/CSS com o design da marca embutido, e este script
 * transforma esse HTML em PNG pronto para o Instagram.
 *
 * Uso:
 *   node tools/render.mjs <pasta-dos-slides> [largura] [altura] [escala]
 *
 * Exemplos:
 *   node tools/render.mjs perfis/padaria-aurora/posts/2026-06-25-cafe-de-inverno/imagens
 *   node tools/render.mjs ./imagens 1080 1350 2
 *
 * Padrões: 1080 x 1350 (proporção 4:5 do Instagram), escala 2 (saída nítida 2160x2700).
 */

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = process.argv[2];
const W = Number(process.argv[3]) || 1080;
const H = Number(process.argv[4]) || 1350;
const SCALE = Number(process.argv[5]) || 2;

if (!dir) {
  console.error('ERRO: informe a pasta dos slides.');
  console.error('Uso: node tools/render.mjs <pasta-dos-slides> [largura] [altura] [escala]');
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('ERRO: o pacote "playwright" não está instalado.');
  console.error('Rode primeiro:  npm install   (na raiz do projeto)');
  console.error('Se o navegador não baixar, rode:  npx playwright install chromium');
  process.exit(1);
}

// Descobre os arquivos slide-XX.html em ordem.
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
  console.error(`Nenhum arquivo "slide-XX.html" encontrado em "${dir}".`);
  console.error('O Felipe (Diretor de Arte) deve gerar os HTMLs dos slides antes de renderizar.');
  process.exit(1);
}

// Tenta usar o Chrome do sistema (sem download); cai para o Chromium do Playwright.
async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    return await chromium.launch({ headless: true });
  }
}

console.log(`🎨 Renderizando ${files.length} slide(s) em ${W}x${H} (escala ${SCALE}x) — sem custo de API.`);

const browser = await launch();
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: SCALE,
});
const page = await context.newPage();

let ok = 0;
for (const file of files) {
  const htmlPath = path.resolve(dir, file);
  const pngPath = htmlPath.replace(/\.html$/i, '.png');
  try {
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle', timeout: 30000 });
    // Garante que fontes do Google (@import) terminem de carregar antes do screenshot.
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`  ✓ ${file}  →  ${path.basename(pngPath)}`);
    ok++;
  } catch (e) {
    console.error(`  ✗ ${file}  — falhou: ${e.message}`);
  }
}

await browser.close();
console.log(`\n✅ Pronto: ${ok}/${files.length} imagem(ns) gerada(s) em "${dir}".`);
if (ok < files.length) process.exitCode = 1;
