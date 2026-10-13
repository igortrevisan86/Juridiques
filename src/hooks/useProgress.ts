// ============================================================
// HOOK DE PROGRESSO — Juridiquês
// ============================================================

import { useContext } from 'react'
import { ProgressContext } from '@/features/progress/ProgressContext'
import type { ProgressContextValue } from '@/features/progress/ProgressContext'

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress deve ser usado dentro de <ProgressProvider>')
  }
  return ctx
}
