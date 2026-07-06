#!/usr/bin/env node
/**
 * Maestro Studio — uma "IDE" local para configurar a identidade da marca.
 *
 * Servidor Node SEM dependências externas (só módulos nativos). Serve um
 * wizard no navegador onde você responde as perguntas do esquema (briefing +
 * identidade visual), escolhe cores/fontes com preview ao vivo do slide, e
 * grava os arquivos .md perfeitos em perfis/{slug}/ — prontos para o /maestro.
 *
 * Geração de imagem de exemplo: reaproveita tools/render.mjs (HTML->PNG,
 * Chromium headless). Nenhuma API paga.
 *
 * Uso:  npm run studio    (ou: node studio/server.mjs)
 */

import http from 'node:http';
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn, exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(__dirname, 'public');
const PORT = process.env.PORT || 4321;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const hoje = () => new Date().toISOString().slice(0, 10);
const esc = (s) => String(s ?? '').trim();
const slugify = (s) =>
  esc(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'marca';

// ───────────────────────────── geração de markdown ─────────────────────────

function buildBriefing(d) {
  const nome = esc(d.nome) || '(marca)';
  const slug = slugify(d.slug || d.nome);
  const eP = (d.ePalavras || []).map(esc).filter(Boolean).join(', ') || '...';
  const nuncaP = (d.nuncaPalavras || []).map(esc).filter(Boolean).join(', ') || '...';
  return `---
tipo: briefing
perfil: ${slug}
atualizado_em: ${hoje()}
status: aprovado
---

# Briefing — ${nome}

## Negócio
- **O que faz:** ${esc(d.oQueFaz) || '...'}
- **Diferencial único:** ${esc(d.diferencial) || '...'}
- **Carro-chefe:** ${esc(d.carroChefe) || '...'}
- **Tamanho / maturidade:** ${esc(d.tamanho) || '...'}

## Público
- **Cliente ideal:** ${esc(d.clienteIdeal) || '...'}
- **Dor principal:** ${esc(d.dor) || '...'}
- **Desejo principal:** ${esc(d.desejo) || '...'}

## Objetivo do conteúdo
- **Meta:** ${esc(d.meta) || 'autoridade | vendas | comunidade | alcance'}
- **CTA padrão:** ${esc(d.cta) || '...'}

## Voz e personalidade
- **Como fala:** ${esc(d.comoFala) || '...'}
- **É:** ${eP}
- **Nunca é:** ${nuncaP}

## Limites
- **Proibido:** ${esc(d.proibido) || '...'}
- **Referências (admira):** ${esc(d.referencias) || '...'}
- **Anti-referência:** ${esc(d.antiReferencia) || '...'}

## Provas e credibilidade
- ${esc(d.provas) || '...'}
`;
}

function buildIdentity(d) {
  const nome = esc(d.nome) || '(marca)';
  const slug = slugify(d.slug || d.nome);
  const apoio = (d.apoio || []).map(esc).filter(Boolean).join(', ') || '#......, #......';
  const fazLinhas = (d.fazNaoFaz && d.fazNaoFaz.length ? d.fazNaoFaz : [{ faca: '', naoFaca: '' }])
    .map((r) => `| ${esc(r.faca) || '...'} | ${esc(r.naoFaca) || '...'} |`).join('\n');
  return `---
tipo: identidade-visual
perfil: ${slug}
versao: 1.0
status: aprovado
---

# Guia de Identidade — ${nome}

## 1. Essência
- **Missão em 1 frase:** ${esc(d.missao) || '...'}
- **Valores:** ${esc(d.valores) || '...'}
- **Arquétipo / personalidade:** ${esc(d.arquetipo) || '...'}

## 2. Voz e tom
- **Como escrevemos:** ${esc(d.comoEscrevemos) || esc(d.comoFala) || '...'}
- **Palavras que usamos:** ${esc(d.palavrasUsa) || '...'}
- **Palavras que evitamos:** ${esc(d.palavrasEvita) || '...'}
- **Régua de formalidade (1–5):** ${esc(d.formalidade) || '...'}
- **Uso de emojis:** ${esc(d.emojis) || 'não'}

## 3. Sistema de cores
- **Primária:** ${esc(d.corPrimaria) || '#......'} (uso: ${esc(d.usoPrimaria) || 'fundos, blocos principais'})
- **Secundária:** ${esc(d.corSecundaria) || '#......'} (uso: ${esc(d.usoSecundaria) || 'destaques, CTAs'})
- **Apoio / neutros:** ${apoio}
- **Texto sobre fundo claro / escuro:** ${esc(d.textoEscuro) || '#191919'}, ${esc(d.textoClaro) || '#FFFFFF'}

## 4. Tipografia
- **Títulos:** ${esc(d.fonteTitulo) || 'Inter'} — ${esc(d.pesoTitulo) || '700, forte'}
- **Corpo:** ${esc(d.fonteCorpo) || 'Inter'}
- **Hierarquia:** ${esc(d.hierarquia) || 'Capa 58–72px / Título 43px / Corpo 34px / Legenda 24px, peso 500+'}

## 5. Direção visual (para as imagens)
- **Estilo:** ${esc(d.estilo) || '...'}
- **Texturas/elementos (reproduzíveis em CSS):** ${esc(d.texturas) || '...'}
- **Composição:** ${esc(d.composicao) || '...'}
- **O que NUNCA aparece:** ${esc(d.nuncaAparece) || '...'}

## 6. Regras do carrossel
- **Slides:** ${esc(d.slides) || '4–6'}
- **Proporção:** ${esc(d.proporcao) || '4:5 (1080×1350)'}
- **Capa:** ${esc(d.capa) || '...'}
- **Texto sobre imagem:** ${esc(d.textoSobreImagem) || 'contraste mínimo WCAG ≥ 4.5:1'}
- **Logo:** ${esc(d.logo) || '...'}
- **CTA final:** ${esc(d.ctaFinal) || '...'}

## 7. Faça / Não faça
| Faça ✅ | Não faça ❌ |
|---|---|
${fazLinhas}
`;
}

// ───────────────────────────── http helpers ────────────────────────────────

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 5e6) reject(new Error('payload grande demais'));
    });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
  });
}

async function serveStatic(res, urlPath) {
  let rel = urlPath === '/' ? '/index.html' : urlPath;
  rel = decodeURIComponent(rel.split('?')[0]);
  const filePath = path.join(PUBLIC, path.normalize(rel));
  if (!filePath.startsWith(PUBLIC)) { res.writeHead(403); return res.end('forbidden'); }
  try {
    const buf = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404); res.end('not found');
  }
}

// roda tools/render.mjs numa pasta e devolve o PNG como data URL
function renderSlide(dir) {
  return new Promise((resolve, reject) => {
    const p = spawn(process.execPath, [path.join(ROOT, 'tools', 'render.mjs'), dir], { cwd: ROOT });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.stdout.on('data', () => {});
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err || 'render falhou'))));
  });
}

// ───────────────────────────── rotas ───────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // listar perfis existentes
  if (method === 'GET' && url === '/api/perfis') {
    const base = path.join(ROOT, 'perfis');
    let perfis = [];
    try {
      const entries = await readdir(base, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory() && !e.name.startsWith('_')) perfis.push(e.name);
      }
    } catch {}
    return sendJSON(res, 200, { perfis });
  }

  // preview dos .md sem gravar (etapa "Revisar")
  if (method === 'POST' && url === '/api/preview') {
    try {
      const d = await readBody(req);
      return sendJSON(res, 200, { briefing: buildBriefing(d), identidade: buildIdentity(d) });
    } catch (e) {
      return sendJSON(res, 400, { erro: String(e.message || e) });
    }
  }

  // salvar briefing + identidade
  if (method === 'POST' && url === '/api/save') {
    try {
      const d = await readBody(req);
      const slug = slugify(d.slug || d.nome);
      const dir = path.join(ROOT, 'perfis', slug);
      await mkdir(path.join(dir, 'assets'), { recursive: true });
      await mkdir(path.join(dir, 'posts'), { recursive: true });
      const briefingPath = path.join(dir, '01-briefing.md');
      const identityPath = path.join(dir, '03-identidade-visual.md');
      await writeFile(briefingPath, buildBriefing(d), 'utf8');
      await writeFile(identityPath, buildIdentity(d), 'utf8');
      return sendJSON(res, 200, {
        ok: true, slug,
        arquivos: [
          path.relative(ROOT, briefingPath).replace(/\\/g, '/'),
          path.relative(ROOT, identityPath).replace(/\\/g, '/'),
        ],
      });
    } catch (e) {
      return sendJSON(res, 400, { ok: false, erro: String(e.message || e) });
    }
  }

  // gerar PNG de exemplo da capa a partir do HTML enviado
  if (method === 'POST' && url === '/api/sample') {
    try {
      const { slug, html } = await readBody(req);
      const s = slugify(slug || 'marca');
      const dir = path.join(ROOT, 'perfis', s, 'assets', 'exemplo');
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'slide-01.html'), html, 'utf8');
      await renderSlide(dir);
      const png = await readFile(path.join(dir, 'slide-01.png'));
      return sendJSON(res, 200, {
        ok: true,
        dataUrl: `data:image/png;base64,${png.toString('base64')}`,
        caminho: path.relative(ROOT, path.join(dir, 'slide-01.png')).replace(/\\/g, '/'),
      });
    } catch (e) {
      return sendJSON(res, 500, { ok: false, erro: String(e.message || e) });
    }
  }

  // estáticos
  if (method === 'GET') return serveStatic(res, url);

  res.writeHead(405); res.end('method not allowed');
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n🎻  Maestro Studio rodando em  ${url}`);
  console.log(`    Pasta de saída: perfis/{slug}/  (01-briefing.md + 03-identidade-visual.md)`);
  console.log(`    Ctrl+C para parar.\n`);
  // tenta abrir o navegador (best-effort, só Windows)
  if (process.platform === 'win32') exec(`start "" "${url}"`);
});
