// ============================================================
// UTILITÁRIOS DE XP E NÍVEL — Juridiquês
// ============================================================

import type { Level } from '@/types'

/**
 * Progressão de nível determinística.
 * Cada nível requer 50 XP a mais que o anterior.
 * Nível 1: 0–49 XP
 * Nível 2: 50–124 XP
 * Nível 3: 125–224 XP
 * etc.
 */
const LEVELS: Level[] = [
  { level: 1, title: 'Iniciante',      minXp: 0,    maxXp: 49 },
  { level: 2, title: 'Aprendiz',       minXp: 50,   maxXp: 124 },
  { level: 3, title: 'Estudioso',      minXp: 125,  maxXp: 224 },
  { level: 4, title: 'Acadêmico',      minXp: 225,  maxXp: 349 },
  { level: 5, title: 'Bacharel',       minXp: 350,  maxXp: 499 },
  { level: 6, title: 'Especialista',   minXp: 500,  maxXp: 674 },
  { level: 7, title: 'Jurisconsulto', minXp: 675,  maxXp: Infinity },
]

/**
 * Retorna o objeto de nível correspondente ao XP fornecido.
 * Sempre retorna ao menos o nível 1.
 */
export function getLevelFromXp(xp: number): Level {
  let current = LEVELS[0]
  for (const level of LEVELS) {
    if (xp >= level.minXp) {
      current = level
    } else {
      break
    }
  }
  return current
}

/**
 * Retorna todos os níveis definidos (para uso em UI ou testes).
 */
export function getAllLevels(): Level[] {
  return [...LEVELS]
}

/**
 * Progresso percentual dentro do nível atual (0–100).
 */
export function getLevelProgress(xp: number): number {
  const level = getLevelFromXp(xp)
  if (level.maxXp === Infinity) return 100
  const range = level.maxXp - level.minXp + 1
  const earned = xp - level.minXp
  return Math.min(100, Math.round((earned / range) * 100))
}
