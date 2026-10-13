// ============================================================
// TRILHA C — Direito Constitucional
// 5 lições, 5 questões cada
// Referência: Constituição Federal de 1988
// Data de referência do conteúdo: outubro/2024
// ============================================================

import type { Lesson } from '@/types'

export const TRAIL_CONST_LESSONS: Lesson[] = [
  // ─── Lição C-1: Conceito de Constituição ──────────────────
  {
    id: 'lesson-const-1',
    trailId: 'trail-constitucional',
    order: 1,
    title: 'Conceito de Constituição',
    description: 'O que é uma Constituição, seus sentidos e classificações.',
    learningObjective:
      'Compreender o conceito de Constituição e suas principais classificações.',
    explanation: `A **Constituição** é a lei fundamental e suprema de um Estado, que organiza o poder político, define os direitos e garantias dos cidadãos e estabelece os princípios estruturantes da ordem jurídica.

**Sentidos de Constituição (Ferdinand Lassalle):**
- **Sentido sociológico**: a Constituição real é a soma dos fatores reais de poder de uma sociedade (forças políticas, econômicas e militares).
- **Sentido político (Carl Schmitt)**: a Constituição é a decisão política fundamental do povo soberano — distingue as normas materialmente constitucionais das demais.
- **Sentido jurídico (Hans Kelsen)**: a Constituição é norma pura, fundamento de validade de todo o ordenamento — é a "norma hipotética fundamental".

**Classificações da Constituição:**
1. **Quanto à origem**: outorgada (imposta) × promulgada (democrática).
2. **Quanto à forma**: escrita × consuetudinária.
3. **Quanto à extensão**: sintética (concisa) × analítica (prolixa).
4. **Quanto à rigidez**: rígida (emenda difícil) × flexível × semirrígida.

**A CF/88** é: promulgada, escrita, analítica e rígida.

**Supremacia constitucional**: todas as normas inferiores devem ser compatíveis com a Constituição — é o fundamento do controle de constitucionalidade.`,
    practicalExample: `Em 1988, após a ditadura militar, o Brasil promulgou sua nova Constituição por meio de uma Assembleia Nacional Constituinte eleita pelo povo.

- **Origem promulgada**: emanou da vontade popular.
- **Forma escrita**: texto codificado.
- **Extensão analítica**: trata de muitos assuntos (saúde, educação, meio ambiente etc.).
- **Rigidez**: uma emenda constitucional exige aprovação em dois turnos em cada Casa do Congresso, com maioria de 3/5 dos votos (art. 60, §2º, CF/88).`,
    references: [
      'Constituição Federal de 1988, arts. 1º e 60.',
      'LASSALLE, Ferdinand. A Essência da Constituição. Rio de Janeiro: Liber Juris, 1988.',
      'BARROSO, Luís Roberto. Curso de Direito Constitucional Contemporâneo. 9. ed. São Paulo: Saraiva, 2020.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-const-1-1',
        type: 'multiple-choice',
        stem: 'Para Ferdinand Lassalle, a "Constituição real" de um país é:',
        options: [
          { id: 'a', text: 'O texto escrito aprovado pelo Parlamento.' },
          {
            id: 'b',
            text: 'A soma dos fatores reais de poder (forças econômicas, políticas e militares) que efetivamente dominam a sociedade.',
          },
          { id: 'c', text: 'A norma hipotética fundamental de Kelsen.' },
          { id: 'd', text: 'A decisão política fundamental do povo soberano.' },
        ],
        correctOptionId: 'b',
        explanation:
          'Para Lassalle, a Constituição real não é o papel escrito, mas os fatores reais de poder: grandes proprietários, banqueiros, exército, aristocracia, burguesia industrial etc. Uma Constituição escrita só tem valor duradouro quando coincide com esses fatores reais.',
      },
      {
        id: 'q-const-1-2',
        type: 'multiple-choice',
        stem: 'A Constituição Federal de 1988 é classificada como "rígida". O que isso significa?',
        options: [
          {
            id: 'a',
            text: 'Não pode ser emendada em nenhuma hipótese.',
          },
          {
            id: 'b',
            text: 'Seu processo de emenda é mais dificultoso que o das leis ordinárias, exigindo quórum qualificado.',
          },
          {
            id: 'c',
            text: 'Pode ser alterada por lei ordinária aprovada por maioria simples.',
          },
          {
            id: 'd',
            text: 'Só pode ser alterada por referendum popular.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'A rigidez constitucional significa que alterar a Constituição exige um processo mais rigoroso do que para aprovar leis comuns. O art. 60, §2º, da CF/88 exige aprovação em dois turnos em cada Casa do Congresso, com 3/5 dos votos dos respectivos membros.',
      },
      {
        id: 'q-const-1-3',
        type: 'multiple-choice',
        stem: 'Uma Constituição que foi imposta pelo governante ao povo, sem participação popular, é classificada quanto à origem como:',
        options: [
          { id: 'a', text: 'Promulgada.' },
          { id: 'b', text: 'Outorgada.' },
          { id: 'c', text: 'Analítica.' },
          { id: 'd', text: 'Flexível.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A Constituição outorgada é imposta unilateralmente pelo detentor do poder, sem participação do povo. Exemplos brasileiros: Constituições de 1824 (Pedro I), 1937 (Getúlio Vargas) e 1969 (junta militar). A promulgada, ao contrário, resulta de assembleia constituinte eleita pelo povo.',
      },
      {
        id: 'q-const-1-4',
        type: 'multiple-choice',
        stem: 'Qual é o fundamento do controle de constitucionalidade das leis?',
        options: [
          { id: 'a', text: 'A vontade do Presidente da República.' },
          { id: 'b', text: 'A supremacia da Constituição sobre as demais normas do ordenamento.' },
          { id: 'c', text: 'O princípio da legalidade ordinária.' },
          { id: 'd', text: 'A decisão do Poder Legislativo.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A supremacia constitucional — a posição hierarquicamente superior da Constituição no ordenamento — é o fundamento do controle de constitucionalidade. Se a Constituição é a lei suprema, toda norma contrária a ela é inválida. Sem supremacia, não haveria razão para controlar as leis.',
      },
      {
        id: 'q-const-1-5',
        type: 'multiple-choice',
        stem: 'A CF/88 é classificada como "analítica". O que distingue uma Constituição analítica de uma sintética?',
        options: [
          {
            id: 'a',
            text: 'A analítica regula apenas os direitos individuais; a sintética regula toda a ordem econômica.',
          },
          {
            id: 'b',
            text: 'A analítica é extensa, tratando de muitos temas; a sintética é concisa, limitando-se aos elementos essenciais do Estado.',
          },
          {
            id: 'c',
            text: 'A analítica é flexível; a sintética é rígida.',
          },
          {
            id: 'd',
            text: 'A analítica é outorgada; a sintética é promulgada.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'Constituições analíticas (ou prolixas) são extensas e detalham vários temas além dos estruturantes do Estado (ex.: saúde, educação, previdência — como a CF/88 com 250 artigos). Constituições sintéticas são concisas e limitam-se ao essencial (ex.: Constituição dos EUA, com 7 artigos originais).',
      },
    ],
  },

  // ─── Lição C-2: Direitos Fundamentais ────────────────────
  {
    id: 'lesson-const-2',
    trailId: 'trail-constitucional',
    order: 2,
    title: 'Direitos Fundamentais',
    description: 'Conceito, gerações e características dos direitos fundamentais.',
    learningObjective:
      'Identificar as características e gerações dos direitos fundamentais previstos na CF/88.',
    explanation: `**Direitos fundamentais** são direitos essenciais à dignidade humana, reconhecidos e garantidos pela Constituição, oponíveis ao Estado e, em alguns casos, a particulares.

**Gerações (ou dimensões) dos direitos fundamentais:**
- **1ª geração**: direitos civis e políticos (liberdades negativas — o Estado deve se abster). Ex.: liberdade de expressão, direito de voto.
- **2ª geração**: direitos sociais, econômicos e culturais (prestações positivas — o Estado deve agir). Ex.: saúde, educação, trabalho (art. 6º, CF/88).
- **3ª geração**: direitos de solidariedade ou fraternidade (titularidade difusa). Ex.: meio ambiente, paz, autodeterminação dos povos.
- **4ª geração** (Paulo Bonavides): democracia, informação, pluralismo.

**Características dos direitos fundamentais:**
1. **Universalidade**: destinam-se a todos os seres humanos.
2. **Historicidade**: surgem e evoluem historicamente.
3. **Inalienabilidade**: não podem ser transferidos ou vendidos.
4. **Irrenunciabilidade**: não se pode renunciar a eles de forma permanente.
5. **Imprescritibilidade**: não se perdem pela inércia.
6. **Relatividade**: não são absolutos — podem ser ponderados.

**Aplicabilidade imediata** (art. 5º, §1º, CF/88): as normas de direitos fundamentais têm aplicação imediata, independentemente de legislação infraconstitucional.`,
    practicalExample: `A liberdade de expressão (1ª geração) de um jornalista e o direito à privacidade (também 1ª geração) de um político podem colidir. Nenhum é absoluto.

O direito à saúde (2ª geração — art. 196, CF/88) impõe ao Estado o dever de fornecer medicamentos e serviços médicos. Tribunais brasileiros têm determinado que o Estado forneça tratamentos que o SUS não oferece, com base na aplicabilidade imediata desse direito.`,
    references: [
      'Constituição Federal de 1988, arts. 5º (caput e §1º), 6º e 196.',
      'SARLET, Ingo Wolfgang. A Eficácia dos Direitos Fundamentais. 13. ed. Porto Alegre: Livraria do Advogado, 2018.',
      'BONAVIDES, Paulo. Curso de Direito Constitucional. 36. ed. São Paulo: Malheiros, 2021.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-const-2-1',
        type: 'multiple-choice',
        stem: 'Os direitos de 2ª geração (ou dimensão) são chamados de direitos de "prestação positiva". Por que?',
        options: [
          {
            id: 'a',
            text: 'Porque exigem que o Estado se abstenha de interferir na esfera individual.',
          },
          {
            id: 'b',
            text: 'Porque exigem ações concretas do Estado para serem efetivados, como políticas públicas de saúde e educação.',
          },
          {
            id: 'c',
            text: 'Porque são titularidade de grupos e não de indivíduos.',
          },
          {
            id: 'd',
            text: 'Porque foram reconhecidos antes dos direitos de 1ª geração.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'Os direitos de 2ª geração (sociais, econômicos e culturais) demandam uma atuação positiva do Estado: oferecer serviços de saúde, garantir educação pública, proteger o trabalhador. Diferem dos direitos de 1ª geração, que são liberdades negativas (o Estado deve se abster de violar).',
      },
      {
        id: 'q-const-2-2',
        type: 'multiple-choice',
        stem: 'O art. 5º, §1º, da CF/88 estabelece que as normas definidoras de direitos fundamentais têm:',
        options: [
          { id: 'a', text: 'Eficácia limitada, dependendo de lei para produzir efeitos.' },
          { id: 'b', text: 'Aplicação imediata, independente de regulamentação infraconstitucional.' },
          { id: 'c', text: 'Eficácia apenas para os cidadãos brasileiros natos.' },
          { id: 'd', text: 'Validade somente nos casos previstos pelo Congresso Nacional.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 5º, §1º, da CF/88 determina que as normas definidoras dos direitos e garantias fundamentais têm aplicação imediata. Isso significa que os direitos fundamentais podem ser invocados diretamente, sem necessidade de lei regulamentadora, embora algumas normas tenham eficácia limitada na prática.',
      },
      {
        id: 'q-const-2-3',
        type: 'multiple-choice',
        stem: 'O direito ao meio ambiente ecologicamente equilibrado, por ser titularizado por toda a coletividade, é classificado como direito de:',
        options: [
          { id: 'a', text: '1ª geração.' },
          { id: 'b', text: '2ª geração.' },
          { id: 'c', text: '3ª geração.' },
          { id: 'd', text: '4ª geração.' },
        ],
        correctOptionId: 'c',
        explanation:
          'Os direitos de 3ª geração são os direitos de solidariedade ou fraternidade, com titularidade difusa — pertencem a toda a coletividade, presente e futura. O direito ao meio ambiente (art. 225, CF/88) é o exemplo mais citado. Outros exemplos: direito à paz, ao desenvolvimento e à comunicação.',
      },
      {
        id: 'q-const-2-4',
        type: 'multiple-choice',
        stem: 'Qual característica dos direitos fundamentais impede que alguém venda ou transfira definitivamente seus direitos à liberdade ou à vida?',
        options: [
          { id: 'a', text: 'Universalidade.' },
          { id: 'b', text: 'Historicidade.' },
          { id: 'c', text: 'Inalienabilidade.' },
          { id: 'd', text: 'Imprescritibilidade.' },
        ],
        correctOptionId: 'c',
        explanation:
          'A inalienabilidade significa que os direitos fundamentais não podem ser objeto de compra, venda ou transferência. Ninguém pode "vender" sua liberdade ou alienar sua dignidade. Trata-se de característica que protege o próprio titular contra atos de disposição que comprometam sua humanidade.',
      },
      {
        id: 'q-const-2-5',
        type: 'multiple-choice',
        stem: 'Os direitos fundamentais são absolutos? Como o Direito Constitucional resolve o conflito entre dois direitos fundamentais?',
        options: [
          {
            id: 'a',
            text: 'Sim, são absolutos — nenhum pode ser restringido em nenhuma circunstância.',
          },
          {
            id: 'b',
            text: 'Não são absolutos. Conflitos são resolvidos pela técnica da ponderação, com base na proporcionalidade.',
          },
          {
            id: 'c',
            text: 'Sim, exceto os direitos sociais, que podem ser suspensos por lei ordinária.',
          },
          {
            id: 'd',
            text: 'Não são absolutos. Em conflito, prevalece sempre o direito de 1ª geração.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'Nenhum direito fundamental é absoluto (com a exceção debatida da vedação à tortura). Quando dois direitos colidem, utiliza-se a ponderação: analisa-se o peso de cada princípio no caso concreto, observando adequação, necessidade e proporcionalidade em sentido estrito.',
      },
    ],
  },

  // ─── Lição C-3: Organização do Estado ────────────────────
  {
    id: 'lesson-const-3',
    trailId: 'trail-constitucional',
    order: 3,
    title: 'Organização do Estado',
    description: 'Federalismo, entes federativos e distribuição de competências no Brasil.',
    learningObjective:
      'Compreender a estrutura federativa do Estado brasileiro e a distribuição de competências entre os entes.',
    explanation: `O Brasil é uma **República Federativa** (art. 1º, CF/88), composta por três entes federativos: **União**, **Estados** (e Distrito Federal) e **Municípios**.

**Características do federalismo brasileiro:**
- **Descentralização política**: cada ente tem autonomia (auto-organização, autogoverno e autoadministração).
- **Indissolubilidade**: é vedada a secessão (art. 1º, CF/88 — "União indissolúvel").
- **Participação dos estados na vontade federal**: o Senado representa os estados no Congresso.

**Distribuição de competências (arts. 21–30, CF/88):**
- **Privativas da União** (art. 22): legislar sobre direito civil, comercial, penal, trabalhista, aeronáutico, marítimo etc.
- **Comuns a todos os entes** (art. 23): competências administrativas (saúde, educação, meio ambiente etc.).
- **Concorrentes entre União, Estados e DF** (art. 24): União fixa normas gerais; estados, normas suplementares.
- **Privativas dos Municípios** (art. 30): interesse local, transporte coletivo urbano etc.

**Brasília (DF)**: sede do governo federal, não é estado nem município — acumula competências de ambos.`,
    practicalExample: `A União legislou sobre trânsito (art. 22, XI, CF/88 — competência privativa). Um estado criou uma lei estadual aumentando a velocidade máxima nas rodovias estaduais.

A lei estadual invade competência privativa da União (Código de Trânsito Brasileiro — Lei nº 9.503/1997) e é **inconstitucional**, pois legislação sobre trânsito é matéria de competência privativa federal.`,
    references: [
      'Constituição Federal de 1988, arts. 1º, 18, 21–30.',
      'Lei nº 9.503/1997 (Código de Trânsito Brasileiro).',
      'MORAES, Alexandre de. Direito Constitucional. 40. ed. São Paulo: Atlas, 2024.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-const-3-1',
        type: 'multiple-choice',
        stem: 'Quais são os entes que compõem a Federação brasileira, segundo o art. 18 da CF/88?',
        options: [
          { id: 'a', text: 'União, Estados e Municípios.' },
          { id: 'b', text: 'União, Estados, Distrito Federal e Municípios.' },
          { id: 'c', text: 'Governo Federal, Governos Estaduais e Câmaras Municipais.' },
          { id: 'd', text: 'União, Territórios, Estados e Municípios.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 18 da CF/88 dispõe: "A organização político-administrativa da República Federativa do Brasil compreende a União, os Estados, o Distrito Federal e os Municípios, todos autônomos, nos termos desta Constituição."',
      },
      {
        id: 'q-const-3-2',
        type: 'multiple-choice',
        stem: 'Um município criou uma lei disciplinando serviço de transporte coletivo urbano local. Isso é:',
        options: [
          { id: 'a', text: 'Inconstitucional, pois transporte é competência privativa da União.' },
          {
            id: 'b',
            text: 'Constitucional, pois o art. 30, V, da CF/88 prevê que os municípios podem organizar e prestar serviços de transporte coletivo de caráter essencialmente local.',
          },
          {
            id: 'c',
            text: 'Constitucional apenas se autorizado pelo Estado.',
          },
          {
            id: 'd',
            text: 'Inconstitucional, pois apenas o Distrito Federal pode legislar sobre transporte.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 30, V, da CF/88 confere aos municípios competência para organizar e prestar, diretamente ou sob regime de concessão ou permissão, os serviços públicos de interesse local, incluído o de transporte coletivo, que tem caráter essencial.',
      },
      {
        id: 'q-const-3-3',
        type: 'multiple-choice',
        stem: 'Nas competências legislativas concorrentes (art. 24, CF/88), qual é o papel da União e dos estados?',
        options: [
          {
            id: 'a',
            text: 'A União e os estados legislam de forma completamente independente.',
          },
          {
            id: 'b',
            text: 'A União estabelece normas gerais; os estados suplementam, adaptando às realidades locais.',
          },
          {
            id: 'c',
            text: 'Os estados têm prioridade; a União só legisla se os estados se omitirem.',
          },
          {
            id: 'd',
            text: 'Apenas os municípios podem legislar em matérias concorrentes.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 24, §§1º e 2º, da CF/88 estabelece que, na competência legislativa concorrente, cabe à União legislar sobre normas gerais e aos estados suplementar essas normas. Se a União não legislar sobre normas gerais, os estados podem exercer competência plena (§3º).',
      },
      {
        id: 'q-const-3-4',
        type: 'multiple-choice',
        stem: 'A vedação à secessão (separação de um ente federativo do restante do país) no Brasil está vinculada ao princípio da:',
        options: [
          { id: 'a', text: 'Autonomia federativa.' },
          { id: 'b', text: 'Indissolubilidade do vínculo federativo.' },
          { id: 'c', text: 'Separação dos poderes.' },
          { id: 'd', text: 'Subsidiariedade.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 1º da CF/88 proclama o Brasil como "União indissolúvel dos Estados e Municípios e do Distrito Federal". A indissolubilidade é uma cláusula pétrea implícita — nenhum ente pode se separar da federação. A intervenção federal (art. 34) pode ser decretada justamente para manter a integridade nacional.',
      },
      {
        id: 'q-const-3-5',
        type: 'multiple-choice',
        stem: 'O Distrito Federal acumula competências de que entes da federação?',
        options: [
          { id: 'a', text: 'Apenas da União.' },
          { id: 'b', text: 'Apenas dos municípios.' },
          { id: 'c', text: 'De estados e municípios.' },
          { id: 'd', text: 'De todos os entes, inclusive da União.' },
        ],
        correctOptionId: 'c',
        explanation:
          'O Distrito Federal, por não ser dividido em municípios (art. 32, CF/88), acumula as competências legislativas reservadas aos estados e municípios. Assim, a Câmara Legislativa do DF legisla sobre matérias estaduais e municipais.',
      },
    ],
  },

  // ─── Lição C-4: Separação dos Poderes ────────────────────
  {
    id: 'lesson-const-4',
    trailId: 'trail-constitucional',
    order: 4,
    title: 'Separação dos Poderes',
    description: 'Teoria e prática da separação dos poderes e do sistema de freios e contrapesos.',
    learningObjective:
      'Compreender o sistema de freios e contrapesos entre os poderes da República.',
    explanation: `A **separação dos poderes** é princípio constitucional (art. 2º, CF/88) que divide as funções estatais entre o **Poder Legislativo**, o **Poder Executivo** e o **Poder Judiciário**, de forma independente e harmônica.

**Origem histórica**: Montesquieu (1748), "O Espírito das Leis" — propôs a tripartição para evitar a concentração de poder e o despotismo.

**Funções típicas:**
- **Legislativo**: criar as leis (Congresso Nacional, Assembleias Legislativas, Câmaras Municipais).
- **Executivo**: administrar e executar as leis (Presidente, Governadores, Prefeitos).
- **Judiciário**: aplicar as leis e resolver conflitos (STF, STJ, TJs, TRFs, juízes).

**Funções atípicas**: cada poder também exerce funções típicas dos outros:
- O Legislativo julga (ex.: impeachment pelo Senado — art. 52, I, CF/88).
- O Executivo legisla (ex.: medidas provisórias — art. 62, CF/88).
- O Judiciário administra (ex.: concursos para magistratura).

**Freios e contrapesos (checks and balances):** mecanismos que permitem a cada poder controlar os demais:
- O Presidente pode vetar leis; o Congresso pode derrubar o veto e decretar impeachment.
- O STF pode declarar leis inconstitucionais; o Congresso pode emendar a Constituição (com limites).`,
    practicalExample: `O Presidente da República editou uma medida provisória (MP) com força de lei (art. 62, CF/88). O Congresso Nacional tem 120 dias para apreciá-la.

Se o Congresso rejeitar a MP: ela perde a validade — freio do Legislativo sobre o Executivo.

Se o STF decidir que a MP é inconstitucional: ela é afastada — freio do Judiciário sobre o Executivo.

Esse jogo de controles recíprocos é o sistema de freios e contrapesos.`,
    references: [
      'Constituição Federal de 1988, arts. 2º, 44, 52, I, 62, 76 e 92.',
      'MONTESQUIEU, Charles-Louis. O Espírito das Leis. Trad. Cristina Murachco. São Paulo: Martins Fontes, 2000.',
      'MENDES, Gilmar Ferreira; BRANCO, Paulo Gustavo Gonet. Curso de Direito Constitucional. 18. ed. São Paulo: Saraiva, 2023.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-const-4-1',
        type: 'multiple-choice',
        stem: 'O art. 2º da CF/88 afirma que os três poderes são "independentes e harmônicos entre si". O que significa a harmonia entre os poderes?',
        options: [
          { id: 'a', text: 'Os poderes devem sempre concordar entre si.' },
          {
            id: 'b',
            text: 'Os poderes se controlam mutuamente (freios e contrapesos), sem que nenhum seja absoluto ou subordinado ao outro.',
          },
          { id: 'c', text: 'O Poder Judiciário é hierarquicamente superior aos demais.' },
          { id: 'd', text: 'O Poder Executivo coordena os demais poderes.' },
        ],
        correctOptionId: 'b',
        explanation:
          'A harmonia entre os poderes não significa concordância absoluta, mas equilíbrio: cada poder tem mecanismos para controlar os excessos dos demais, garantindo que nenhum seja absoluto. A independência garante autonomia funcional; a harmonia, o equilíbrio do sistema.',
      },
      {
        id: 'q-const-4-2',
        type: 'multiple-choice',
        stem: 'O julgamento do Presidente da República por crime de responsabilidade pelo Senado Federal (impeachment) é um exemplo de:',
        options: [
          { id: 'a', text: 'Função típica do Poder Legislativo.' },
          { id: 'b', text: 'Função atípica do Poder Legislativo (função jurisdicional).' },
          { id: 'c', text: 'Função típica do Poder Judiciário.' },
          { id: 'd', text: 'Função atípica do Poder Executivo.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O impeachment pelo Senado Federal (art. 52, I, CF/88) é uma função atípica do Poder Legislativo — trata-se de função de natureza jurisdicional (julgamento), exercida por um órgão cuja função típica é legislar. O STF atua apenas como presidente do julgamento nos casos previstos.',
      },
      {
        id: 'q-const-4-3',
        type: 'multiple-choice',
        stem: 'As medidas provisórias editadas pelo Presidente da República (art. 62, CF/88) são exemplo de:',
        options: [
          { id: 'a', text: 'Função típica do Poder Executivo.' },
          { id: 'b', text: 'Função atípica do Poder Executivo (função normativa/legislativa).' },
          { id: 'c', text: 'Função típica do Poder Legislativo delegada ao Executivo.' },
          { id: 'd', text: 'Função jurisdicional do Executivo.' },
        ],
        correctOptionId: 'b',
        explanation:
          'As medidas provisórias têm força de lei e são editadas pelo Presidente — função normativa típica do Legislativo exercida atipicamente pelo Executivo. A CF/88 permite essa exceção em casos de relevância e urgência, mas o Congresso deve apreciá-las em 120 dias.',
      },
      {
        id: 'q-const-4-4',
        type: 'multiple-choice',
        stem: 'Qual teórico político sistematizou a teoria da separação dos poderes em sua obra "O Espírito das Leis" (1748)?',
        options: [
          { id: 'a', text: 'Jean-Jacques Rousseau.' },
          { id: 'b', text: 'John Locke.' },
          { id: 'c', text: 'Montesquieu.' },
          { id: 'd', text: 'Thomas Hobbes.' },
        ],
        correctOptionId: 'c',
        explanation:
          'Charles-Louis de Secondat, barão de Montesquieu, sistematizou a tripartição dos poderes em "O Espírito das Leis" (1748). Locke também propôs uma divisão (legislativo, executivo e federativo), mas foi Montesquieu quem desenvolveu o modelo tripartite que influenciou as constituições modernas.',
      },
      {
        id: 'q-const-4-5',
        type: 'multiple-choice',
        stem: 'O STF declara inconstitucional uma lei aprovada pelo Congresso. O Congresso, insatisfeito, pode reagir constitucionalmente de qual forma?',
        options: [
          { id: 'a', text: 'Não pode fazer nada — a decisão do STF é sempre definitiva.' },
          {
            id: 'b',
            text: 'Pode aprovar emenda constitucional para constitucionalizar o conteúdo (salvo cláusulas pétreas) ou suprimir a norma por outra via.',
          },
          { id: 'c', text: 'Pode revogar a decisão do STF por maioria simples.' },
          { id: 'd', text: 'Pode aprovar nova lei com o mesmo conteúdo e ela prevalecerá.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O Congresso pode reagir a decisões do STF aprovando emendas constitucionais que constitucionalizem o que foi declarado inconstitucional (o chamado "diálogo constitucional"), desde que não haja violação de cláusulas pétreas (art. 60, §4º, CF/88). Isso demonstra que o sistema de freios e contrapesos é dinâmico.',
      },
    ],
  },

  // ─── Lição C-5: Controle de Constitucionalidade ──────────
  {
    id: 'lesson-const-5',
    trailId: 'trail-constitucional',
    order: 5,
    title: 'Controle de Constitucionalidade',
    description: 'Introdução ao controle concentrado e difuso no sistema brasileiro.',
    learningObjective:
      'Diferenciar os sistemas de controle de constitucionalidade e identificar suas principais ações.',
    explanation: `**Controle de constitucionalidade** é o mecanismo pelo qual se verifica se as normas jurídicas são compatíveis com a Constituição. Nomas incompatíveis são declaradas inconstitucionais e afastadas.

**Sistemas de controle:**

**1. Controle difuso (incidental ou concreto):**
- Qualquer juiz ou tribunal pode afastar a aplicação de uma lei inconstitucional no caso concreto.
- A inconstitucionalidade é arguida como questão prejudicial (incidente) ao julgamento.
- Origem: EUA — Marbury vs. Madison (1803).
- No Brasil: qualquer instância do Judiciário pode exercer.

**2. Controle concentrado (abstrato):**
- Exercido exclusivamente pelo STF (e TJs estaduais para leis locais).
- A inconstitucionalidade é o próprio objeto da ação (análise em abstrato — sem caso concreto).
- **Principais ações:**
  - **ADI** (Ação Direta de Inconstitucionalidade) — art. 102, I, a, CF/88.
  - **ADC** (Ação Declaratória de Constitucionalidade) — art. 102, I, a, CF/88.
  - **ADPF** (Arguição de Descumprimento de Preceito Fundamental) — art. 102, §1º, CF/88.
  - **ADO** (Ação Direta de Inconstitucionalidade por Omissão) — art. 103, §2º, CF/88.

**Efeitos das decisões:**
- Difuso: *inter partes* (entre as partes do processo) e *ex tunc* (retroativos).
- Concentrado: *erga omnes* (para todos) e vinculante.`,
    practicalExample: `Em um processo trabalhista, o juiz entende que um artigo da CLT viola o art. 7º da CF/88. Ele pode, de ofício, afastar a aplicação daquele artigo no caso concreto (controle difuso).

A mesma questão pode chegar ao STF por ADI, proposta pelo Procurador-Geral da República. Se o STF declarar a inconstitucionalidade em ADI, a decisão valerá para todos (erga omnes) e vincula os demais órgãos do Judiciário e a Administração Pública.`,
    references: [
      'Constituição Federal de 1988, arts. 97, 102, I, a, 102, §1º e 103, §2º.',
      'Lei nº 9.868/1999 (ADI e ADC).',
      'Lei nº 9.882/1999 (ADPF).',
      'MENDES, Gilmar Ferreira; BRANCO, Paulo Gustavo Gonet. Curso de Direito Constitucional. 18. ed. São Paulo: Saraiva, 2023.',
    ],
    xpReward: 25,
    questions: [
      {
        id: 'q-const-5-1',
        type: 'multiple-choice',
        stem: 'Qual é a principal diferença entre o controle difuso e o controle concentrado de constitucionalidade?',
        options: [
          {
            id: 'a',
            text: 'No difuso, apenas o STF pode declarar inconstitucionalidade; no concentrado, qualquer juiz pode.',
          },
          {
            id: 'b',
            text: 'No difuso, qualquer juiz pode afastar a lei no caso concreto; no concentrado, apenas o STF (ou TJ) aprecia a constitucionalidade em abstrato.',
          },
          {
            id: 'c',
            text: 'O difuso analisa leis federais; o concentrado analisa apenas leis estaduais.',
          },
          {
            id: 'd',
            text: 'No difuso, a decisão vale para todos (erga omnes); no concentrado, vale apenas entre as partes.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'No controle difuso, qualquer órgão do Poder Judiciário pode, incidentalmente num caso concreto, afastar a aplicação de uma norma inconstitucional. No controle concentrado, o STF (ou TJ, para leis locais) é o órgão exclusivo e analisa a constitucionalidade em abstrato, como objeto principal da ação.',
      },
      {
        id: 'q-const-5-2',
        type: 'multiple-choice',
        stem: 'A Ação Direta de Inconstitucionalidade (ADI) tem como finalidade:',
        options: [
          {
            id: 'a',
            text: 'Declarar inconstitucional um ato normativo federal ou estadual em face da Constituição Federal, com efeitos erga omnes.',
          },
          {
            id: 'b',
            text: 'Declarar constitucional uma norma que está sendo questionada na Justiça.',
          },
          {
            id: 'c',
            text: 'Proteger direito individual violado por ato do Poder Público.',
          },
          {
            id: 'd',
            text: 'Cobrar do Estado a criação de leis omitidas.',
          },
        ],
        correctOptionId: 'a',
        explanation:
          'A ADI (art. 102, I, a, CF/88) é proposta perante o STF para declarar a inconstitucionalidade de lei ou ato normativo federal ou estadual. A decisão tem efeitos erga omnes (vale para todos) e vinculante (vincula todos os órgãos do Judiciário e a Administração Pública).',
      },
      {
        id: 'q-const-5-3',
        type: 'multiple-choice',
        stem: 'No controle difuso de constitucionalidade, quando um tribunal (colegiado) vai declarar a inconstitucionalidade de uma lei, deve observar o que?',
        options: [
          { id: 'a', text: 'A decisão deve ser unânime entre os membros do tribunal.' },
          {
            id: 'b',
            text: 'A declaração de inconstitucionalidade exige maioria absoluta dos membros do tribunal ou de seu órgão especial (cláusula de reserva de plenário — art. 97, CF/88).',
          },
          { id: 'c', text: 'A decisão deve ser remetida automaticamente ao STF para confirmação.' },
          { id: 'd', text: 'Apenas o STF pode declarar inconstitucionalidade, mesmo em controle difuso.' },
        ],
        correctOptionId: 'b',
        explanation:
          'O art. 97 da CF/88 consagra a cláusula de reserva de plenário (full bench): a declaração de inconstitucionalidade de lei ou ato normativo por tribunal exige maioria absoluta de seus membros ou do órgão especial. Sem essa maioria, o tribunal não pode declarar a inconstitucionalidade.',
      },
      {
        id: 'q-const-5-4',
        type: 'multiple-choice',
        stem: 'A Arguição de Descumprimento de Preceito Fundamental (ADPF) é utilizada para:',
        options: [
          {
            id: 'a',
            text: 'Questionar atos do Poder Executivo que não cabem em ADI, como leis municipais e atos anteriores à CF/88.',
          },
          {
            id: 'b',
            text: 'Garantir o direito de greve dos servidores públicos.',
          },
          {
            id: 'c',
            text: 'Solicitar ao STF que edite súmula vinculante.',
          },
          {
            id: 'd',
            text: 'Impugnar exclusivamente leis federais de natureza tributária.',
          },
        ],
        correctOptionId: 'a',
        explanation:
          'A ADPF (art. 102, §1º, CF/88, regulada pela Lei nº 9.882/1999) tem caráter subsidiário: é utilizada quando não couber outra ação do controle concentrado. É cabível para questionar leis municipais, atos normativos anteriores à CF/88 (direito pré-constitucional) e atos concretos do Poder Público que violem preceitos fundamentais.',
      },
      {
        id: 'q-const-5-5',
        type: 'multiple-choice',
        stem: 'Numa decisão em ADI, o STF declara inconstitucional um artigo de lei. Quais são os efeitos típicos dessa decisão?',
        options: [
          {
            id: 'a',
            text: 'Efeitos inter partes (apenas para quem entrou com a ação) e ex nunc (a partir da decisão).',
          },
          {
            id: 'b',
            text: 'Efeitos erga omnes (para todos), vinculante e ex tunc (retroativo à origem da lei), salvo modulação temporal.',
          },
          {
            id: 'c',
            text: 'Efeitos apenas para as instâncias inferiores, sem vincular o Executivo.',
          },
          {
            id: 'd',
            text: 'Efeitos inter partes e vinculante apenas para a Administração Federal.',
          },
        ],
        correctOptionId: 'b',
        explanation:
          'As decisões do STF em controle concentrado (ADI, ADC, ADPF) têm efeitos erga omnes (valem para todos) e efeito vinculante (vinculam todos os órgãos do Judiciário e a Administração Pública). Em regra, os efeitos são ex tunc (retroativos — a lei é nula desde sua origem), mas o STF pode modular os efeitos no tempo (art. 27, Lei nº 9.868/1999).',
      },
    ],
  },
]
