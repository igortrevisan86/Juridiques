// ============================================================
// CONTEXTO DE PROGRESSO — Juridiquês
// ============================================================

import React, { createContext, useCallback, useEffect, useState } from 'react'
import type { UserProgress, LessonAttempt, LessonProgress, WordStat } from '@/types'
import {
  loadProgress,
  saveProgress,
  resetProgress as resetProgressStorage,
} from '@/services/progressService'
import { recalculateAchievements } from '@/features/gamification/achievements'
import { computeNewStreak, getTodayDateString, hasActivityToday } from '@/utils/streak'
import { getAllTrails } from '@/content/trails'
import { getAllLessons } from '@/content/lessons'

export interface ProgressContextValue {
  progress: UserProgress
  storageAvailable: boolean
  /** Inicia ou retoma uma tentativa de lição */
  startAttempt: (lessonId: string) => void
  /** Registra a resposta do usuário para uma questão na tentativa atual */
  answerQuestion: (questionId: string, optionId: string) => void
  /** Finaliza a tentativa atual e aplica recompensas */
  completeLesson: (score: number, totalQuestions: number) => void
  /**
   * Registra o resultado de uma palavra de vocabulário.
   * Erro → marca para revisão; acerto em sessão de revisão → remove da revisão.
   */
  recordVocabAnswer: (wordId: string, correct: boolean, fromReview: boolean) => void
  /** Reinicia todo o progresso (chamar apenas após confirmação) */
  resetAllProgress: () => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // Carrega o progresso salvo de forma síncrona na primeira renderização.
  // Evita que páginas montem sem tentativa/recuperações (retoma de quiz).
  const [initial] = useState(loadProgress)
  const [progress, setProgress] = useState<UserProgress>(initial.progress)
  const [storageAvailable] = useState(initial.storageAvailable)

  // Salva automaticamente quando o progresso muda
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev)
      return next
    })
  }, [])

  const startAttempt = useCallback(
    (lessonId: string) => {
      updateProgress((prev) => {
        // Se já há tentativa em aberto para esta lição, retoma
        if (prev.currentAttempt?.lessonId === lessonId && !prev.currentAttempt.completedAt) {
          return prev
        }
        // Nova tentativa (primeira vez ou refazer lição já concluída)
        const attempt: LessonAttempt = {
          lessonId,
          startedAt: Date.now(),
          completedAt: null,
          answers: {},
          score: 0,
          totalQuestions: 0,
        }
        return { ...prev, currentAttempt: attempt }
      })
    },
    [updateProgress],
  )

  const answerQuestion = useCallback(
    (questionId: string, optionId: string) => {
      updateProgress((prev) => {
        if (!prev.currentAttempt) return prev
        // Impede alteração de resposta já registrada
        if (prev.currentAttempt.answers[questionId]) return prev
        const updatedAttempt: LessonAttempt = {
          ...prev.currentAttempt,
          answers: { ...prev.currentAttempt.answers, [questionId]: optionId },
        }
        return { ...prev, currentAttempt: updatedAttempt }
      })
    },
    [updateProgress],
  )

  const completeLesson = useCallback(
    (score: number, totalQuestions: number) => {
      updateProgress((prev) => {
        if (!prev.currentAttempt) return prev
        const { lessonId } = prev.currentAttempt
        const existing = prev.lessons[lessonId]
        const alreadyCompleted = !!existing?.completedAt
        const xpReward = alreadyCompleted ? 0 : 25
        const now = Date.now()
        const today = getTodayDateString(now)

        const lessonProgress: LessonProgress = {
          lessonId,
          completedAt: existing?.completedAt ?? now,
          bestScore: Math.max(existing?.bestScore ?? 0, score),
          attempts: (existing?.attempts ?? 0) + 1,
          xpAwarded: true,
        }

        // Sequência diária
        const alreadyActiveToday = hasActivityToday(prev.lastActivityDate, today)
        const newStreak = alreadyActiveToday
          ? prev.streak
          : computeNewStreak(prev.lastActivityDate, today, prev.streak)
        const newLastActivityDate = alreadyActiveToday ? prev.lastActivityDate : today

        const next: UserProgress = {
          ...prev,
          xp: prev.xp + xpReward,
          lessons: { ...prev.lessons, [lessonId]: lessonProgress },
          currentAttempt: {
            ...prev.currentAttempt,
            completedAt: now,
            score,
            totalQuestions,
          },
          streak: newStreak,
          lastActivityDate: newLastActivityDate,
        }

        // Recalcula conquistas
        const trails = getAllTrails()
        const lessons = getAllLessons()
        next.achievements = recalculateAchievements(next, trails, lessons)

        return next
      })
    },
    [updateProgress],
  )

  const recordVocabAnswer = useCallback(
    (wordId: string, correct: boolean, fromReview: boolean) => {
      updateProgress((prev) => {
        const wrongWords = { ...prev.vocab.wrongWords }
        const wordStats = { ...prev.vocab.wordStats }
        const now = Date.now()
        const stat: WordStat = wordStats[wordId] ?? {
          wordId,
          lessonCorrect: false,
          reviewCorrect: false,
          masteredAt: null,
        }

        if (!correct) {
          // Erro → entra na fila de revisão e perde a dominação imediata
          wrongWords[wordId] = {
            wordId,
            timesWrong: (wrongWords[wordId]?.timesWrong ?? 0) + 1,
            lastWrongAt: now,
          }
          wordStats[wordId] = { ...stat, masteredAt: null }
        } else {
          const updated: WordStat = fromReview
            ? // Acerto em revisão → sai da fila (se estava) e conta como revisão
              { ...stat, reviewCorrect: true }
            : // Acerto em lição → marca o acerto da lição
              { ...stat, lessonCorrect: true }

          if (fromReview) delete wrongWords[wordId]

          // Regra de dominação: acertou em lição E não está pendente na revisão
          wordStats[wordId] =
            updated.lessonCorrect && !(wordId in wrongWords)
              ? { ...updated, masteredAt: updated.masteredAt ?? now }
              : { ...updated, masteredAt: null }
        }

        return { ...prev, vocab: { ...prev.vocab, wrongWords, wordStats } }
      })
    },
    [updateProgress],
  )

  const resetAllProgress = useCallback(() => {
    const fresh = resetProgressStorage()
    setProgress(fresh)
  }, [])

  const value: ProgressContextValue = {
    progress,
    storageAvailable,
    startAttempt,
    answerQuestion,
    completeLesson,
    recordVocabAnswer,
    resetAllProgress,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
