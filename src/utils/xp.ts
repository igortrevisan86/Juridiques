// ============================================================
// UTILITÁRIOS DE XP E NÍVEL — Juridiquês
//
// Reformulação do nível (15/10/2026):
// - Títulos novos (Aprendiz → Jurisconsulto); "Iniciante" foi removido.
// - Limiares em XP PRESERVADOS — ninguém regride de nível com a atualização.
// - Pontuação de nível = XP + 25 por palavra dominada: o nível passa a
//   responder à prática validada (palavras dominadas), mantendo o XP total
//   como pontuação acumulada exibida à parte (XpBadge).
// ============================================================

import type { Level } from '@/types'

/** Valor de nível concedido por cada palavra dominada (em pontos de nível). */
export const MASTERED_WORD_BONUS = 25

/**
 * Progressão de nível determinística (mesmos limiares da versão original):
 * Nível 1: 0–49 · 2: 50–124 · 3: 125–224 · 4: 225–349
 * Nível 5: 350–499 · 6: 500–674 · 7: 675+
 */
const LEVELS: Level[] = [
  { level: 1, title: 'Aprendiz',      minXp: 0,    maxXp: 49 },
  { level: 2, title: 'Estudioso',     minXp: 50,   maxXp: 124 },
  { level: 3, title: 'Avançado',      minXp: 125,  maxXp: 224 },
  { level: 4, title: 'Especialista',  minXp: 225,  maxXp: 349 },
  { level: 5, title: 'Bacharel',      minXp: 350,  maxXp: 499 },
  { level: 6, title: 'Mestre',        minXp: 500,  maxXp: 674 },
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
 * Aceita a pontuação de nível (ver getLevelScore), não apenas o XP bruto.
 */
export function getLevelProgress(xp: number): number {
  const level = getLevelFromXp(xp)
  if (level.maxXp === Infinity) return 100
  const range = level.maxXp - level.minXp + 1
  const earned = xp - level.minXp
  return Math.min(100, Math.round((earned / range) * 100))
}

/**
 * Pontuação de nível = XP acumulado + bônus por palavras dominadas.
 * Sempre ≥ XP, portanto o nível de ninguém regrade em relação ao XP puro.
 */
export function getLevelScore(xp: number, masteredWords: number): number {
  return xp + Math.max(0, masteredWords) * MASTERED_WORD_BONUS
}

export interface LevelState {
  level: Level
  next: Level | null
  /** Pontuação de nível atual (XP + bônus de dominação) */
  score: number
  /** XP total real (pontuação acumulada exibida à parte) */
  xp: number
  masteredWords: number
  /** 0–100 dentro do nível atual */
  progressPct: number
  /** Pontos de nível que faltam para o próximo nível (0 no nível máximo) */
  pointsToNext: number
  /** Palavras dominadas equivalentes que faltam (arredondado para cima) */
  wordsToNext: number
}

/** Estado completo de nível para UI (nome, meta e barra — dados reais). */
export function getLevelState(xp: number, masteredWords: number): LevelState {
  const score = getLevelScore(xp, masteredWords)
  const level = getLevelFromXp(score)
  const next = level.level < LEVELS.length ? LEVELS[level.level] : null
  const pointsToNext = next ? Math.max(0, next.minXp - score) : 0
  return {
    level,
    next,
    score,
    xp,
    masteredWords: Math.max(0, masteredWords),
    progressPct: getLevelProgress(score),
    pointsToNext,
    wordsToNext: Math.ceil(pointsToNext / MASTERED_WORD_BONUS),
  }
}
