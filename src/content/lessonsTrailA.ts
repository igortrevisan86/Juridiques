// ============================================================
// TRILHA A — Introdução ao Direito
// 5 lições, 5 questões cada
// Referência: CF/88; LINDB (Decreto-Lei nº 4.657/1942)
// Data de referência do conteúdo: outubro/2024
// ============================================================

import type { Lesson } from '@/types'

export const TRAIL_INTRO_LESSONS: Lesson[] = [
  // ─── Lição A-1: Conceito de Direito ───────────────────────
  {
    id: 'lesson-intro-1',
    trailId: 'trail-intro-direito',
    order: 1,
    title: 'Conceito de Direito',
    description: 'O que é o Direito, para que serve e como se diferencia de outras normas sociais.',
    learningObjective:
      'Compreender o conceito de Direito e distingui-lo de outras formas de controle social.',
    explanation: `O **Direito** é um conjunto de normas de conduta obrigatórias, impostas pelo Estado, destinadas a organizar a vida social e garantir a convivência pacífica entre as pessoas.

Ele se diferencia de outras normas sociais — como os costumes, a moral e as regras religiosas — principalmente por dois elementos:

1. **Coercibilidade**: o Estado pode usar a força legítima para impor o cumprimento das normas jurídicas.
2. **Institucionalização**: as normas jurídicas são criadas e aplicadas por órgãos oficiais (Poder Legislativo, Executivo e Judiciário).

O Direito também pode ser visto sob dois ângulos:
- **Direito objetivo**: o conjunto de normas vigentes (o "Direito posto").
- **Direito subjetivo**: a faculdade que cada pessoa tem de exigir o cumprimento de uma norma que lhe favorece (por exemplo, o direito de cobrar uma dívida).`,
    practicalExample: `João celebrou um contrato de compra e venda com Maria. Maria não pagou o preço combinado.

Pelo **Direito objetivo** (ex.: arts. 481 e 475 do Código Civil), existe uma norma que obriga o pagamento em contratos onerosos.

Pelo **Direito subjetivo**, João tem a *faculdade* de acionar o Judiciário para exigir o pagamento ou a resolução do contrato.

Se Maria se recusar a pagar voluntariamente, o Estado pode, por meio de uma decisão judicial, obrigá-la — aí entra a **coercibilidade**.`,
    references: [
      'Código Civil (Lei nº 10.406/2002), arts. 481 e 475.',
      'REALE, Miguel. Lições Preliminares de Direito. 27. ed. São Paulo: Saraiva, 2002.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-intro-1-1',
        type: 'multiple-choice',
        stem: 'O que diferencia o Direito das demais normas sociais, como a moral e os costumes?',
        options: [
          { id: 'a', text: 'O Direito é baseado em valores religiosos universais.' },
          {
            id: 'b',
            text: 'O Direito é dotado de coercibilidade estatal, ou seja, pode ser imposto pela força legítima do Estado.',
          },
          { id: 'c', text: 'O Direito só se aplica a relações entre empresas.' },
          { id: 'd', text: 'O Direito é criado exclusivamente pelo Poder Judiciário.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A coercibilidade estatal é o elemento que distingue o Direito das demais normas sociais. O Estado pode usar mecanismos coercitivos legítimos para garantir o cumprimento das normas jurídicas, o que não ocorre com normas morais ou costumeiras.',
      },
      {
        id: 'q-intro-1-2',
        type: 'multiple-choice',
        stem: 'Considere a seguinte situação: Ana tem o direito de exigir de Bruno o pagamento de uma dívida. Esse "poder de exigir" é chamado de:',
        options: [
          { id: 'a', text: 'Direito objetivo.' },
          { id: 'b', text: 'Direito natural.' },
          { id: 'c', text: 'Direito subjetivo.' },
          { id: 'd', text: 'Direito positivo.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O direito subjetivo é a faculdade ou poder que uma pessoa tem de exigir de outra uma determinada conduta, com base em uma norma jurídica. No exemplo, Ana exerce seu direito subjetivo ao cobrar a dívida de Bruno.',
      },
      {
        id: 'q-intro-1-3',
        type: 'multiple-choice',
        stem: 'O conjunto de normas jurídicas vigentes em um determinado ordenamento, independentemente de quem as invoca, é denominado:',
        options: [
          { id: 'a', text: 'Direito subjetivo.' },
          { id: 'b', text: 'Direito objetivo.' },
          { id: 'c', text: 'Direito consuetudinário.' },
          { id: 'd', text: 'Direito supranacional.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O direito objetivo é o conjunto de normas impostas pelo Estado, válidas para todos. É o "Direito posto" — a lei, os decretos, as resoluções etc. —, independentemente de quem as utiliza.',
      },
      {
        id: 'q-intro-1-4',
        type: 'multiple-choice',
        stem: 'Uma norma moral proíbe a mentira. Uma norma jurídica proíbe o estelionato (fraude para obter vantagem ilícita). Qual é a principal diferença entre essas duas normas?',
        options: [
          { id: 'a', text: 'A norma moral é mais importante que a jurídica.' },
          {
            id: 'b',
            text: 'A norma jurídica é imposta e sancionada pelo Estado; a moral não tem sanção institucionalizada.',
          },
          { id: 'c', text: 'A norma moral é criada pelo Congresso Nacional.' },
          { id: 'd', text: 'A norma jurídica se aplica apenas a relações privadas.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A principal distinção está na sanção institucionalizada: quem pratica estelionato pode ser preso e condenado pelo Estado. Quem mente pode sofrer reprovação social, mas não há pena estatal pelo simples ato de mentir (salvo situações específicas como falso testemunho).',
      },
      {
        id: 'q-intro-1-5',
        type: 'multiple-choice',
        stem: 'Em qual das alternativas o Direito está sendo exercido em sua função mais essencial?',
        options: [
          {
            id: 'a',
            text: 'Um grupo de amigos define regras internas para um jogo de futebol.',
          },
          {
            id: 'b',
            text: 'Um juiz condena um réu por crime de furto com base no Código Penal.',
          },
          {
            id: 'c',
            text: 'Uma igreja estabelece normas de comportamento para seus fiéis.',
          },
          { id: 'd', text: 'Uma empresa cria um código de ética interno para seus funcionários.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A condenação pelo Judiciário com base no Código Penal é o exemplo mais claro do Direito em sua função essencial: aplicação de norma jurídica estatal, por órgão competente, com sanção coercitiva. As demais alternativas envolvem normas sociais ou privadas sem força coercitiva estatal.',
      },
    ],
  },

  // ─── Lição A-2: Normas Jurídicas ──────────────────────────
  {
    id: 'lesson-intro-2',
    trailId: 'trail-intro-direito',
    order: 2,
    title: 'Normas Jurídicas',
    description: 'Estrutura, características e tipos de normas jurídicas.',
    learningObjective:
      'Identificar os elementos estruturais de uma norma jurídica e distinguir suas principais características.',
    explanation: `Uma **norma jurídica** é um enunciado que prescreve uma conduta e prevê uma consequência para seu descumprimento.

**Estrutura lógica** (modelo de Kelsen):
- **Hipótese (ou antecedente)**: a situação fática prevista pela norma ("se alguém matar outrem...").
- **Consequência (ou sanção)**: o que ocorre se a hipótese se verificar ("...será punido com reclusão de 6 a 20 anos").

**Características das normas jurídicas:**
1. **Generalidade**: dirigem-se a todos, não a pessoas específicas.
2. **Abstração**: regulam condutas em tese, não casos concretos individuais.
3. **Bilateralidade**: criam obrigações para uma parte e direitos para outra.
4. **Coercibilidade**: o descumprimento sujeita o infrator a sanção estatal.
5. **Imperatividade**: impõem condutas (não são meras sugestões).

**Regras vs. Princípios** (distinção de Dworkin e Alexy):
- **Regras**: aplicadas na lógica do "tudo ou nada" — ou incidem ou não.
- **Princípios**: mandamentos de otimização, ponderados quando em conflito.`,
    practicalExample: `Artigo 121 do Código Penal: *"Matar alguém: Pena — reclusão, de 6 (seis) a 20 (vinte) anos."*

- **Hipótese**: matar alguém.
- **Consequência**: reclusão de 6 a 20 anos.
- **Generalidade**: aplica-se a qualquer pessoa que pratique o ato.
- **Coercibilidade**: o Estado pode prender e punir o infrator.`,
    references: [
      'Código Penal (Decreto-Lei nº 2.848/1940), art. 121.',
      'KELSEN, Hans. Teoria Pura do Direito. Trad. João Baptista Machado. 8. ed. São Paulo: WMF Martins Fontes, 2009.',
      'ALEXY, Robert. Teoria dos Direitos Fundamentais. Trad. Virgílio Afonso da Silva. 2. ed. São Paulo: Malheiros, 2015.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-intro-2-1',
        type: 'multiple-choice',
        stem: 'Na estrutura lógica de uma norma jurídica, o que representa a "hipótese" ou "antecedente"?',
        options: [
          { id: 'a', text: 'A punição prevista para quem descumprir a norma.' },
          {
            id: 'b',
            text: 'A situação fática abstrata que, se ocorrida, faz incidir a norma.',
          },
          { id: 'c', text: 'O juiz competente para aplicar a norma.' },
          { id: 'd', text: 'O sujeito que criou a norma jurídica.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A hipótese (ou antecedente) é a descrição abstrata de uma situação fática. Quando essa situação ocorre no mundo real, a norma incide e sua consequência (sanção ou efeito jurídico) é ativada.',
      },
      {
        id: 'q-intro-2-2',
        type: 'multiple-choice',
        stem: 'Qual característica das normas jurídicas indica que elas se dirigem a categorias gerais de pessoas, e não a indivíduos especificamente identificados?',
        options: [
          { id: 'a', text: 'Coercibilidade.' },
          { id: 'b', text: 'Bilateralidade.' },
          { id: 'c', text: 'Generalidade.' },
          { id: 'd', text: 'Imperatividade.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A generalidade significa que a norma jurídica é dirigida a todos os que se enquadrem na situação descrita, e não a um indivíduo nomeado. Por isso, uma lei que diz "os contribuintes devem pagar imposto" é geral.',
      },
      {
        id: 'q-intro-2-3',
        type: 'multiple-choice',
        stem: 'Segundo a distinção de Robert Alexy, qual é a principal diferença entre regras e princípios jurídicos?',
        options: [
          {
            id: 'a',
            text: 'Princípios são aplicados na lógica do "tudo ou nada"; regras são ponderadas.',
          },
          { id: 'b', text: 'Regras são mais importantes que princípios na hierarquia normativa.' },
          {
            id: 'c',
            text: 'Regras se aplicam na lógica do "tudo ou nada"; princípios são mandamentos de otimização ponderados.',
          },
          { id: 'd', text: 'Princípios e regras são sinônimos no Direito moderno.' },
        ],
        correctOptionId: 'c',
        explanation:
          'Para Alexy, regras incidem ou não incidem (tudo ou nada): se válida e aplicável, a regra deve ser cumprida integralmente. Princípios, por sua vez, são mandamentos de otimização — devem ser realizados na maior medida possível, e quando dois princípios colidem, realiza-se uma ponderação.',
      },
      {
        id: 'q-intro-2-4',
        type: 'multiple-choice',
        stem: 'A norma "É proibido fumar em locais fechados de uso coletivo" possui qual característica ao criar, simultaneamente, um dever para o fumante e um direito para os não fumantes?',
        options: [
          { id: 'a', text: 'Generalidade.' },
          { id: 'b', text: 'Abstração.' },
          { id: 'c', text: 'Bilateralidade.' },
          { id: 'd', text: 'Coercibilidade.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A bilateralidade é a característica pela qual a norma jurídica sempre cria uma relação entre dois polos: para um sujeito ela impõe uma obrigação, e para o outro confere um direito correspondente. No exemplo, a proibição de fumar gera o dever do fumante e o direito dos não fumantes a um ambiente sem fumaça.',
      },
      {
        id: 'q-intro-2-5',
        type: 'multiple-choice',
        stem: 'Um decreto municipal estabelece que estabelecimentos comerciais devem fechar às 22h. Luís, dono de um bar, desrespeita a norma. Qual característica da norma jurídica possibilita que o município aplique uma multa a Luís?',
        options: [
          { id: 'a', text: 'Abstração.' },
          { id: 'b', text: 'Bilateralidade.' },
          { id: 'c', text: 'Generalidade.' },
          { id: 'd', text: 'Coercibilidade.' },
        ],
        correctOptionId: 'd',
        explanation:
          'A coercibilidade é a característica que autoriza o Estado a aplicar sanções (como multas, fechamento do estabelecimento, prisão) quando a norma é descumprida. Sem coercibilidade, a norma jurídica seria apenas uma recomendação.',
      },
    ],
  },

  // ─── Lição A-3: Princípios Jurídicos ──────────────────────
  {
    id: 'lesson-intro-3',
    trailId: 'trail-intro-direito',
    order: 3,
    title: 'Princípios Jurídicos',
    description: 'Conceito, função e aplicação dos princípios no ordenamento jurídico.',
    learningObjective:
      'Distinguir princípios de regras e compreender como os princípios orientam a interpretação e a aplicação do Direito.',
    explanation: `**Princípios jurídicos** são mandamentos nucleares do ordenamento, que irradiam valores e orientam a criação, interpretação e aplicação das normas.

**Funções dos princípios:**
1. **Interpretativa**: guiam o intérprete na compreensão das regras.
2. **Integrativa**: suprem lacunas quando não há regra específica (art. 4º da LINDB).
3. **Normativa**: servem diretamente como fundamento de decisões.

**Exemplos de princípios constitucionais:**
- **Dignidade da pessoa humana** (art. 1º, III, CF/88): núcleo central dos direitos fundamentais.
- **Legalidade** (art. 5º, II, CF/88): ninguém é obrigado a fazer ou deixar de fazer senão em virtude de lei.
- **Contraditório e ampla defesa** (art. 5º, LV, CF/88): garante participação no processo.
- **Razoabilidade/proporcionalidade**: exige que as medidas estatais sejam adequadas, necessárias e proporcionais.

**Colisão de princípios**: quando dois princípios colidem, resolve-se pela **ponderação** — analisa-se qual princípio deve prevalecer no caso concreto, sem que o outro seja invalidado.`,
    practicalExample: `O princípio da **liberdade de expressão** (art. 5º, IV e IX, CF/88) e o da **privacidade** (art. 5º, X, CF/88) podem colidir.

Exemplo: um jornalista publica informações verdadeiras sobre a vida privada de um político que afetam o interesse público. O tribunal pondera:
- Favorece a liberdade de expressão: o interesse público na informação.
- Favorece a privacidade: a proteção da intimidade.

A decisão depende das circunstâncias do caso concreto — nenhum princípio é absoluto.`,
    references: [
      'Constituição Federal de 1988, arts. 1º, III; 5º, II, IV, IX, X e LV.',
      'LINDB (Decreto-Lei nº 4.657/1942), art. 4º.',
      'DWORKIN, Ronald. Levando os Direitos a Sério. Trad. Nelson Boeira. São Paulo: WMF Martins Fontes, 2002.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-intro-3-1',
        type: 'multiple-choice',
        stem: 'Qual é a função integrativa dos princípios jurídicos, prevista no art. 4º da LINDB?',
        options: [
          { id: 'a', text: 'Os princípios servem para revogar as regras infraconstitucionais.' },
          {
            id: 'b',
            text: 'Os princípios suprem as lacunas do ordenamento quando não há lei ou costume aplicável ao caso.',
          },
          { id: 'c', text: 'Os princípios são utilizados apenas pelo Poder Legislativo.' },
          { id: 'd', text: 'Os princípios apenas orientam a criação de novas leis.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 4º da LINDB determina que, quando a lei for omissa, o juiz decidirá o caso de acordo com a analogia, os costumes e os princípios gerais de direito. Essa é a função integrativa: suprir lacunas normativas.',
      },
      {
        id: 'q-intro-3-2',
        type: 'multiple-choice',
        stem: 'Dois princípios constitucionais colidem em um caso concreto. Como o Direito resolve esse conflito?',
        options: [
          {
            id: 'a',
            text: 'O princípio mais antigo prevalece automaticamente.',
          },
          {
            id: 'b',
            text: 'O princípio de maior hierarquia na Constituição sempre prevalece.',
          },
          {
            id: 'c',
            text: 'Realiza-se uma ponderação, verificando qual princípio deve preponderar no caso concreto, sem eliminar o outro.',
          },
          {
            id: 'd',
            text: 'Aplica-se o princípio que beneficiar o réu.',
          },
        ],
        correctOptionId: 'c',
        explanation:
          'A colisão de princípios é resolvida pela ponderação (ou sopesamento), técnica desenvolvida por Robert Alexy. O princípio que cede no caso concreto não é invalidado — ele simplesmente tem menor peso naquela situação específica, podendo prevalecer em outros contextos.',
      },
      {
        id: 'q-intro-3-3',
        type: 'multiple-choice',
        stem: 'O princípio da dignidade da pessoa humana está expressamente previsto na Constituição Federal de 1988 como:',
        options: [
          { id: 'a', text: 'Um objetivo fundamental da República.' },
          { id: 'b', text: 'Um dos fundamentos da República Federativa do Brasil.' },
          { id: 'c', text: 'Uma garantia processual exclusiva do réu em processo penal.' },
          { id: 'd', text: 'Um direito social a ser implementado progressivamente.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 1º, III, da CF/88 lista a dignidade da pessoa humana como um dos fundamentos da República Federativa do Brasil. Não é objetivo (art. 3º) nem direito social (art. 6º). Ela é o alicerce sobre o qual se constroem todos os direitos fundamentais.',
      },
      {
        id: 'q-intro-3-4',
        type: 'multiple-choice',
        stem: 'A proporcionalidade, usada para avaliar se uma medida estatal é legítima, possui três subprincípios. Quais são eles?',
        options: [
          { id: 'a', text: 'Legalidade, moralidade e eficiência.' },
          { id: 'b', text: 'Generalidade, abstração e coercibilidade.' },
          { id: 'c', text: 'Adequação, necessidade e proporcionalidade em sentido estrito.' },
          { id: 'd', text: 'Publicidade, impessoalidade e finalidade.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O princípio da proporcionalidade desdobra-se em: (1) adequação — o meio escolhido é apto para alcançar o fim; (2) necessidade — entre os meios igualmente eficazes, escolhe-se o menos gravoso; (3) proporcionalidade em sentido estrito — o benefício obtido deve superar o ônus imposto.',
      },
      {
        id: 'q-intro-3-5',
        type: 'multiple-choice',
        stem: 'Marta foi autuada por um fiscal por não portar um documento cujo formato nunca foi regulamentado por lei ou decreto. Qual princípio constitucional foi violado?',
        options: [
          { id: 'a', text: 'Princípio da isonomia (igualdade).' },
          { id: 'b', text: 'Princípio da legalidade.' },
          { id: 'c', text: 'Princípio da razoabilidade.' },
          { id: 'd', text: 'Princípio da separação dos poderes.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O princípio da legalidade (art. 5º, II, CF/88) determina que ninguém é obrigado a fazer ou deixar de fazer algo senão em virtude de lei. Exigir o porte de documento sem previsão legal viola diretamente esse princípio.',
      },
    ],
  },

  // ─── Lição A-4: Fontes do Direito ─────────────────────────
  {
    id: 'lesson-intro-4',
    trailId: 'trail-intro-direito',
    order: 4,
    title: 'Fontes do Direito',
    description: 'De onde vêm as normas jurídicas: fontes formais e materiais.',
    learningObjective:
      'Identificar e classificar as principais fontes do Direito brasileiro.',
    explanation: `**Fontes do Direito** são os meios pelos quais as normas jurídicas se formam e se exteriorizam.

**Classificação:**

**1. Fontes materiais** (substanciais): são os fatores sociais, econômicos, políticos, morais e culturais que levam à criação do Direito — a realidade que "inspira" a norma. Ex.: a pandemia gerou a necessidade de legislação sobre saúde pública.

**2. Fontes formais** (instrumentais): são os modos de expressão das normas jurídicas. Subdivide-se em:
- **Primárias (ou diretas)**: a **lei** e os costumes jurídicos.
- **Secundárias (ou indiretas)**: a analogia, os princípios gerais do Direito e a doutrina (conforme art. 4º da LINDB).

**Hierarquia das fontes formais no Brasil:**
1. Constituição Federal (norma suprema).
2. Emendas Constitucionais.
3. Tratados internacionais de direitos humanos (aprovados com quórum especial — status constitucional, segundo STF).
4. Leis Complementares e Leis Ordinárias.
5. Medidas Provisórias, Decretos Legislativos, Resoluções.
6. Decretos regulamentares e normas infralegais.`,
    practicalExample: `Em um caso de locação de imóvel, o contrato não prevê o que acontece se o imóvel for destruído por enchente. O juiz, sem lei específica para aquela situação exata, pode:

1. Usar **analogia** com outras normas do Código Civil sobre perda da coisa (art. 567, CC).
2. Aplicar o **princípio da boa-fé** (art. 422, CC).
3. Citar a **doutrina** de autores especialistas em contratos.

Todas essas fontes auxiliam na solução do caso.`,
    references: [
      'LINDB (Decreto-Lei nº 4.657/1942), arts. 4º e 5º.',
      'Código Civil (Lei nº 10.406/2002), arts. 422 e 567.',
      'Constituição Federal de 1988.',
      'DINIZ, Maria Helena. Compêndio de Introdução à Ciência do Direito. 26. ed. São Paulo: Saraiva, 2017.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-intro-4-1',
        type: 'multiple-choice',
        stem: 'Qual é a diferença entre fontes materiais e fontes formais do Direito?',
        options: [
          {
            id: 'a',
            text: 'Fontes materiais são as leis; fontes formais são os costumes.',
          },
          {
            id: 'b',
            text: 'Fontes materiais são os fatores sociais que motivam a criação do Direito; fontes formais são os modos pelos quais as normas se exteriorizam.',
          },
          {
            id: 'c',
            text: 'Fontes materiais têm hierarquia superior às fontes formais.',
          },
          {
            id: 'd',
            text: 'Fontes formais são exclusivamente os princípios constitucionais.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'As fontes materiais (ou substanciais) são os fatores reais — sociais, econômicos, políticos — que impulsionam a criação do Direito. As fontes formais são os mecanismos pelos quais as normas se manifestam e se tornam vinculantes, como a lei, os costumes, a analogia e os princípios.',
      },
      {
        id: 'q-intro-4-2',
        type: 'multiple-choice',
        stem: 'Segundo o art. 4º da LINDB, quando a lei for omissa, o juiz deve decidir usando, na seguinte ordem:',
        options: [
          {
            id: 'a',
            text: 'Princípios gerais, analogia, costumes.',
          },
          {
            id: 'b',
            text: 'Analogia, costumes e princípios gerais do Direito.',
          },
          {
            id: 'c',
            text: 'Costumes, princípios gerais e doutrina.',
          },
          {
            id: 'd',
            text: 'Jurisprudência, analogia e lei estrangeira.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 4º da LINDB estabelece expressamente: "Quando a lei for omissa, o juiz decidirá o caso de acordo com a analogia, os costumes e os princípios gerais de direito." Essa é a ordem legal de integração das lacunas.',
      },
      {
        id: 'q-intro-4-3',
        type: 'multiple-choice',
        stem: 'No Brasil, qual é a norma que ocupa o topo da hierarquia das fontes formais do Direito?',
        options: [
          { id: 'a', text: 'O Código Civil.' },
          { id: 'b', text: 'As leis complementares.' },
          { id: 'c', text: 'A Constituição Federal.' },
          { id: 'd', text: 'Os tratados internacionais de comércio.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A Constituição Federal de 1988 é a norma suprema do ordenamento jurídico brasileiro. Todas as demais normas devem ser compatíveis com ela, sob pena de inconstitucionalidade.',
      },
      {
        id: 'q-intro-4-4',
        type: 'multiple-choice',
        stem: 'Um juiz precisa decidir um caso para o qual não existe lei nem costume aplicável. Ele aplica uma regra de outro contrato similar, por semelhança. Qual fonte do Direito ele está usando?',
        options: [
          { id: 'a', text: 'Princípio geral do Direito.' },
          { id: 'b', text: 'Doutrina.' },
          { id: 'c', text: 'Analogia.' },
          { id: 'd', text: 'Jurisprudência.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A analogia consiste em aplicar a um caso não previsto em lei a solução prevista para um caso semelhante. É a primeira fonte subsidiária prevista no art. 4º da LINDB e um método clássico de integração das lacunas.',
      },
      {
        id: 'q-intro-4-5',
        type: 'multiple-choice',
        stem: 'Uma prática comercial repetida por décadas, aceita como obrigatória pelos comerciantes de uma região, pode ser considerada qual tipo de fonte do Direito?',
        options: [
          { id: 'a', text: 'Lei ordinária.' },
          { id: 'b', text: 'Costume jurídico.' },
          { id: 'c', text: 'Medida provisória.' },
          { id: 'd', text: 'Princípio geral do Direito.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O costume jurídico é uma fonte do Direito caracterizada por dois elementos: (1) objetivo — a prática reiterada; (2) subjetivo — a convicção de sua obrigatoriedade (opinio iuris). No exemplo, ambos os elementos estão presentes.',
      },
    ],
  },

  // ─── Lição A-5: Legislação, Doutrina e Jurisprudência ─────
  {
    id: 'lesson-intro-5',
    trailId: 'trail-intro-direito',
    order: 5,
    title: 'Legislação, Doutrina e Jurisprudência',
    description: 'As três grandes expressões do Direito: a lei, o pensamento jurídico e as decisões judiciais.',
    learningObjective:
      'Diferenciar legislação, doutrina e jurisprudência e compreender o papel de cada uma no ordenamento.',
    explanation: `**Legislação**: é o conjunto de normas positivadas pelo Estado (Constituição, leis, decretos, resoluções etc.). É a fonte formal primária e mais importante no sistema jurídico brasileiro (tradição romano-germânica).

**Doutrina**: é o conjunto de estudos, opiniões e teorias elaboradas por juristas, professores e pesquisadores do Direito. Não tem força vinculante por si só, mas orienta a interpretação e a criação do Direito. É considerada fonte secundária.

**Jurisprudência**: é o conjunto de decisões reiteradas dos tribunais sobre determinada matéria. No Brasil, ganhou força normativa crescente com:
- **Súmulas vinculantes** (art. 103-A, CF/88): editadas pelo STF, vinculam todos os órgãos do Poder Judiciário e a Administração Pública.
- **Precedentes obrigatórios** (arts. 926-927, CPC/2015): uniformizam a jurisprudência e criam padrões decisórios.

**Diferença importante**: a legislação é criada pelo Poder Legislativo (ou Executivo, em casos específicos); a jurisprudência é criada pelo Poder Judiciário ao decidir casos concretos.`,
    practicalExample: `Uma empresa contesta o pagamento de um tributo. O advogado usa três fontes:

1. **Legislação**: art. 150, I, CF/88 — princípio da legalidade tributária (não há tributo sem lei).
2. **Doutrina**: cita um livro de tributarista renomado que interpreta o alcance do artigo.
3. **Jurisprudência**: apresenta súmula do STJ que decidiu caso idêntico favoravelmente ao contribuinte.

O juiz, ao decidir, pode se sentir vinculado pela súmula (se for vinculante) e persuadido pela doutrina.`,
    references: [
      'Constituição Federal de 1988, arts. 103-A e 150, I.',
      'Código de Processo Civil (Lei nº 13.105/2015), arts. 926-927.',
      'BARROSO, Luís Roberto. Curso de Direito Constitucional Contemporâneo. 9. ed. São Paulo: Saraiva, 2020.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-intro-5-1',
        type: 'multiple-choice',
        stem: 'Qual é a diferença fundamental entre doutrina e jurisprudência?',
        options: [
          {
            id: 'a',
            text: 'A doutrina é produzida pelos tribunais; a jurisprudência, pelos advogados.',
          },
          {
            id: 'b',
            text: 'A doutrina é o conjunto de estudos de juristas sem força vinculante própria; a jurisprudência é formada por decisões reiteradas dos tribunais.',
          },
          {
            id: 'c',
            text: 'A jurisprudência é sempre obrigatória; a doutrina nunca influencia os juízes.',
          },
          {
            id: 'd',
            text: 'Doutrina e jurisprudência são sinônimos no sistema brasileiro.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'A doutrina é produzida por juristas e acadêmicos e serve como fonte de interpretação sem força vinculante por si mesma. A jurisprudência é o conjunto de decisões reiteradas dos tribunais e pode ter força vinculante (ex.: súmulas vinculantes do STF).',
      },
      {
        id: 'q-intro-5-2',
        type: 'multiple-choice',
        stem: 'As súmulas vinculantes, previstas no art. 103-A da CF/88, vinculam:',
        options: [
          { id: 'a', text: 'Apenas o STF e os tribunais superiores.' },
          {
            id: 'b',
            text: 'Todos os órgãos do Poder Judiciário e a Administração Pública direta e indireta.',
          },
          { id: 'c', text: 'Apenas os juízes de primeira instância.' },
          { id: 'd', text: 'Somente os advogados e procuradores públicos.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 103-A da CF/88 estabelece que as súmulas vinculantes do STF vinculam os demais órgãos do Poder Judiciário e a Administração Pública direta e indireta, nas esferas federal, estadual e municipal.',
      },
      {
        id: 'q-intro-5-3',
        type: 'multiple-choice',
        stem: 'O Brasil adota predominantemente qual tradição jurídica, que privilegia a lei escrita como fonte principal do Direito?',
        options: [
          { id: 'a', text: 'Common Law (tradição anglo-saxônica).' },
          { id: 'b', text: 'Civil Law (tradição romano-germânica).' },
          { id: 'c', text: 'Direito consuetudinário puro.' },
          { id: 'd', text: 'Sistema misto, sem predominância de nenhuma tradição.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O Brasil adota a tradição da Civil Law (romano-germânica), na qual a lei escrita é a principal fonte do Direito. Diferente do Common Law (EUA, Reino Unido), onde os precedentes judiciais têm papel central. No entanto, o CPC/2015 aproximou o sistema brasileiro dos precedentes ao valorizar a jurisprudência.',
      },
      {
        id: 'q-intro-5-4',
        type: 'multiple-choice',
        stem: 'O CPC/2015 (arts. 926 e 927) impõe aos tribunais o dever de uniformizar sua jurisprudência e mantê-la estável. Qual é o principal objetivo desse sistema de precedentes?',
        options: [
          { id: 'a', text: 'Impedir que juízes de primeiro grau tomem decisões.' },
          {
            id: 'b',
            text: 'Garantir segurança jurídica, previsibilidade e isonomia nas decisões judiciais.',
          },
          { id: 'c', text: 'Eliminar a doutrina como fonte do Direito.' },
          { id: 'd', text: 'Criar um sistema de aprovação popular das leis.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O sistema de precedentes obrigatórios do CPC/2015 visa garantir segurança jurídica (as partes podem prever as decisões), isonomia (casos iguais devem ter soluções iguais) e eficiência do sistema de justiça.',
      },
      {
        id: 'q-intro-5-5',
        type: 'multiple-choice',
        stem: 'Um juiz decide um caso baseando-se exclusivamente em um artigo de lei, sem citar doutrina nem jurisprudência. Esse comportamento é:',
        options: [
          {
            id: 'a',
            text: 'Inválido, pois o juiz sempre deve citar doutrina e jurisprudência.',
          },
          {
            id: 'b',
            text: 'Perfeitamente válido, pois a lei é a fonte primária do Direito no sistema brasileiro.',
          },
          {
            id: 'c',
            text: 'Inválido, pois o juiz precisa de precedente vinculante para decidir.',
          },
          {
            id: 'd',
            text: 'Válido apenas se o caso for de Direito Civil.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'No sistema brasileiro (Civil Law), a lei é a principal fonte formal do Direito. Um juiz pode fundamentar sua decisão diretamente na lei, sem obrigatoriedade de citar doutrina ou jurisprudência, salvo quando existir precedente vinculante obrigatório (arts. 927 do CPC/2015).',
      },
    ],
  },
]
