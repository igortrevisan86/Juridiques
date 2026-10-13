// ============================================================
// UTILITÁRIOS DE DESBLOQUEIO — Juridiquês
// ============================================================

import type { Trail, Lesson, LessonStatus, UserProgress } from '@/types'

/**
 * Calcula o status de uma lição a partir do conteúdo e do progresso salvo.
 * Nunca usa classes CSS ou estado visual como fonte de verdade.
 */
export function getLessonStatus(
  lesson: Lesson,
  trail: Trail,
  progress: UserProgress,
): LessonStatus {
  const lessonProgress = progress.lessons[lesson.id]

  // Lição já concluída
  if (lessonProgress?.completedAt) return 'completed'

  // Primeira lição da trilha — sempre disponível
  const isFirst = trail.lessonIds[0] === lesson.id
  if (isFirst) {
    // Em andamento se há tentativa ativa para esta lição
    if (progress.currentAttempt?.lessonId === lesson.id) return 'in-progress'
    return 'available'
  }

  // Verifica se a lição anterior foi concluída
  const idx = trail.lessonIds.indexOf(lesson.id)
  if (idx < 0) return 'locked'
  const previousLessonId = trail.lessonIds[idx - 1]
  const previousCompleted = !!progress.lessons[previousLessonId]?.completedAt

  if (!previousCompleted) return 'locked'

  if (progress.currentAttempt?.lessonId === lesson.id) return 'in-progress'
  return 'available'
}

/**
 * Retorna o status de todas as lições de uma trilha.
 */
export function getTrailLessonStatuses(
  trail: Trail,
  lessons: Lesson[],
  progress: UserProgress,
): Record<string, LessonStatus> {
  const result: Record<string, LessonStatus> = {}
  for (const id of trail.lessonIds) {
    const lesson = lessons.find((l) => l.id === id)
    if (lesson) {
      result[id] = getLessonStatus(lesson, trail, progress)
    }
  }
  return result
}

/**
 * Retorna a próxima lição disponível ou em andamento de uma trilha.
 */
export function getNextLesson(
  trail: Trail,
  lessons: Lesson[],
  progress: UserProgress,
): Lesson | null {
  const statuses = getTrailLessonStatuses(trail, lessons, progress)
  for (const id of trail.lessonIds) {
    const status = statuses[id]
    if (status === 'in-progress' || status === 'available') {
      return lessons.find((l) => l.id === id) ?? null
    }
  }
  return null
}

/**
 * Calcula o número de lições concluídas em uma trilha.
 */
export function getTrailCompletedCount(trail: Trail, progress: UserProgress): number {
  return trail.lessonIds.filter((id) => !!progress.lessons[id]?.completedAt).length
}

/**
 * Verifica se uma trilha está completamente concluída.
 */
export function isTrailCompleted(trail: Trail, progress: UserProgress): boolean {
  return getTrailCompletedCount(trail, progress) === trail.lessonIds.length
}
