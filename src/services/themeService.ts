// ============================================================
// SERVIÇO DE TEMA — Juridiquês
// Chave: juridiques.theme.v1 (independente do progresso)
// ============================================================

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'juridiques.theme.v1'

/** Preferência do sistema operacional; assume 'light' se indisponível. */
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Resolve o tema inicial: preferência salva > preferência do sistema.
 * Falhas de localStorage nunca impedem o funcionamento.
 */
export function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark') return raw
  } catch {
    // Storage indisponível — cai no sistema
  }
  return getSystemTheme()
}

/** Persiste a preferência. Retorna false se o armazenamento falhar. */
export function saveTheme(theme: Theme): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
    return true
  } catch {
    return false
  }
}

/** Chave de armazenamento (para testes). */
export function getThemeStorageKey(): string {
  return STORAGE_KEY
}
