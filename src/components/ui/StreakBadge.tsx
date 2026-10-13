// ============================================================
// StreakBadge — Indicador de sequência diária
// ============================================================

import { Flame } from 'lucide-react'

interface StreakBadgeProps {
  streak: number
  size?: 'sm' | 'md'
}

export function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const active = streak > 0
  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5 gap-1'
    : 'text-sm px-3 py-1 gap-1.5'
  const iconSize = size === 'sm' ? 12 : 16

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold ${sizeClasses} ${
        active
          ? 'bg-plum-100 text-plum-700'
          : 'bg-gray-100 text-gray-400'
      }`}
    >
      <Flame
        size={iconSize}
        className={`shrink-0 ${active ? 'fill-plum-500 text-plum-500' : 'text-gray-400'}`}
      />
      {streak} {streak === 1 ? 'dia' : 'dias'}
    </span>
  )
}
