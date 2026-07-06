---
tipo: identidade-visual
perfil: primodev
versao: 2.0
status: aprovado
---

# Guia de Identidade — PrimoDev

## 1. Essência
- **Missão em 1 frase:** transformar o site/sistema do cliente em uma máquina de vendas que escala.
- **Valores:** resultado, confiabilidade, clareza técnica, parceria ("primo").
- **Arquétipo:** o Herói técnico-acessível — os primos que resolvem.
- **Tagline recomendada:** "Tecnologia que vira resultado." (alternativas no briefing)

## 2. Voz e tom
- **Como escrevemos:** direto, didático, confiante, bom humor tech/gamer; provocativo na medida ao comparar com "site barato".
- **Palavras que usamos:** resultado, vendas, escalável, estável, confiável, sob medida.
- **Palavras que evitamos:** "barato", "milagre", "garantido", jargão sem tradução.
- **Régua de formalidade (1–5):** 2 (informal-profissional).
- **Uso de emojis:** **não usar emojis** (nem nos slides, nem na legenda). Sempre preferir **ícones** (SVG/iso) e elementos gráficos da marca.

## 3. Sistema de cores (HEX exatos — vão direto pro CSS)
- **Primária (fundo):** gradiente `#0E2E3C → #081320` (teal-navy, vertical/135°).
- **Secundária (ênfase):** azul ciano `#19A3E8` (linhas, links, números de destaque).
- **CTA / atenção:** amarelo `#F4C20D` ("saiba o porquê", swipe).
- **Problema:** vermelho `#D43A1E` (títulos de slides de dor).
- **Solução:** verde `#2FA84F` (títulos de slides de ganho).
- **Texto sobre fundo escuro:** branco `#FFFFFF`. **Sobre claro (barra de topo):** `#0B0B0B`.

> **Regra de ouro: cor = sentido.** Branco = padrão. Vermelho = problema. Verde = solução. Azul = ênfase/dado. Amarelo = CTA.

> **Sem neon (decisão do usuário).** Nada de cores fluorescentes nem `glow`/`text-shadow`/`box-shadow` saturado. Usar as cores em tons sólidos e maduros, mantendo a lógica cor = sentido. Diferenciação por **peso, tamanho e cor sólida**, não por brilho. (O verde de solução saiu do antigo `#34E23A` neon para `#2FA84F`.)

## 4. Tipografia (Google Fonts, grátis via @import)
- **Display (números/palavras gigantes):** **Anton** (condensada, pesadíssima) — ex.: "404".
- **Títulos e labels:** **Montserrat** 800/900, UPPERCASE.
- **Subtítulos/apoio:** Montserrat 600/700.
- **Assinatura/código:** fonte mono (**JetBrains Mono**) para o rodapé `‹ _primodev ›` e kickers tipo `// ...`.

## 5. Direção visual — "Dossiê PrimoDev" (editorial técnico)
- **Estilo:** editorial técnico — escuro, clean, muito respiro. Contraste pontual, não barulho. Fundo teal-navy sempre.
- **Selo da marca:** `‹ primodev ›` em JetBrains Mono, ciano, letter-spacing amplo, **centralizado no topo** de todo slide. Os angle brackets são o motivo de marca (código + moldura). **Sem barra de topo branca**, sem logo placeholder.
- **Crop marks:** quatro cantos em linha fina ciano (rgba ~.5), recuados ~54px da borda. Assinatura de material impresso/editorial — o detalhe que dá autoria e foge de template.
- **Metadado:** uma linha mono discreta no rodapé central (ex.: `web performance · fonte: …`), cinza-azulado. Cara de dossiê.
- **Uma cor de destaque por slide:** ciano é o padrão (ênfase/dado); vermelho/verde/amarelo só quando a semântica pede. Menos "arco-íris", mais sóbrio.
- **Herói = o dado:** o número gigante (Anton) é o protagonista dos slides de dado (44%, 2/3, 778.500…). Gráficos em **formas CSS** (barras, colunas, blocos, dots) — que ficam editáveis no Canva. Sem render 3D novo; asset base64 da biblioteca quando precisar de imagem. Nunca IA paga.
- **Ritmo:** capa **centralizada** (impacto); slides internos **alinhados à esquerda** (leitura editorial).
- **O que NUNCA aparece:** barra de topo branca, fundo claro no conteúdo, pastel, fonte fina, glow/neon, "arco-íris" de cores, cara corporativa.

## 6. Regras do carrossel
- **Slides:** 4–6 (curto e denso retém mais; só estenda se o tema realmente exigir).
- **Proporção:** **1:1 (1080×1080)** — é o formato atual das peças. (Se quiser mais área no feed, dá pra migrar pra 4:5/1080×1350; decidir junto.)
- **Selo + crop marks + metadado:** todo slide tem o selo `‹ primodev ›` centralizado no topo, os crop marks nos quatro cantos e a linha de metadado mono no rodapé. É a moldura fixa da marca (substitui a antiga barra de topo branca).
- **Capa:** gancho forte (número/manchete gigante), **centralizada**, com kicker mono `// …`, uma régua ciano curta e o swipe `arrasta →` em **mono amarelo discreto** (sem pill exagerado).
- **Slides internos:** **alinhados à esquerda**; o **dado gigante** (Anton) é o herói, apoiado por um gráfico em forma CSS e um subtítulo curto.
- **CTA final:** ação única em **botão outline fino amarelo** (ex.: "chama no direct →") — clean, não preenchido.

## 7. Faça / Não faça
| Faça ✅ | Não faça ❌ |
|---|---|
| Selo `‹ primodev ›` central + crop marks nos cantos | Barra de topo branca / logo placeholder |
| Uma cor de destaque por slide (ciano padrão) | "Arco-íris" de cores sem necessidade |
| Dado gigante (Anton) como herói, em forma CSS | Slide só-texto ou gráfico em SVG rasterizado |
| Cor = sentido (vermelho=problema, verde=solução) | Misturar cores sem lógica |
| Muito respiro, metadado mono no rodapé | Parede de texto, cara corporativa |
| CTA final outline amarelo, uma ação | Emojis em qualquer lugar (slides ou legenda) |
