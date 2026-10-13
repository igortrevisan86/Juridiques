// ============================================================
// LIÇÕES — Arquivo central que unifica as 3 trilhas
// ============================================================

import type { Lesson } from '@/types'
import { TRAIL_INTRO_LESSONS } from './lessonsTrailA'
import { TRAIL_CIVIL_LESSONS } from './lessonsTrailB'
import { TRAIL_CONST_LESSONS } from './lessonsTrailC'

const LESSONS: Lesson[] = [
  ...TRAIL_INTRO_LESSONS,
  ...TRAIL_CIVIL_LESSONS,
  ...TRAIL_CONST_LESSONS,
]

export function getAllLessons(): Lesson[] {
  return LESSONS
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id)
}

export function getLessonsByTrail(trailId: string): Lesson[] {
  return LESSONS.filter((l) => l.trailId === trailId)
}
