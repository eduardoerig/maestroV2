---
tipo: prompts-imagem
perfil: primodev
tema: "Seu site não é lento. Ele é caro."
slides: 6
proporcao: "1:1 (1080×1080)"
baseado_em: 03-carrossel.md + 03-identidade-visual.md
---

# Prompts de imagem — Seu site não é lento. Ele é caro.

> Registro/portabilidade. A arte de verdade são os `imagens/slide-XX.html` (autocontidos, HTML/CSS, texto real editável). Este arquivo documenta o Bloco de Estilo fixo + um Bloco de Cena por slide, caso um dia se plugue um gerador externo. **A entrega é um design Canva editável** — por isso todo elemento visual é forma CSS nativa (div: barra/coluna/anel/bloco/pill), nunca render de IA.

---

## Bloco de Estilo (DNA fixo — idêntico em todos os slides)

**Marca:** PrimoDev · estilo "Dossiê PrimoDev" (editorial técnico).
**Proporção:** 1:1, 1080×1080, `overflow:hidden`.
**Fundo:** gradiente linear 135° teal-navy `#0E2E3C → #081320`. Sólido, maduro, sem textura ruidosa.
**Texto padrão:** branco `#FFFFFF`.
**Paleta semântica (cor = sentido — UMA cor de destaque por slide):**
- Ciano `#19A3E8` — dado/ênfase (padrão da marca; também selo, régua e crop marks).
- Amarelo `#F4C20D` — CTA / swipe (única ação).
- Vermelho `#D43A1E` — perda / problema.
- Verde `#2FA84F` — ganho / solução.
- Cinza-azulado `#5B7A8C` (aprox.) — trilhos, bases de gráfico, metadado, eco discreto.

**Tipografia (Google Fonts via @import):**
- **Anton** — números/dados gigantes (o herói).
- **Montserrat 800/900 UPPERCASE** — manchetes e títulos.
- **Montserrat 600/700** — apoio/subtítulo.
- **JetBrains Mono** — selo `‹ primodev ›`, kickers `// …`, metadado do rodapé.

**Moldura fixa (em TODO slide):**
- Selo `‹ primodev ›` em JetBrains Mono ciano, letter-spacing amplo, centralizado no topo.
- Crop marks nos quatro cantos: linha fina ciano `rgba(25,163,232,.5)`, recuadas ~54px.
- Linha de metadado mono discreta (cinza-azulado) centralizada no rodapé.

**Composição:** muito respiro; contraste pontual, não barulho. Capa (slide-01) centralizada; internos (02–06) alinhados à esquerda. Herói = o dado gigante em Anton. Gráficos em formas CSS (barras/colunas/anel/blocos/pill).

**O que NUNCA aparece:** barra de topo branca, fundo claro no conteúdo, pastel, fonte fina (100–300), glow/neon/`box-shadow` saturado, "arco-íris" de cores, emojis, clipart/ícone via CDN, imagem hospedada fora, contador de slides ("3/6"), `conic-gradient`/donut rasterizado (anéis são `<div>` com `border`).

---

## Slide 1 — Capa / Gancho · destaque VERMELHO (perda)

**Cena:** capa centralizada. Fundo teal-navy. Selo no topo. Kicker mono ciano `// web performance`. Manchete Montserrat 900 UPPERCASE em duas linhas: "SEU SITE NÃO É LENTO. ELE É CARO." Régua ciano curta. Herói: `53%` gigante em Anton, vermelho `#D43A1E`, dominando o miolo. Logo abaixo, barra de progresso em forma CSS: trilho cinza-azulado com preenchimento vermelho sólido até ~53%. Apoio Montserrat 700. `arrasta →` em mono amarelo discreto acima do metadado.
**Elemento visual:** número herói Anton + barra de progresso `<div>` (trilho + preenchimento 53%).
**Metadado:** `web performance · fonte: Portent / Deloitte`.

## Slide 2 — Escada de abandono · destaque VERMELHO (perda)

**Cena:** interno à esquerda. Kicker `// escada de abandono`. Título Montserrat 800: "Cada segundo empurra mais gente pra fora." Herói/gráfico: três colunas em forma CSS subindo da esquerda pra direita (3s, 5s, 10s), alturas proporcionais a +32% / +90% / +123%, o percentual em Anton no topo de cada coluna, colunas em vermelho, ancoradas numa linha-base cinza-azulada; rótulos de tempo sob cada coluna. Apoio curto abaixo.
**Elemento visual:** gráfico de colunas CSS (3 `<div>` de alturas proporcionais + baseline).
**Metadado:** `web performance · fonte: Google / SOASTA`.

## Slide 3 — Conversão · destaque CIANO (dado/ênfase)

**Cena:** interno à esquerda. Kicker `// taxa de conversão`. Título Montserrat 800: "O rápido não só retém. Ele vende mais." Herói: `2,5×` gigante em Anton, ciano. Duas barras comparativas em forma CSS lado a lado: "1s" alta (ciano) vs "5s" baixa (~40% da altura, cinza-azulado), rótulos 1s/5s. Apoio curto embaixo.
**Elemento visual:** herói Anton + duas colunas comparativas CSS.
**Metadado:** `web performance · fonte: Portent (100M+ acessos)`.

## Slide 4 — Dinheiro · destaque VERMELHO (perda)

**Cena:** interno à esquerda. Kicker `// mesma verba, menos caixa`. Título Montserrat 800: "US$965 que somem no mesmo tráfego." Herói: `−US$965` gigante em Anton, vermelho. Duas barras de receita em forma CSS: "1s = US$1.525" cheia (ciano) e "3s = US$560" curta (vermelha), com o vão entre elas marcado por uma faixa/rótulo vermelho `−US$965`. Apoio explicando a simulação.
**Elemento visual:** herói Anton + duas barras de receita CSS + faixa de gap.
**Metadado:** `web performance · fonte: Portent (simulação)`.

## Slide 5 — Clímax · destaque VERDE (ganho) + detalhe CIANO

**Cena:** interno à esquerda. Kicker `// o outro lado da moeda`. Título Montserrat 800 em verde: "0,1 segundo move dinheiro de verdade." Herói: dois **anéis em forma CSS** lado a lado (`<div>` `border-radius:50%` só com `border` grosso verde — NÃO `conic-gradient`), cada percentual (`+8,4%` / `+9,2%`) em Anton no centro do anel. Ao lado, selo pequeno com borda ciano: `Core Web Vitals = ranqueamento` (o "prejuízo duplo"). Verde domina; o selo é o único toque ciano. Apoio amarrando "vende menos agora + achado por menos depois".
**Elemento visual:** dois anéis CSS (border) + número Anton no centro + selo/bloco ciano.
**Metadado:** `web performance · fonte: Deloitte + Google (Core Web Vitals)`.

## Slide 6 — CTA · destaque AMARELO (única ação)

**Cena:** interno à esquerda (leve simetria de fecho com a capa). Kicker `// conserto que se paga`. Fecho Montserrat 800: "O site \"econômico\" que trava é o mais caro que existe. O boleto dele chega todo mês, disfarçado de venda que não aconteceu." Reforço Montserrat 600: "Velocidade não é capricho de programador. É linha do seu faturamento." Botão outline fino amarelo (não preenchido) com "chama no direct →" — a única ação. Eco discreto em bloco pequeno: `53% somem · US$965/1k perdidos` (cinza-azulado, números em ciano). Sem ícone de rede social; a moldura já assina.
**Elemento visual:** botão outline CSS (pill/borda) + bloco de eco de dados.
**Metadado:** `‹ _primodev › · tecnologia que vira resultado`.

---

## Negativos (para todos os slides)

Sem neon, sem glow, sem `box-shadow`/`text-shadow` saturado, sem fonte fina, sem pastel, sem fundo claro no conteúdo, sem barra de topo branca, sem emojis, sem clipart/ícone genérico, sem imagem hospedada fora, sem CDN/JS, sem `conic-gradient`/donut, sem contador de slides, sem "arco-íris" de cores (uma cor de destaque por slide), sem parede de texto.
