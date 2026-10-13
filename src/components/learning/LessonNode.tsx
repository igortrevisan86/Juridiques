// ============================================================
// LessonNode — Nó de lição no mapa de trilha
// ============================================================

import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Circle,
} from 'lucide-react'
import type { Lesson, LessonStatus } from '@/types'

interface LessonNodeProps {
  lesson: Lesson
  status: LessonStatus
  trailColor: string
}

const STATUS_CONFIG: Record<
  LessonStatus,
  {
    icon: React.ComponentType<{ size?: number; className?: string }>
    bg: string
    border: string
    text: string
    label: string
    interactive: boolean
  }
> = {
  completed: {
    icon: CheckCircle2,
    bg: 'bg-aqua-50',
    border: 'border-aqua-300',
    text: 'text-aqua-700',
    label: 'Concluída',
    interactive: true,
  },
  available: {
    icon: PlayCircle,
    bg: 'bg-card',
    border: 'border-navy-300',
    text: 'text-navy-700',
    label: 'Disponível',
    interactive: true,
  },
  'in-progress': {
    icon: Circle,
    bg: 'bg-gold-50',
    border: 'border-gold-400',
    text: 'text-gold-700',
    label: 'Em andamento',
    interactive: true,
  },
  locked: {
    icon: Lock,
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-400',
    label: 'Bloqueada',
    interactive: false,
  },
}

export function LessonNode({ lesson, status, trailColor }: LessonNodeProps) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  const content = (
    <div
      id={`lesson-node-${lesson.id}`}
      className={`card relative p-4 border-2 transition-all ${config.bg} ${config.border} ${
        config.interactive
          ? 'hover:scale-[1.03] cursor-pointer'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Connector dot */}
      <div
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md"
        style={{
          background:
            status === 'completed'
              ? 'var(--color-aqua-500)'
              : status === 'locked'
              ? '#D1D5DB'
              : trailColor,
        }}
      >
        <span className="text-white text-xs font-bold">{lesson.order}</span>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <Icon
          size={22}
          className={`shrink-0 ${config.text} ${
            status === 'completed' ? 'fill-aqua-200' : ''
          }`}
        />
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${config.text} truncate`}>
            {lesson.title}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {lesson.description}
          </p>
        </div>

        {status === 'completed' && (
          <span className="text-xs font-medium text-aqua-700 bg-aqua-100 px-2 py-0.5 rounded-full shrink-0">
            ✓ 25 XP
          </span>
        )}

        {status === 'available' && (
          <span
            className="text-xs font-semibold text-white px-2.5 py-1 rounded-full shrink-0"
            style={{ background: trailColor }}
          >
            Iniciar
          </span>
        )}

        {status === 'in-progress' && (
          <span className="text-xs font-semibold text-gold-700 bg-gold-100 px-2.5 py-1 rounded-full shrink-0">
            Continuar
          </span>
        )}
      </div>
    </div>
  )

  if (!config.interactive) {
    return (
      <div aria-label={`${lesson.title} — ${config.label}`}>
        {content}
      </div>
    )
  }

  return (
    <Link
      to={`/licao/${lesson.id}`}
      aria-label={`${lesson.title} — ${config.label}`}
    >
      {content}
    </Link>
  )
}
