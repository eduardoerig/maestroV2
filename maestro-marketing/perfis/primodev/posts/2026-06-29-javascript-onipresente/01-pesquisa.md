---
tipo: pesquisa
perfil: primodev
tema: "A generalização do JavaScript e seus malefícios na web"
data: 2026-06-29
fontes: 12
---

# Dossiê de pesquisa — O JavaScript comeu a web

## Resumo dos achados (3–5 bullets)
- **Onipresença total:** ~98,7% de todos os sites usam JavaScript no client-side — é a camada padrão da web, não mais a exceção.
- **Inchaço acelerando:** a mediana de JS por página subiu de ~359 KB (2019) para **558 KB no mobile** em 2024 (+14% só em 2024). No desktop, 613 KB. JS já ultrapassou as imagens como o maior peso em bytes de uma página.
- **Quase metade é desperdício:** na mediana mobile, **206 KB (44%) do JS entregue não é usado** durante o carregamento — você baixa, parseia e compila código que nem roda.
- **Frágil por dependência:** bloquear JS quebra a funcionalidade de **~2/3 dos sites** testados; e ~1% das visitas acontecem sem JS por motivos fora do controle do usuário (rede, extensão, API nova que falha).
- **Superfície de ataque:** o ecossistema npm (o motor do JS) virou alvo — **778.500 pacotes de malware** open source catalogados só em 2024.

## Dados e números (com fonte)
- Mediana de JS por página em 2024: **558 KB (mobile)** e **613 KB (desktop)**; subiu 14% no ano — [Fonte](https://almanac.httparchive.org/en/2024/javascript)
- Evolução da mediana mobile: 359 KB (2019) → 411 → 427 → 461 → 491 → **558 KB (2024)** — [Fonte](https://almanac.httparchive.org/en/2024/javascript)
- JavaScript não usado na mediana mobile: **206 KB, ou 44% dos bytes entregues** — [Fonte](https://cdn.httparchive.org/v1/static/almanac/ebooks/web_almanac_2024_en.pdf)
- Em 2025 o quadro piora: mediana de **646 KB de JS no mobile, 251 KB sem uso** na página — [Fonte](https://www.corewebvitals.io/pagespeed/reduce-unused-javascript-lighthouse)
- **98,7%** dos sites usam JavaScript como linguagem client-side — [Fonte](https://firstsiteguide.com/javascript-stats/) / [W3Techs](https://w3techs.com/technologies/details/cp-javascript)
- Bloquear JS quebra a funcionalidade de **~dois terços (2/3)** de 100 mil sites testados — [Fonte](https://arxiv.org/pdf/2302.01182v2)
- ~**1% das visitas** ocorrem sem JS disponível (rede, extensões, API nova que falha) — não é escolha do usuário — [Fonte](https://adamsilver.io/blog/javascript-isnt-always-available-and-its-not-the-users-fault/)
- Budget de JS recomendado para mobile: **~170 KB** comprimido — hoje a mediana entrega ~3x isso — [Fonte](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
- **778.500 pacotes** de malware open source catalogados em 2024 (npm é alvo central) — [Fonte](https://www.sonatype.com/press-releases/open-source-malware-reaches-778500-packages)
- Página mediana (home) em 2025: **2,6 MB no mobile** — em 2015 eram 845 KB (≈2,8x em 10 anos) — [Fonte](https://almanac.httparchive.org/en/2025/page-weight)

## Citações relevantes (curtas, <15 palavras)
- "Javascript overtook images as the most [byte-heavy resource]." — [Web Almanac 2024](https://almanac.httparchive.org/en/2024/page-weight)
- "It's not a matter of if your users don't have JavaScript — it's when." — [Adam Silver](https://adamsilver.io/blog/javascript-isnt-always-available-and-its-not-the-users-fault/)
- "Larger JavaScript bundles place additional strain on device resources." — [Web Almanac 2024](https://almanac.httparchive.org/en/2024/javascript)

## Ângulos de conteúdo descobertos
- **"Você baixa o que não usa":** 44% do JS entregue é morto no carregamento — ângulo concreto e chocante.
- **"A web esqueceu como funcionar sem JS":** página de texto que fica em branco sem 600 KB de framework.
- **"Budget estourado":** 170 KB era o teto saudável; a mediana entrega 3x mais.
- **"O custo invisível":** quem paga o inchaço é o celular fraco e a internet lenta — não o dev no MacBook.
- **"Dependência = risco":** cada `npm install` puxa uma árvore de pacotes de terceiros; superfície de ataque real.

## Tendência / timing (o que se fala agora)
- O Web Almanac 2025 confirma a piora (646 KB de JS mediano no mobile) — o tema está quente e os números só sobem.
- Movimento de contracorrente ganhando força: "HTML-first", islands, server-side rendering, `htmx`, frameworks "ship less JS" (Astro, Qwik) — reação à fadiga de JS.
- Ataques de supply chain npm recorrentes em 2025 (campanhas com 180+ pacotes comprometidos) mantêm o assunto em pauta.

## Conflitos / pontos em disputa
- **JS não é o vilão, o excesso é:** frameworks modernos (React/Svelte) são mais eficientes que os antigos, mas carregam um runtime irredutível. A crítica é ao uso indiscriminado, não à linguagem.
- **% sem JS é pequeno (~1%), mas o volume não:** 1% das visitas do Buzzfeed = ~13 milhões de requests/mês. "Pouco" em % não é pouco em gente.
- **Frameworks ajudam DX (developer experience) mas penalizam UX (user experience):** o trade-off central do debate.

## Fontes
1. [JavaScript — Web Almanac 2024 (HTTP Archive)](https://almanac.httparchive.org/en/2024/javascript) — relatório técnico, mar/2025
2. [The 2024 Web Almanac (PDF, unused bytes)](https://cdn.httparchive.org/v1/static/almanac/ebooks/web_almanac_2024_en.pdf) — relatório, 2024
3. [Page Weight — Web Almanac 2025](https://almanac.httparchive.org/en/2025/page-weight) — relatório, jan/2026
4. [HTTP Archive 2025 Web Almanac — CSS-Tricks](https://css-tricks.com/http-archive-2025-web-almanac/) — análise, jan/2026
5. [Usage Statistics of JavaScript as Client-side Language — W3Techs](https://w3techs.com/technologies/details/cp-javascript) — estatística contínua
6. [JavaScript Statistics — FirstSiteGuide](https://firstsiteguide.com/javascript-stats/) — compilação, set/2024
7. [Open Source Malware Reaches 778,500 Packages — Sonatype](https://www.sonatype.com/press-releases/open-source-malware-reaches-778500-packages) — press release, 2024
8. [Blocking JavaScript without Breaking the Web (arXiv)](https://arxiv.org/pdf/2302.01182v2) — estudo acadêmico, 2023
9. [JavaScript isn't always available — Adam Silver](https://adamsilver.io/blog/javascript-isnt-always-available-and-its-not-the-users-fault/) — artigo, nov/2019
10. [The Cost of JavaScript in 2018 — Addy Osmani](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) — artigo técnico, 2018
11. [The cost of JavaScript in 2019 — V8.dev](https://v8.dev/blog/cost-of-javascript-2019) — blog oficial V8, 2019
12. [Reduce Unused JavaScript (2025 data) — CoreWebVitals.io](https://www.corewebvitals.io/pagespeed/reduce-unused-javascript-lighthouse) — guia técnico, 2026
