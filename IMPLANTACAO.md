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

