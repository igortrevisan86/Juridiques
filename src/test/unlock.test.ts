// ============================================================
// TESTES — Utilitários de desbloqueio
// ============================================================

import { describe, it, expect } from 'vitest'
import { getLessonStatus, getTrailCompletedCount, isTrailCompleted } from '@/utils/unlock'
import { createInitialProgress } from '@/services/progressService'
import { getTrailById } from '@/content/trails'
import { getLessonById } from '@/content/lessons'
import type { UserProgress } from '@/types'

const trail = getTrailById('trail-intro-direito')!

function completedProgress(lessonIds: string[]): UserProgress {
  const progress = createInitialProgress()
  const now = Date.now()
  for (const id of lessonIds) {
    progress.lessons[id] = {
      lessonId: id,
      completedAt: now,
      bestScore: 5,
      attempts: 1,
      xpAwarded: true,
    }
  }
  return progress
}

describe('Utilitários de desbloqueio', () => {
  it('primeira lição da trilha está sempre disponível', () => {
    const lesson = getLessonById('lesson-intro-1')!
    expect(getLessonStatus(lesson, trail, createInitialProgress())).toBe('available')
  })

  it('lição seguinte fica bloqueada sem a anterior concluída', () => {
    const lesson = getLessonById('lesson-intro-2')!
    expect(getLessonStatus(lesson, trail, createInitialProgress())).toBe('locked')
  })

  it('lição desbloqueia quando a anterior é concluída', () => {
    const lesson = getLessonById('lesson-intro-2')!
    const progress = completedProgress(['lesson-intro-1'])
    expect(getLessonStatus(lesson, trail, progress)).toBe('available')
  })

  it('lição concluída aparece como completed', () => {
    const lesson = getLessonById('lesson-intro-1')!
    const progress = completedProgress(['lesson-intro-1'])
    expect(getLessonStatus(lesson, trail, progress)).toBe('completed')
  })

  it('lição com tentativa em aberto aparece como in-progress', () => {
    const lesson = getLessonById('lesson-intro-2')!
    const progress = completedProgress(['lesson-intro-1'])
    progress.currentAttempt = {
      lessonId: 'lesson-intro-2',
      startedAt: Date.now(),
      completedAt: null,
      answers: { 'q-intro-2-1': 'a' },
      score: 0,
      totalQuestions: 5,
    }
    expect(getLessonStatus(lesson, trail, progress)).toBe('in-progress')
  })

  it('conta e verifica conclusão de trilha', () => {
    const empty = createInitialProgress()
    expect(getTrailCompletedCount(trail, empty)).toBe(0)
    expect(isTrailCompleted(trail, empty)).toBe(false)

    const done = completedProgress(trail.lessonIds)
    expect(getTrailCompletedCount(trail, done)).toBe(trail.lessonIds.length)
    expect(isTrailCompleted(trail, done)).toBe(true)
  })

  it('conteúdo tem 3 trilhas com 5 lições cada', () => {
    expect(trail.lessonIds).toHaveLength(5)
    for (const id of trail.lessonIds) {
      expect(getLessonById(id)).toBeDefined()
    }
  })
})
