# 🎻 Maestro — Equipe de Marketing de IA

Um **setor de marketing inteiro** dentro do Claude Code, rodando **no terminal**: um agente orquestrador (**Maestro**) que comanda **6 subagents especialistas** para produzir carrosséis de Instagram do zero — do briefing da marca até uma **entrega como design Canva editável** (cada slide vira uma página que você abre e ajusta no app do Canva) — com **gates de aprovação humana** em cada marco. A arte é **construída localmente em HTML/CSS** (sem API paga de imagem) e **importada para o Canva** via MCP.

Você pode **anexar imagens de referência** para definir o estilo: o Bruno faz uma **análise crítica** delas e o sistema **replica o mesmo estilo** em todos os slides.

Projeto autoral com arquitetura **Maestro**: um orquestrador que rege subagents-persona especializados, com uma decisão firme de ponta a ponta — **nenhuma API paga de imagem**.

## Arte local, entrega editável no Canva

A arte **nunca usa API paga de imagem:** cada slide é um arquivo HTML autocontido, com o design da marca embutido — tipografia perfeita, marca consistente, custo zero por imagem. A diferença é o **destino**: em vez de achatar em PNG, os slides são combinados num `carrossel.html` e **importados como um design Canva editável** (`import-design-from-url`), em que cada slide vira uma **página editável**. PNG continua disponível **sob demanda** (export do Canva ou render local).

## A equipe

| Persona | Papel | Fase | Entrega |
|---|---|---|---|
| **Ana** | Estrategista de Conta | 0 | `01-briefing.md` |
| **Bruno** | Analista de Marca | 1–2 | `02-analise-visual.md`, `03-identidade-visual.md` ⭐ |
| **Clara** | Pesquisadora | 4 | `01-pesquisa.md` (com fontes) |
| **Diego** | Redator | 5 | `02-materia.md` |
| **Elena** | Designer de Conteúdo | 6 | `03-carrossel.md` |
| **Felipe** | Diretor de Arte | 7 | `imagens/slide-XX.html` → `carrossel.html` → design Canva |

O **Maestro** (`.claude/skills/maestro/SKILL.md`) não escreve conteúdo: decide a persona da vez, aplica os gates e mantém os arquivos `.md`.

## Pré-requisitos

- **Node.js** (já presente) e o **Claude Code** rodando nesta pasta.
- Uma vez: instalar o motor de imagem (baixa o Chromium do Playwright, ~1x):
  ```bash
  npm install
  ```
  Se o navegador não baixar junto: `npx playwright install chromium`. O script também tenta usar o Chrome do sistema automaticamente.

## Como rodar (terminal)

1. Abra o **Claude Code nesta pasta** (`maestro-marketing/`).
2. (Opcional, para replicar um estilo) coloque imagens de referência em `perfis/<slug>/assets/referencias/`.
3. Rode a skill:
   ```
   /maestro
   ```
4. O Maestro conduz: briefing → **análise visual (referências/IG)** → identidade → tema → pesquisa → matéria → carrossel → arte. Ele **para** nos 3 gates (identidade, matéria, arte) e espera seu "ok".
5. Após aprovar a arte, ele monta o carrossel e **entrega um design Canva editável**:
   ```bash
   node tools/build-canva-html.mjs perfis/<slug>/posts/<post>/imagens               # combina os slides em carrossel.html
   node tools/publish.mjs          perfis/<slug>/posts/<post>/imagens/carrossel.html # URL pública temporária
   # o Maestro então chama o MCP do Canva: import-design-from-url(...) → link editável
   ```

## 📦 O que você recebe

Um **design Canva editável** — o carrossel com **cada slide numa página** que você abre e ajusta no app do Canva (textos editáveis, cores, posições) — junto com a **legenda** pronta para copiar e colar. O Maestro te entrega o **link do design** ao final.

> **Editabilidade:** os **textos** viram editáveis no Canva. **Ícones SVG e gradientes** podem ser rasterizados no import (viram imagem dentro da página) — ajustes finos de texto/cor são feitos direto no Canva.

Os arquivos `.md` continuam em `perfis/` como a **memória interna** (briefing, identidade, pesquisa). Precisa de imagem? Exporte PNG do próprio Canva, ou rode `tools/render.mjs` local (fallback offline).

## 🖥️ Maestro Studio — a "IDE" da identidade (opcional)

Alternativa visual ao terminal para **fundar a identidade**: um app local que te guia pelas perguntas, deixa escolher **cores e fontes com preview ao vivo do slide (4:5)** e grava o `01-briefing.md` + `03-identidade-visual.md`.

```bash
npm run studio
```

Abre `http://localhost:4321` (no Windows, o navegador abre sozinho). Lá você:

1. Avança pelos passos (Marca → Negócio → Público → Voz → Essência → **Cores 🎨** → Tipografia → Direção visual → Carrossel → Faça/Não faça → Revisar).
2. Vê o **slide de capa mudar ao vivo** conforme escolhe paleta, fontes e gancho (use `*asteriscos*` para destacar uma palavra).
3. Clica em **"Gerar PNG de exemplo"** para renderizar uma capa real com o mesmo motor gratuito (HTML→PNG via Chromium — sem API paga).
4. Na etapa **Revisar**, vê o conteúdo exato de `01-briefing.md` e `03-identidade-visual.md` e clica em **"Gerar os .md"**.

Os arquivos saem em `perfis/<slug>/` com `status: aprovado` — prontos para o `/maestro` partir direto para os posts (Tema → Pesquisa → Matéria → Carrossel → Arte).

> Fluxo recomendado: **`npm run studio`** para fundar a identidade da marca → **`/maestro`** para produzir cada carrossel.

## Estrutura

```
maestro-marketing/
├── .claude/
│   ├── skills/maestro/SKILL.md     # o orquestrador (a skill /maestro)
│   └── agents/                     # os 6 subagents (a equipe)
├── studio/                         # a "IDE" visual da identidade (opcional)
│   ├── server.mjs                  # servidor Node (sem dependências externas)
│   └── public/                     # index.html + styles.css + app.js
├── tools/
│   ├── build-canva-html.mjs        # combina os slides em carrossel.html (Canva-ready)
│   ├── publish.mjs                 # publica o HTML numa URL pública temporária
│   ├── render.mjs                  # render local opcional (HTML -> PNG, fallback offline)
│   └── package.mjs                 # empacota PNGs em .zip (fallback offline)
├── perfis/
│   ├── _templates/                 # os templates + slide-template.html
│   └── <slug>/
│       ├── assets/referencias/     # imagens de referência que você anexa
│       └── posts/<post>/imagens/   # slide-XX.html → carrossel.html → design Canva
├── entregas/                       # PNGs/.zip opcionais (fallback offline, gitignored)
└── package.json
```

## Pipeline (8 fases) e gates

```
0 Briefing (Ana) ──► [GATE]
1 Análise visual: referências e/ou Instagram (Bruno) ──► (gate opcional)
2 Identidade visual / estilo a replicar (Bruno) ⭐ ──► [GATE OBRIGATÓRIO]
3 Tema (Maestro)
4 Pesquisa (Clara, com fontes)
5 Matéria (Diego) ──► [GATE OBRIGATÓRIO]
6 Carrossel + legenda (Elena) ──► (gate opcional)
7 Arte: HTML dos slides, replicando o estilo (Felipe) ──► [GATE OBRIGATÓRIO]
8 Entrega (Maestro): build-canva-html.mjs → carrossel.html · publish.mjs → URL · import-design-from-url → design Canva editável
```

## MCPs e capacidades usadas

Os MCPs de pesquisa **vêm dentro deste repositório** e são ligados ao Maestro por um
arquivo de projeto: [`.mcp.json`](.mcp.json). Ao abrir o Claude Code em `maestro-marketing/`,
ele detecta esse arquivo e pede aprovação para os servidores. São três:

| MCP (`.mcp.json`) | Servidor no repo | Transporte | Como subir |
|---|---|---|---|
| `google-scrape` | `../web-search` (`build/index.js`) | stdio (Node) | já buildado — sobe sozinho |
| `multi-extract` | `../web-search-mcp` (`dist/index.js`) | stdio (Node) | já buildado — sobe sozinho |
| `web-search-py` | `../web-search-mcp-server` (`server.py`) | HTTP/SSE `:8003` | `docker compose up -d` (sobe SearXNG + MCP) |

> O `web-search-py` é um MCP HTTP/SSE com backend **SearXNG**; precisa do stack Docker
> de pé (`web-search-mcp-server/docker-compose.yml`) **antes** de abrir o Claude Code.
> Os dois MCPs Node não precisam de nada — o `.mcp.json` os inicia sob demanda.

Demais capacidades:

- **Análise de referências** — o Bruno usa **Read** (visão multimodal) nas imagens de `assets/referencias/`. Sem MCP, sem custo.
- **Claude in Chrome** — abrir/ler o Instagram da marca (Bruno) e fontes longas (Clara). *(MCP externo, opcional.)*
- **Arte/Imagem** — nenhuma API paga. HTML/CSS local; a **entrega** vai para o **MCP do Canva** (`import-design-from-url` → design editável; `export-design` para PNG sob demanda). `tools/render.mjs` + `tools/package.mjs` ficam como fallback offline (PNG/.zip).
- **Canva (MCP)** — conector externo, **autenticado na conta do usuário**. É o destino da entrega (carrossel editável). Sem ele, use o fallback PNG offline.
- **Opcionais** — Google Drive (arquivar entregas), Supabase (metadados/dashboard quando passar de ~5 perfis).

### Subir os MCPs (uma vez por sessão)

```bash
# 1) MCP de pesquisa via SearXNG (HTTP/SSE :8003) — precisa de Docker
cd web-search-mcp-server && docker compose up -d --build && cd ..

# 2) (se ainda não estiverem buildados) os dois MCPs Node
(cd web-search        && npm install && npm run build)   # google-scrape
(cd web-search-mcp    && npm install && npm run build)    # multi-extract
```

Depois é só abrir o Claude Code em `maestro-marketing/` e rodar `/maestro`.
