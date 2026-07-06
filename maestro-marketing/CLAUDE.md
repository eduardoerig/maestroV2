# Maestro — Equipe de Marketing de IA (carrosséis de Instagram)

**Agência de marketing simulada** que roda **no terminal, via Claude Code**: um orquestrador (**Maestro**) comanda 6 subagents especialistas para produzir carrosséis de Instagram, do briefing à **entrega como design Canva editável** (cada slide vira uma página editável no app), com **gates de aprovação humana**. A arte é **construída localmente em HTML/CSS** (sem API paga de imagem) e **importada para o Canva** via MCP.

## Como usar
Abra o Claude Code nesta pasta e rode a skill **`/maestro`**. Ele conduz o pipeline e ativa cada persona na hora certa. Para o estilo visual, **anexe imagens de referência** em `perfis/{slug}/assets/referencias/` — o Bruno analisa e replica o estilo.

## A equipe (subagents em `.claude/agents/`)
- **Ana** (`ana-estrategista`) — briefing da marca (Fase 0)
- **Bruno** (`bruno-analista`) — análise visual + guia de identidade (Fases 1–2)
- **Clara** (`clara-pesquisadora`) — dossiê de pesquisa com fontes (Fase 4)
- **Diego** (`diego-redator`) — a matéria na voz da marca (Fase 5)
- **Elena** (`elena-designer`) — roteiro do carrossel + legenda (Fase 6)
- **Felipe** (`felipe-diretor-arte`) — HTML/CSS dos slides (Fase 7)

O orquestrador vive em `.claude/skills/maestro/SKILL.md`.

## Regra de arte e entrega (IMPORTANTE)
A **arte** é sempre local e **sem API paga de imagem**: cada slide é um HTML/CSS autocontido com o design da marca (**nunca** DALL·E, Imagen, Midjourney, OpenRouter etc.). A **entrega** é um **design Canva editável** (não um PNG achatado). Fluxo da Fase 8:

```bash
node tools/build-canva-html.mjs perfis/{slug}/posts/{post}/imagens             # 1) combina os slides em carrossel.html (1 página por slide)
node tools/publish.mjs        perfis/{slug}/posts/{post}/imagens/carrossel.html # 2) sobe numa URL HTTPS pública temporária
# 3) Maestro chama o MCP do Canva: import-design-from-url({ url, intended_design_type: "instagram_post" })
```

PNG sob demanda: `export-design` no Canva, ou `tools/render.mjs` local (fallback offline). Requer o **MCP do Canva conectado** (autenticado na conta do usuário).

## Entrega (o que o usuário recebe)
O final NÃO são os `.md` (memória interna). É o **link de um design Canva editável** — cada slide numa **página editável** — + a **legenda** (de `03-carrossel.md`). O Maestro grava o link em **`posts/{post}/LINK-CANVA.txt`** (edição + visualização + legenda). O usuário abre no Canva, ajusta e publica. PNG só se pedir.

## Gates de aprovação (o Maestro para e espera)
1. **Identidade visual** (`03-identidade-visual.md`) — obrigatório.
2. **Matéria** (`02-materia.md`) — obrigatório.
3. **Arte** (HTMLs dos slides) — obrigatório, **antes de publicar e importar no Canva**.

## Compressão (caveman) e o conteúdo
Se o modo caveman estiver ativo, ele vale só para a **conversa de orquestração** (status, decisões, gates). O **conteúdo dos posts** — briefing, matéria, roteiro, legenda e textos dos slides — sai em **prosa plena na voz da marca**, nunca telegráfico. Cada agente de conteúdo já traz essa regra; o SKILL detalha (princípio 9).

## Persistência
Arquivos `.md` locais (versionáveis com Git). Opcional: Google Drive (arquivar) e Supabase (metadados/dashboard) via MCPs. A **arte** nunca depende de API paga de imagem; a **entrega** usa o MCP do Canva.

## MCPs do projeto (`.mcp.json`)
Os MCPs de pesquisa vêm **dentro do repositório**, declarados em `.mcp.json` (Clara, busca em camadas):
- `google-scrape` — stdio Node, `../web-search/build/index.js` (sobe sob demanda).
- `multi-extract` — stdio Node, `../web-search-mcp/dist/index.js` (sobe sob demanda).
- `web-search-py` — MCP HTTP/SSE em `http://localhost:8003/sse`, backend SearXNG. **Requer** o stack Docker: `cd web-search-mcp-server && docker compose up -d`. Se o `:8003` não responder, use os dois Node como fallback.

## Convenções
- Criar arquivos/pastas com **Write** (cria diretórios-pai; evita conflito de path no Windows). Não usar `mkdir` no Bash.
- `slug` do perfil em kebab-case minúsculo. Pasta de post: `posts/{AAAA-MM-DD}-{tema-slug}/`.
- Templates-mestre em `perfis/_templates/` — copiar, nunca editar in loco.
