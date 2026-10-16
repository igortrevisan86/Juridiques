# Juridiquês 📚⚖️

**Aprenda vocabulário jurídico de forma gamificada.**

Aplicação web educacional para estudantes de Direito, com **lições de vocabulário por sinônimos** como experiência principal, trilhas complementares sobre as áreas do Direito, exercícios interativos e sistema de gamificação.

---

## Experiência principal — aprender palavras

- **Lição de vocabulário**: cada questão mostra uma palavra jurídica e quatro alternativas; escolha o sinônimo correto, confirme e receba feedback visual de acerto ou erro com a mini-explicação do termo.
- **15 lições de vocabulário organizadas em 3 unidades** (5 lições cada), alimentadas por `src/content/palavras.json` — fonte única do vocabulário com **152 termos** (150 em lições + 2 reservados para expansão editorial).
- **Caminho de aprendizagem** na home: cartão principal (continuar de onde parou / ver todas as trilhas), caminho visual por unidade (concluída ✓ verde, atual roxo com CTA Iniciar/Continuar, bloqueada com cadeado) e coluna lateral com nível, progresso geral, XP, sequência e revisão.
- **Revisão** (`/revisao`): palavras respondidas incorretamente entram automaticamente na lista; acertá-las em uma sessão de revisão as remove. Uma palavra só é considerada **dominada** após acerto na lição e, se já errou, acerto na revisão — rastreado em `vocab.wordStats`.
- **Desbloqueio progressivo** entre lições, XP por conclusão e conquistas — os mesmos mecanismos das trilhas clássicas.

## Conteúdo complementar — Explorar o Direito

As trilhas originais sobre as áreas do Direito (Introdução, Civil e Constitucional) continuam completas e acessíveis na home, com seu conteúdo teórico, exemplos práticos e referências preservados.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| UI | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Estilo | Tailwind CSS v4 |
| Roteamento | React Router v7 |
| Ícones | Lucide React |
| Testes | Vitest + React Testing Library |

---

## Início rápido

### Pré-requisitos

- Node.js 22.19+ (recomendado: 24 LTS)
- npm 10+

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

### Testes

```bash
npm test                  # execução única
npm run test:watch        # modo watch
npm run test:coverage     # com cobertura
```

### Build de produção

```bash
npm run build
```

Os arquivos de saída ficam em `dist/`. O site é estático e pode ser publicado em qualquer CDN (Vercel, Netlify, GitHub Pages, etc.).

### Publicação (Netlify CLI)

```bash
npx netlify deploy --dir=dist --prod
```

### Publicação (GitHub Pages)

Configure `base` no `vite.config.ts` com o nome do repositório:

```bash
npx gh-pages -d dist
```

---

## Estrutura do projeto

```
src/
  app/                 → App.tsx, roteamento raiz
  components/
    ui/                → Componentes de interface genéricos
    layout/            → Layout, navegação global
    learning/          → Componentes de aprendizagem (QuestionView, LessonNode, TrailCard, UnitPath)
  pages/               → Home, Trail, Lesson, Result + Vocab, VocabLesson, Review
  features/
    learning/          → Lógica de exercícios e questões
    progress/          → Contexto e estado de progresso
    gamification/      → XP, níveis, conquistas
    vocab/             → Catálogo (palavras.json), gerador de questões de sinônimos e regras de dominação (mastery)
  content/             → Trilhas/lições (TypeScript estático) + palavras.json
  services/            → progressService.ts (localStorage)
  hooks/               → Hooks reutilizáveis
  types/               → Tipos TypeScript centrais
  utils/               → xp.ts, streak.ts, unlock.ts
  styles/              → globals.css
  test/                → setup.ts, testes
  main.tsx             → Ponto de entrada
```

---

## Conteúdo

**Vocabulário: 152 termos em 15 lições organizadas em 3 unidades + revisão**, carregados de `src/content/palavras.json`
(cada item tem `id`, `palavra`, `sinonimo`, `explicacao`, `categoria`, `contexto`).
As questões são geradas em tempo de execução com semente determinística por tentativa:
resposta correta = `sinonimo`; distratores priorizam a mesma categoria e excluem duplicatas e radicais em comum. Termos sem 3 distratores adequados são omitidos e registrados para revisão editorial (`getCatalogIssues()`). Dois termos excedentes (152 = 15 × 10 + 2) são registrados por `getUnusedWordIds()` — nada é descartado nem duplicado.

**Unidades do vocabulário** (derivadas dos dados):

| Unidade | Lições |
|---|---|
| Termos essenciais | 5 lições (vocab-lesson-1..5) |
| Processo e procedimentos | 5 lições (vocab-lesson-6..10) |
| Direitos e obrigações | 5 lições (vocab-lesson-11..15) |

**Trilhas complementares — 3 trilhas, 15 lições, 75 questões (preservadas):**

| Trilha | Lições |
|---|---|
| A — Introdução ao Direito | Conceito de Direito, Normas Jurídicas, Princípios Jurídicos, Fontes do Direito, Legislação/Doutrina/Jurisprudência |
| B — Direito Civil | Introdução ao Direito Civil, Obrigações, Contratos, Inadimplemento, Responsabilidade Civil |
| C — Direito Constitucional | Conceito de Constituição, Direitos Fundamentais, Organização do Estado, Separação dos Poderes, Controle de Constitucionalidade |

---

## Gamificação

- **XP**: 25 pontos por primeira conclusão de cada lição (lições de vocabulário incluídas); refazer não concede XP novo.
- **Níveis**: 7 títulos (Aprendiz → Estudioso → Avançado → Especialista → Bacharel → Mestre → Jurisconsulto), com os mesmos limiares de XP do sistema anterior — ninguém perde nível com a atualização. A pontuação de nível soma XP + 25 pontos por palavra dominada; a interface exibe o título, palavras dominadas, meta da próxima etapa e barra de progresso.
- **Sequência diária**: registrada no fuso `America/Sao_Paulo`.
- **Conquistas**: Primeira Lição, Cinco Lições, Trilha Completa, Três Dias Seguidos e Primeira Palavra (vocabulário).
- **Desbloqueio**: cada lição requer a conclusão da anterior (trilhas e vocabulário).
- **Revisão e dominação**: erro em palavra de vocabulário marca para revisão (`wrongWords`); acerto em sessão de revisão remove a marca. Uma palavra é dominada com acerto na lição e, se já errou, acerto na revisão — rastreado em `vocab.wordStats` (adicionado retrocompatívelmente, sem apagar dados existentes).

---

## Progresso local

O progresso é salvo automaticamente no `localStorage` com a chave `juridiques.progress.v1`
(o formato interno evoluiu para a versão 2 — dados salvos na versão 1 são migrados
automaticamente ao carregar, preservando XP, lições, conquistas e sequência; nada é apagado).

> ⚠️ O progresso é local. Limpar os dados do navegador ou usar outro dispositivo apagará o progresso. Não há backup, exportação ou importação.

---

## Privacidade

Nenhum dado é enviado a servidores externos. O aplicativo funciona completamente offline após o carregamento inicial.

---

## Aviso legal

O conteúdo tem fins exclusivamente educacionais e não constitui aconselhamento jurídico individual. As referências legais foram verificadas com base na legislação brasileira em vigor até a data de publicação do conteúdo.

---

## Licença

MIT
