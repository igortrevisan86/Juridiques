// ============================================================
// Header — Cabeçalho global: marca, navegação e estado do usuário
// Desktop: uma linha (marca · navegação · XP/sequência/nível/tema).
// Mobile: navegação em segunda linha com rolagem horizontal.
// ============================================================

import { Link, NavLink } from 'react-router-dom'
import { Languages, RotateCcw, Scale } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getPalavraById } from '@/features/vocab/catalog'
import { getMasteredCount } from '@/features/vocab/mastery'
import { LevelIndicator } from '@/components/ui/LevelIndicator'
import { XpBadge } from '@/components/ui/XpBadge'
import { StreakBadge } from '@/components/ui/StreakBadge'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
    isActive
      ? 'text-navy-700 bg-navy-100'
      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
  }`
}

const PASSIVE_LINK_CLASS = navLinkClass({ isActive: false })

function NavItems({ reviewCount }: { reviewCount: number }) {
  return (
    <>
      <NavLink to="/" end className={navLinkClass}>
        Início
      </NavLink>
      <NavLink to="/vocabulario" className={navLinkClass}>
        <Languages size={15} />
        Palavras
      </NavLink>
      <Link to="/?ir=explorar-direito" className={PASSIVE_LINK_CLASS}>
        Explorar o Direito
      </Link>
      <NavLink
        to="/revisao"
        className={navLinkClass}
        aria-label={`Revisão${reviewCount > 0 ? ` — ${reviewCount} palavras pendentes` : ''}`}
      >
        <RotateCcw size={15} />
        Revisão
        {reviewCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gold-100 text-gold-700 text-[11px] font-bold leading-none">
            {reviewCount}
          </span>
        )}
      </NavLink>
      <Link to="/?ir=conquistas" className={PASSIVE_LINK_CLASS}>
        Conquistas
      </Link>
    </>
  )
}

export function Header() {
  const { progress } = useProgress()
  const reviewCount = Object.keys(progress.vocab.wrongWords).filter((id) =>
    getPalavraById(id),
  ).length
  const masteredWords = getMasteredCount(progress)

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        {/* Linha principal */}
        <div className="h-16 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Juridiquês — início"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-grad-brand text-white shadow-md">
              <Scale size={20} />
            </span>
            <span className="text-lg font-extrabold text-navy-800 tracking-tight hidden sm:block">
              Juridiquês
            </span>
          </Link>

          {/* Navegação completa — somente desktop */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navegação principal">
            <NavItems reviewCount={reviewCount} />
          </nav>

          {/* Estado do usuário */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <XpBadge xp={progress.xp} size="sm" />
            <StreakBadge streak={progress.streak} size="sm" />
            <div className="hidden lg:block w-40 min-w-0">
              <LevelIndicator xp={progress.xp} masteredWords={masteredWords} />
            </div>
            <div className="lg:hidden">
              <LevelIndicator xp={progress.xp} masteredWords={masteredWords} compact />
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navegação rolável — mobile/tablet (sem comprimir os itens) */}
        <nav
          className="lg:hidden flex items-center gap-0.5 overflow-x-auto pb-2 -mx-1 px-1"
          aria-label="Navegação principal"
        >
          <NavItems reviewCount={reviewCount} />
        </nav>
      </div>
    </header>
  )
}