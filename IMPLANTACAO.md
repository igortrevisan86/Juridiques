# IMPLANTACAO — Juridiquês

Registro fiel da implementação, etapa por etapa. Documento atualizado em **13/10/2026**.

---

## 1. Visão geral

Aplicação educacional gamificada de Direito (React 19 + TypeScript + Vite 8 + Tailwind CSS 4).
Conteúdo estático em TypeScript, progresso em `localStorage`, sem backend.

## 2. Comandos

| Ação | Comando |
|---|---|
| Instalar dependências | `npm install` |
| Desenvolvimento | `npm run dev` (ou `iniciar.bat` no Windows) |
| Encerrar dev server | `Ctrl+C` no terminal |
| Testes (execução única) | `npm test` |
| Testes (watch) | `npm run test:watch` |
| Build de produção | `npm run build` |
| Preview do build | `npm run preview` |
| Lint | `npm run lint` |

### Inicializador Windows — `iniciar.bat`

- Verifica se `node` e `npm` estão no PATH (mensagem de erro clara caso contrário).
- **Valida a versão mínima do Node (22.19+)** exigida pelas dependências de teste.
- Instala dependências automaticamente se `node_modules` não existir.
- Inicia `npm run dev`, abre o navegador em `http://localhost:5173`.
- Encerre com `Ctrl+C`.

---

## 3. Design system — Paleta Elegante e Jurídica (etapa em andamento)

### Tokens de cor (definidos em `src/styles/globals.css`, seção `@theme` + `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--color-navy-500/600/700` | `#4058B8` / `#1E3A8A` / `#1A3276` | Azul-marinho: cor principal, botões primários, marca |
| `--color-violet-500/600/700` | `#8B5CF6` / `#7C4DE8` / `#6D3FD1` | Violeta: gamificação (nível, sequência, conquistas) |
| `--color-turq-500/600/700` | `#14B8A6` / `#0E9A8C` / `#0B7D72` | Turquesa: progresso, sucesso, respostas corretas |
| `--color-gold-500/600/700` | `#E5A000` / `#C68800` / `#9E6D00` | Amarelo: XP e recompensas |
| `--color-red-600/700` | `#DC2626` / `#B91C1C` | Erros e respostas incorretas |
| Fundo/cartões/texto/bordas | `#F8FAFC` / `#FFFFFF` / `#0F172A` / `#64748B` / `#E2E8F0` | Neutros (inalterados) |

Cada família possui escala completa (50–900) com variações para hover, foco, superfícies claras e texto.

### Arquivos modificados nesta etapa

- `src/styles/globals.css` — tokens `@theme` (Tailwind 4), classes `.btn*`, `.progress-bar-*`, `.badge`, `prefers-reduced-motion`.
- `src/components/ui/LevelIndicator.tsx` — **correção do bug**: número do nível sobreposto ao texto de XP; agora com `shrink-0` + `whitespace-nowrap` e layout por `baseline`.
- `src/components/ui/XpBadge.tsx`, `StreakBadge.tsx`, `ProgressBar.tsx` — novos tokens.
- `src/components/layout/Header.tsx`, `AppLayout.tsx` — marca em marinho, gamificação em violeta, larguras responsivas.
- `src/components/learning/TrailCard.tsx`, `LessonNode.tsx`, `QuestionView.tsx` — estados com a nova paleta.
- `src/components/ui/ConfirmModal.tsx`, `RichText.tsx` — superfícies e variantes.
- `src/pages/HomePage.tsx`, `TrailPage.tsx`, `LessonPage.tsx`, `ResultPage.tsx` — aplicação da paleta em todas as rotas.
- `src/content/trails.ts` — cores das trilhas alinhadas à paleta (marinho, turquesa, violeta).
- `index.html` — `theme-color` atualizado para `#1E3A8A`.
- `iniciar.bat` — verificação explícita de Node.js e npm.

### Testes executados (resultados reais — 13/10/2026)

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ 0 erros; 1 warning conhecido (`only-export-components` em `ProgressContext.tsx`, pré-existente e benigno) |
| `npm run build` | ✅ `tsc -b` sem erros + `vite build` OK (CSS 31,34 kB / JS 390,06 kB) |
| `npm test` | ✅ 26/26 testes aprovados em 3 arquivos (smoke: 11, markdown: 8, unlock: 7) |

Verificações adicionais:
- Classes do novo tema confirmadas no CSS de produção gerado: `bg-navy-600`, `text-gold-700`, `bg-aqua-100`, `text-plum-500`, `border-aqua-300` e bloco `prefers-reduced-motion` presentes em `dist/assets/*.css`.
- Busca por cores fixas antigas (`blue-*`, `green-*`, `purple-*`, `yellow-*`, `orange-*` do Tailwind padrão) no `src/` retorna 0 ocorrências — todas substituídas pelos tokens.
- Dev server com HMR ativo durante a implementação: todas as páginas (Home, Trilha, Lição, Resultado) recarregaram sem erro de compilação.

---

## 4. Modo claro e modo escuro (implementado em 13/10/2026)

### Como funciona o seletor

- `ThemeToggle` no `Header` (visível em todas as rotas, pois o Header vive no `AppLayout`): ícone de **sol** no modo claro, de **lua** no modo escuro, com `aria-label`, `aria-pressed` e `title` coerentes.
- Alternância instantânea, sem recarregar a página: `ThemeProvider` aplica `data-theme="light|dark"` no `<html>`; todo o CSS reage via sobrescrita de variáveis.
- Transição suave de 0,2s em fundo/texto (desligada por `prefers-reduced-motion`).

### Persistência

- Chave específica **`juridiques.theme.v1`** no `localStorage` (independente de `juridiques.progress.v1` — XP, conquistas e lições nunca são tocados).
- Ordem de resolução: preferência salva → `prefers-color-scheme` do sistema.
- Script inline no `<head>` do `index.html` aplica o tema **antes do primeiro paint** (evita flash branco/escuro).
- Falhas de `localStorage` são capturadas e o tema assume `light` sem quebrar o app.
- O `ThemeProvider` persiste apenas escolhas explícitas do usuário (não grava a preferência do sistema na primeira carga).

### Paletas e variáveis

O mecanismo centralizado usa o fato de que as utilities do Tailwind 4 e as classes `.card`/`.btn` referenciam `var(--color-*)`: o bloco `:root[data-theme='dark']` em `globals.css` sobrescreve os **mesmos tokens**, sem duplicar componentes nem classes.

**Modo claro (inalterado):** marinho `#1E3A8A`, turquesa `#14B8A6`, violeta `#8B5CF6`, amarelo `#E5A000`, fundo `#F8FAFC`, cartões `#FFFFFF`, texto `#0F172A`.

**Modo escuro (paleta 6):**

| Token | Valor |
|---|---|
| `--color-bg-primary` | `#0F172A` |
| `--color-bg-card` / `--color-card` | `#1E293B` |
| `--color-bg-muted` | `#273449` |
| `--color-border` | `#334155` |
| `--color-text-primary` | `#F8FAFC` |
| `--color-text-muted` | `#CBD5E1` |
| `--color-brand-plum` (roxo) | `#7C3AED` |
| `--color-brand-aqua` (ciano) | `#06B6D4` |
| `--color-brand-green` | `#22C55E`* |
| `--color-brand-gold` (amarelo) | `#FACC15` |
| Escalas `navy`, `plum`, `aqua`, `gold`, `red` e a `gray` do Tailwind | reescaladas para superfícies escuras (50–900) |

\* O verde `#22C55E` está disponível como token; o sucesso visual continua usando o ciano `#06B6D4` da identidade atual, que ocupa o mesmo papel do verde.

Também tematizados via tokens: gradientes de marca (`--grad-brand-*`, `--grad-level-*` → classes `.bg-grad-brand`/`.bg-grad-level`), hovers de botão (`--btn-primary-hover`, `--btn-success-hover/ink`, `--btn-danger-hover`), sombras (`--shadow-card/hover`), foco (`--color-border-focus`), scrollbar e `color-scheme`.

### Superfícies migradas para o token `bg-card`

`bg-white` fixo removido de: `Header`, `footer` do `AppLayout`, `LessonNode` (disponível) e `QuestionView` (alternativas). Único `bg-white` restante foi eliminado; agora ambos os temas usam `--color-card`.

### Arquivos modificados/criados nesta etapa

| Arquivo | Mudança |
|---|---|
| `src/services/themeService.ts` | **novo** — carga/persistência/system fallback da preferência |
| `src/features/theme/context.ts` | **novo** — `ThemeContext` (arquivo separado p/ Fast Refresh e p/ evitar colisão de casing no Windows) |
| `src/features/theme/ThemeContext.tsx` | **novo** — `ThemeProvider` (aplica `data-theme`, persiste escolhas) |
| `src/hooks/useTheme.ts` | **novo** — hook com checagem de provider |
| `src/components/ui/ThemeToggle.tsx` | **novo** — botão sol/lua acessível |
| `src/app/App.tsx` | `ThemeProvider` envolvendo a app |
| `src/components/layout/Header.tsx` | adiciona `ThemeToggle`; header e tile da marca via tokens (`bg-card/90`, `.bg-grad-brand`) |
| `src/components/layout/AppLayout.tsx` | footer `bg-white` → `bg-card` |
| `src/components/learning/LessonNode.tsx` | nó disponível `bg-white` → `bg-card` |
| `src/components/learning/QuestionView.tsx` | alternativa padrão `bg-white` → `bg-card` |
| `src/components/ui/LevelIndicator.tsx` | gradiente do tile → `.bg-grad-level` |
| `src/styles/globals.css` | token `--color-card`, bloco `:root[data-theme='dark']`, gradientes/botões/scrollbar/transição por tema |
| `index.html` | script anti-flash no `<head>` |
| `src/test/theme.test.tsx` | **novo** — 11 testes (serviço + componente) |

### Testes executados — modo escuro (resultados reais — 13/10/2026)

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ 0 erros; 1 warning pré-existente (`ProgressContext.tsx`) |
| `npm test` | ✅ **37/37** em 4 arquivos (smoke 11, markdown 8, unlock 7, theme 11) |
| `npm run build` | ✅ `tsc -b` + `vite build`; CSS de produção contém `:root[data-theme=dark]` com os tokens e o script anti-flash está no `dist/index.html` |

Cobertura dos testes de tema: chave `juridiques.theme.v1`; restauração da preferência salva; fallback para o sistema; valor inválido ignorado; storage falhando sem lançar erro; `data-theme` no raiz ao montar; alternância com persistência; rótulo/`aria-pressed` acessível; tema escuro salvo restaurado na montagem.

### Pendências / próximos passos

- Verificação visual manual nos dois temas em todas as rotas (exercícios, resultado, conquistas) — automatização de screenshot não incluída.
- As cores fixas das trilhas em `trails.ts` (hex em `style` inline) são idênticas nos dois temas; se desejar, podem virar tokens CSS posteriormente.
- Teste manual interativo no navegador não automatizado (fluir lição completa, reset) — lógica intocada, regras cobertas por testes de unidade.

---

## 5. Publicação no GitHub Pages (implementado em 13/10/2026)

### Alterações

| Arquivo | Mudança |
|---|---|
| `src/app/App.tsx` | `BrowserRouter` → **`HashRouter`** (Pages não serve rotas SPA; URLs viram `/#/trilha/...`, `/#/licao/...`) |
| `vite.config.ts` | `base: '/Juridiques/'` **apenas em produção** (dev continua na raiz — `iniciar.bat` e `npm run dev` intactos) |
| `.github/workflows/deploy.yml` | **novo** — deploy automático em push para `main`: `npm ci` → lint → testes → build → `actions/deploy-pages@v4` |

### Como publicar

1. Faça push do repositório para o GitHub (branch `main`).
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada push em `main` roda lint + testes + build e publica automaticamente.
4. O site fica em `https://<usuario>.github.io/Juridiques/` (exemplo de rota: `https://<usuario>.github.io/Juridiques/#/licao/lesson-intro-1`).
5. Disparo manual também é possível via **Actions → Deploy to GitHub Pages → Run workflow**.

### Verificações executadas (resultados reais — 13/10/2026)

| Comando | Resultado |
|---|---|
| `npm run build` | ✅ build OK; `dist/index.html` referencia `/Juridiques/assets/*` e `/Juridiques/favicon.svg` |
| `npm test` | ✅ 37/37 (HashRouter não afeta os testes existentes) |
| `npm run lint` | ✅ 0 erros (1 warning pré-existente) |

### Observações

- Progresso e tema continuam em `localStorage` — funcionam normalmente no Pages.
- Se um dia migrar para domínio customizado, ajuste ou remova o `base` no `vite.config.ts`.
- Alternativa sem Actions: `npx gh-pages -d dist` (publica o `dist` já buildado na branch `gh-pages`; configure Pages para servir dessa branch).
- O repositório precisa existir com o nome `Juridiques` (ou ajuste do `base` para o nome real do repositório).

- O repositório precisa existir com o nome `Juridiques` (ou ajuste do `base` para o nome real do repositório).

---

## 6. Correção da falha do workflow no GitHub Actions (13/10/2026)

### Sintoma

```text
TypeError: webidl.util.markAsUncloneable is not a function
Error: [vitest-pool]: Failed to start forks worker
```

A etapa de `npm test` falhava no CI (afetando os 4 arquivos de teste), impedindo o build/deploy. `npm ci` e `npm run lint` passavam normalmente.

### Causa-raiz (confirmada)

| Fato | Detalhe |
|---|---|
| Node no CI | `node-version: 20` (via `actions/setup-node@v4`) |
| Cadeia de dependências | `vitest@5` → `jsdom@30.1.2` → **`undici@8.11.2`** |
| `engines` do undici 8.11.2 | `{"node": ">=22.19.0"}` |
| Chamada que quebra | `undici/lib/web/webidl/index.js`: `require('node:worker_threads').markAsUncloneable` |

`worker_threads.markAsUncloneable` **não existe no Node 20** (foi introduzida no linha 22). No CI, `markAsUncloneable` era `undefined`, atribuído a `webidl.util.markAsUncloneable`; ao invocá-lo, o undici lançava `TypeError ... is not a function`, derrubando o worker de forks do Vitest. Localmente os testes passavam porque o ambiente usava **Node 24.19.0**, que já possui a API.

### Correções aplicadas

| Arquivo | Mudança |
|---|---|
| `.github/workflows/deploy.yml` | `node-version: 20` → **`node-version: 24`** (LTS; satisfaz `>=22.19`) |
| `package.json` | Adicionado `"engines": { "node": ">=22.19.0" }` — documenta e protege contra instalação em Node incompatível |
| `iniciar.bat` | Agora valida a **versão mínima** do Node (22.19+) antes de instalar/iniciar, com mensagem clara |

Nenhuma dependência foi alterada — o `package-lock.json` permanece consistente (o `undici@8.11.2` já estava correto; apenas o Node do CI é que era incompatível). Testes não foram desativados nem removidos.

### Versão do Node recomendada

**Node 24 LTS** (usada no CI e recomendada localmente). Mínimo absoluto: **22.19.0**, exigido pelo `undici@8` via `jsdom@30`.

### Ordem do workflow (mantida)

`npm ci` → `npm run lint` → `npm test` → `npm run build` → upload de `dist/`. O job `deploy` roda somente após `needs: build`, ou seja, só publica com build bem-sucedido.

### Validação local executada (resultados reais — Node v24.19.0)

| Comando | Resultado |
|---|---|
| `npm ci` | ✅ 147 pacotes instalados, **0 vulnerabilidades**, lockfile consistente |
| `npm run lint` | ✅ 0 erros (1 warning pré-existente em `ProgressContext.tsx`) |
| `npm test` | ✅ **37/37** — os 4 arquivos que falhavam no CI passaram: `theme.test.tsx` (11), `smoke.test.ts` (11), `markdown.test.ts` (8), `unlock.test.ts` (7) |
| `npm run build` | ✅ `tsc -b` + `vite build`; `dist/index.html` referencia `/Juridiques/assets/*` |

> Limitação: a execução no GitHub Actions em si não pôde ser reproduzida localmente (requer push). A correção de versão é determinística — o CI usará Node 24, mesma versão major deste ambiente validado. Após o push, acompanhe o resultado em **Actions → Deploy to GitHub Pages**.

---

## 7. Evolução incremental — vocabulário por sinônimos (15/10/2026)

### Objetivo

Focar o Juridiquês no aprendizado de palavras jurídicas por associação de sinônimos, mantendo as trilhas sobre as áreas do Direito como conteúdo complementar. Nada foi apagado ou reconstruído: as 3 trilhas, 15 lições, 75 questões, a gamificação, o tema claro/escuro, o HashRouter e o `localStorage` foram preservados.

### Arquivos criados

| Arquivo | Função |
|---|---|
| `src/content/palavras.json` | Fonte única do vocabulário (51 termos; fornecido pelo usuário). |
| `src/features/vocab/catalog.ts` | Valida o JSON (campos, ids únicos), agrupa os termos em 3 lições por categoria e expõe a "trilha" de vocabulário. Registra `getCatalogIssues()` para revisão editorial. |
| `src/features/vocab/questionGenerator.ts` | Gera questões exclusivamente no formato palavra → sinônimo com 4 alternativas. Semente determinística (FNV-1a + mulberry32) por tentativa (`lessonId:startedAt`). Distratores priorizam a mesma categoria e excluem duplicatas e pares ambíguos (prefixo comum ≥ 6 chars, ex.: "Penalidade" × "Penalidade prevista"). Retorna `null` quando não há 3 distratores adequados — questão não é gerada em vez de forçar alternativas ruins. |
| `src/pages/VocabPage.tsx` | Hub em `/vocabulario`: mapa de lições de vocabulário (reutiliza `LessonNode` e os utilitários de desbloqueio), barra de progresso e acesso à revisão. |
| `src/pages/VocabLessonPage.tsx` | Lição/sessão em `/vocabulario/:lessonId` (inclui `vocab-review`). Reutiliza `QuestionView` (selecionar → confirmar → feedback → avançar), `startAttempt`/`answerQuestion`/`completeLesson` do contexto existente. Mini-explicações (`explicacao`) exibidas após a resposta. |
| `src/pages/ReviewPage.tsx` | `/revisao`: lista de palavras com erros/reforço e CTA para a sessão de revisão. |
| `src/test/vocab.test.ts` | Catálogo (51 termos, ids únicos, cobertura pelas lições), geração (4 alternativas distintas, única resposta correta, determinismo, limite por sessão, ausência de distratores ambíguos, `null` com pool pequeno). |
| `src/test/vocabProgress.test.tsx` | Migração v1→v2, XP sem duplicidade, persistência, marcação/remoção de revisão, fluxo de quiz com feedback, navegação Home (vocabulário + trilhas preservadas). |

### Arquivos modificados (alterações localizadas)

| Arquivo | Mudança |
|---|---|
| `src/types/index.ts` | Novos tipos `Palavra`, `VocabLesson`, `VocabSynonymQuestion`, `ReviewWordEntry`, `VocabProgress`. `UserProgress.version` passa a `1 | 2` e ganha `vocab`. |
| `src/services/progressService.ts` | Chave inalterada (`juridiques.progress.v1`). Versão atual = 2; dados v1 são migrados retrocompativelmente (preserva XP, lições, conquistas, sequência e tentativa), sem apagar nada. Conquistas ausentes em dados antigos recebem "casca" para poderem ser desbloqueadas depois. |
| `src/features/progress/ProgressContext.tsx` | Novo `recordVocabAnswer(wordId, correct, fromReview)`: erro marca para revisão; acerto em revisão remove. Progresso agora é carregado de forma síncrona na montagem (melhora a retoma de quizzes após reload). |
| `src/features/gamification/achievements.ts` | Nova conquista `first-vocab-lesson` ("Primeira Palavra"). Correção do guard `unlockedAt !== null` que impedia conquistas novas em dados antigos de serem desbloqueadas. |
| `src/app/App.tsx` | Rotas novas: `/vocabulario`, `/vocabulario/:lessonId`, `/revisao`. Rotas existentes inalteradas. |
| `src/pages/HomePage.tsx` | Hierarquia reorganizada: "Aprender palavras" (destaque + CTA + revisão) → "Explorar o Direito" (trilhas existentes) → conquistas → reiniciar progresso (modal e confirmação preservados). |
| `src/components/layout/Header.tsx` | Links "Palavras" e "Revisão" (NavLink) além da marca, nível, sequência e tema, que permanecem. |
| `src/components/learning/QuestionView.tsx` | Props relaxadas para `Pick<Question, ...>` — permite questões de vocabulário sem duplicar o componente. |
| `src/components/learning/LessonNode.tsx`, `src/utils/unlock.ts` | Tipos relaxados para `Pick<Lesson, ...>`/genérico — compatível com lições de vocabulário; testes existentes continuam válidos. |
| `tsconfig.app.json` | Habilitado `resolveJsonModule` (import do `palavras.json`). |

### Como funciona

- **Lição de vocabulário**: até 10 questões sorteadas com semente da tentativa; recarregar a página mantém as mesmas questões. Cada lição cobre uma categoria (Termos gerais / Processo e prática / Verbos jurídicos). Desbloqueio progressivo reutiliza `getLessonStatus`.
- **XP**: mesma regra existente — 25 XP na primeira conclusão de cada lição (inclusive `vocab-review`); refazer não concede XP novo. Sequência diária atualizada no `completeLesson`.
- **Revisão**: histórico único em `progress.vocab.wrongWords` (wordId → vezes errada, data). Erro em qualquer lição de vocabulário marca a palavra; acerto em sessão de revisão remove-a. Não existe segundo histórico de erros.
- **Migração**: ao carregar, dados v1 viram v2 automaticamente; a chave de armazenamento não muda e nada é apagado. O botão "Reiniciar progresso" com confirmação continua funcionando e agora também lista as palavras em revisão.

### Validação do JSON e revisão editorial

- 51 termos carregados; todos com `id`, `palavra`, `sinonimo`, `explicacao`, `categoria` e `contexto` preenchidos; ids únicos; nenhuma entrada descartada (`getCatalogIssues()` vazio).
- 51/51 termos geram questão válida (4 alternativas distintas, única resposta correta).
- Pontos para revisão editorial (não impedem o funcionamento):
  - `contenda` → "Rixa": o próprio JSON já sinaliza "aproximação lexical".
  - Cluster `anuencia` (Concordância) / `anuir` (Concordar) / `aquiescencia` (Consentimento): "Consentimento" pode ser aceito informalmente como sinônimo de "Anuência"; a regra de prefixo exclui Concordância × Concordar como distratores entre si, mas não impede proximidade semântica.
  - `sancao` (Penalidade) / `cominacao` (Penalidade prevista): excluídos como distratores entre si pela regra de prefixo.
  - `deferimento` → "Aprovação" e `concessao` → "Atribuição": sinônimos genéricos que poderiam ser mais específicos.

### Testes executados (resultados reais — 15/10/2026)

| Comando | Resultado |
|---|---|
| `npm ci` | ✅ 147 pacotes, 0 vulnerabilidades |
| `npm run lint` | ✅ 0 erros; 1 warning conhecido (`only-export-components` em `ProgressContext.tsx`, pré-existente e benigno) |
| `npm test` | ✅ **59/59** em 6 arquivos: markdown (8), unlock (7), vocab (13), smoke (11), theme (11), vocabProgress (9) |
| `npm run build` | ✅ `tsc -b` + `vite build` (CSS 32,78 kB / JS 425,09 kB); `dist/index.html` referencia `/Juridiques/assets/*` |

### Pendências conhecidas

- Revisão editorial dos termos listados acima (ajustar sinônimos no `palavras.json`, se desejado — o gerador se adapta automaticamente).
- Sessão de revisão retomada após F5 usa a lista atual de palavras em revisão (pode perder questões já respondidas corretamente no meio da sessão, caso a palavra tenha saído da lista).
- Sem exportação/importação do progresso (limitação pré-existente, mantida).

---

## 8. Correção do `iniciar.bat` — falha ao iniciar (15/10/2026)

### Sintoma

Janela abria e fechava imediatamente (ou terminava com erro `em foi inesperado neste momento.`), sem chegar ao servidor de desenvolvimento.

### Causa-raiz (confirmada por bisseção e testes de variação)

O bloco `if errorlevel 1 (...)` da linha 16 continha, em uma linha interna, parênteses não escapados:

```bat
echo  Instale o Node.js 22.19+ (recomendado: 24 LTS) em https://nodejs.org
```

O cmd.exe falhava ao parsear o próprio bloco (mesmo com a condição falsa): o `)` interno de `24 LTS)` encerrava o bloco `if` prematuramente e o restante da linha (` em https://nodejs.org`) era interpretado como comando — gerando o erro `em foi inesperado neste momento.` e abortando o script. Testes de variação demonstraram o comportamento neste ambiente:

| Conteúdo do `echo` dentro do bloco `if (...)` | Resultado |
|---|---|
| `texto (recomendado: 24 LTS) em site` | ❌ `em foi inesperado neste momento.` |
| `texto (^recomendado: 24 LTS^) em site` (escapado) | ✅ OK |
| `texto simples sem parenteses` | ✅ OK |

Problemas adicionais encontrados e corrigidos no mesmo arquivo:
- **Fim de linha LF** (o arquivo tinha 0 CR / 76 LF) — blocos `if (...)` em `.bat` LF-only são fonte clássica de falhas de parsing do cmd.
- **Em dash UTF-8 (`E2 80 94`)** no comentário da linha 26 — bytes não-ASCII num `.bat` quebram sob o codepage do console.

### Correções aplicadas

| Mudança | Detalhe |
|---|---|
| Linha 19 | Parênteses removidos: `(recomendado: 24 LTS)` → `- recomendado: 24 LTS -` (mensagem idêntica para o usuário). |
| Encoding/EOL | Arquivo 100% ASCII com **CRLF** (76 CR / 76 LF). |
| `.gitattributes` (novo) | `*.bat text eol=crlf` e `*.cmd text eol=crlf` — impede que checkouts/edições futuras voltem a LF. |

### Validação (execução real — 15/10/2026)

Executado `iniciar.bat` de ponta a ponta: banner → verificações de Node/npm → `npm run dev` → **VITE v8.3.4 ready** → `GET http://localhost:5173` → **HTTP 200**. Nenhum erro em stderr. Servidor de teste encerrado e porta 5173 liberada após a validação.

### Regra para futuras edições

- **Nunca** use `(`/`)` cru em linhas dentro de blocos `if (...)`/`for (...)` do `.bat` — remova ou escape com `^(` `^)`.
- Mantenha `.bat` em ASCII puro e CRLF (o `.gitattributes` garante o EOL no repositório).

---

## 9. Redesign da página inicial e progressão de vocabulário (16/10/2026)

### Resumo

A página inicial foi reorganizada em torno do aprendizado por sinônimos, o catálogo foi expandido para 152 termos organizados em 15 lições e 3 unidades, o sistema de nível ganhou títulos e uma base de "palavras dominadas", e o cabeçalho recebeu navegação completa. Tudo de forma incremental: rotas, gamificação, revisão, temas, conteúdo teórico e dados do `localStorage` foram preservados.

### Arquivos criados

| Arquivo | Função |
|---|---|
| `src/components/learning/UnitPath.tsx` | Caminho visual de 5 etapas por unidade (concluída ✓ verde, atual roxo com CTA, bloqueada com cadeado + rótulo de texto). Reutilizado na home e no hub `/vocabulario`. |
| `src/features/vocab/mastery.ts` | Regra de dominação (`isWordMastered`, `getMasteredCount`) e taxa de acerto real (`getAccuracyPercent`). |
| `src/test/level.test.ts` | 8 testes da escala de nível (títulos, limiares preservados, bônus de dominadas, meta/barra). |

### Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/features/vocab/catalog.ts` | 152 termos ordenados por categoria → **15 lições de 10 palavras** (`vocab-lesson-1..15`) + **2 excedentes registrados** (`getUnusedWordIds()`); **3 unidades** (`getVocabUnits()`: Termos essenciais, Processo e procedimentos, Direitos e obrigações — com fallback `Unidade N` para catálogos maiores); nome curto da lição derivado dos dados (categoria dominante + sequência, ex.: "Termos gerais 3"). |
| `src/types/index.ts` | `VocabUnit`, `WordStat`; `VocabLesson.unitId`; `VocabProgress.wordStats` (campo opcional na prática — normalizado no load). |
| `src/utils/xp.ts` | Novos títulos (**Aprendiz, Estudioso, Avançado, Especialista, Bacharel, Mestre, Jurisconsulto**; "Iniciante" removido) com os **mesmos limiares**; `getLevelScore = XP + 25 × dominadas`; `getLevelState` (meta em pontos e em palavras equivalentes, barra). |
| `src/services/progressService.ts` | `normalizeV2` preenche `wordStats: {}` em dados v2 antigos — extensão retrocompatível, chave e versão inalteradas; nada é apagado. |
| `src/features/progress/ProgressContext.tsx` | `recordVocabAnswer` agora mantém `wordStats` (acerto em lição, acerto em revisão, `masteredAt`) além da fila de revisão. |
| `src/components/ui/LevelIndicator.tsx` | Recebe `masteredWords`; mostra título do nível + "Meta: {próximo}" + barra. |
| `src/components/layout/Header.tsx` | Navegação completa: Início · Palavras · Explorar o Direito · Revisão (contagem) · Conquistas + XP + sequência + nível + tema. Desktop: uma linha; mobile/tablet: 2ª linha com rolagem horizontal (sem comprimir). |
| `src/components/layout/AppLayout.tsx` | Largura `max-w-3xl` → `max-w-5xl` (espaço para a coluna lateral). |
| `src/pages/HomePage.tsx` | Cartão principal (título, subtítulo da mecânica, **Continuar de onde parou**, **Ver todas as trilhas de palavras**, resumo real) + caminho por unidades + coluna lateral (nível/dominadas/meta, progresso geral, XP, sequência, taxa de acerto real, revisão, atalho Explorar) + trilhas, conquistas e reiniciar preservados. Âncoras `?ir=` com rolagem suave respeitando `prefers-reduced-motion`. |
| `src/pages/VocabPage.tsx` | Hub passa a renderizar as unidades via `UnitPath` (substitui a lista plana de nós). |
| `src/test/vocab.test.ts` | Atualizado: 152 termos, 15 lições de 10, excedentes registrados, unidades e títulos únicos (16 testes). |
| `src/test/vocabProgress.test.tsx` | Atualizado + novos testes de dominação e da nova home (13 testes). |

### Critérios de nível (implementados)

- **Títulos**: Aprendiz (0) → Estudioso (50) → Avançado (125) → Especialista (225) → Bacharel (350) → Mestre (500) → Jurisconsulto (675+). **Os limiares são os mesmos do sistema anterior**, portanto ninguém perde nível com a atualização.
- **Pontuação de nível** = XP total + **25 pontos por palavra dominada** — o nível responde à prática validada; XP continua exibido à parte como pontuação acumulada.
- **Palavra dominada** = respondida corretamente em uma lição **e** (se já foi errada alguma vez) respondida corretamente em uma sessão de revisão. Rastreado em `vocab.wordStats` (adicionado retrocompativelmente); usuários existentes mantêm XP/nível e passam a acumular dominadas a partir desta versão — nenhum dado é inferido ou inventado.
- Interface mostra: nome do nível, palavras dominadas, meta (pontos + equivalentes em palavras) e barra — apenas números reais.

### Organização do catálogo

- `palavras.json`: **152 termos** (ids únicos; todos os campos preenchidos; `getCatalogIssues()` vazio).
- Ordenação por categoria (ordem semântica fixa) + fatias de 10 → **15 lições × 10 palavras = 150 termos**; **2 excedentes** registrados em `getUnusedWordIds()` (motivo: 152 = 15 × 10 + 2 — reservados para expansão/revisão editorial; nada é descartado nem duplicado).
- Unidades = grupos de 5 lições derivados dos dados (3 unidades atuais).
- Compatibilidade: os ids antigos `vocab-lesson-1..3` existem na nova estrutura — progresso, XP e conquistas salvos continuam reconhecidos.

### Preservação dos dados

- Chave `juridiques.progress.v1` e versão 2 inalteradas; `wordStats` é preenchido com `{}` apenas quando ausente (nunca sobrescreve).
- XP sem duplicidade, sequência, conquistas, desbloqueio, revisão, botão de reiniciar com confirmação: mantidos e cobertos por testes.
- Trilhas, lições e as 75 questões do conteúdo complementar: intocadas.

### Testes executados (resultados reais — 16/10/2026)

| Comando | Resultado |
|---|---|
| `npm ci` | ✅ 147 pacotes, 0 vulnerabilidades (após encerrar 2 dev servers que travavam o `node_modules`) |
| `npm run lint` | ✅ 0 erros; 1 warning pré-existente (`only-export-components` em `ProgressContext.tsx`) |
| `npm test` | ✅ **74/74** em 7 arquivos: level (8), markdown (8), smoke (11), vocab (16), unlock (7), theme (11), vocabProgress (13) |
| `npm run build` | ✅ `tsc -b` + `vite build` (CSS 36,83 kB / JS 458,72 kB); `dist/index.html` referencia `/Juridiques/assets/*` |

### Pendências e próximos passos

- Revisão editorial dos termos do novo catálogo (mesmos pontos da §7: pares próximos como Concordância/Concordar; o gerador já bloqueia distratores ambíguos).
- Os 2 termos excedentes entram em nova lição quando a estrutura crescer (ex.: unidade 4).
- Sessão de revisão retomada após F5 usa a lista atual de palavras (limitação conhecida da §7).
- Dev servers precisam ser encerrados antes de `npm ci` no Windows (locks de arquivos `.node`).
