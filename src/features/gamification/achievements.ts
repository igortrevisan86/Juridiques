// ============================================================
// DEFINIÇÕES DE CONQUISTAS — Juridiquês
// ============================================================

import type { AchievementDefinition, UserProgress, Trail, Lesson } from '@/types'
import { isTrailCompleted } from '@/utils/unlock'

export const ACHIEVEMENTS_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'first-lesson',
    name: 'Primeira Lição',
    description: 'Conclua sua primeira lição.',
    check: (progress: UserProgress) =>
      Object.values(progress.lessons).some((l) => !!l.completedAt),
  },
  {
    id: 'five-lessons',
    name: 'Cinco Lições',
    description: 'Conclua cinco lições ao total.',
    check: (progress: UserProgress) =>
      Object.values(progress.lessons).filter((l) => !!l.completedAt).length >= 5,
  },
  {
    id: 'first-trail',
    name: 'Trilha Completa',
    description: 'Conclua todas as lições de uma trilha.',
    check: (progress: UserProgress, trails: Trail[]) =>
      trails.some((trail) => isTrailCompleted(trail, progress)),
  },
  {
    id: 'three-day-streak',
    name: 'Três Dias Seguidos',
    description: 'Estude por três dias consecutivos.',
    check: (progress: UserProgress) => progress.streak >= 3,
  },
  {
    id: 'first-vocab-lesson',
    name: 'Primeira Palavra',
    description: 'Conclua sua primeira lição de vocabulário.',
    check: (progress: UserProgress) =>
      Object.entries(progress.lessons).some(
        ([id, l]) => id.startsWith('vocab-') && !!l.completedAt,
      ),
  },
]

/**
 * Recalcula quais conquistas devem estar desbloqueadas com base no progresso atual.
 * Idempotente — não duplica conquistas.
 */
export function recalculateAchievements(
  progress: UserProgress,
  trails: Trail[],
  lessons: Lesson[],
): UserProgress['achievements'] {
  const updated = { ...progress.achievements }

  for (const def of ACHIEVEMENTS_DEFINITIONS) {
    const current = updated[def.id]
    // Pula apenas se já existe E está desbloqueada (conquistas novas em
    // dados antigos chegam sem entrada e precisam poder ser desbloqueadas)
    if (current && current.unlockedAt !== null) continue
    if (def.check(progress, trails, lessons)) {
      updated[def.id] = {
        id: def.id,
        name: def.name,
        description: def.description,
        unlockedAt: Date.now(),
      }
    }
  }

  return updated
}
