// ============================================================
// Header — Cabeçalho global com marca e estado do usuário
// ============================================================

import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { LevelIndicator } from '@/components/ui/LevelIndicator'
import { StreakBadge } from '@/components/ui/StreakBadge'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const { progress } = useProgress()

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Juridiquês — início">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-grad-brand text-white shadow-md">
            <Scale size={20} />
          </span>
          <span className="text-lg font-extrabold text-navy-800 tracking-tight hidden sm:block">
            Juridiquês
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="hidden sm:block w-44 min-w-0">
            <LevelIndicator xp={progress.xp} />
          </div>
          <div className="sm:hidden">
            <LevelIndicator xp={progress.xp} compact />
          </div>
          <StreakBadge streak={progress.streak} size="sm" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
