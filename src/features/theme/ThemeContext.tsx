// ============================================================
// THEME PROVIDER — Juridiquês
// Aplica data-theme no <html> e persiste a preferência.
// O context fica em ./themeContext (separado p/ Fast Refresh).
// ============================================================

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { loadTheme, saveTheme } from '@/services/themeService'
import type { Theme } from '@/services/themeService'
import { ThemeContext } from './context'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(loadTheme)
  const firstRun = useRef(true)

  // Aplica o atributo no elemento raiz; persiste apenas escolhas do usuário
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    saveTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])

  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  )

  const value = { theme, setTheme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
