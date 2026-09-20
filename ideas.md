# WorkTrack — Direção visual e arquitetura

## Abordagens consideradas

### Abordagem 1 — Ledger Editorial
**Very Brief Intro:** Um painel de trabalho com linguagem de caderno financeiro contemporâneo: tipografia editorial, papel quente, azul-marinho e verde mineral. A sensação é de clareza, controle e rotina bem organizada.

**Probability:** 0.07

### Abordagem 2 — Oficina Solar
**Very Brief Intro:** Uma interface utilitária e luminosa inspirada em ferramentas de oficina, com areia, terracota e azul-petróleo. A experiência transmite energia prática e progresso diário.

**Probability:** 0.03

### Abordagem 3 — Quiet Ledger
**Very Brief Intro:** Um dashboard silencioso e premium, com fundo grafite, superfícies creme e acentos âmbar, tratando produtividade como um instrumento de precisão. A estética é discreta, densa e focada.

**Probability:** 0.09

## Abordagem escolhida: Ledger Editorial

### Design Movement
Modernismo editorial suíço reinterpretado para uma ferramenta pessoal de trabalho, combinando estrutura de informação, tipografia expressiva e superfícies materiais discretas.

### Core Principles
1. **Clareza antes de decoração:** cada elemento precisa responder a uma decisão prática do usuário.
2. **Ritmo editorial:** títulos, números e tabelas devem criar uma hierarquia semelhante a uma publicação financeira bem editada.
3. **Calor humano:** a interface não será clínica; o fundo marfim, o azul profundo e pequenos sinais verdes dão presença sem excesso de cor.
4. **Progresso visível:** metas, recebimentos e desempenho aparecem como sinais de avanço, não como ruído analítico.

### Color Philosophy
O fundo marfim reduz a frieza de uma planilha e cria uma base de leitura confortável. O azul-marinho funciona como tinta editorial e ancora navegação, títulos e ações principais. O verde mineral representa dinheiro recebido e progresso; o âmbar indica pendência ou atenção; o coral aparece somente em despesas e perdas.

### Layout Paradigm
Uma barra lateral fixa organiza o produto como um livro de registros, enquanto o conteúdo se abre em uma composição assimétrica: cabeçalho editorial à esquerda, resumo numérico em faixa, gráfico principal amplo e uma coluna lateral dedicada a metas e pagamentos. Em telas pequenas, a barra lateral vira navegação inferior/contextual.

### Signature Elements
- Marca gráfica em forma de monograma geométrico “W” construído por duas linhas de trajetória.
- Linha vertical azul-marinho que funciona como marcador de seção e reforça a ideia de registro.
- Cartões com pequenos rótulos em caixa alta, números grandes e sublinhados finos, como notas de um livro-caixa.

### Interaction Philosophy
As ações devem parecer diretas e confiáveis. Adicionar um trabalho é uma ação primária sempre visível; editar e excluir ficam próximos do registro, mas sem competir com a leitura. Filtros e navegação respondem rapidamente, com feedback curto e discreto.

### Animation
Entradas de página usam fade e deslocamento vertical curto, em até 220ms. Cartões de resumo aparecem em sequência suave. Barras de gráfico crescem apenas na primeira entrada. Botões têm resposta de escala mínima ao pressionar. A preferência `prefers-reduced-motion` remove movimentos não essenciais.

### Typography System
A fonte de títulos é **DM Serif Display**, usada apenas em títulos de seção e números de destaque para criar personalidade editorial. A fonte de interface é **Manrope**, aplicada a navegação, tabelas, rótulos e formulários. Títulos usam contraste de peso e tamanho; números usam peso 700 e espaçamento levemente negativo.

### Brand Essence
**WorkTrack é um livro-caixa de trabalho pessoal para quem quer transformar horas feitas em clareza financeira, sem a complexidade de uma ferramenta empresarial.**

Personalidade: **preciso, humano, progressivo**.

### Brand Voice
Headlines são curtas e observacionais. CTAs são verbos concretos. O microcopy é seguro, sem linguagem corporativa vazia.

Exemplos:
- “Seu trabalho da semana, em perspectiva.”
- “Registrar trabalho”

### Wordmark & Logo
O logotipo combina o nome “WORKTRACK” em caixa alta com espaçamento amplo e um símbolo abstrato formado por dois traços que se cruzam como uma trilha e um check. O símbolo deve funcionar sozinho como favicon e avatar.

### Signature Brand Color
**Azul Tinta — `#17324D`**, uma cor profunda e própria que comunica registro, confiança e precisão sem cair no azul tecnológico genérico.

## Arquitetura inicial da experiência

A primeira entrega será uma SPA client-side com persistência em `localStorage`, sem login e sem backend. A tela principal exibirá os dados da semana atual com alguns registros de demonstração claramente substituíveis, gráficos calculados a partir da mesma base e metas editáveis. Um modal “Novo trabalho” permitirá alimentar a base sem sair do Dashboard.

A navegação inicial conterá **Visão geral**, **Trabalhos**, **Semana**, **Mês** e **Pagamentos**. Nesta primeira versão, Visão geral e Trabalhos serão plenamente funcionais; as demais áreas terão visões úteis derivadas da mesma base, sem duplicar dados.

## Style Decisions

O motivo de livro-caixa deve aparecer em todas as superfícies principais por meio de linhas de registro, marcadores verticais azul-marinho, números sublinhados e ritmo tabular. O símbolo do WorkTrack deve permanecer geométrico, formado por duas trajetórias cruzadas que sugerem um W e um check. As ilustrações devem se concentrar em recibos, registros, trajetórias de progresso e artefatos de pagamento, sempre no universo marfim, Azul Tinta, verde mineral e âmbar.
