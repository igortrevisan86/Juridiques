// ============================================================
// TESTES — Serviço de tema e ThemeToggle
// ============================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  loadTheme,
  saveTheme,
  getSystemTheme,
  getThemeStorageKey,
} from '@/services/themeService'
import { ThemeProvider } from '@/features/theme/ThemeContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const KEY = getThemeStorageKey()

/** jsdom não implementa matchMedia — instala um stub configurável. */
function stubMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

describe('themeService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    Reflect.deleteProperty(window, 'matchMedia')
  })

  it('usa a chave específica juridiques.theme.v1', () => {
    expect(KEY).toBe('juridiques.theme.v1')
  })

  it('restaura a preferência salva', () => {
    localStorage.setItem(KEY, 'dark')
    expect(loadTheme()).toBe('dark')
    localStorage.setItem(KEY, 'light')
    expect(loadTheme()).toBe('light')
  })

  it('cai no tema do sistema quando não há preferência salva', () => {
    stubMatchMedia(true) // dark
    expect(getSystemTheme()).toBe('dark')
    expect(loadTheme()).toBe('dark')
  })

  it('ignora valor inválido no storage e usa o sistema', () => {
    localStorage.setItem(KEY, 'banana')
    stubMatchMedia(false) // light
    expect(loadTheme()).toBe('light')
  })

  it('persiste a escolha e retorna true', () => {
    expect(saveTheme('dark')).toBe(true)
    expect(localStorage.getItem(KEY)).toBe('dark')
  })

  it('não lança erro quando o storage falha', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(saveTheme('dark')).toBe(false)

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(loadTheme()).toBe('light') // assume light sem lançar
  })
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  function renderToggle() {
    return render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )
  }

  it('aplica data-theme no elemento raiz ao montar', () => {
    renderToggle()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('alterna para escuro ao clicar e persiste a escolha', async () => {
    const user = userEvent.setup()
    renderToggle()

    const button = screen.getByRole('button', { name: /alternar para o modo escuro/i })
    await user.click(button)

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem(KEY)).toBe('dark')
    // Rótulo acessível invertido
    expect(
      screen.getByRole('button', { name: /alternar para o modo claro/i }),
    ).toBeTruthy()
  })

  it('volta para o claro ao clicar novamente', async () => {
    const user = userEvent.setup()
    renderToggle()

    const button = screen.getByRole('button', { name: /alternar para o modo escuro/i })
    await user.click(button)
    await user.click(screen.getByRole('button', { name: /alternar para o modo claro/i }))

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem(KEY)).toBe('light')
  })

  it('restaura tema escuro salvo ao montar', () => {
    localStorage.setItem(KEY, 'dark')
    renderToggle()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: /alternar para o modo claro/i })).toBeTruthy()
  })

  it('expõe aria-pressed coerente com o tema atual', async () => {
    const user = userEvent.setup()
    renderToggle()

    const button = screen.getByRole('button', { name: /alternar para o modo escuro/i })
    expect(button.getAttribute('aria-pressed')).toBe('false')

    await act(async () => {
      await user.click(button)
    })
    expect(
      screen.getByRole('button', { name: /alternar para o modo claro/i }).getAttribute('aria-pressed'),
    ).toBe('true')
  })
})
