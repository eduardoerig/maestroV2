---
tipo: prompts-imagem
perfil: {slug}
tema: "{tema}"
gerador: "HTML/CSS -> Canva editável (tools/build-canva-html.mjs + import-design-from-url)"
proporcao: "4:5"   # 1080x1350 — padrão de carrossel Instagram
---

# Prompts de imagem — {tema}

> Aqui o "prompt" é o briefing visual que vira o HTML/CSS de cada slide.
> O Bloco de Estilo abaixo é o design system repetido em TODOS os slides.

## 🎨 Bloco de estilo (IDÊNTICO em todos os slides)
{descrição de estilo derivada do guia: paleta HEX, tipo de luz, textura,
composição, "o que nunca aparece", mood. Em CSS: fundo da paleta, tipografia,
hierarquia e espaçamento fixos.}

---

## Slide 1 — Capa
**Cena:** {bloco de cena específico do slide 1}
**Texto exibido:** {texto do slide}
**HTML:** imagens/slide-01.html
**Negativos:** {o que evitar — fora da marca, watermark, etc.}

## Slide 2
**Cena:** {bloco de cena do slide 2}
**Texto exibido:** ...
**HTML:** imagens/slide-02.html
**Negativos:** ...

## ... (um por slide)
