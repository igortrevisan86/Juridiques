// ============================================================
// HOOK DE TEMA — Juridiquês
// ============================================================

import { useContext } from 'react'
import { ThemeContext } from '@/features/theme/context'
import type { ThemeContextValue } from '@/features/theme/context'

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
  }
  return ctx
}
