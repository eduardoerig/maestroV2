# Contrato de Fase — robustez de comunicação no pipeline Maestro

**Data:** 2026-07-06
**Status:** aprovado (design)
**Escopo:** os 6 agentes (`.claude/agents/`) + o orquestrador (`.claude/skills/maestro/SKILL.md`). Só texto/prompts — nenhum código novo.

## Problema
No pipeline de 8 fases, os agentes se comunicam por arquivos `.md` + o contexto que o Maestro passa no `Task`. Hoje isso é implícito e frágil:

- **Handoff sem contrato:** uma fase lê o `.md` da anterior, mas nada garante que ele traz o que a próxima precisa. Material fraco (guia sem "voz e tom", pesquisa sem fonte) passa adiante sem ninguém barrar.
- **Contexto do disparo pobre:** o SKILL manda passar "caminhos de entrada/saída e slug". O subagent não recebe objetivo do post, decisões nem correções já feitas — adivinha.
- **Sem auto-checagem:** nenhum agente valida o próprio output antes do gate. O usuário é o único QA.

Fora de escopo (YAGNI agora): fallback de falha de MCP/Chrome/publish.

## Objetivo
Tornar o fluxo de informação entre fases **explícito** e **auto-verificável**, só melhorando os prompts. Sucesso = menos retrabalho nos gates e menos post furado por material fraco herdado da fase anterior.

## Design: o "Contrato de Fase"
Um padrão textual único, aplicado a cada agente, com três partes + o briefing do disparo no Maestro.

### 1. Bloco de handoff (novo, no topo de cada agente, após "Você é…")
```
## Handoff (contrato desta fase)
Recebo: <arquivos> — e neles PRECISO achar <campos/qualidades>. Faltou o
        essencial? PARE e devolva ao Maestro dizendo exatamente o que falta.
        Não improvise nem preencha com suposição.
Entrego: <arquivo(s)> — garanto que contém <o que a próxima fase precisa>.
Checo antes de entregar: rubrica abaixo (só entrego com todos os itens ok).
```

### 2. Comportamento de reprovação (decidido: **parar e devolver**)
Se o material recebido é insuficiente, o agente **para na hora** e devolve ao Maestro uma nota curta do que falta (qual campo, em qual arquivo). Não segue produzindo sobre base fraca. Coerente com o princípio existente "suposição vira pergunta".

### 3. Rubrica de auto-checagem por agente
Consolida critérios que hoje estão espalhados em "Regras"/"Anti-padrões" numa checklist objetiva que o agente roda **antes** de entregar. Não é regra nova — é a mesma exigência, agora verificável. Ao consolidar, remover a redundância dos anti-padrões para não inchar.

| Agente | Recebo (preciso achar) | Entrego | Checo |
|---|---|---|---|
| **Ana** (0) | slug + caminho de saída | `01-briefing.md` (13 campos ou `(a confirmar)`) | nada inventado · voz/limites/CTA preenchidos ou `(a confirmar)` · entendimento confirmado antes de gravar |
| **Bruno** (1-2) | `01-briefing.md` (negócio, público, voz, limites) + imagens/@ se houver | `02-analise-visual.md` (com benchmark) + `03-identidade-visual.md` | toda cor tem HEX · tipografia nomeada (Google Font) · "o que NUNCA aparece" presente · Bloco de Estilo semente escrito · benchmark (Modo C) feito · regras de carrossel (4-6 slides, elemento visual/slide) |
| **Clara** (4) | `00-tema.md` (tema, ângulo, objetivo, profundidade) | `01-pesquisa.md` | nenhum número sem URL · ≥2 fontes independentes nos pontos-chave · atualidade (30d) checada · conflitos registrados · motores cruzados |
| **Diego** (5) | `01-pesquisa.md` (fatos com fonte) + `03-identidade-visual.md` (Voz e tom). Sem voz no guia ou sem fonte na pesquisa → PARA | `02-materia.md` | só fatos do dossiê · voz do guia respeitada · sem AI-speak/em-dash · abertura/dev/fecho · fontes citadas |
| **Elena** (6) | `02-materia.md` (aprovada) + `03-identidade-visual.md` (regras visuais, semântica de cor) | `03-carrossel.md` (+ legenda) | capa com gancho forte · 1 ideia/slide · todo slide com elemento visual construível · cor semântica marcada · CTA único · legenda na voz · slides não numerados |
| **Felipe** (7) | `03-carrossel.md` (elemento visual/slide) + `03-identidade-visual.md` (HEX, tipografia, Bloco de Estilo) | `04-prompts-imagem.md` + `imagens/slide-XX.html`; PARA antes de publicar | HEX exatos do guia · mínimos de fonte · todo slide com elemento visual (formas CSS preferidas, ≤1 SVG) · autocontido (sem CDN/JS) · texto real, não imagem · contraste WCAG ≥ 4.5:1 · sem contador de slides · parou antes de publicar/importar |

### 4. Briefing do disparo (no SKILL)
Nova subseção em "Regras de ferramenta": ao chamar `Task`, o Maestro passa **sempre**, além de slug e caminhos:
- **Objetivo do post** (de `00-tema.md`): ângulo, público, formato, profundidade.
- **Decisões e correções do usuário** feitas até aqui (o que já foi aprovado/ajustado).
- **Resumo (1-2 linhas) do que a fase anterior entregou** + caminho do arquivo.
- **O "Entrego" esperado** daquela persona.

Regra: nunca disparar só com caminhos — contexto pobre = agente adivinha.

### 5. Protocolo de reprovação (no SKILL)
Se um agente devolve *"faltou X"*: o Maestro **não segue**. Ele volta à fase anterior (redispara a persona responsável com a lacuna apontada) ou pergunta ao usuário, resolve, e só então avança. Os gates humanos (identidade, matéria, arte) continuam iguais.

## O que NÃO muda
- As 8 fases, os `subagent_type`, os caminhos, os comandos (`tools/*.mjs`), os HEX, os mínimos de fonte, a entrega Canva.
- Os 3 gates humanos.
- A blindagem caveman (princípio 9): o Contrato é instrução; o conteúdo dos posts segue em prosa plena na voz da marca.

## Riscos e mitigação
- **Inchaço de tokens** (contra o objetivo recente de economia): mitigado consolidando critérios já existentes e cortando a redundância dos anti-padrões. Meta: saldo neutro a levemente positivo em bytes por agente.
- **Parar demais** (agente barra por excesso de zelo): a rubrica lista só o **essencial** da fase; `(a confirmar)` continua válido para lacunas não-bloqueantes. Só o essencial ausente dispara o "PARA".
- **Divergência entre rubrica e regras existentes:** a rubrica é derivada das regras atuais, não inventada; ao consolidar, conferir 1:1 com Regras/Anti-padrões de cada agente.

## Critério de aceitação
- Cada agente tem bloco `Handoff` (Recebo/Entrego/Checo) coerente com suas entradas/saídas reais.
- SKILL tem o briefing do disparo + o protocolo de reprovação.
- Nenhuma regra/HEX/comando/caminho existente foi perdido.
- Blindagem caveman intacta.
- Commit no branch para revisão do diff.
