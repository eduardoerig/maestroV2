---
tipo: pesquisa
perfil: primodev
tema: "Site lento = venda perdida — quanto a lentidão custa em vendas"
data: 2026-07-06
fontes: 12
---

# Dossiê de pesquisa — Site lento = venda perdida

> Foco do dossiê (briefing Maestro): números FORTES e citáveis, um dado gigante por slide.
> Traduzir "performance web" em "cliente que desiste e compra no concorrente".
> Regra de ouro Clara: nenhum número sem [Fonte](url); ≥2 fontes nos números-chave.

## Resumo dos achados (3–5 bullets)
- **A dor tem número:** 53% dos visitantes de mobile abandonam um site que demora mais de 3 segundos para carregar — quase metade do investimento em tráfego jogado fora antes da página aparecer. [Fonte: Google/SOASTA](https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/) · [Confirmado: Akamai](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are)
- **Cada segundo derruba conversão de forma brutal:** um site que carrega em 1s converte **2,5x mais** (e-commerce) e **3x mais** (geração de lead) do que um que carrega em 5s. [Fonte: Portent](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm)
- **Velocidade é receita, não detalhe técnico:** melhorar a velocidade em apenas **0,1s** aumentou a conversão em **8,4% no varejo** e fez o consumidor gastar **+9,2%** (estudo Deloitte com 30 milhões de sessões). [Fonte: Deloitte / Google web.dev](https://web.dev/case-studies/milliseconds-make-millions)
- **O "site barato" costuma ser o lento — e o Google pune:** os Core Web Vitals (velocidade/estabilidade) são fator de ranqueamento confirmado pelo Google; site lento vende menos E aparece menos na busca. [Fonte: DebugBear](https://www.debugbear.com/docs/core-web-vitals-ranking-factor)
- **Não é problema "de antigamente":** dado de 2024-2025 mantém a magnitude — a conversão mobile média é de só ~2,85% e a regra "+0,1s → −8,4%" segue sendo citada como referência de mercado. [Fonte: Oberlo/Statista](https://www.oberlo.com/statistics/mobile-ecommerce-conversion-rate)

## Dados e números (com fonte)

### 1) Velocidade × conversão / bounce (o coração do dossiê)
- **53% dos visitantes de mobile abandonam** um site que leva **mais de 3s** para carregar. — [Fonte: Google/SOASTA (Think with Google, "The Need for Mobile Speed", 2017)](https://web.archive.org/web/20170822182411/https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/) · confirmado por [Akamai (2017)](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are)
- **Probabilidade de bounce (abandono) sobe conforme o site engasga** (dado Google/SOASTA, rede neural, 90% de acurácia):
  - 1s → 3s: **+32%**
  - 1s → 5s: **+90%**
  - 1s → 6s: **+106%**
  - 1s → 10s: **+123%** — [Fonte: Think with Google — "Milliseconds Make Millions" (PDF)](https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf) · replicado por [Huckabuy](https://huckabuy.com/20-important-page-speed-bounce-rate-and-conversion-rate-statistics/)
- **De 1s para 7s, a probabilidade de abandono aumenta 113%.** — [Fonte: Google/SOASTA (Think with Google, 2017)](https://web.archive.org/web/20170822182411/https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
- **Um atraso de 2 segundos no carregamento aumenta o bounce em 103%.** — [Fonte: Akamai / SOASTA (2017)](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are)
- **Conversão de e-commerce despenca com o tempo de carga** (Portent, >100 milhões de pageviews, 20 sites B2C/B2B):
  - 1s: **3,05%** de conversão
  - 2s: 1,68%
  - 4s: **0,67%**
  - Regra prática: a cada segundo a mais, a conversão de e-commerce cai **~0,3 ponto percentual**. — [Fonte: Portent](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm)
- **1s converte 2,5x mais que 5s** (e-commerce) e **3x mais que 5s** (geração de lead / formulário). — [Fonte: Portent](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm)
- **Janela ideal de carregamento para pico de conversão: 1,8 a 2,7 segundos** (varia por tipo de dispositivo). — [Fonte: Akamai, State of Online Retail Performance (Spring 2017)](https://www.igds.org/fileadmin/uploads/igds/Documents/Research_Reports/2017/akamai-state-of-online-retail-performance-spring-2017.pdf)

### 2) Impacto em receita / vendas + recorte MOBILE
- **Melhorar a velocidade do site em 0,1s** (estudo Deloitte + fifty-five, 37 marcas, 30 milhões de sessões):
  - Conversão no **varejo: +8,4%**; em **viagens: +10,1%**.
  - Consumidor de varejo gastou **+9,2%**; de viagem/lead engajou mais (pageviews +7% e +8%).
  - Etapa "página de produto → adicionar ao carrinho" subiu **+9,1%** no varejo (e **+40,1%** no luxo). — [Fonte: Deloitte "Milliseconds Make Millions" (via Google web.dev)](https://web.dev/case-studies/milliseconds-make-millions) · [Deloitte Irlanda](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html)
- **Um atraso de 100 milissegundos (0,1s) pode reduzir a conversão em 7%.** — [Fonte: Akamai / SOASTA (2017)](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are)
- **Simulação de receita (Portent):** 1.000 visitantes, produto de US$50 — a 1s (conv. 3,05%) rende US$1.525; a 3s (conv. 1,12%) rende US$560. Só a lentidão apaga **~US$965** em vendas potenciais no mesmo tráfego. — [Fonte: Portent](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm)
- **Recorte mobile (o pior cenário):** metade dos consumidores navega pelo celular, mas **só 1 em cada 5 conclui a compra no mobile** — e o bounce é o mais alto justamente no celular. — [Fonte: Akamai / SOASTA (2017)](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are)
- **Tempo médio de carregamento de uma landing page mobile: 22 segundos** — muito acima dos 3s em que metade já desistiu. — [Fonte: Google/SOASTA (2017)](https://web.archive.org/web/20170822182411/https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
- **Contexto 2024-2025:** conversão média de e-commerce mobile ≈ **2,85%** (out/2024) — teto baixo que a lentidão derruba ainda mais. — [Fonte: Oberlo](https://www.oberlo.com/statistics/mobile-ecommerce-conversion-rate) · [Shopify: 2,89% em jun/2024](https://www.shopify.com/blog/cro-statistics)

### 3) Core Web Vitals / Google como fator (SEO + UX)
- **Google confirma:** os sinais de "page experience", incluindo os **Core Web Vitals, são fator de ranqueamento**. Site com nota baixa recebe menos tráfego orgânico; funcionam como "critério de desempate" entre páginas de conteúdo parecido. — [Fonte: DebugBear](https://www.debugbear.com/docs/core-web-vitals-ranking-factor) · [Search Engine Journal](https://www.searchenginejournal.com/ranking-factors/core-web-vitals/)
- **Metas de "Bom" (o que o Google considera rápido):** LCP (carregar o conteúdo principal) **≤ 2,5s** (ruim acima de 4,0s); a nota vale quando **75% dos usuários reais** têm experiência "Boa". — [Fonte: MonsterInsights](https://www.monsterinsights.com/what-are-core-web-vitals/) · [DebugBear](https://www.debugbear.com/docs/core-web-vitals-ranking-factor)
- **Em 2024 o INP substituiu o FID** como métrica oficial de interatividade dos Core Web Vitals. — [Fonte: DebugBear](https://www.debugbear.com/docs/core-web-vitals-ranking-factor)
- **Case de causa e efeito:** a CoinStats corrigiu o LCP (trocou imagens embutidas em Base64 por `src` normal) e **triplicou (+300%) o número de URLs com Core Web Vitals "Bom" — e as impressões na busca subiram na mesma proporção.** — [Fonte: DebugBear (case CoinStats)](https://www.debugbear.com/docs/core-web-vitals-ranking-factor)

## Citações relevantes (curtas, <15 palavras)
- "Mobile page speed equals revenue." — [Fonte: Google/Think with Google](https://web.archive.org/web/20170822182411/https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
- "Even 100-millisecond delays can impact customer engagement and online revenue." — [Fonte: Akamai](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are)
- "A site that loads in 1 second has a conversion rate 3x higher than a site that loads in 5 seconds." — [Fonte: Portent](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm)
- "The competitive gap will only widen between brands that deliver great mobile experiences and those that don't." — [Fonte: Deloitte/web.dev](https://web.dev/case-studies/milliseconds-make-millions)

## Ângulos de conteúdo descobertos
- **"3 segundos" como gancho de capa:** 53% já foram embora antes disso. Número único, gigante, imediato — é o slide de abertura perfeito (vermelho = perda).
- **A escada do abandono:** mostrar a progressão do bounce (1→3s: +32%, 1→5s: +90%, 1→10s: +123%) como um dado que cresce slide a slide, ou num único gráfico de colunas CSS. Traduz "cada segundo dói mais".
- **A conta que o dono entende:** a simulação Portent (US$1.525 vs US$560 no MESMO tráfego) vira o slide "você já pagou pelo clique — a lentidão é que devolve o cliente pro concorrente". Ótimo para o ângulo "site barato sai caro".
- **0,1s = +9,2% de gasto:** o contraponto verde (ganho). Um décimo de segundo, quase imperceptível, move receita real — desmonta a ideia de "detalhe técnico".
- **Duplo prejuízo (SEO + venda):** site lento vende menos AGORA e é achado menos DEPOIS (Google rebaixa). Fecha a autoridade técnica que puxa o "chama no direct".
- **Recorte mobile:** metade navega no celular, só 1 em 5 compra — onde a maioria do tráfego mora é onde a lentidão mais sangra.

## Tendência / timing (o que se fala agora)
- **Mobile-first é consolidado:** projeta-se que o comércio mobile alcance ~US$2,5 trilhões em 2025 (~63% do e-commerce nos anos seguintes). O recorte mobile do post está no timing certo. — [Fonte: Statista](https://www.statista.com/topics/11883/mobile-commerce-worldwide/)
- **Core Web Vitals segue quente (2024-2026):** a troca FID→INP (2024) reacendeu o assunto "performance = SEO"; farto material de 2025-2026 reafirma que é fator de ranqueamento. — [Fonte: DebugBear](https://www.debugbear.com/docs/core-web-vitals-ranking-factor)
- **Conteúdo de 2024-2025 recicla os mesmos benchmarks** (0,1s → 8,4%; 53% em 3s), sinal de que continuam sendo a régua de mercado — mas convém citar a fonte-raiz, não o blog que reempacota.

## Conflitos / pontos em disputa
- **Idade dos estudos-âncora (IMPORTANTE):** os números mais fortes (53% em 3s; bounce +32%/+90%; 100ms → 7%) vêm de **2017** (Google/SOASTA e Akamai). Não achei um estudo de larga escala de 2024-2026 que os substitua com nova metodologia — o que existe é (a) reafirmação/citação e (b) o estudo Deloitte de 2020. Recomendo apresentar como "referência consagrada do setor", e usar Portent (atualizado até 2022/2024) e Deloitte como reforço recente. Não inventar um "estudo 2025" que não existe.
- **"7% de queda" — origem dupla, não confundir:** a Akamai (2017) mede **100ms (0,1s) → −7% de conversão**. Existe outra estatística popular, mais antiga (Aberdeen/atribuída à Amazon), de **1s → −7%**. São magnitudes diferentes (0,1s vs 1s); usar a da Akamai com a fonte correta e **não** dizer "1 segundo = 7%" citando a Akamai.
- **Números de conversão do Portent (tabela vs simulação):** o texto da Portent lista a conversão a 4s como 0,67%, mas na simulação de receita usa 2,93%/1,12% para 3-4s (aparente inconsistência interna do próprio artigo). Para o dossiê, usar os pares consistentes (1s=3,05% / 2s=1,68%) e a simulação 1s vs 3s, evitando o ponto conflitante de 4s.
- **Variação por setor e dispositivo:** o impacto de 0,1s muda muito por vertical (luxo teve +40,1% em uma etapa; varejo +8,4%). Apresentar como "varia por setor, mas sempre positivo", não como número universal.

## Fontes
1. [The Need for Mobile Speed / New Industry Benchmarks for Mobile Page Speed — Think with Google (Google/SOASTA)](https://web.archive.org/web/20170822182411/https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/) — estudo/publicação oficial Google, 2017 (via Wayback)
2. [Milliseconds Make Millions (report PDF) — Think with Google](https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf) — relatório Google/Deloitte, 2020 (traz a tabela de bounce Google/SOASTA)
3. [Milliseconds Make Millions (case study) — Google web.dev](https://web.dev/case-studies/milliseconds-make-millions) — estudo Deloitte + fifty-five, 2020
4. [Milliseconds Make Millions — Deloitte Ireland](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html) — fonte primária do estudo, 2020
5. [Akamai Online Retail Performance Report: Milliseconds Are Critical — Akamai IR](https://www.ir.akamai.com/news-releases/news-release-details/akamai-online-retail-performance-report-milliseconds-are) — press release oficial Akamai/SOASTA, 2017
6. [The State of Online Retail Performance, Spring 2017 (PDF) — Akamai](https://www.igds.org/fileadmin/uploads/igds/Documents/Research_Reports/2017/akamai-state-of-online-retail-performance-spring-2017.pdf) — relatório Akamai, 2017
7. [Site Speed is (Still) Impacting Your Conversion Rate — Portent](https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) — pesquisa própria (>100M pageviews), atualizado 2022/2024
8. [Are Core Web Vitals A Ranking Factor for SEO? — DebugBear](https://www.debugbear.com/docs/core-web-vitals-ranking-factor) — documentação técnica + case CoinStats, 2026
9. [Are Core Web Vitals A Ranking Factor? — Search Engine Journal](https://www.searchenginejournal.com/ranking-factors/core-web-vitals/) — análise SEO citando declarações do Google, 2023
10. [What Are Core Web Vitals — MonsterInsights](https://www.monsterinsights.com/what-are-core-web-vitals/) — thresholds LCP/INP, 2025
11. [Mobile Ecommerce Conversion Rate — Oberlo](https://www.oberlo.com/statistics/mobile-ecommerce-conversion-rate) — dado de mercado (base Statista), out/2024
12. [Mobile commerce worldwide — statistics & facts — Statista](https://www.statista.com/topics/11883/mobile-commerce-worldwide/) — projeção de mercado, dez/2025
13. [20 Important Page Speed Bounce Rate and Conversion Rate Statistics — Huckabuy](https://huckabuy.com/20-important-page-speed-bounce-rate-and-conversion-rate-statistics/) — compilação (usada só para triangular os números Google/SOASTA)
14. [CRO Statistics — Shopify](https://www.shopify.com/blog/cro-statistics) — dado de conversão mobile, set/2024

---
*Motores cruzados: DuckDuckGo (ddg-search) + SearXNG (web_url_read) para extração; fontes-raiz (Google/Think with Google, Deloitte/web.dev, Akamai IR, Portent) fetchadas na origem. one-search e pskill9/web-search não retornaram resultado útil nesta sessão (redirecionamento/bloqueio) — papel de varredura/Google coberto por DDG + fetch direto das fontes primárias, conforme regra de fallback do Handoff.*
