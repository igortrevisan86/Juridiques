// ============================================================
// SMOKE TESTS — Fase 1
// Verifica que os utilitários básicos compilam e funcionam.
// ============================================================

import { describe, it, expect } from 'vitest'
import { getLevelFromXp, getLevelProgress } from '@/utils/xp'
import { getTodayDateString, computeNewStreak, areConsecutiveDays } from '@/utils/streak'

describe('Utilitários de XP', () => {
  it('retorna nível 1 para 0 XP', () => {
    expect(getLevelFromXp(0).level).toBe(1)
  })

  it('retorna nível 2 para 50 XP', () => {
    expect(getLevelFromXp(50).level).toBe(2)
  })

  it('retorna nível 7 para XP alto', () => {
    expect(getLevelFromXp(1000).level).toBe(7)
  })

  it('calcula progresso percentual dentro do nível', () => {
    const progress = getLevelProgress(0)
    expect(progress).toBeGreaterThanOrEqual(0)
    expect(progress).toBeLessThanOrEqual(100)
  })

  it('retorna 100% para o último nível', () => {
    expect(getLevelProgress(1000)).toBe(100)
  })
})

describe('Utilitários de sequência diária', () => {
  it('formata a data corretamente como YYYY-MM-DD', () => {
    const ts = new Date('2024-03-15T15:00:00Z').getTime()
    const result = getTodayDateString(ts)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('detecta dias consecutivos corretamente', () => {
    expect(areConsecutiveDays('2024-03-14', '2024-03-15')).toBe(true)
    expect(areConsecutiveDays('2024-03-14', '2024-03-16')).toBe(false)
    expect(areConsecutiveDays('2024-03-14', '2024-03-13')).toBe(false)
  })

  it('inicia sequência 1 quando não há histórico', () => {
    expect(computeNewStreak(null, '2024-03-15', 0)).toBe(1)
  })

  it('incrementa sequência em dias consecutivos', () => {
    expect(computeNewStreak('2024-03-14', '2024-03-15', 3)).toBe(4)
  })

  it('reinicia sequência quando um dia é perdido', () => {
    expect(computeNewStreak('2024-03-12', '2024-03-15', 5)).toBe(1)
  })

  it('não incrementa sequência no mesmo dia', () => {
    expect(computeNewStreak('2024-03-15', '2024-03-15', 3)).toBe(3)
  })
})
