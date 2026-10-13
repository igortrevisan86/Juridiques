// ============================================================
// ThemeToggle — Alternância entre modo claro e escuro
// ============================================================

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Alternar para o modo claro' : 'Alternar para o modo escuro'

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-surface text-gray-500 hover:text-navy-700 hover:border-navy-300 transition-colors shrink-0"
    >
      {isDark ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
    </button>
  )
}