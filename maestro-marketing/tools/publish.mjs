#!/usr/bin/env node
/**
 * publish.mjs — Publica um arquivo numa URL HTTPS pública (temporária).
 *
 * O `import-design-from-url` do Canva só aceita uma URL HTTPS pública — caminhos
 * locais (C:\..., file://) não são acessíveis ao backend do Canva. Este script
 * sobe o arquivo (tipicamente o carrossel.html) para um host de upload anônimo
 * via `curl` e imprime a URL pública na última linha do stdout.
 *
 * É a opção "mais simples": sem conta, sem túnel, um comando. Em troca, a arte
 * fica algumas horas num host de terceiros — aceitável para um carrossel de
 * marketing (que será público de qualquer modo). Não use para conteúdo sensível.
 *
 * Ordem de resolução:
 *   1. MAESTRO_PUBLISH_URL  — se setado, é impresso direto (você já hospedou).
 *   2. MAESTRO_PUBLISH_CMD  — comando custom; recebe o caminho do arquivo como
 *                             {file} (ou último argumento) e deve imprimir a URL.
 *   3. provedores embutidos — litterbox (catbox temporário) e 0x0.st, em ordem,
 *                             com fallback automático.
 * Se tudo falhar, instrui o fallback manual (publique e passe a URL ao agente).
 *
 * Uso:
 *   node tools/publish.mjs <arquivo> [--time 24h]
 *
 * Exemplo:
 *   node tools/publish.mjs perfis/<slug>/posts/<post>/imagens/carrossel.html
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const timeIdx = args.indexOf('--time');
const retention = timeIdx !== -1 ? args[timeIdx + 1] : '24h'; // litterbox: 1h|12h|24h|72h

if (!file) {
  console.error('ERRO: informe o arquivo a publicar.');
  console.error('Uso: node tools/publish.mjs <arquivo> [--time 24h]');
  process.exit(1);
}
const filePath = path.resolve(file);
if (!existsSync(filePath)) {
  console.error(`ERRO: arquivo não encontrado: ${filePath}`);
  process.exit(1);
}

// roda um comando e devolve { code, stdout, stderr }
function run(cmd, cmdArgs) {
  return new Promise((resolve) => {
    const p = spawn(cmd, cmdArgs, { shell: false });
    let stdout = '';
    let stderr = '';
    p.stdout.on('data', (d) => (stdout += d));
    p.stderr.on('data', (d) => (stderr += d));
    p.on('error', (e) => resolve({ code: -1, stdout, stderr: stderr + e.message }));
    p.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

const firstHttps = (s) => (s.match(/https:\/\/\S+/) || [null])[0];

// ── 1. URL já fornecida ──────────────────────────────────────────────────────
if (process.env.MAESTRO_PUBLISH_URL) {
  const url = process.env.MAESTRO_PUBLISH_URL.trim();
  console.error(`→ usando MAESTRO_PUBLISH_URL`);
  console.log(url);
  process.exit(0);
}

// ── provedores ───────────────────────────────────────────────────────────────
const providers = [];

// comando custom do usuário
if (process.env.MAESTRO_PUBLISH_CMD) {
  providers.push({
    name: 'MAESTRO_PUBLISH_CMD',
    run: () => {
      const tpl = process.env.MAESTRO_PUBLISH_CMD;
      const parts = (tpl.includes('{file}') ? tpl.replace(/\{file\}/g, filePath) : `${tpl} ${filePath}`)
        .match(/(?:[^\s"]+|"[^"]*")+/g)
        .map((s) => s.replace(/^"|"$/g, ''));
      return run(parts[0], parts.slice(1));
    },
  });
}

// litterbox (catbox temporário) — preserva a extensão (.html -> text/html)
providers.push({
  name: 'litterbox.catbox.moe',
  run: () => run('curl', [
    '-sS', '--max-time', '120', '-F', 'reqtype=fileupload', '-F', `time=${retention}`,
    '-F', `fileToUpload=@${filePath}`,
    'https://litterbox.catbox.moe/resources/internals/api.php',
  ]),
});

// 0x0.st — exige User-Agent custom
providers.push({
  name: '0x0.st',
  run: () => run('curl', [
    '-sS', '--max-time', '120', '-A', 'maestro-marketing/1.0',
    '-F', `file=@${filePath}`,
    'https://0x0.st',
  ]),
});

// ── tenta cada provedor em ordem ─────────────────────────────────────────────
let url = null;
for (const prov of providers) {
  console.error(`→ publicando via ${prov.name} ...`);
  const { code, stdout, stderr } = await prov.run();
  const found = firstHttps(stdout);
  if (code === 0 && found) {
    url = found.trim();
    console.error(`✓ ${prov.name}: ok`);
    break;
  }
  console.error(`✗ ${prov.name} falhou (code ${code}). ${(stderr || stdout).trim().slice(0, 200)}`);
}

if (!url) {
  console.error('\nNenhum provedor de upload respondeu.');
  console.error('Fallback manual: hospede o arquivo numa URL HTTPS pública (GitHub raw, seu CDN, etc.)');
  console.error('e rode de novo com  MAESTRO_PUBLISH_URL=<sua-url>  ou passe a URL direto ao Canva.');
  process.exit(1);
}

console.error('\nURL pública (válida temporariamente):');
console.log(url); // última linha = a URL, fácil de capturar
