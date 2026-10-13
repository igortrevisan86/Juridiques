// ============================================================
// TrailCard — Card de trilha para o mapa de aprendizagem
// ============================================================

import { Link } from 'react-router-dom'
import { BookOpen, FileText, Scale, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { Trail, UserProgress } from '@/types'
import { getTrailCompletedCount, isTrailCompleted } from '@/utils/unlock'
import { ProgressBar } from '@/components/ui/ProgressBar'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  FileText,
  Scale,
}

interface TrailCardProps {
  trail: Trail
  progress: UserProgress
}

export function TrailCard({ trail, progress }: TrailCardProps) {
  const completed = getTrailCompletedCount(trail, progress)
  const total = trail.lessonIds.length
  const pct = total > 0 ? (completed / total) * 100 : 0
  const done = isTrailCompleted(trail, progress)

  const Icon = ICON_MAP[trail.icon] ?? BookOpen

  return (
    <Link
      to={`/trilha/${trail.id}`}
      id={`trail-card-${trail.id}`}
      className="card block p-5 hover:scale-[1.02] transition-transform group"
    >
      <div className="flex items-start gap-4">
        {/* Ícone */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-md transition-transform group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${trail.color}, ${trail.color}dd)`,
          }}
        >
          <Icon size={28} className="text-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900 truncate">
              {trail.title}
            </h3>
            {done && (
              <CheckCircle2
                size={18}
                className="text-aqua-500 shrink-0"
              />
            )}
          </div>

          <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
            {trail.description}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <ProgressBar
              value={pct}
              color={trail.color}
              height={6}
              className="flex-1"
            />
            <span className="text-xs text-gray-400 font-medium shrink-0">
              {completed}/{total}
            </span>
          </div>
        </div>

        {/* Seta */}
        <ChevronRight
          size={20}
          className="text-gray-300 group-hover:text-gray-500 transition-colors mt-4 shrink-0"
        />
      </div>
    </Link>
  )
}
