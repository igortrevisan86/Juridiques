# Juridiquês 📚⚖️

**Aprenda Direito de forma gamificada.**

Aplicação web educacional para estudantes de Direito, com trilhas de aprendizagem, exercícios interativos e sistema de gamificação.

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

- Node.js 20+
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
    learning/          → Componentes de aprendizagem
  pages/               → Páginas (Home, Trail, Lesson, Result)
  features/
    learning/          → Lógica de exercícios e questões
    progress/          → Contexto e estado de progresso
    gamification/      → XP, níveis, conquistas
  content/             → Trilhas, lições e questões (TypeScript estático)
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

**3 trilhas, 15 lições, 75 questões:**

| Trilha | Lições |
|---|---|
| A — Introdução ao Direito | Conceito de Direito, Normas Jurídicas, Princípios Jurídicos, Fontes do Direito, Legislação/Doutrina/Jurisprudência |
| B — Direito Civil | Introdução ao Direito Civil, Obrigações, Contratos, Inadimplemento, Responsabilidade Civil |
| C — Direito Constitucional | Conceito de Constituição, Direitos Fundamentais, Organização do Estado, Separação dos Poderes, Controle de Constitucionalidade |

---

## Gamificação

- **XP**: 25 pontos por primeira conclusão de cada lição.
- **Níveis**: 7 níveis (Iniciante → Jurisconsulto), calculados deterministicamente pelo XP.
- **Sequência diária**: registrada no fuso `America/Sao_Paulo`.
- **Conquistas**: Primeira Lição, Cinco Lições, Trilha Completa, Três Dias Seguidos.
- **Desbloqueio**: cada lição requer a conclusão da anterior na mesma trilha.

---

## Progresso local

O progresso é salvo automaticamente no `localStorage` com a chave `juridiques.progress.v1`.

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
