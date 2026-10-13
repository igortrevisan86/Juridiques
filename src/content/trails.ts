// ============================================================
// TRILHAS — Juridiquês
// Conteúdo completo será adicionado na Fase 2.
// ============================================================

import type { Trail } from '@/types'

const TRAILS: Trail[] = [
  {
    id: 'trail-intro-direito',
    title: 'Introdução ao Direito',
    description: 'Fundamentos e conceitos essenciais do Direito.',
    order: 1,
    color: '#1E3A8A',
    icon: 'BookOpen',
    lessonIds: [
      'lesson-intro-1',
      'lesson-intro-2',
      'lesson-intro-3',
      'lesson-intro-4',
      'lesson-intro-5',
    ],
  },
  {
    id: 'trail-civil',
    title: 'Direito Civil',
    description: 'Obrigações, contratos e responsabilidade civil.',
    order: 2,
    color: '#14B8A6',
    icon: 'FileText',
    lessonIds: [
      'lesson-civil-1',
      'lesson-civil-2',
      'lesson-civil-3',
      'lesson-civil-4',
      'lesson-civil-5',
    ],
  },
  {
    id: 'trail-constitucional',
    title: 'Direito Constitucional',
    description: 'Constituição, direitos fundamentais e organização do Estado.',
    order: 3,
    color: '#8B5CF6',
    icon: 'Scale',
    lessonIds: [
      'lesson-const-1',
      'lesson-const-2',
      'lesson-const-3',
      'lesson-const-4',
      'lesson-const-5',
    ],
  },
]

export function getAllTrails(): Trail[] {
  return TRAILS
}

export function getTrailById(id: string): Trail | undefined {
  return TRAILS.find((t) => t.id === id)
}
