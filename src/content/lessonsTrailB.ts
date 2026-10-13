// ============================================================
// TRILHA B — Direito Civil
// 5 lições, 5 questões cada
// Referência: Código Civil (Lei nº 10.406/2002)
// Data de referência do conteúdo: outubro/2024
// ============================================================

import type { Lesson } from '@/types'

export const TRAIL_CIVIL_LESSONS: Lesson[] = [
  // ─── Lição B-1: Introdução ao Direito Civil ───────────────
  {
    id: 'lesson-civil-1',
    trailId: 'trail-civil',
    order: 1,
    title: 'Introdução ao Direito Civil',
    description: 'Conceito, divisões e princípios fundamentais do Direito Civil.',
    learningObjective:
      'Compreender o papel do Direito Civil no ordenamento jurídico e seus princípios norteadores.',
    explanation: `O **Direito Civil** é o ramo do Direito Privado que regula as relações jurídicas entre particulares — pessoas físicas e jurídicas — nos aspectos mais essenciais da vida civil.

**Código Civil de 2002** (Lei nº 10.406/2002): principal diploma do Direito Civil brasileiro, substituiu o Código Civil de 1916 e é estruturado em:
- **Parte Geral**: pessoas, bens e fatos jurídicos.
- **Parte Especial**: direito das obrigações, contratos, responsabilidade civil, direitos reais, direito de família e direito das sucessões.

**Princípios fundamentais do Código Civil de 2002:**
1. **Eticidade**: o Direito Civil deve ser pautado pela ética e pela boa-fé.
2. **Socialidade**: os direitos individuais devem ser exercidos em conformidade com a função social.
3. **Operabilidade**: as normas devem ser aplicáveis e efetivas na prática.

**Pessoa física** (natural): todo ser humano, com capacidade de direito desde o nascimento (art. 1º, CC). O nascituro tem seus direitos resguardados desde a concepção (art. 2º, CC).

**Pessoa jurídica**: ente criado por lei, com personalidade jurídica distinta da de seus membros (art. 40 e ss., CC). Divide-se em pessoas jurídicas de direito público e de direito privado.`,
    practicalExample: `Carlos tem 16 anos e quer celebrar um contrato de compra e venda. Pelo Código Civil:
- Aos 16 anos, é **relativamente incapaz** (art. 4º, I, CC).
- Pode praticar atos da vida civil, mas precisa de **assistência** dos pais ou tutores.
- Sem a assistência, o ato é **anulável** (não nulo de pleno direito).

Aos 18 anos, Carlos adquire plena capacidade civil (art. 5º, CC) e pode contratar sozinho.`,
    references: [
      'Código Civil (Lei nº 10.406/2002), arts. 1º, 2º, 4º, 5º e 40.',
      'TARTUCE, Flávio. Manual de Direito Civil: volume único. 13. ed. São Paulo: Método, 2023.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-civil-1-1',
        type: 'multiple-choice',
        stem: 'Segundo o Código Civil de 2002, quando a pessoa natural (física) adquire personalidade jurídica?',
        options: [
          { id: 'a', text: 'Ao completar 18 anos de idade.' },
          { id: 'b', text: 'Ao ser registrada no cartório de registro civil.' },
          { id: 'c', text: 'Com o nascimento com vida.' },
          { id: 'd', text: 'Desde a concepção.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O art. 1º do Código Civil estabelece que toda pessoa é capaz de direitos e deveres na ordem civil. O art. 2º complementa: a personalidade civil da pessoa começa com o nascimento com vida. O nascituro tem direitos resguardados desde a concepção, mas a personalidade só se inicia com o nascimento com vida.',
      },
      {
        id: 'q-civil-1-2',
        type: 'multiple-choice',
        stem: 'Joana tem 17 anos e celebrou um contrato de aluguel sem a assistência de seus pais. Qual é a situação jurídica desse contrato?',
        options: [
          { id: 'a', text: 'Válido, pois Joana tem mais de 16 anos.' },
          { id: 'b', text: 'Nulo de pleno direito, pois Joana é absolutamente incapaz.' },
          {
            id: 'c',
            text: 'Anulável, pois Joana é relativamente incapaz e precisava de assistência.',
          },
          { id: 'd', text: 'Válido apenas se o locador concordar.' },
        ],
        correctOptionId: 'c',
        explanation:
          'Entre 16 e 18 anos, a pessoa é relativamente incapaz (art. 4º, I, CC) e pode praticar atos da vida civil desde que assistida pelos pais ou tutores. O ato praticado sem assistência é anulável (não nulo), pois a nulidade absoluta é reservada aos atos de absolutamente incapazes (menores de 16 anos).',
      },
      {
        id: 'q-civil-1-3',
        type: 'multiple-choice',
        stem: 'Qual dos três princípios fundamentais do Código Civil de 2002 determina que os direitos individuais devem ser exercidos em consonância com a função social?',
        options: [
          { id: 'a', text: 'Eticidade.' },
          { id: 'b', text: 'Operabilidade.' },
          { id: 'c', text: 'Socialidade.' },
          { id: 'd', text: 'Proporcionalidade.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A socialidade é o princípio que supera o individualismo exacerbado do Código de 1916, impondo que os direitos civis sejam exercidos em harmonia com os interesses sociais. Manifesta-se, por exemplo, na função social do contrato (art. 421, CC) e na função social da propriedade.',
      },
      {
        id: 'q-civil-1-4',
        type: 'multiple-choice',
        stem: 'Uma empresa (sociedade limitada) contrai uma dívida. Os sócios são automaticamente responsáveis com seu patrimônio pessoal?',
        options: [
          {
            id: 'a',
            text: 'Sim, os sócios sempre respondem ilimitadamente pelas dívidas da empresa.',
          },
          {
            id: 'b',
            text: 'Não, em regra, pois a pessoa jurídica tem patrimônio separado dos sócios.',
          },
          {
            id: 'c',
            text: 'Sim, mas somente o sócio majoritário responde.',
          },
          {
            id: 'd',
            text: 'Não, exceto se a dívida for trabalhista.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'A pessoa jurídica tem personalidade e patrimônio distintos dos de seus membros (art. 49-A, CC). Em regra, os sócios de uma sociedade limitada respondem apenas até o limite de suas quotas. A responsabilidade pessoal dos sócios por dívidas da empresa é excepcional e ocorre em casos como desconsideração da personalidade jurídica (art. 50, CC).',
      },
      {
        id: 'q-civil-1-5',
        type: 'multiple-choice',
        stem: 'O Código Civil de 2002 dividiu-se em Parte Geral e Parte Especial. Qual matéria está na Parte Geral?',
        options: [
          { id: 'a', text: 'Contratos e responsabilidade civil.' },
          { id: 'b', text: 'Direito de família e sucessões.' },
          { id: 'c', text: 'Pessoas, bens e fatos jurídicos.' },
          { id: 'd', text: 'Direitos reais e obrigações.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A Parte Geral do Código Civil de 2002 trata dos elementos comuns a todas as relações jurídicas: Livro I (Das Pessoas), Livro II (Dos Bens) e Livro III (Dos Fatos Jurídicos). A Parte Especial trata de matérias específicas como obrigações, contratos, responsabilidade civil, direitos reais, família e sucessões.',
      },
    ],
  },

  // ─── Lição B-2: Obrigações ────────────────────────────────
  {
    id: 'lesson-civil-2',
    trailId: 'trail-civil',
    order: 2,
    title: 'Obrigações',
    description: 'Conceito, elementos e classificação das obrigações civis.',
    learningObjective:
      'Identificar os elementos da obrigação civil e classificar as obrigações quanto ao objeto.',
    explanation: `**Obrigação** é uma relação jurídica pela qual uma pessoa (devedor) está vinculada a realizar uma prestação em favor de outra (credor), sob pena de sofrer sanção patrimonial.

**Elementos da obrigação:**
1. **Sujeito ativo (credor)**: quem tem o direito de exigir a prestação.
2. **Sujeito passivo (devedor)**: quem tem o dever de cumprir a prestação.
3. **Objeto (prestação)**: a conduta que o devedor deve realizar.
4. **Vínculo jurídico**: o elo que une credor e devedor, garantido pelo Direito.

**Classificação quanto ao objeto (art. 233 e ss., CC):**
- **Obrigação de dar**: entregar coisa certa ou incerta.
- **Obrigação de fazer**: realizar um ato ou serviço (ex.: construir uma casa).
- **Obrigação de não fazer**: abster-se de alguma conduta (ex.: não construir muro acima da altura permitida).

**Obrigação natural vs. civil:**
- **Civil**: pode ser exigida judicialmente.
- **Natural**: não pode ser exigida judicialmente (ex.: dívida de jogo), mas se paga espontaneamente, o pagamento é válido e não pode ser repetido.`,
    practicalExample: `Roberto contrata um pintor (Paulo) para pintar sua casa por R$ 3.000,00.

- **Credor**: Roberto (quanto à obrigação de fazer — pintar a casa).
- **Devedor**: Paulo (deve pintar).
- **Credor (prestação de dar dinheiro)**: Paulo.
- **Devedor (dinheiro)**: Roberto.

A obrigação de Paulo é **de fazer** — ele deve realizar o serviço de pintura. Se Paulo recusar, Roberto pode exigir judicialmente o cumprimento ou requerer perdas e danos.`,
    references: [
      'Código Civil (Lei nº 10.406/2002), arts. 233–250 (obrigação de dar), 247–249 (obrigação de fazer) e 250–251 (obrigação de não fazer).',
      'GAGLIANO, Pablo Stolze; PAMPLONA FILHO, Rodolfo. Manual de Direito Civil. 7. ed. São Paulo: Saraiva, 2023.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-civil-2-1',
        type: 'multiple-choice',
        stem: 'Numa relação obrigacional, o "credor" é o sujeito que:',
        options: [
          { id: 'a', text: 'Deve cumprir a prestação.' },
          { id: 'b', text: 'Tem o dever de indenizar o devedor.' },
          { id: 'c', text: 'Tem o direito de exigir a prestação.' },
          { id: 'd', text: 'Pode se recusar a cumprir a obrigação livremente.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O credor (sujeito ativo) é a parte que tem o direito subjetivo de exigir do devedor (sujeito passivo) o cumprimento da prestação objeto da obrigação. O devedor, ao contrário, é quem tem o dever jurídico de cumprir.',
      },
      {
        id: 'q-civil-2-2',
        type: 'multiple-choice',
        stem: 'Uma cláusula contratual proíbe o locatário de sublocar o imóvel. Se ele sublocar assim mesmo, qual tipo de obrigação foi descumprida?',
        options: [
          { id: 'a', text: 'Obrigação de dar.' },
          { id: 'b', text: 'Obrigação de fazer.' },
          { id: 'c', text: 'Obrigação de não fazer.' },
          { id: 'd', text: 'Obrigação alternativa.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A obrigação de não fazer consiste em uma abstenção — o devedor se compromete a não praticar determinado ato. Sublocar sem autorização contraria exatamente essa abstenção, configurando inadimplemento de obrigação de não fazer (art. 250, CC).',
      },
      {
        id: 'q-civil-2-3',
        type: 'multiple-choice',
        stem: 'Fernanda ganha numa aposta informal e o perdedor se recusa a pagar. Fernanda pode acionar o Judiciário para receber?',
        options: [
          { id: 'a', text: 'Sim, qualquer dívida é exigível judicialmente.' },
          {
            id: 'b',
            text: 'Não, pois dívidas de jogo e aposta são obrigações naturais, não exigíveis judicialmente.',
          },
          { id: 'c', text: 'Sim, mas somente se o valor for inferior a um salário mínimo.' },
          { id: 'd', text: 'Não, pois apostas são ilícitas no Brasil.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 814 do Código Civil estabelece que as dívidas de jogo ou aposta não obrigam ao pagamento. Trata-se de obrigação natural: válida se paga espontaneamente, mas não cobrável judicialmente. O pagador voluntário não pode exigir de volta o que pagou.',
      },
      {
        id: 'q-civil-2-4',
        type: 'multiple-choice',
        stem: 'Qual dos seguintes é um exemplo de obrigação de dar coisa certa?',
        options: [
          { id: 'a', text: 'Prestar serviço de consultoria jurídica.' },
          { id: 'b', text: 'Entregar o veículo de placa XYZ-1234, conforme contrato.' },
          { id: 'c', text: 'Não construir acima do segundo andar.' },
          { id: 'd', text: 'Entregar qualquer veículo do mesmo modelo e ano.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A obrigação de dar coisa certa recai sobre um bem determinado e individualizado (art. 233, CC). Entregar o veículo identificado pela placa é exemplo típico. A alternativa (d) seria obrigação de dar coisa incerta; (a) é obrigação de fazer; (c) é obrigação de não fazer.',
      },
      {
        id: 'q-civil-2-5',
        type: 'multiple-choice',
        stem: 'Qual é o elemento que distingue a obrigação jurídica de um mero dever moral?',
        options: [
          { id: 'a', text: 'A presença de um valor monetário.' },
          { id: 'b', text: 'O vínculo jurídico que permite ao credor exigir o cumprimento com respaldo estatal.' },
          { id: 'c', text: 'A existência de um contrato escrito.' },
          { id: 'd', text: 'A duração mínima de 30 dias.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O vínculo jurídico é o elemento que torna a obrigação juridicamente exigível — o credor pode recorrer ao Estado para forçar o cumprimento ou obter indenização. O dever moral não conta com essa proteção estatal.',
      },
    ],
  },

  // ─── Lição B-3: Contratos ─────────────────────────────────
  {
    id: 'lesson-civil-3',
    trailId: 'trail-civil',
    order: 3,
    title: 'Contratos',
    description: 'Formação, princípios e requisitos de validade dos contratos.',
    learningObjective:
      'Compreender os requisitos de validade dos contratos e os princípios contratuais fundamentais.',
    explanation: `**Contrato** é um negócio jurídico bilateral ou plurilateral, pelo qual as partes criam, modificam ou extinguem obrigações (art. 421 e ss., CC).

**Requisitos de validade (art. 104, CC):**
1. **Agente capaz**: as partes devem ter capacidade civil.
2. **Objeto lícito, possível, determinado ou determinável**: a prestação não pode ser proibida por lei.
3. **Forma prescrita ou não defesa em lei**: salvo forma especial exigida (ex.: compra de imóvel = escritura pública), os contratos podem ser celebrados livremente.

**Princípios contratuais:**
- **Autonomia da vontade** (art. 421, CC): as partes são livres para contratar e fixar o conteúdo do contrato.
- **Função social** (art. 421, CC): o contrato deve respeitar os interesses sociais e de terceiros.
- **Boa-fé objetiva** (art. 422, CC): as partes devem agir com lealdade e honestidade em todas as fases (pré, durante e pós-contratual).
- **Relatividade**: o contrato, em regra, só produz efeitos entre as partes.

**Formação do contrato:**
- **Proposta** (policitação): oferta firme de um contratante.
- **Aceitação**: concordância do outro.
- O contrato se forma quando a aceitação chega ao proponente (art. 434, CC).`,
    practicalExample: `Lúcia faz uma proposta por e-mail para vender sua moto a Pedro por R$ 15.000,00. Pedro responde aceitando.

- **Requisitos verificados**: Lúcia e Pedro são maiores e capazes; a moto é objeto lícito e determinado; não há forma especial exigida para motos.
- O contrato está **formado** desde que a aceitação de Pedro chegou a Lúcia.
- A **boa-fé** obriga ambos a informar eventuais defeitos ou problemas que afetem a negociação.`,
    references: [
      'Código Civil (Lei nº 10.406/2002), arts. 104, 421, 422 e 434.',
      'VENOSA, Sílvio de Salvo. Direito Civil: teoria geral das obrigações e teoria geral dos contratos. 23. ed. São Paulo: Atlas, 2023.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-civil-3-1',
        type: 'multiple-choice',
        stem: 'Para que um contrato seja válido, o art. 104 do Código Civil exige, entre outros requisitos, que o objeto seja:',
        options: [
          { id: 'a', text: 'Sempre de valor superior a dez salários mínimos.' },
          { id: 'b', text: 'Reduzido a escrito por instrumento público.' },
          { id: 'c', text: 'Lícito, possível, determinado ou determinável.' },
          { id: 'd', text: 'Aprovado por dois testemunhos.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O art. 104, II, do Código Civil exige que o objeto do negócio jurídico (e do contrato) seja lícito, possível, determinado ou determinável. Um contrato com objeto ilícito (ex.: tráfico de entorpecentes) é nulo de pleno direito (art. 166, II, CC).',
      },
      {
        id: 'q-civil-3-2',
        type: 'multiple-choice',
        stem: 'O princípio da boa-fé objetiva nos contratos (art. 422, CC) implica que as partes devem:',
        options: [
          { id: 'a', text: 'Agir apenas em seu próprio interesse, pois o contrato é lei entre as partes.' },
          {
            id: 'b',
            text: 'Agir com lealdade, honestidade e cooperação em todas as fases do contrato.',
          },
          { id: 'c', text: 'Consultar um advogado antes de qualquer negociação.' },
          { id: 'd', text: 'Reduzir o contrato a escrito para que a boa-fé seja exigida.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A boa-fé objetiva é uma regra de conduta — as partes devem agir com lealdade, transparência e cooperação. Aplica-se nas fases pré-contratual (negociação), contratual (execução) e pós-contratual (após o término). Viola a boa-fé, por exemplo, quem oculta defeito do produto vendido.',
      },
      {
        id: 'q-civil-3-3',
        type: 'multiple-choice',
        stem: 'A compra e venda de um imóvel rural exige forma especial. Qual é ela?',
        options: [
          { id: 'a', text: 'Contrato particular com duas testemunhas.' },
          { id: 'b', text: 'Escritura pública lavrada em cartório de notas.' },
          { id: 'c', text: 'Declaração simples assinada pelas partes.' },
          { id: 'd', text: 'Aprovação do cartório de registro de imóveis.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 108 do Código Civil exige escritura pública para a validade dos negócios jurídicos que visem à constituição, transferência, modificação ou renúncia de direitos reais sobre imóveis de valor superior a 30 vezes o maior salário mínimo vigente. Para imóveis em geral, a escritura pública é a forma prescrita.',
      },
      {
        id: 'q-civil-3-4',
        type: 'multiple-choice',
        stem: 'O princípio da relatividade dos contratos significa que:',
        options: [
          { id: 'a', text: 'O contrato pode ser modificado por qualquer terceiro interessado.' },
          {
            id: 'b',
            text: 'Os efeitos do contrato, em regra, alcançam apenas as partes contratantes, não terceiros alheios.',
          },
          { id: 'c', text: 'O contrato perde validade após determinado período.' },
          { id: 'd', text: 'O contrato pode ser revisado relativamente pela inflação.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O princípio da relatividade (res inter alios acta) estabelece que o contrato produz efeitos apenas entre as partes. Terceiros alheios ao contrato não são obrigados nem se beneficiam, em regra. Há exceções, como o contrato em favor de terceiro (art. 436, CC).',
      },
      {
        id: 'q-civil-3-5',
        type: 'multiple-choice',
        stem: 'Quando se considera formado um contrato entre ausentes (por correspondência/e-mail), segundo o Código Civil?',
        options: [
          { id: 'a', text: 'Quando o proponente envia a proposta.' },
          { id: 'b', text: 'Quando o aceitante decide internamente aceitar.' },
          { id: 'c', text: 'Quando a aceitação é expedida pelo aceitante.' },
          { id: 'd', text: 'Quando a aceitação chega ao proponente (teoria da recepção).' },
        ],
        correctOptionId: 'd',
        explanation:
          'O Código Civil de 2002 adotou a teoria da recepção (art. 434): o contrato entre ausentes considera-se formado no momento em que o proponente recebe a aceitação, e não quando o aceitante a expede. Isso traz mais segurança ao proponente.',
      },
    ],
  },

  // ─── Lição B-4: Inadimplemento ────────────────────────────
  {
    id: 'lesson-civil-4',
    trailId: 'trail-civil',
    order: 4,
    title: 'Inadimplemento',
    description: 'Conceito, tipos e consequências do descumprimento das obrigações.',
    learningObjective:
      'Identificar as hipóteses de inadimplemento e suas consequências jurídicas.',
    explanation: `**Inadimplemento** é o descumprimento, total ou parcial, da obrigação pelo devedor.

**Tipos de inadimplemento:**
1. **Inadimplemento absoluto**: a prestação não foi cumprida e não é mais possível ou útil ao credor. O credor pode exigir perdas e danos (art. 389, CC).
2. **Mora** (inadimplemento relativo): a prestação ainda é possível e útil, mas foi realizada com atraso, em lugar errado ou de forma defeituosa (art. 394, CC).
   - **Mora do devedor** (mora solvendi): atraso culposo do devedor.
   - **Mora do credor** (mora accipiendi): o credor recusa injustificadamente receber.

**Efeitos da mora do devedor:**
- Responde pelos prejuízos causados pelo atraso.
- Sujeita-se ao pagamento de **juros moratórios**, **multa** (cláusula penal) e **correção monetária**.
- Fica responsável pelo caso fortuito ou força maior durante a mora (art. 399, CC).

**Purgação da mora**: o devedor pode interromper os efeitos da mora cumprindo a obrigação com juros e multa (arts. 401-403, CC).

**Cláusula penal** (art. 408, CC): pré-fixação das perdas e danos, evitando discussão futura sobre o valor do prejuízo.`,
    practicalExample: `Sofia contratou uma construtora para entregar um apartamento em junho. A construtora entregou em setembro.

- A obrigação ainda era útil a Sofia (ela aceitou o imóvel) → **mora**, não inadimplemento absoluto.
- Sofia pode exigir:
  - Juros moratórios (art. 395, CC).
  - Multa por atraso se prevista em contrato (cláusula penal).
  - Indenização pelo aluguel pago nos 3 meses extras, se comprovado o prejuízo.`,
    references: [
      'Código Civil (Lei nº 10.406/2002), arts. 389, 394, 395, 399 e 408.',
      'FARIAS, Cristiano Chaves de; ROSENVALD, Nelson. Curso de Direito Civil: obrigações. 17. ed. Salvador: JusPodivm, 2022.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-civil-4-1',
        type: 'multiple-choice',
        stem: 'Qual é a diferença entre mora e inadimplemento absoluto?',
        options: [
          {
            id: 'a',
            text: 'Na mora, a prestação ainda é possível e útil ao credor; no inadimplemento absoluto, a prestação não é mais possível ou útil.',
          },
          { id: 'b', text: 'A mora ocorre apenas em contratos de longa duração.' },
          { id: 'c', text: 'Inadimplemento absoluto e mora são sinônimos no Código Civil.' },
          { id: 'd', text: 'Na mora, o devedor fica isento de responsabilidade.' },
        ],
        correctOptionId: 'a',
        explanation:
          'A mora (art. 394, CC) ocorre quando a prestação ainda é possível e útil ao credor, mas foi cumprida com atraso, em lugar diferente do estipulado ou de modo deficiente. O inadimplemento absoluto (art. 389, CC) ocorre quando a prestação não pode mais ser cumprida ou já não é útil ao credor.',
      },
      {
        id: 'q-civil-4-2',
        type: 'multiple-choice',
        stem: 'Thomaz devia entregar mercadorias em 10/03. Em 15/03 ainda não entregou, mas a entrega ainda seria útil ao comprador. Thomaz está em:',
        options: [
          { id: 'a', text: 'Inadimplemento absoluto.' },
          { id: 'b', text: 'Mora do devedor.' },
          { id: 'c', text: 'Mora do credor.' },
          { id: 'd', text: 'Situação de exoneração por caso fortuito.' },
        ],
        correctOptionId: 'b',
        explanation:
          'Thomaz não cumpriu a obrigação no prazo, mas a entrega ainda é útil ao comprador. Isso caracteriza mora do devedor (mora solvendi). Thomaz responde pelos juros e demais prejuízos causados pelo atraso.',
      },
      {
        id: 'q-civil-4-3',
        type: 'multiple-choice',
        stem: 'A cláusula penal prevista em contrato tem qual finalidade principal?',
        options: [
          { id: 'a', text: 'Permitir que o credor rescinda o contrato sem aviso prévio.' },
          {
            id: 'b',
            text: 'Pré-fixar o valor das perdas e danos, facilitando a liquidação do prejuízo em caso de inadimplemento.',
          },
          { id: 'c', text: 'Aumentar os direitos do devedor no contrato.' },
          { id: 'd', text: 'Substituir a obrigação principal pelo pagamento de multa.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A cláusula penal (art. 408, CC) é uma pré-liquidação convencional das perdas e danos: as partes fixam previamente o valor a ser pago em caso de descumprimento. Isso evita discussão judicial sobre o valor real do prejuízo e serve como estímulo ao cumprimento da obrigação.',
      },
      {
        id: 'q-civil-4-4',
        type: 'multiple-choice',
        stem: 'Durante a mora do devedor, ocorre um terremoto que destrói o bem que deveria ser entregue. De quem é o risco?',
        options: [
          { id: 'a', text: 'Do credor, pois o caso fortuito exime sempre o devedor.' },
          { id: 'b', text: 'Do devedor, pois ele responde pelo caso fortuito durante a mora.' },
          { id: 'c', text: 'Ambos dividem o prejuízo igualmente.' },
          { id: 'd', text: 'Do Estado, por ser caso de força maior.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 399 do Código Civil prevê que o devedor em mora responde pela impossibilidade da prestação, mesmo que essa impossibilidade resulte de caso fortuito ou força maior, a menos que prove que o dano ocorreria mesmo sem a mora. Trata-se de uma agravação de responsabilidade pela situação de mora.',
      },
      {
        id: 'q-civil-4-5',
        type: 'multiple-choice',
        stem: 'Roberta vendeu um quadro raro a Ivan por R$ 50.000. Ivan se recusa a pagar. Como a prestação de Ivan (pagar) já não interessa a Roberta, que revendeu o quadro a terceiro, estamos diante de:',
        options: [
          { id: 'a', text: 'Mora do devedor, pois ainda é possível pagar.' },
          {
            id: 'b',
            text: 'Inadimplemento absoluto, pois a prestação não é mais útil a Roberta e ela pode exigir apenas perdas e danos.',
          },
          { id: 'c', text: 'Mora do credor, pois Roberta revendeu sem autorização.' },
          { id: 'd', text: 'Adimplemento substancial, pois parte foi cumprida.' },
        ],
        correctOptionId: 'b',
        explanation:
          'Quando a prestação deixa de ser útil ao credor — como no caso em que Roberta já revendeu o quadro —, o inadimplemento torna-se absoluto. Roberta não tem mais interesse no pagamento para a entrega do quadro; resta-lhe o direito às perdas e danos pelo descumprimento (art. 389, CC).',
      },
    ],
  },

  // ─── Lição B-5: Responsabilidade Civil ────────────────────
  {
    id: 'lesson-civil-5',
    trailId: 'trail-civil',
    order: 5,
    title: 'Responsabilidade Civil',
    description: 'Dever de indenizar, pressupostos e modalidades da responsabilidade civil.',
    learningObjective:
      'Compreender os pressupostos da responsabilidade civil e distinguir responsabilidade subjetiva de objetiva.',
    explanation: `**Responsabilidade civil** é a obrigação de reparar um dano causado a outrem (art. 927, CC). Quem causa dano injusto deve indenizar.

**Pressupostos da responsabilidade civil subjetiva (art. 186, CC):**
1. **Conduta** (ação ou omissão): o ato do agente.
2. **Culpa ou dolo**: agiu com negligência, imprudência, imperícia (culpa) ou com intenção de causar dano (dolo).
3. **Dano**: prejuízo material (patrimonial) ou imaterial (moral, estético, existencial).
4. **Nexo causal**: relação de causa e efeito entre a conduta e o dano.

**Responsabilidade objetiva (art. 927, parágrafo único, CC):** prescinde de culpa. Aplica-se quando a lei expressamente a prevê ou quando a atividade normalmente desenvolvida pelo autor implica risco para os direitos de outrem (teoria do risco).

**Espécies de dano:**
- **Dano emergente**: o que efetivamente se perdeu.
- **Lucro cessante**: o que razoavelmente se deixou de ganhar (art. 402, CC).
- **Dano moral**: lesão a direitos da personalidade (honra, imagem, intimidade).

**Excludentes de responsabilidade:** caso fortuito/força maior, culpa exclusiva da vítima, fato de terceiro.`,
    practicalExample: `Um motorista, ao ultrapassar em local proibido, colide com o carro de Cristina.

- **Conduta**: ultrapassagem em local proibido.
- **Culpa**: imprudência (violação de norma de trânsito).
- **Dano**: danos materiais no carro de Cristina + dano moral pelo trauma.
- **Nexo causal**: a ultrapassagem indevida causou a colisão.

O motorista deve indenizar Cristina pelos danos emergentes (conserto do carro) e pelo dano moral, se demonstrado.`,
    references: [
      'Código Civil (Lei nº 10.406/2002), arts. 186, 187, 402 e 927.',
      'CAVALIERI FILHO, Sérgio. Programa de Responsabilidade Civil. 14. ed. São Paulo: Atlas, 2022.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-civil-5-1',
        type: 'multiple-choice',
        stem: 'Quais são os quatro pressupostos da responsabilidade civil subjetiva no Código Civil?',
        options: [
          {
            id: 'a',
            text: 'Contrato, dano, nexo causal e culpa.',
          },
          {
            id: 'b',
            text: 'Conduta, culpa ou dolo, dano e nexo causal.',
          },
          {
            id: 'c',
            text: 'Dolo, dano material, nexo causal e indenização.',
          },
          {
            id: 'd',
            text: 'Conduta, contrato, dano e exclusão de ilicitude.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 186 do CC estabelece os pressupostos da responsabilidade civil subjetiva: (1) conduta (ação ou omissão); (2) culpa ou dolo; (3) dano (material ou moral); (4) nexo de causalidade entre a conduta e o dano. Todos devem estar presentes para gerar o dever de indenizar.',
      },
      {
        id: 'q-civil-5-2',
        type: 'multiple-choice',
        stem: 'A responsabilidade objetiva, prevista no parágrafo único do art. 927 do CC, difere da subjetiva porque:',
        options: [
          { id: 'a', text: 'Exige dolo para sua caracterização.' },
          {
            id: 'b',
            text: 'Prescinde (dispensa) da comprovação de culpa — basta a conduta, o dano e o nexo causal.',
          },
          { id: 'c', text: 'Aplica-se apenas a pessoas jurídicas.' },
          { id: 'd', text: 'Não admite nenhuma excludente de responsabilidade.' },
        ],
        correctOptionId: 'b',
        explanation:
          'Na responsabilidade objetiva, a culpa não precisa ser comprovada. O dever de indenizar surge da conduta + dano + nexo causal. Aplica-se, por exemplo, a atividades de risco (art. 927, § único, CC) e ao Código de Defesa do Consumidor (Lei nº 8.078/1990).',
      },
      {
        id: 'q-civil-5-3',
        type: 'multiple-choice',
        stem: 'Um comerciante deixou de fechar um negócio lucrativo porque o fornecedor não entregou os produtos no prazo. O valor que ele deixou de ganhar é chamado de:',
        options: [
          { id: 'a', text: 'Dano emergente.' },
          { id: 'b', text: 'Dano moral.' },
          { id: 'c', text: 'Lucro cessante.' },
          { id: 'd', text: 'Dano estético.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O lucro cessante (art. 402, CC) é o que a vítima razoavelmente deixou de ganhar em razão do inadimplemento ou do ato ilícito. Difere do dano emergente, que é a perda direta e imediata do patrimônio. No exemplo, o negócio que não se concretizou é lucro cessante.',
      },
      {
        id: 'q-civil-5-4',
        type: 'multiple-choice',
        stem: 'Se um dano é causado exclusivamente por culpa da própria vítima, o que ocorre com o dever de indenizar do agente?',
        options: [
          { id: 'a', text: 'O agente deve indenizar, mas com redução de 50%.' },
          {
            id: 'b',
            text: 'O dever de indenizar é excluído, pois a culpa exclusiva da vítima rompe o nexo causal.',
          },
          { id: 'c', text: 'O agente deve indenizar integralmente.' },
          { id: 'd', text: 'O Estado assume o dever de indenizar.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A culpa exclusiva da vítima é uma excludente de responsabilidade: rompe o nexo causal entre a conduta do agente e o dano. Sem nexo causal, não há responsabilidade civil. Diferente é a culpa concorrente, em que o agente e a vítima contribuem para o dano — o valor da indenização é reduzido proporcionalmente.',
      },
      {
        id: 'q-civil-5-5',
        type: 'multiple-choice',
        stem: 'Uma empresa de transporte aéreo, mesmo sem culpa, deve indenizar passageiro que perdeu bagagem. Esse é um exemplo de responsabilidade:',
        options: [
          { id: 'a', text: 'Subjetiva, pois exige a prova de culpa da empresa.' },
          {
            id: 'b',
            text: 'Objetiva, pois a atividade de transporte impõe responsabilidade independente de culpa.',
          },
          { id: 'c', text: 'Contratual subjetiva com inversão do ônus da prova.' },
          { id: 'd', text: 'Nenhuma, pois a empresa pode alegar força maior.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O transporte aéreo é regulado pelo Código do Consumidor (Lei nº 8.078/1990) e pela Convenção de Montreal, que adotam a responsabilidade objetiva do transportador. A empresa responde pelo extravio de bagagem independentemente de culpa, podendo ser isentada apenas em casos específicos (ex.: culpa exclusiva do passageiro ou caso fortuito externo).',
      },
    ],
  },
]
