// ============================================================
// LevelIndicator — Indicador de nível com meta e barra de progresso
// Nível = XP + 25 pts por palavra dominada (ver utils/xp.ts).
// ============================================================

import { getLevelState } from '@/utils/xp'
import { ProgressBar } from './ProgressBar'

interface LevelIndicatorProps {
  xp: number
  /** Palavras dominadas reais (entram na pontuação de nível) */
  masteredWords?: number
  compact?: boolean
}

export function LevelIndicator({ xp, masteredWords = 0, compact = false }: LevelIndicatorProps) {
  const state = getLevelState(xp, masteredWords)

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-sm font-bold text-plum-700 bg-plum-100 rounded-full px-3 py-1 whitespace-nowrap"
        aria-label={`Nível ${state.level.level}: ${state.level.title}`}
      >
        Nv. {state.level.level}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3 min-w-0 w-full">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-grad-level text-white font-bold text-sm shadow-md shrink-0">
        {state.level.level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800 truncate min-w-0">
            {state.level.title}
          </span>
          <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
            {state.next ? `Meta: ${state.next.title}` : 'Nível máximo'}
          </span>
        </div>
        <ProgressBar
          value={state.progressPct}
          color="var(--color-brand-plum)"
          height={6}
        />
      </div>
    </div>
  )
}
