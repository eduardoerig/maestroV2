'use strict';

// ── passos ──────────────────────────────────────────────────────────────────
const STEPS = [
  ['marca', 'Marca'],
  ['negocio', 'Negócio'],
  ['publico', 'Público'],
  ['objetivo', 'Objetivo'],
  ['voz', 'Voz'],
  ['limites', 'Limites'],
  ['provas', 'Provas'],
  ['essencia', 'Essência'],
  ['cores', 'Cores 🎨'],
  ['tipografia', 'Tipografia'],
  ['direcao', 'Direção visual'],
  ['carrossel', 'Carrossel'],
  ['faz', 'Faça / Não faça'],
  ['revisar', 'Revisar ✓'],
];
let current = 0;

const FONTS = ['Inter', 'Montserrat', 'Poppins', 'Open Sans', 'DM Sans', 'Nunito',
  'Roboto', 'Archivo', 'Work Sans', 'Oswald', 'Bebas Neue', 'Playfair Display',
  'Lora', 'Merriweather', 'Space Grotesk'];

const $ = (id) => document.getElementById(id);
const val = (id) => ($(id) ? $(id).value.trim() : '');

// ── util de cor (mesma lógica do preview e do PNG real) ─────────────────────
function hexToRgb(hex) {
  const h = (hex || '#000000').replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(hex, a) { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; }
function darken(hex, f) {
  const [r, g, b] = hexToRgb(hex);
  const d = (x) => Math.round(x * f);
  return `#${[d(r), d(g), d(b)].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

// ── HTML do slide (preview e PNG usam isto) ─────────────────────────────────
function slideHTML() {
  const primaria = val('corPrimaria') || '#1A1A2E';
  const secundaria = val('corSecundaria') || '#E94560';
  const textoClaro = val('textoClaro') || '#FFFFFF';
  const apoioArr = val('apoio').split(',').map((s) => s.trim()).filter(Boolean);
  const muted = apoioArr[0] || rgba(textoClaro, 0.62);
  const fTitulo = val('fonteTitulo') || 'Inter';
  const fCorpo = val('fonteCorpo') || 'Inter';
  const bg = val('bgMode') === 'solid'
    ? primaria
    : `linear-gradient(135deg, ${primaria} 0%, ${darken(primaria, 0.62)} 100%)`;

  const kicker = (val('pvKicker') || 'CATEGORIA').toUpperCase();
  const hookRaw = val('pvHook') || 'Seu gancho aqui, com uma *palavra* em destaque.';
  const hook = hookRaw.replace(/\*([^*]+)\*/g, '<span class="accent">$1</span>');
  const sub = val('pvSub') || 'Subtítulo de apoio na voz da marca.';
  const handle = val('instagram') || ('@' + (val('slug') || 'marca'));

  const fam = (f) => `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@500;600;700&display=swap`;
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><style>
@import url('${fam(fTitulo)}');
@import url('${fam(fCorpo)}');
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1080px;height:1350px;overflow:hidden;background:${bg};color:${textoClaro};
  font-family:'${fCorpo}',sans-serif;display:flex;flex-direction:column;justify-content:center;padding:90px;}
.kicker{font-size:28px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${secundaria};}
.hook{font-family:'${fTitulo}',sans-serif;font-size:70px;font-weight:700;line-height:1.18;margin-top:24px;}
.hook .accent{color:${secundaria};}
.sub{font-size:34px;font-weight:500;line-height:1.5;color:${muted};margin-top:30px;max-width:840px;}
.footer{position:absolute;bottom:64px;left:90px;font-size:24px;font-weight:500;color:${muted};}
</style></head><body>
<span class="kicker">${escapeHtml(kicker)}</span>
<h1 class="hook">${hook}</h1>
<p class="sub">${escapeHtml(sub)}</p>
<span class="footer">${escapeHtml(handle)}</span>
</body></html>`;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

// ── preview ao vivo ─────────────────────────────────────────────────────────
function updatePreview() {
  $('pv').srcdoc = slideHTML();
  const cores = [val('corPrimaria'), val('corSecundaria'), val('textoClaro'), val('textoEscuro'),
    ...val('apoio').split(',').map((s) => s.trim())].filter(Boolean);
  $('swatches').innerHTML = cores.map((c) => `<div class="swatch" style="background:${c}" title="${c}"></div>`).join('');
}

// ── coleta o payload ────────────────────────────────────────────────────────
function collect() {
  const fnf = [];
  const facas = document.querySelectorAll('.faca');
  const naos = document.querySelectorAll('.naofaca');
  facas.forEach((el, i) => {
    const faca = el.value.trim(), naoFaca = (naos[i] || {}).value?.trim() || '';
    if (faca || naoFaca) fnf.push({ faca, naoFaca });
  });
  return {
    nome: val('nome'), slug: val('slug') || val('nome'), instagram: val('instagram'),
    oQueFaz: val('oQueFaz'), diferencial: val('diferencial'), carroChefe: val('carroChefe'), tamanho: val('tamanho'),
    clienteIdeal: val('clienteIdeal'), dor: val('dor'), desejo: val('desejo'),
    meta: val('meta'), cta: val('cta'),
    comoFala: val('comoFala'),
    ePalavras: [val('e1'), val('e2'), val('e3')], nuncaPalavras: [val('n1'), val('n2'), val('n3')],
    formalidade: val('formalidade'), emojis: val('emojis'),
    proibido: val('proibido'), referencias: val('referencias'), antiReferencia: val('antiReferencia'),
    provas: val('provas'),
    missao: val('missao'), valores: val('valores'), arquetipo: val('arquetipo'),
    comoEscrevemos: val('comoFala'), palavrasUsa: val('e1') + ', ' + val('e2') + ', ' + val('e3'),
    palavrasEvita: val('n1') + ', ' + val('n2') + ', ' + val('n3'),
    corPrimaria: val('corPrimaria'), corSecundaria: val('corSecundaria'),
    usoPrimaria: val('usoPrimaria'), usoSecundaria: val('usoSecundaria'),
    apoio: val('apoio').split(',').map((s) => s.trim()).filter(Boolean),
    textoClaro: val('textoClaro'), textoEscuro: val('textoEscuro'),
    fonteTitulo: val('fonteTitulo'), fonteCorpo: val('fonteCorpo'), pesoTitulo: val('pesoTitulo'), hierarquia: val('hierarquia'),
    estilo: val('estilo'), texturas: val('texturas'), composicao: val('composicao'), nuncaAparece: val('nuncaAparece'),
    slides: val('slides'), proporcao: val('proporcao'), capa: val('capa'),
    textoSobreImagem: val('textoSobreImagem'), logo: val('logo'), ctaFinal: val('ctaFinal'),
    fazNaoFaz: fnf,
  };
}

// ── markdown no cliente (preview do "revisar") ──────────────────────────────
async function refreshMdPreview() {
  try {
    const r = await fetch('/api/preview', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collect()),
    });
    const j = await r.json();
    $('md-briefing').textContent = j.briefing || '';
    $('md-identidade').textContent = j.identidade || '';
  } catch (e) { /* silencioso */ }
}

// ── navegação ───────────────────────────────────────────────────────────────
function renderSteps() {
  $('steps').innerHTML = STEPS.map(([id, label], i) =>
    `<div class="step-item" data-i="${i}"><span class="dot">${i < current ? '✓' : ''}</span><span>${label}</span></div>`
  ).join('');
  document.querySelectorAll('.step-item').forEach((el) => {
    el.onclick = () => goto(Number(el.dataset.i));
  });
  syncNav();
}
function syncNav() {
  document.querySelectorAll('.step-item').forEach((el, i) => {
    el.classList.toggle('active', i === current);
    el.classList.toggle('done', i < current);
    el.querySelector('.dot').textContent = i < current ? '✓' : '';
  });
  document.querySelectorAll('.step').forEach((el) => {
    el.hidden = el.dataset.step !== STEPS[current][0];
  });
  $('btn-prev').disabled = current === 0;
  $('btn-next').style.visibility = current === STEPS.length - 1 ? 'hidden' : 'visible';
  if (STEPS[current][0] === 'revisar') refreshMdPreview();
}
function goto(i) {
  current = Math.max(0, Math.min(STEPS.length - 1, i));
  syncNav();
  $('form').scrollTop = 0;
}

// ── salvar ──────────────────────────────────────────────────────────────────
async function save() {
  const data = collect();
  if (!data.nome) { setStatus('Informe o nome da marca.', 'err'); goto(0); return; }
  $('btn-save').disabled = true; setStatus('Gravando…');
  try {
    const r = await fetch('/api/save', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    const j = await r.json();
    if (j.ok) setStatus('✅ Gravado: ' + j.arquivos.join('  ·  '), 'ok');
    else setStatus('Erro: ' + j.erro, 'err');
  } catch (e) { setStatus('Erro: ' + e.message, 'err'); }
  finally { $('btn-save').disabled = false; }
}

async function sample() {
  setStatus('Renderizando PNG de exemplo (Chromium)…');
  $('btn-sample').disabled = true;
  try {
    const r = await fetch('/api/sample', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: val('slug') || val('nome') || 'marca', html: slideHTML() }),
    });
    const j = await r.json();
    if (j.ok) {
      $('sample-out').innerHTML = `<img src="${j.dataUrl}" alt="exemplo"><div class="path">${j.caminho}</div>`;
      setStatus('✅ PNG gerado (sem custo de API).', 'ok');
    } else setStatus('Erro: ' + j.erro, 'err');
  } catch (e) { setStatus('Erro: ' + e.message, 'err'); }
  finally { $('btn-sample').disabled = false; }
}

function setStatus(msg, kind) {
  const el = $('status'); el.textContent = msg; el.className = 'status' + (kind ? ' ' + kind : '');
}

// ── init ────────────────────────────────────────────────────────────────────
function init() {
  // popula fontes
  ['fonteTitulo', 'fonteCorpo'].forEach((id) => {
    $(id).innerHTML = FONTS.map((f) => `<option ${f === 'Inter' ? 'selected' : ''}>${f}</option>`).join('');
  });
  renderSteps();

  // slug automático
  $('nome').addEventListener('input', () => {
    if (!$('slug').dataset.touched) {
      $('slug').value = $('nome').value.toLowerCase().normalize('NFD')
        .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
  });
  $('slug').addEventListener('input', () => { $('slug').dataset.touched = '1'; });
  $('formalidade').addEventListener('input', () => { $('formalidadeOut').textContent = $('formalidade').value; });

  // preview reativo
  document.getElementById('form').addEventListener('input', updatePreview);

  $('btn-prev').onclick = () => goto(current - 1);
  $('btn-next').onclick = () => goto(current + 1);
  $('btn-save').onclick = save;
  $('btn-sample').onclick = sample;

  updatePreview();
}
document.addEventListener('DOMContentLoaded', init);
