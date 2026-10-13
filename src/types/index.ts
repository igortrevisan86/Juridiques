// ============================================================
// TIPOS CENTRAIS — Juridiquês
// ============================================================

// ------ Conteúdo ------

export type QuestionType = 'multiple-choice'

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  type: QuestionType
  stem: string
  options: QuestionOption[]
  correctOptionId: string
  explanation: string
}

export interface Lesson {
  id: string
  trailId: string
  order: number
  title: string
  description: string
  learningObjective: string
  explanation: string
  practicalExample: string
  references: string[]
  xpReward: number
  questions: Question[]
}

export interface Trail {
  id: string
  title: string
  description: string
  order: number
  color: string
  icon: string
  lessonIds: string[]
}

// ------ Progresso ------

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export interface LessonAttempt {
  lessonId: string
  startedAt: number
  completedAt: number | null
  /** answers[questionId] = optionId chosen */
  answers: Record<string, string>
  score: number
  totalQuestions: number
}

export interface LessonProgress {
  lessonId: string
  completedAt: number
  bestScore: number
  attempts: number
  xpAwarded: boolean
}

export interface DailyActivity {
  date: string // YYYY-MM-DD in product timezone
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt: number | null
}

export interface UserProgress {
  version: 1
  xp: number
  lessons: Record<string, LessonProgress>
  currentAttempt: LessonAttempt | null
  streak: number
  lastActivityDate: string | null // YYYY-MM-DD
  achievements: Record<string, Achievement>
  updatedAt: number
}

// ------ Gamificação ------

export interface Level {
  level: number
  title: string
  minXp: number
  maxXp: number
}

export interface AchievementDefinition {
  id: string
  name: string
  description: string
  check: (progress: UserProgress, trails: Trail[], lessons: Lesson[]) => boolean
}
