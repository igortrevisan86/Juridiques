// ============================================================
// MÓDULO DE DOMINAÇÃO DE PALAVRAS — Juridiquês
// Regra consistente: uma palavra é dominada quando foi respondida
// corretamente em uma lição E, se já esteve na revisão (foi errada
// alguma vez), foi respondida corretamente em uma sessão de revisão.
// ============================================================

import type { UserProgress } from '@/types'
import { getPalavraById } from './catalog'

/** Verifica se uma palavra está dominada conforme a regra. */
export function isWordMastered(progress: UserProgress, wordId: string): boolean {
  const stat = progress.vocab.wordStats[wordId]
  if (!stat?.lessonCorrect) return false
  return !(wordId in progress.vocab.wrongWords)
}

/** Ids das palavras dominadas (somente as que existem no catálogo atual). */
export function getMasteredWordIds(progress: UserProgress): string[] {
  return Object.keys(progress.vocab.wordStats).filter(
    (id) => getPalavraById(id) !== undefined && isWordMastered(progress, id),
  )
}

/** Quantidade real de palavras dominadas. */
export function getMasteredCount(progress: UserProgress): number {
  return getMasteredWordIds(progress).length
}

/**
 * Taxa de acerto real (%): melhor pontuação de cada lição concluída
 * (vocabulário e conteúdo) sobre o total de questões daquela lição.
 * Retorna null quando não há lições concluídas (não exibir estatística falsa).
 */
export function getAccuracyPercent(
  progress: UserProgress,
  vocabLessons: { id: string; wordIds: string[] }[],
  contentLessons: { id: string; questions: unknown[] }[],
): number | null {
  let score = 0
  let total = 0
  for (const lesson of vocabLessons) {
    const p = progress.lessons[lesson.id]
    if (p?.completedAt) {
      score += p.bestScore
      total += Math.min(10, lesson.wordIds.length)
    }
  }
  for (const lesson of contentLessons) {
    const p = progress.lessons[lesson.id]
    if (p?.completedAt) {
      score += p.bestScore
      total += lesson.questions.length
    }
  }
  if (total === 0) return null
  return Math.round((score / total) * 100)
}