// ============================================================
// CONTEXTO DE TEMA — Juridiquês (somente o context; o provider
// fica em ThemeContext.tsx para manter Fast Refresh)
// Arquivo separado com nome distinto para evitar colisão de
// casing no Windows (themeContext.ts vs ThemeContext.tsx).
// ============================================================

import { createContext } from 'react'
import type { Theme } from '@/services/themeService'

export interface ThemeContextValue {
  theme: Theme
  /** Define o tema explicitamente e persiste a escolha */
  setTheme: (theme: Theme) => void
  /** Alterna entre claro e escuro */
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
