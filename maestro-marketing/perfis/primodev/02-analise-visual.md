---
tipo: analise-visual
perfil: primodev
fonte: "referencias (3 prints do @_primodev)"
coletado_em: 2026-06-25
itens_analisados: 3
---

# Análise visual — PrimoDev

## Por item analisado

### 1. Capa "404 / O SITE BARATO PODE CUSTAR 10x MAIS"
- **Paleta:** fundo gradiente teal-navy (topo ~#0E2E3C → base ~#081320). Texto branco. Acentos: azul ciano ~#19A3E8 ("10x MAIS"), amarelo ~#F4C20D ("SAIBA O PORQUE" + mãozinha de swipe).
- **Tipografia:** display PESADO condensado (o "404" tipo Anton/Archivo Black). Headline em sans bold uppercase. Cor codifica sentido (branco + azul + amarelo).
- **Composição:** imagem-herói no topo (T-Rex realista, "ameaça"), número gigante centralizado, manchete embaixo, CTA amarelo + ícone de swipe no canto.
- **Por que funciona:** gancho visual forte (T-Rex = perigo) + número gigante param o scroll. CTA amarelo guia a próxima ação.

### 2. Slide-problema "O SITE BARATO:"
- **Paleta:** mesmo fundo teal-navy. **Título em vermelho** (~#EA3C1A) com glow (cor = problema). Labels brancas. Linhas conectoras em **ciano** (~#19A3E8).
- **Tipografia:** título bold uppercase com brilho; labels Montserrat-bold uppercase.
- **Composição:** **mapa mental de 4 cantos** — objeto-herói 3D central (PC/servidor preto rachado, com glow azul holográfico) ligado por linhas finas a 4 ícones glossy + label: NÃO GERA RESULTADO · RETRABALHO · INSTÁVEL · LIMITA O CRESCIMENTO.
- **Por que funciona:** 1 ideia por canto, leitura rápida, metáfora visual (máquina quebrada).

### 3. Slide-solução "SITE COM PRIMODEV:"
- **Paleta:** mesmo fundo. **Título em verde** (~#34E23A) com glow (cor = solução). Espelha o slide-problema.
- **Composição:** mesmo mapa de 4 cantos, agora com servidor 3D **íntegro** (dashboards verde "GREEN/SAFE") + 4 ganhos: VISITAS VIRAM VENDAS · EFICIÊNCIA · CONFIABILIDADE · SISTEMAS ESCALÁVEIS.
- **Por que funciona:** o "antes x depois" entre os slides 2 e 3 é a sacada — mesma estrutura, cor e ícones invertem a narrativa.

## Síntese transversal (o estilo a replicar)
- **Fio condutor:** (a) barra branca de topo com logo + "_primodev" embutida na arte; (b) fundo teal-navy em gradiente; (c) tipografia bold/condensada uppercase; (d) **cor = sentido** (vermelho=problema, verde=solução, azul=ênfase, amarelo=CTA); (e) herói 3D tech com glow ciano; (f) layout de mapa-mental de 4 cantos com linhas ciano; (g) assinatura `‹ _primodev ›` em fonte mono no rodapé.
- **Paleta consolidada (HEX):** fundo #0E2E3C→#081320 · branco #FFFFFF · azul #19A3E8 · amarelo #F4C20D · vermelho-problema #EA3C1A · verde-solução #34E23A.
- **Assinatura tipográfica:** display condensado pesado (Anton) + headline/labels Montserrat 800/900 + rodapé mono.
- **Composição recorrente:** herói central + 4 cantos OU número/imagem gigante na capa. Muito contraste, energia "tech/gamer".
- **O que NUNCA aparece:** fundo claro no conteúdo, cores pastel, tipografia fina, texto miúdo, layout "corporativo sério".

## Diagnóstico (Bruno)
- **Manter:** o sistema de cor-por-sentido, a dupla problema(vermelho)→solução(verde), a barra de topo + rodapé `‹ _primodev ›`, e o herói 3D com glow.
- **Cuidar (replicação gratuita):** os objetos 3D (servidor/PC) são **renders 3D** — a única peça que HTML/CSS não recria sozinho sem IA paga. Solução grátis: montar uma **biblioteca de assets** reutilizáveis (os próprios renders de vocês, embutidos como PNG) e/ou ícones SVG/iso planos. Todo o resto (fundo, tipografia, layout de 4 cantos, linhas, labels, capa com número gigante) o motor reproduz 100% em CSS, de graça.
- **Revisar:** conferir ortografia das labels antes de publicar (texto é detalhe que vende credibilidade de quem faz site).
