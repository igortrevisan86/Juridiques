// ============================================================
// LevelIndicator — Indicador de nível com barra de XP
// ============================================================

import { Shield } from 'lucide-react'
import { getLevelFromXp, getLevelProgress } from '@/utils/xp'
import { ProgressBar } from './ProgressBar'

interface LevelIndicatorProps {
  xp: number
  compact?: boolean
}

export function LevelIndicator({ xp, compact = false }: LevelIndicatorProps) {
  const level = getLevelFromXp(xp)
  const progress = getLevelProgress(xp)

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-plum-700 bg-plum-100 rounded-full px-3 py-1 whitespace-nowrap">
        <Shield size={16} className="text-plum-500 shrink-0" />
        Nv. {level.level}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-grad-level text-white font-bold text-sm shadow-md shrink-0">
        {level.level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800 truncate min-w-0">
            {level.title}
          </span>
          <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{xp} XP</span>
        </div>
        <ProgressBar
          value={progress}
          color="var(--color-brand-plum)"
          height={6}
        />
      </div>
    </div>
  )
}
