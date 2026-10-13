// ============================================================
// RESULTPAGE — Resultado final de uma lição
// ============================================================

import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, Home, RotateCcw, Trophy } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getLessonById, getAllLessons } from '@/content/lessons'
import { getTrailById } from '@/content/trails'
import { getLessonStatus, getNextLesson } from '@/utils/unlock'
import { XpBadge } from '@/components/ui/XpBadge'

interface ResultLocationState {
  xpEarned?: number
}

export function ResultPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const location = useLocation()
  const { progress } = useProgress()

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const trail = lesson ? getTrailById(lesson.trailId) : undefined
  const attempt =
    lesson && progress.currentAttempt?.lessonId === lesson.id ? progress.currentAttempt : null

  // Sem tentativa correspondente — não há resultado a exibir
  if (!lesson || !trail || !attempt?.completedAt) {
    return <Navigate to="/" replace />
  }

  const xpEarned = (location.state as ResultLocationState | null)?.xpEarned ?? 0
  const { score, totalQuestions } = attempt
  const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  const perfect = score === totalQuestions
  const approved = pct >= 60

  const message = perfect
    ? 'Gabaritou! Domínio total do conteúdo.'
    : approved
      ? 'Muito bem! Você está no caminho certo.'
      : 'Quase lá! Releia o conteúdo e tente novamente.'

  // Próxima lição (se desbloqueada)
  const nextLesson = getNextLesson(trail, getAllLessons(), progress)
  const nextStatus =
    nextLesson && nextLesson.id !== lesson.id
      ? getLessonStatus(nextLesson, trail, progress)
      : null

  return (
    <div className="fade-in max-w-lg mx-auto space-y-6 py-4">
      {/* Cartão de resultado */}
      <section className="card p-6 sm:p-8 text-center">
        <div className={`inline-block ${perfect ? 'celebrate' : ''}`}>
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              approved ? 'bg-aqua-100 text-aqua-600' : 'bg-gold-100 text-gold-600'
            }`}
          >
            <Trophy size={40} />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">{message}</h1>
        <p className="text-sm text-gray-500 mt-1">{lesson.title}</p>

        {/* Placar */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div>
            <p className="text-3xl font-extrabold text-gray-900">{score}</p>
            <p className="text-xs text-gray-400 mt-0.5">de {totalQuestions} corretas</p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div>
            <p
              className={`text-3xl font-extrabold ${
                approved ? 'text-aqua-600' : 'text-gold-600'
              }`}
            >
              {pct}%
            </p>
            <p className="text-xs text-gray-400 mt-0.5">aproveitamento</p>
          </div>
        </div>

        {/* XP ganho */}
        <div className="mt-5">
          {xpEarned > 0 ? (
            <span className="inline-flex items-center gap-2">
              <XpBadge xp={xpEarned} />
              <span className="text-xs text-gray-400">adicionado ao seu total</span>
            </span>
          ) : (
            <span className="text-xs text-gray-400">
              Lição já concluída anteriormente — sem novo XP
            </span>
          )}
        </div>
      </section>

      {/* Ações */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center">
        {nextLesson && nextStatus && nextStatus !== 'locked' && (
          <Link to={`/licao/${nextLesson.id}`} className="btn btn-primary">
            Próxima lição: {nextLesson.title}
          </Link>
        )}
        <Link to={`/licao/${lesson.id}`} className="btn btn-secondary">
          <RotateCcw size={16} />
          Refazer esta lição
        </Link>
      </section>

      {/* Navegação */}
      <section className="flex items-center justify-center gap-4 text-sm">
        <Link
          to={`/trilha/${trail.id}`}
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          {trail.title}
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <Home size={16} />
          Início
        </Link>
      </section>
    </div>
  )
}
