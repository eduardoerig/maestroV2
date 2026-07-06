#!/usr/bin/env node
/**
 * package.mjs — Empacota um post em uma ENTREGA pronta para o Instagram.
 *
 * Pega os PNGs já renderizados de um post + a legenda e monta:
 *   entregas/{slug}-{post}/
 *     ├── slide-01.png ... slide-NN.png   (na ordem de publicação)
 *     ├── legenda.txt                       (legenda + hashtags)
 *     └── LEIA-ME.txt                       (instruções de postagem)
 *   entregas/{slug}-{post}.zip              (o mesmo, zipado)
 *
 * Sem dependências externas. Zip via Compress-Archive (Windows) / zip|tar (outros).
 *
 * Uso:
 *   node tools/package.mjs <pasta-do-post> [--out <pasta-de-saida>]
 *
 * Exemplo:
 *   node tools/package.mjs perfis/padaria-aurora/posts/2026-06-25-cafe-de-inverno
 */

import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── args ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const postDirArg = args.find((a) => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const outBase = outIdx !== -1 ? path.resolve(args[outIdx + 1]) : path.join(ROOT, 'entregas');

if (!postDirArg) {
  console.error('ERRO: informe a pasta do post.');
  console.error('Uso: node tools/package.mjs <pasta-do-post> [--out <pasta-de-saida>]');
  process.exit(1);
}
const postDir = path.resolve(postDirArg);
const imagensDir = path.join(postDir, 'imagens');

if (!existsSync(imagensDir)) {
  console.error(`ERRO: não achei a pasta de imagens: ${imagensDir}`);
  console.error('Renderize os slides primeiro:  node tools/render.mjs ' + path.relative(ROOT, imagensDir).replace(/\\/g, '/'));
  process.exit(1);
}

// slug e nome do post a partir do caminho .../perfis/<slug>/posts/<post>
const parts = postDir.split(path.sep);
const pi = parts.lastIndexOf('perfis');
const slug = pi !== -1 && parts[pi + 1] ? parts[pi + 1] : 'marca';
const postName = parts[parts.length - 1] || 'post';
const deliveryName = `${slug}-${postName}`;

// ── coleta os PNGs em ordem ─────────────────────────────────────────────────
const pngs = (await readdir(imagensDir))
  .filter((f) => /^slide-\d+\.png$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (pngs.length === 0) {
  console.error(`Nenhum slide-XX.png em ${imagensDir}. Rode tools/render.mjs antes de empacotar.`);
  process.exit(1);
}

// ── legenda ─────────────────────────────────────────────────────────────────
async function resolveCaption() {
  for (const p of [path.join(postDir, 'legenda.txt'), path.join(imagensDir, 'legenda.txt')]) {
    if (existsSync(p)) return (await readFile(p, 'utf8')).trim();
  }
  // tenta extrair de 03-carrossel.md (seção "## Legenda do post")
  const carrossel = path.join(postDir, '03-carrossel.md');
  if (existsSync(carrossel)) {
    const md = await readFile(carrossel, 'utf8');
    const m = md.match(/##\s*Legenda do post\s*\n([\s\S]*?)(?:\n#{1,6}\s|$)/i);
    if (m && m[1].trim()) return m[1].trim();
  }
  return '(legenda ainda não definida — edite este arquivo antes de postar)';
}
const caption = await resolveCaption();

// ── monta a pasta de entrega ────────────────────────────────────────────────
const deliveryDir = path.join(outBase, deliveryName);
await rm(deliveryDir, { recursive: true, force: true });
await mkdir(deliveryDir, { recursive: true });

let i = 1;
for (const png of pngs) {
  const dest = `slide-${String(i).padStart(2, '0')}.png`;
  await copyFile(path.join(imagensDir, png), path.join(deliveryDir, dest));
  i++;
}
await writeFile(path.join(deliveryDir, 'legenda.txt'), caption + '\n', 'utf8');

const leiame = `ENTREGA — ${deliveryName}
============================================================

CONTEÚDO
- ${pngs.length} imagens: slide-01.png ... slide-${String(pngs.length).padStart(2, '0')}.png
- legenda.txt: o texto da legenda (copie e cole ao postar)

COMO POSTAR NO INSTAGRAM
1. Abra o Instagram e crie uma nova publicação (carrossel).
2. Selecione as imagens NA ORDEM: slide-01, slide-02, ... slide-${String(pngs.length).padStart(2, '0')}.
3. Mantenha o enquadramento em 4:5 (1080x1350) — não corte.
4. Cole o conteúdo de legenda.txt na legenda.
5. Publique.

Gerado pelo Maestro — geração de imagem 100% local (sem API paga).
`;
await writeFile(path.join(deliveryDir, 'LEIA-ME.txt'), leiame, 'utf8');

// ── zip ─────────────────────────────────────────────────────────────────────
const zipPath = path.join(outBase, `${deliveryName}.zip`);
await rm(zipPath, { force: true });

function zipDir(srcDir, dest) {
  return new Promise((resolve, reject) => {
    let cmd, cmdArgs;
    if (process.platform === 'win32') {
      cmd = 'powershell';
      cmdArgs = ['-NoProfile', '-Command',
        `Compress-Archive -Path '${srcDir}\\*' -DestinationPath '${dest}' -Force`];
    } else {
      cmd = 'sh';
      cmdArgs = ['-c', `cd '${srcDir}' && zip -r -q '${dest}' . || tar -a -c -f '${dest}' *`];
    }
    const p = spawn(cmd, cmdArgs);
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err || 'zip falhou'))));
  });
}

try {
  await zipDir(deliveryDir, zipPath);
} catch (e) {
  console.error(`Aviso: não consegui zipar (${e.message}). A pasta de entrega foi criada mesmo assim.`);
}

const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');
console.log(`\n📦 Entrega pronta — ${pngs.length} slides + legenda`);
console.log(`   Pasta: ${rel(deliveryDir)}`);
if (existsSync(zipPath)) console.log(`   Zip:   ${rel(zipPath)}`);
console.log(`   Legenda: ${rel(path.join(deliveryDir, 'legenda.txt'))}\n`);
