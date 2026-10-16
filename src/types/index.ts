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

// ------ Vocabulário ------

/** Termo de vocabulário — corresponde a um item de src/content/palavras.json */
export interface Palavra {
  id: string
  palavra: string
  sinonimo: string
  explicacao: string
  categoria: string
  contexto: string
}

/** Lição de vocabulário — agrupamento de termos por categoria */
export interface VocabLesson {
  id: string
  order: number
  /** Unidade temática à qual a lição pertence (vocab-unit-N) */
  unitId?: string
  title: string
  description: string
  wordIds: string[]
}

/** Unidade temática — grupo de lições exibido no caminho de aprendizagem */
export interface VocabUnit {
  id: string
  order: number
  title: string
  description: string
  lessonIds: string[]
}

/** Questão de vocabulário: associação palavra → sinônimo (4 alternativas) */
export interface VocabSynonymQuestion {
  id: string
  wordId: string
  stem: string
  options: QuestionOption[]
  correctOptionId: string
  expectedSynonym: string
  explanation: string
}

/** Palavra marcada para revisão (erro ou reforço) */
export interface ReviewWordEntry {
  wordId: string
  timesWrong: number
  lastWrongAt: number
}

/**
 * Estatística de uma palavra para cálculo de dominação.
 * Regra: dominada = acertou em lição E, se já errou, acertou a revisão.
 */
export interface WordStat {
  wordId: string
  lessonCorrect: boolean
  reviewCorrect: boolean
  masteredAt: number | null
}

/** Progresso de vocabulário (adicionado na versão 2 do armazenamento) */
export interface VocabProgress {
  /** wordId → entrada de revisão. Histórico único de erros de vocabulário. */
  wrongWords: Record<string, ReviewWordEntry>
  /**
   * wordId → estatísticas de acerto/dominação.
   * Campo adicionado retrocompativelmente: dados v2 antigos são normalizados
   * no carregamento com `wordStats: {}` sem apagar nada.
   */
  wordStats: Record<string, WordStat>
}

export interface UserProgress {
  version: 1 | 2
  xp: number
  lessons: Record<string, LessonProgress>
  currentAttempt: LessonAttempt | null
  streak: number
  lastActivityDate: string | null // YYYY-MM-DD
  achievements: Record<string, Achievement>
  /** Presente a partir da versão 2 (migrado automaticamente da v1) */
  vocab: VocabProgress
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
