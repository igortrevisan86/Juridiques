// ============================================================
// UnitPath — Caminho visual de 5 etapas de uma unidade de vocabulário
// Estados: concluída (verde/✓), atual (roxo + botão), bloqueada (cadeado).
// Regras de desbloqueio: mesmas do sistema existente (utils/unlock).
// ============================================================

import { Link } from 'react-router-dom'
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react'
import type { UserProgress, VocabUnit } from '@/types'
import { getVocabLessonById, getVocabTrail } from '@/features/vocab/catalog'
import { getLessonStatus } from '@/utils/unlock'
import { ProgressBar } from '@/components/ui/ProgressBar'

const UNIT_COLORS = ['#1E3A8A', '#14B8A6', '#8B5CF6']

interface UnitPathProps {
  unit: VocabUnit
  progress: UserProgress
}

export function UnitPath({ unit, progress }: UnitPathProps) {
  const trail = getVocabTrail()
  const color = UNIT_COLORS[(unit.order - 1) % UNIT_COLORS.length]

  const lessons = unit.lessonIds
    .map((id) => getVocabLessonById(id))
    .filter((l) => l !== undefined)
  const statuses = lessons.map((lesson) => getLessonStatus(lesson, trail, progress))
  const completed = statuses.filter((s) => s === 'completed').length
  const currentIdx = statuses.findIndex((s) => s === 'available' || s === 'in-progress')
  const currentLesson = currentIdx >= 0 ? lessons[currentIdx] : null
  const allDone = completed === lessons.length && lessons.length > 0

  return (
    <div className="card p-5" id={`unit-${unit.id}`}>
      {/* Cabeçalho da unidade */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900">{unit.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{unit.description}</p>
        </div>
        <span className="badge bg-navy-100 text-navy-700 shrink-0">
          {completed}/{lessons.length} lições
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <ProgressBar
          value={lessons.length > 0 ? (completed / lessons.length) * 100 : 0}
          color={color}
          height={6}
          label={`Progresso da unidade ${unit.title}`}
          className="flex-1"
        />
      </div>
      {/* Caminho de etapas */}
      <ol
        className="mt-5 flex items-start justify-between gap-1"
        aria-label={`Etapas da unidade ${unit.title}`}
      >
        {lessons.map((lesson, i) => {
          const status = statuses[i]
          const isDone = status === 'completed'
          const isCurrent = i === currentIdx
          const isLocked = status === 'locked'
          const statusLabel = isDone
            ? 'Concluída'
            : isLocked
              ? 'Bloqueada'
              : status === 'in-progress'
                ? 'Em andamento'
                : 'Disponível'

          const step = (
            <div className="flex flex-col items-center gap-1.5 w-[18%] min-w-0 sm:w-24">
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-bold transition-colors ${
                  isDone
                    ? 'bg-aqua-500 border-aqua-500 text-white'
                    : isLocked
                      ? 'bg-gray-100 border-gray-200 text-gray-400'
                      : isCurrent
                        ? 'bg-plum-100 border-plum-500 text-plum-700 ring-2 ring-plum-200'
                        : 'bg-card border-navy-300 text-navy-700'
                }`}
                aria-hidden="true"
              >
                {isDone ? (
                  <CheckCircle2 size={20} />
                ) : isLocked ? (
                  <Lock size={16} />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`text-[11px] leading-tight text-center break-words w-full ${
                  isLocked ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {lesson.title}
              </span>
              {isCurrent && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-plum-700 bg-plum-100 rounded-full px-2 py-0.5">
                  {status === 'in-progress' ? 'Continuar' : 'Atual'}
                </span>
              )}
            </div>
          )

          return (
            <li key={lesson.id} className="flex items-start flex-1 min-w-0 last:flex-none">
              {i > 0 && (
                <span
                  className={`hidden sm:block h-0.5 w-full max-w-8 mt-5 rounded-full ${
                    statuses[i - 1] === 'completed' ? 'bg-aqua-400' : 'bg-gray-200'
                  }`}
                  aria-hidden="true"
                />
              )}
              {isLocked ? (
                <div aria-label={`${lesson.title} — ${statusLabel}`} className="opacity-80">
                  {step}
                </div>
              ) : (
                <Link
                  to={`/vocabulario/${lesson.id}`}
                  aria-label={`${lesson.title} — ${statusLabel}`}
                  className="rounded-lg transition-transform hover:scale-105"
                >
                  {step}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      {/* CTA da unidade */}
      <div className="mt-5 flex justify-end">
        {currentLesson ? (
          <Link
            to={`/vocabulario/${currentLesson.id}`}
            className="btn btn-primary text-sm"
            id={`unit-cta-${unit.id}`}
            style={{ background: color }}
          >
            <PlayCircle size={17} />
            {statuses[currentIdx] === 'in-progress' ? 'Continuar' : 'Iniciar'} —{' '}
            {currentLesson.title}
          </Link>
        ) : allDone ? (
          <span className="badge bg-aqua-100 text-aqua-700">✓ Unidade concluída</span>
        ) : null}
      </div>
    </div>
  )
}