<div align="center">

# 🎻 Maestro

### Um setor de marketing inteiro, dentro do seu terminal

Um agente **orquestrador** que comanda **6 subagents especialistas** para produzir carrosséis de Instagram do zero — do briefing da marca à entrega como **design Canva editável** — rodando no [Claude Code](https://claude.com/claude-code), com **aprovação humana** em cada marco.

[![Claude Code](https://img.shields.io/badge/roda%20no-Claude%20Code-d97757?style=flat-square)](https://claude.com/claude-code)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/Model%20Context%20Protocol-2%20inclusos%20%2B%201%20opcional-000000?style=flat-square)](https://modelcontextprotocol.io)
[![Custo de imagem](https://img.shields.io/badge/custo%20por%20imagem-R%24%200-2ea44f?style=flat-square)](#-por-que-sem-api-paga-de-imagem)
[![Entrega](https://img.shields.io/badge/entrega-Canva%20edit%C3%A1vel-00c4cc?style=flat-square&logo=canva&logoColor=white)](#-o-que-voc%C3%AA-recebe)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## O que é

O **Maestro** é uma **agência de marketing simulada** que vive no terminal. Você abre o Claude Code, roda `/maestro`, e um maestro conduz uma equipe de seis personas — estrategista, analista de marca, pesquisadora, redator, designer e diretor de arte — por um pipeline de oito fases até entregar um carrossel pronto para publicar.

Três decisões definem o projeto:

- **🎨 Arte construída localmente, sem API paga de imagem.** Cada slide é um HTML/CSS autocontido com o DNA visual da marca — tipografia nítida, marca consistente, **custo zero por imagem**. Nada de DALL·E, Imagen ou Midjourney.
- **✏️ Entrega como design Canva editável.** Os slides são combinados num carrossel e importados para o Canva via MCP: cada slide vira uma **página que você abre e ajusta no app** (textos, cores, posições). PNG continua disponível sob demanda.
- **🛑 Gate humano nos marcos.** O Maestro **para e espera seu "ok"** em três pontos obrigatórios — identidade visual, matéria e arte — antes de seguir. Você está no comando.

Anexe **imagens de referência** e o sistema analisa o estilo e o **replica** em todos os slides.

> Arquitetura **Maestro**: um orquestrador que rege seis subagents-persona especializados, com uma regra firme de ponta a ponta — **nenhuma API paga de imagem**.

## Sumário

- [Como funciona — o pipeline](#como-funciona--o-pipeline)
- [A equipe](#a-equipe)
- [Contrato de Fase — comunicação robusta entre agentes](#contrato-de-fase--comunicação-robusta-entre-agentes)
- [Arquitetura do repositório](#arquitetura-do-repositório)
- [Começando](#começando)
- [Modo econômico (caveman, opcional)](#modo-econômico-caveman-opcional)
- [Maestro Studio — a "IDE" da identidade](#-maestro-studio--a-ide-da-identidade)
- [MCPs de pesquisa](#mcps-de-pesquisa)
- [O que você recebe](#-o-que-você-recebe)
- [Por que sem API paga de imagem](#-por-que-sem-api-paga-de-imagem)
- [Créditos](#créditos)

## Como funciona — o pipeline

Oito fases, três gates obrigatórios. O Maestro decide a persona da vez, aplica os gates e mantém os arquivos `.md` (a memória interna do projeto).

```
  0  Briefing ......................... Ana      ─► [GATE]
  1  Análise visual (refs / Instagram)   Bruno    ─► (gate opcional)
  2  Identidade visual ⭐ ............... Bruno    ─► [GATE OBRIGATÓRIO]
  3  Tema ............................... Maestro
  4  Pesquisa (com fontes) .............. Clara
  5  Matéria ............................ Diego    ─► [GATE OBRIGATÓRIO]
  6  Carrossel + legenda ................ Elena    ─► (gate opcional)
  7  Arte (HTML dos slides) ............. Felipe   ─► [GATE OBRIGATÓRIO]
  8  Entrega → design Canva editável .... Maestro
```

A **identidade visual** (fase 2) é o contrato: nenhum slide nasce sem lê-la. Toda afirmação na **matéria** (fase 5) precisa de fonte no dossiê. E a **arte** (fase 7) replica fielmente o estilo aprovado antes de qualquer publicação.

## A equipe

Seis subagents especialistas em [`maestro-marketing/.claude/agents/`](maestro-marketing/.claude/agents), regidos pela skill [`/maestro`](maestro-marketing/.claude/skills/maestro/SKILL.md).

| Persona | Papel | Fase | Entrega interna |
|---|---|---|---|
| **Ana** | Estrategista de Conta | 0 | `01-briefing.md` |
| **Bruno** | Analista de Marca | 1–2 | `02-analise-visual.md`, `03-identidade-visual.md` ⭐ |
| **Clara** | Pesquisadora | 4 | `01-pesquisa.md` (com fontes) |
| **Diego** | Redator | 5 | `02-materia.md` |
| **Elena** | Designer de Conteúdo | 6 | `03-carrossel.md` (+ legenda) |
| **Felipe** | Diretor de Arte | 7 | `imagens/slide-XX.html` → design Canva |

O **Maestro** não escreve conteúdo: orquestra. Ele decide quem entra em cena (via a ferramenta Task/Agent), aplica os gates e cuida da entrega final.

## Contrato de Fase — comunicação robusta entre agentes

Cada agente declara um **contrato** no topo do seu prompt, tornando o handoff entre fases explícito e auto-verificável:

- **Recebo** — os arquivos e as qualidades que preciso encontrar neles. Faltou o essencial (guia sem "voz e tom", pesquisa sem fonte)? O agente **para e devolve** ao Maestro, em vez de produzir sobre base fraca.
- **Entrego** — o que garanto que o arquivo de saída contém, pronto para a próxima fase.
- **Checo antes de entregar** — uma rubrica objetiva (fonte para todo número, voz da marca respeitada, HEX exatos, mínimos de fonte...) que o agente roda antes do gate.

Ao disparar um subagent, o Maestro passa um **briefing rico** (objetivo do post, decisões já tomadas, resumo da fase anterior), não só caminhos de arquivo. O resultado: menos retrabalho nos gates e menos post furado por material herdado incompleto.

## Arquitetura do repositório

Este repositório reúne o **app Maestro** e os **servidores MCP de pesquisa** que ele usa. Os MCPs são ligados ao Maestro pelo arquivo [`maestro-marketing/.mcp.json`](maestro-marketing/.mcp.json), com **caminhos relativos** — clone em qualquer pasta e roda.

| Pasta | O que é | Tipo |
|---|---|---|
| [`maestro-marketing/`](maestro-marketing) | O **Maestro**: orquestrador + 6 subagents + Studio. Skill `/maestro`. | App (Claude Code) |
| [`web-search/`](web-search) | MCP **`google-scrape`** — busca/scrape via Google. Fork de [pskill9/web-search](https://github.com/pskill9/web-search). | MCP stdio (Node) |
| [`web-search-mcp/`](web-search-mcp) | MCP **`multi-extract`** — busca multi-fonte + extração de conteúdo. Fork de [mrkrsl/web-search-mcp](https://github.com/mrkrsl/web-search-mcp). | MCP stdio (Node) |
| _`web-search-py` (opcional)_ | MCP de busca via **SearXNG**, HTTP/SSE na porta `8003`. **Não incluído** — veja abaixo. | MCP HTTP/SSE (Docker) |

> **SearXNG é opcional.** Os dois MCPs Node cobrem a pesquisa da Clara sozinhos (e servem de fallback um ao outro). Se quiser a metabusca via SearXNG, suba um stack SearXNG expondo um endpoint MCP em `http://localhost:8003/sse` **antes** de abrir o Claude Code; o `.mcp.json` já o referencia. Sem ele, o `web-search-py` fica simplesmente indisponível e o pipeline segue.

## Começando

### Pré-requisitos

- [**Claude Code**](https://claude.com/claude-code) instalado.
- **Node.js 18+** (para o Maestro e os dois MCPs Node).
- Uma **conta Canva** conectada como MCP no Claude Code (destino da entrega — fase 8).

### Instalação

```bash
git clone https://github.com/eduardoerig/maestroV2.git
cd maestroV2

# MCPs Node de pesquisa (o build já vem incluído; npm install traz as dependências)
(cd web-search     && npm install)   # google-scrape
(cd web-search-mcp && npm install)   # multi-extract

# Maestro (baixa o Chromium do Playwright p/ a geração de imagem grátis)
cd maestro-marketing && npm install
```

> Se o Chromium não baixar junto, rode `npx playwright install chromium`. O motor de imagem também tenta usar o Chrome do sistema automaticamente.

### Rodando

1. Abra o **Claude Code na pasta `maestro-marketing/`**. Ele detecta o `.mcp.json` e pede aprovação dos servidores MCP.
2. Conecte o **MCP do Canva** (autenticado na sua conta) — é o destino da entrega na fase 8.
3. (Opcional) Coloque imagens de referência em `perfis/{slug}/assets/referencias/` para o sistema replicar um estilo.
4. Rode a skill:
   ```
   /maestro
   ```
5. O Maestro conduz o pipeline e **para nos três gates**. Ao aprovar a arte, ele monta o carrossel, importa no Canva e te entrega o **link do design editável** + a **legenda**.

> **Fluxo recomendado:** use o **[Maestro Studio](#-maestro-studio--a-ide-da-identidade)** (`npm run studio`) para fundar a identidade da marca → depois `/maestro` para produzir cada carrossel.

## Modo econômico (caveman, opcional)

O pipeline consome tokens (pesquisa, matéria, arte). Para cortar o **output de conversa** sem tocar na qualidade do conteúdo, dá para instalar o [caveman](https://github.com/juliusbrussee/caveman) — uma skill do Claude Code que responde de forma comprimida, preservando código e comandos:

```bash
# Windows PowerShell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

> **Importante:** o Maestro **blinda o conteúdo dos posts** contra a compressão. A conversa de orquestração fica curta, mas briefing, matéria, roteiro, legenda e textos dos slides saem sempre em **prosa plena na voz da marca** — nunca telegráficos. A regra está no princípio 9 do [SKILL](maestro-marketing/.claude/skills/maestro/SKILL.md) e reforçada em cada agente de conteúdo.

## 🖥️ Maestro Studio — a "IDE" da identidade

Uma alternativa visual ao terminal para **fundar a identidade da marca**: um app local que guia pelas perguntas e deixa escolher **cores e fontes com preview ao vivo do slide**.

```bash
cd maestro-marketing && npm run studio
```

Abre em `http://localhost:4321`. Você avança pelos passos (Marca → Negócio → Público → Voz → Essência → **Cores 🎨** → Tipografia → Direção visual → Carrossel → Faça/Não faça → Revisar), vê a capa mudar ao vivo, gera um PNG de exemplo com o motor gratuito e, no fim, grava o `01-briefing.md` + `03-identidade-visual.md` prontos (`status: aprovado`) para o `/maestro` partir direto para os posts.

## MCPs de pesquisa

A pesquisa da Clara (fase 4) usa uma busca em camadas com os servidores MCP que vivem **dentro deste repositório**:

| MCP (`.mcp.json`) | Servidor no repo | Transporte | Como subir |
|---|---|---|---|
| `google-scrape` | `web-search/` (`build/index.js`) | stdio (Node) | sobe sob demanda |
| `multi-extract` | `web-search-mcp/` (`dist/index.js`) | stdio (Node) | sobe sob demanda |
| `web-search-py` | SearXNG (opcional, externo) | HTTP/SSE `:8003` | suba o stack antes do Claude Code |

Os dois MCPs Node sobem sozinhos quando o Claude Code abre. O `web-search-py` é opcional; se o `:8003` não responder, os dois MCPs Node servem de fallback (foi assim num run real, quando a metabusca caiu e a Clara cobriu com o `ddg-search` + fetch das fontes primárias).

Capacidades extras, sem MCP: o **Bruno** usa visão multimodal (Read) para analisar as imagens de referência, e o **Canva (MCP externo, autenticado na sua conta)** é o destino da entrega.

## 📦 O que você recebe

Um **design Canva editável** — o carrossel com **cada slide numa página** que você abre e ajusta no app do Canva — junto com a **legenda** pronta para copiar e colar. O Maestro grava o link em `posts/{post}/LINK-CANVA.txt` (edição + visualização + legenda) e te entrega ao final.

Os arquivos `.md` ficam em `perfis/` como a **memória interna** (briefing, identidade, pesquisa, matéria). Precisa de imagem achatada? Exporte PNG do próprio Canva, ou rode `tools/render.mjs` local (fallback offline).

> **Editabilidade:** os **textos** viram editáveis no Canva. **Ícones SVG e gradientes complexos** podem ser rasterizados no import (viram imagem dentro da página) — por isso a arte prioriza formas CSS, que o Canva mantém como vetor editável.

## 💡 Por que sem API paga de imagem

Modelos de geração de imagem por IA erram tipografia, variam a marca entre um slide e outro e cobram por imagem. Como cada slide aqui é **HTML/CSS**, o texto é desenhado nativamente — tipografia perfeita, paleta HEX exata, marca idêntica em todos os slides — e, ao importar no Canva, **esse texto vira editável**. Custo por imagem: **R$ 0**.

A geração roda com Chromium headless (Playwright) só quando você quer um PNG offline; a entrega padrão nem passa por raster — vai direto de HTML para design Canva.

## Créditos

- **Maestro** — criado por **Eduardo Erig**. Licença [MIT](LICENSE).
- **`web-search/`** — fork de [pskill9/web-search](https://github.com/pskill9/web-search) (scrape do Google via MCP).
- **`web-search-mcp/`** — fork de [mrkrsl/web-search-mcp](https://github.com/mrkrsl/web-search-mcp) (busca multi-fonte + extração).
- **caveman** (opcional) — de [JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman).
- Roda no [Claude Code](https://claude.com/claude-code); entrega via [Canva](https://www.canva.com).

Os diretórios `web-search/` e `web-search-mcp/` mantêm as licenças originais dos seus projetos. Consulte cada pasta.

---

<div align="center">

**Licença:** [MIT](LICENSE) · Criado por **Eduardo Erig**

Feito para rodar no [Claude Code](https://claude.com/claude-code) 🎻

</div>
