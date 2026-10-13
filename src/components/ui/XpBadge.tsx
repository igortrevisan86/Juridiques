// ============================================================
// XpBadge — Indicador de XP compacto
// ============================================================

import { Zap } from 'lucide-react'

interface XpBadgeProps {
  xp: number
  size?: 'sm' | 'md'
}

export function XpBadge({ xp, size = 'md' }: XpBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5 gap-1'
    : 'text-sm px-3 py-1 gap-1.5'
  const iconSize = size === 'sm' ? 12 : 16

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold bg-gold-100 text-gold-700 ${sizeClasses}`}
    >
      <Zap size={iconSize} className="fill-gold-500 text-gold-500 shrink-0" />
      {xp} XP
    </span>
  )
}
