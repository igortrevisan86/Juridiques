// ============================================================
// TRAILPAGE — Mapa de lições de uma trilha
// ============================================================

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileText, PlayCircle, Scale } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getTrailById } from '@/content/trails'
import { getLessonsByTrail } from '@/content/lessons'
import {
  getTrailLessonStatuses,
  getTrailCompletedCount,
  getNextLesson,
} from '@/utils/unlock'
import { LessonNode } from '@/components/learning/LessonNode'
import { ProgressBar } from '@/components/ui/ProgressBar'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  FileText,
  Scale,
}

export function TrailPage() {
  const { trailId } = useParams<{ trailId: string }>()
  const { progress } = useProgress()

  const trail = trailId ? getTrailById(trailId) : undefined

  if (!trail) {
    return (
      <div className="fade-in text-center py-16">
        <h1 className="text-xl font-bold text-gray-900">Trilha não encontrada</h1>
        <Link to="/" className="btn btn-primary mt-6">
          Voltar ao início
        </Link>
      </div>
    )
  }

  const lessons = getLessonsByTrail(trail.id)
    .slice()
    .sort((a, b) => a.order - b.order)
  const statuses = getTrailLessonStatuses(trail, lessons, progress)
  const completed = getTrailCompletedCount(trail, progress)
  const total = trail.lessonIds.length
  const nextLesson = getNextLesson(trail, lessons, progress)
  const Icon = ICON_MAP[trail.icon] ?? BookOpen

  return (
    <div className="fade-in space-y-6">
      {/* Voltar */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Todas as trilhas
      </Link>

      {/* Cabeçalho da trilha */}
      <section className="card p-5">
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-md"
            style={{ background: `linear-gradient(135deg, ${trail.color}, ${trail.color}dd)` }}
          >
            <Icon size={28} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-gray-900">{trail.title}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{trail.description}</p>
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar
                value={total > 0 ? (completed / total) * 100 : 0}
                color={trail.color}
                height={8}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 font-medium shrink-0">
                {completed}/{total}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de lições */}
      <section className="relative pl-3" aria-label="Lições da trilha">
        {/* Linha conectora */}
        <div
          className="absolute left-[13px] top-4 bottom-4 w-0.5 rounded-full"
          style={{ background: `${trail.color}33` }}
          aria-hidden="true"
        />
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              status={statuses[lesson.id] ?? 'locked'}
              trailColor={trail.color}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      {nextLesson && (
        <section className="flex justify-end">
          <Link
            to={`/licao/${nextLesson.id}`}
            className="btn btn-primary"
            style={{ background: trail.color }}
          >
            <PlayCircle size={18} />
            {statuses[nextLesson.id] === 'in-progress' ? 'Continuar' : 'Começar próxima lição'}
          </Link>
        </section>
      )}
    </div>
  )
}
