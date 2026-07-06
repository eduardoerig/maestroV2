---
tipo: materia
perfil: primodev
tema: "A generalização do JavaScript e seus malefícios na web"
baseado_em: 01-pesquisa.md
status: aprovado
---

# O JavaScript dominou a web. E a conta chegou pro seu cliente.

## Abertura
Há 15 anos, JavaScript era tempero: um pouco de interação por cima de uma página que já funcionava sozinha. Hoje é o prato inteiro. 98,7% dos sites rodam JavaScript no navegador (W3Techs). Virou o padrão para tudo, até para mostrar um texto que nunca muda. O problema não é a linguagem. É o exagero. E exagero tem preço.

## Desenvolvimento
**Primeiro, o peso.** A mediana de JavaScript por página no mobile saltou de 359 KB em 2019 para 558 KB em 2024. Só no último ano, subiu 14% (Web Almanac 2024). JavaScript já passou as imagens como o maior peso em bytes de uma página. A home mediana hoje chega a 2,6 MB no celular (Web Almanac 2025).

**Segundo, o desperdício.** Quase metade desse código nem roda. Na mediana mobile, 206 KB (44%) do JavaScript entregue não é usado durante o carregamento (Web Almanac 2024). O navegador baixa, parseia e compila código morto. Para referência: o budget saudável no mobile é de uns 170 KB comprimidos (Addy Osmani). A mediana entrega mais de três vezes isso.

**Terceiro, a fragilidade.** Quando tudo depende do JavaScript, a página só existe se ele rodar. Um estudo com 100 mil sites mostrou que bloquear JS quebra a funcionalidade de dois terços deles (arXiv). E não é só quem desliga de propósito: cerca de 1% das visitas acontecem sem JavaScript por rede ruim, extensão do navegador ou uma API nova que falhou (Adam Silver). Em site grande, esse 1% é muita gente.

**Quarto, o risco.** Todo esse JavaScript vem de algum lugar: o npm. Cada `npm install` puxa uma árvore de dependências de terceiros. Só em 2024 foram catalogados 778.500 pacotes de malware open source (Sonatype). Quanto mais você depende, maior a porta que você deixa aberta.

A conta dessa farra não chega pro dev no MacBook. Chega pro usuário no celular intermediário, na internet instável, olhando a tela branca esperando carregar.

## Fechamento
JavaScript não é o vilão. O uso sem critério é. Dá para construir rápido, estável e leve: a ferramenta certa para cada tela, só o código que a página realmente usa, e nada de transformar um parágrafo num app de 600 KB. É essa diferença que separa um site que vende de um site que trava. Na PrimoDev a régua é uma só: tecnologia que vira resultado, não peso morto.

---
**Fontes usadas:** 01-pesquisa.md
