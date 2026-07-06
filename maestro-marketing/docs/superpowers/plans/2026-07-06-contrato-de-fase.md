# Contrato de Fase — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar o handoff entre os agentes do Maestro explícito e auto-verificável, editando apenas os prompts (`.md`).

**Architecture:** Cada agente ganha um bloco `Handoff` (Recebo / Entrego / Checo) logo após a linha "Você é…". O SKILL ganha o "briefing do disparo" + protocolo de reprovação. Sem código novo; a verificação de cada task é `grep` dos elementos críticos + revisão de diff (não há testes automatizados para prompts).

**Tech Stack:** Markdown (prompts de subagent do Claude Code). Git para versionar. Bash `grep`/`git diff` para verificar.

## Global Constraints

- **Só texto/prompts.** Nenhum arquivo de código, nenhum script novo.
- **Preservar 100%** das regras, HEX, comandos (`tools/*.mjs`, MCP), caminhos e nomes de arquivo existentes. A rubrica `Checo` é derivada das regras atuais, não inventada.
- **Blindagem caveman intacta** (princípio 9 do SKILL; a nota de "prosa plena" em cada agente de conteúdo permanece).
- **Comportamento de reprovação: parar e devolver.** Faltou o essencial → o agente PARA e devolve ao Maestro; não improvisa.
- **Saldo de tokens ~neutro:** ao adicionar a rubrica, remover só os itens de "Anti-padrões" que ela cobre 100%; manter os que agregam nuance.
- Inserir o bloco `Handoff` **logo após** o parágrafo "Você é **Nome**…" e **antes** da linha "Entrada:/Recebo do Maestro".
- Cada task termina com commit próprio no branch `claude/practical-clarke-4e8f60`.

## File Structure
Modify (7):
- `maestro-marketing/.claude/skills/maestro/SKILL.md` — briefing do disparo + protocolo de reprovação
- `maestro-marketing/.claude/agents/ana-estrategista.md`
- `maestro-marketing/.claude/agents/bruno-analista.md`
- `maestro-marketing/.claude/agents/clara-pesquisadora.md`
- `maestro-marketing/.claude/agents/diego-redator.md`
- `maestro-marketing/.claude/agents/elena-designer.md`
- `maestro-marketing/.claude/agents/felipe-diretor-arte.md`

Cadeia de handoff (Entrego → Recebo): Ana `01-briefing.md` → Bruno; Bruno `03-identidade-visual.md` → Diego/Elena/Felipe; Clara `01-pesquisa.md` → Diego; Diego `02-materia.md` → Elena; Elena `03-carrossel.md` → Felipe; Felipe HTMLs → Maestro (Fase 8).

---

### Task 1: SKILL — briefing do disparo + protocolo de reprovação

**Files:** Modify `maestro-marketing/.claude/skills/maestro/SKILL.md`

**Interfaces:**
- Produces: a regra que todos os agentes assumem — o Maestro passa contexto rico no `Task` e trata a devolução "faltou X".

- [ ] **Step 1: Inserir a seção** antes de "## Regras de ferramenta", com este conteúdo exato:

```markdown
## Como disparar um subagent (briefing do Task)
Nunca dispare só com slug e caminhos — contexto pobre faz o agente adivinhar. Ao chamar **Task**, passe sempre:
- **Objetivo do post** (de `00-tema.md`): ângulo, público, formato, profundidade.
- **Decisões e correções do usuário** feitas até aqui (o que já foi aprovado/ajustado).
- **Resumo (1–2 linhas) do que a fase anterior entregou** + o caminho do arquivo.
- **O "Entrego" esperado** da persona (veja o bloco Handoff do agente).

**Protocolo de reprovação:** se um agente devolver "faltou X" em vez do output, NÃO siga. Volte à fase anterior (redispare a persona responsável apontando a lacuna) ou pergunte ao usuário, resolva, e só então avance. Os gates humanos (identidade, matéria, arte) continuam.
```

- [ ] **Step 2: Verificar** que nada crítico se perdeu:

Run: `grep -E "build-canva-html.mjs|publish.mjs|import-design-from-url|commit-editing-transaction|ana-estrategista|felipe-diretor-arte" maestro-marketing/.claude/skills/maestro/SKILL.md | wc -l`
Expected: ≥ 6 (comandos e subagent_types intactos). Também confirmar que "princípio 9" (Caveman só na orquestração) continua presente: `grep -c "Caveman só na orquestração" .../SKILL.md` → 1.

- [ ] **Step 3: Commit**

```bash
git add maestro-marketing/.claude/skills/maestro/SKILL.md
git commit -m "feat(maestro): briefing do disparo + protocolo de reprovação no SKILL"
```

---

### Task 2: Ana — bloco Handoff

**Files:** Modify `maestro-marketing/.claude/agents/ana-estrategista.md`

**Interfaces:**
- Produces: `01-briefing.md` com os 13 campos (Bruno consome).

- [ ] **Step 1: Inserir** após "…descobre quem é a marca." e antes de "## Princípios inegociáveis":

```markdown
## Handoff (contrato desta fase)
**Recebo:** do Maestro — `slug` e o caminho de saída. Início do fluxo: se não veio o slug nem o objetivo geral, pergunte antes de começar.
**Entrego:** `01-briefing.md` no template, com os 13 campos preenchidos (ou `(a confirmar)` onde o usuário não soube). Pronto pro Bruno fundir no guia.
**Checo antes de entregar:** nada inventado (sem clichê genérico) · voz, limites e CTA preenchidos ou `(a confirmar)` · entendimento parafraseado e confirmado pelo usuário antes de gravar.
```

- [ ] **Step 2: Enxugar Anti-padrões** cobertos pela rubrica: manter os 3 atuais (nenhum é 100% redundante — a rubrica resume, os anti-padrões exemplificam). Sem remoção.

- [ ] **Step 3: Verificar**

Run: `grep -E "13 perguntas|\(a confirmar\)|template|Handoff" maestro-marketing/.claude/agents/ana-estrategista.md | wc -l`
Expected: ≥ 4.

- [ ] **Step 4: Commit**

```bash
git add maestro-marketing/.claude/agents/ana-estrategista.md
git commit -m "feat(maestro): Handoff (Recebo/Entrego/Checo) na Ana"
```

---

### Task 3: Bruno — bloco Handoff

**Files:** Modify `maestro-marketing/.claude/agents/bruno-analista.md`

**Interfaces:**
- Consumes: `01-briefing.md` (da Ana). Produces: `03-identidade-visual.md` (Diego/Elena/Felipe consomem).

- [ ] **Step 1: Inserir** após "…que o **Felipe** vai replicar em CADA slide." (fim do parágrafo de abertura) e antes de "## Princípios":

```markdown
## Handoff (contrato desta fase)
**Recebo:** `01-briefing.md` — preciso achar negócio, público, voz e limites. Mais imagens em `assets/referencias/` e/ou um `@`, se o usuário deu. Briefing vazio no essencial? PARE e devolva ao Maestro.
**Entrego:** `02-analise-visual.md` (com a seção Benchmark) + `03-identidade-visual.md` (o guia-contrato). Pronto pro Diego (voz), Elena e Felipe (visual).
**Checo antes de entregar:** toda cor tem HEX exato · tipografia nomeada (Google Font) · "o que NUNCA aparece" presente · Bloco de Estilo semente escrito · Benchmark (Modo C) feito · regras de carrossel (4–6 slides, um elemento visual por slide).
```

- [ ] **Step 2: Enxugar Anti-padrões** — "Descrever cor sem HEX" e "Direção vaga" já viram itens da rubrica; encurtar essas duas linhas para uma nota só se ficarem literalmente idênticas. Manter "Análise que lista o óbvio" e "Inventar métricas".

- [ ] **Step 3: Verificar**

Run: `grep -E "HEX|Benchmark|Modo C|Bloco de Estilo|4–6|Handoff" maestro-marketing/.claude/agents/bruno-analista.md | wc -l`
Expected: ≥ 6.

- [ ] **Step 4: Commit**

```bash
git add maestro-marketing/.claude/agents/bruno-analista.md
git commit -m "feat(maestro): Handoff (Recebo/Entrego/Checo) no Bruno"
```

---

### Task 4: Clara — bloco Handoff

**Files:** Modify `maestro-marketing/.claude/agents/clara-pesquisadora.md`

**Interfaces:**
- Consumes: `00-tema.md`. Produces: `01-pesquisa.md` (Diego consome).

- [ ] **Step 1: Inserir** após "…**fonte para tudo. Sem fonte, não entra.**" e antes de "Entrada: `00-tema.md`":

```markdown
## Handoff (contrato desta fase)
**Recebo:** `00-tema.md` — preciso achar tema, ângulo, objetivo e profundidade. Tema vago demais pra pesquisar? PARE e peça ao Maestro pra qualificar.
**Entrego:** `01-pesquisa.md` — dossiê com fonte em tudo. Pronto pro Diego escrever a matéria.
**Checo antes de entregar:** nenhum número/afirmação sem [Fonte](url) · ≥2 fontes independentes nos pontos-chave · atualidade (últimos 30 dias) checada · conflitos registrados · pelo menos 2 motores cruzados.
```

- [ ] **Step 2: Verificar** que os 5 MCPs e a regra de fonte continuam:

Run: `grep -E "ddg-search|one-search|web-search|searxng|web-search-mcp|Fonte|Handoff" maestro-marketing/.claude/agents/clara-pesquisadora.md | wc -l`
Expected: ≥ 6 (os nomes de MCP intactos).

- [ ] **Step 3: Commit**

```bash
git add maestro-marketing/.claude/agents/clara-pesquisadora.md
git commit -m "feat(maestro): Handoff (Recebo/Entrego/Checo) na Clara"
```

---

### Task 5: Diego — bloco Handoff (com porta de entrada dura)

**Files:** Modify `maestro-marketing/.claude/agents/diego-redator.md`

**Interfaces:**
- Consumes: `01-pesquisa.md` (Clara) + `03-identidade-visual.md` (Bruno). Produces: `02-materia.md` (Elena consome).

- [ ] **Step 1: Inserir** após o bloco de blindagem existente (`> **Prosa plena — o conteúdo é o produto.** …`) e antes de "## Princípios":

```markdown
## Handoff (contrato desta fase)
**Recebo:** `01-pesquisa.md` (fatos com fonte) + `03-identidade-visual.md` (seção "Voz e tom"). Sem "Voz e tom" no guia, ou pesquisa sem fontes? PARE e devolva ao Maestro — não escreva sobre base fraca.
**Entrego:** `02-materia.md` — o texto-mãe na voz da marca, pronto pra Elena fatiar.
**Checo antes de entregar:** só fatos do dossiê (nada inventado) · voz do guia respeitada · sem AI-speak e sem travessão (em dash) · abertura/desenvolvimento/fechamento presentes · `**Fontes usadas:**` registrado.
```

- [ ] **Step 2: Verificar** blindagem + regras preservadas:

Run: `grep -E "Prosa plena|dossiê|em dash|Fontes usadas|Handoff" maestro-marketing/.claude/agents/diego-redator.md | wc -l`
Expected: ≥ 5 (inclui a nota de blindagem caveman intacta).

- [ ] **Step 3: Commit**

```bash
git add maestro-marketing/.claude/agents/diego-redator.md
git commit -m "feat(maestro): Handoff (Recebo/Entrego/Checo) no Diego"
```

---

### Task 6: Elena — bloco Handoff

**Files:** Modify `maestro-marketing/.claude/agents/elena-designer.md`

**Interfaces:**
- Consumes: `02-materia.md` (Diego) + `03-identidade-visual.md` (Bruno). Produces: `03-carrossel.md` (Felipe consome).

- [ ] **Step 1: Inserir** após o bloco de blindagem (`> **Prosa plena — o conteúdo é o produto.** …`) e antes de "## Anatomia de um carrossel que performa":

```markdown
## Handoff (contrato desta fase)
**Recebo:** `02-materia.md` (aprovada) + `03-identidade-visual.md` (regras de carrossel, semântica de cor). Matéria não aprovada ou guia sem regra visual? PARE e devolva ao Maestro.
**Entrego:** `03-carrossel.md` — roteiro 4–6 slides + a legenda. Pronto pro Felipe desenhar.
**Checo antes de entregar:** capa com gancho forte · 1 ideia por slide · TODO slide com elemento visual construível (não só a capa) · cor semântica marcada por slide · CTA único · legenda na voz da marca · slides não numerados.
```

- [ ] **Step 2: Verificar**

Run: `grep -E "Prosa plena|4–6|CTA|elemento visual|Handoff" maestro-marketing/.claude/agents/elena-designer.md | wc -l`
Expected: ≥ 5.

- [ ] **Step 3: Commit**

```bash
git add maestro-marketing/.claude/agents/elena-designer.md
git commit -m "feat(maestro): Handoff (Recebo/Entrego/Checo) na Elena"
```

---

### Task 7: Felipe — bloco Handoff

**Files:** Modify `maestro-marketing/.claude/agents/felipe-diretor-arte.md`

**Interfaces:**
- Consumes: `03-carrossel.md` (Elena) + `03-identidade-visual.md` (Bruno). Produces: `imagens/slide-XX.html` (Maestro, Fase 8).

- [ ] **Step 1: Inserir** após o bloco de blindagem (`> **Texto do slide é conteúdo…**`) e antes de "## Passo a passo":

```markdown
## Handoff (contrato desta fase)
**Recebo:** `03-carrossel.md` (elemento visual por slide) + `03-identidade-visual.md` (HEX, tipografia, Bloco de Estilo). Carrossel sem elemento visual definido, ou guia sem HEX? PARE e devolva ao Maestro.
**Entrego:** `04-prompts-imagem.md` + `imagens/slide-XX.html`. PARO antes de publicar/importar — devolvo ao Maestro pro gate.
**Checo antes de entregar:** HEX exatos do guia · mínimos de fonte respeitados · TODO slide com elemento visual (formas CSS preferidas, ≤1 SVG) · autocontido (sem CDN/JS) · texto real, nunca imagem · contraste WCAG ≥ 4.5:1 · sem contador de slides · parei antes de publicar.
```

- [ ] **Step 2: Verificar** que os detalhes técnicos e o esqueleto HTML seguem intactos:

Run: `grep -E "1080px|1350px|#1A1A2E|build-canva|WCAG|Handoff" maestro-marketing/.claude/agents/felipe-diretor-arte.md | wc -l`
Expected: ≥ 5. Conferir a tabela de fontes mínimas (`grep -c "58" .../felipe-diretor-arte.md` ≥ 1).

- [ ] **Step 3: Commit**

```bash
git add maestro-marketing/.claude/agents/felipe-diretor-arte.md
git commit -m "feat(maestro): Handoff (Recebo/Entrego/Checo) no Felipe"
```

---

### Task 8: Verificação final do pipeline

**Files:** (nenhum) — revisão do conjunto.

- [ ] **Step 1: Confirmar cadeia de handoff coerente** — cada `Entrego` de uma fase bate com o `Recebo` da próxima:

Run: `grep -rn "Recebo:\|Entrego:" maestro-marketing/.claude/agents/`
Expected: 6 agentes, cada um com um `Recebo:` e um `Entrego:`; os nomes de arquivo encadeiam (Ana→`01-briefing`→Bruno; Clara→`01-pesquisa`→Diego; Diego→`02-materia`→Elena; Elena→`03-carrossel`→Felipe).

- [ ] **Step 2: Confirmar blindagem caveman intacta:**

Run: `grep -rl "Prosa plena\|Texto do slide é conteúdo" maestro-marketing/.claude/agents/ | wc -l`
Expected: ≥ 4 (Ana, Diego, Elena, Felipe mantêm a nota de blindagem).

- [ ] **Step 3: Revisar o diff completo** contra o spec (cobertura): `git diff <sha-antes>..HEAD -- maestro-marketing/` — conferir que nenhum HEX/comando/caminho sumiu e que cada agente tem o bloco Handoff.

## Self-Review (feita)
- **Cobertura do spec:** Handoff → Tasks 2–7; rubrica Checo → Tasks 2–7; briefing do disparo → Task 1; protocolo de reprovação → Task 1; parar-e-devolver → embutido no `Recebo` de Bruno/Clara/Diego/Elena/Felipe. ✔
- **Sem placeholders:** cada task traz o texto exato do bloco. ✔
- **Consistência de nomes:** os arquivos citados nos `Recebo`/`Entrego` batem com os `subagent_type`/outputs da tabela do SKILL. ✔
