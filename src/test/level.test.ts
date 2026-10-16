// ============================================================
// TESTES — Sistema de nível reformulado (15/10/2026)
// ============================================================

import { describe, it, expect } from 'vitest'
import {
  getLevelFromXp,
  getLevelScore,
  getLevelState,
  getAllLevels,
  MASTERED_WORD_BONUS,
} from '@/utils/xp'

describe('Escopo de níveis', () => {
  it('primeiro nível é "Aprendiz" (não mais "Iniciante") e o último "Jurisconsulto"', () => {
    expect(getAllLevels()[0].title).toBe('Aprendiz')
    expect(getLevelFromXp(0).title).toBe('Aprendiz')
    expect(getLevelFromXp(100000).title).toBe('Jurisconsulto')
    expect(getAllLevels().some((l) => l.title === 'Iniciante')).toBe(false)
  })

  it('progressão clara e sem lacunas entre limites', () => {
    const levels = getAllLevels()
    expect(levels.length).toBeGreaterThanOrEqual(4)
    expect(levels[0].minXp).toBe(0)
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i].minXp).toBe(levels[i - 1].maxXp + 1)
    }
  })

  it('mantém os limiares históricos — ninguém regride de nível ao atualizar', () => {
    expect(getLevelFromXp(0).level).toBe(1)
    expect(getLevelFromXp(50).level).toBe(2)
    expect(getLevelFromXp(125).level).toBe(3)
    expect(getLevelFromXp(225).level).toBe(4)
    expect(getLevelFromXp(350).level).toBe(5)
    expect(getLevelFromXp(500).level).toBe(6)
    expect(getLevelFromXp(675).level).toBe(7)
  })
})

describe('Pontuação de nível = XP + bônus de palavras dominadas', () => {
  it('soma o bônus por palavra dominada ao XP', () => {
    expect(getLevelScore(100, 0)).toBe(100)
    expect(getLevelScore(100, 4)).toBe(100 + 4 * MASTERED_WORD_BONUS)
    expect(getLevelScore(0, 3)).toBe(3 * MASTERED_WORD_BONUS)
  })

  it('palavras dominadas aceleram o nível sem regredir ninguém', () => {
    for (const xp of [0, 60, 200, 400, 700]) {
      const base = getLevelFromXp(xp).level
      expect(getLevelState(xp, 0).level.level).toBe(base)
      expect(getLevelState(xp, 10).level.level).toBeGreaterThanOrEqual(base)
    }
    // 3 palavras dominadas = 75 pontos → sobe do nível 1 para o 2
    expect(getLevelState(0, 3).level.level).toBe(2)
  })
})

describe('Meta e barra de progresso do nível (dados reais)', () => {
  it('mostra próximo nível, pontos e palavras equivalentes', () => {
    const state = getLevelState(0, 0)
    expect(state.next?.title).toBe('Estudioso')
    expect(state.pointsToNext).toBe(50)
    expect(state.wordsToNext).toBe(2) // 50 / 25
    expect(state.progressPct).toBe(0)
    expect(state.masteredWords).toBe(0)
    expect(state.xp).toBe(0)
  })

  it('progresso parcial é coerente com a pontuação', () => {
    const state = getLevelState(75, 0)
    expect(state.level.title).toBe('Estudioso')
    expect(state.pointsToNext).toBe(50) // 125 - 75
    expect(state.progressPct).toBeGreaterThan(0)
    expect(state.progressPct).toBeLessThan(100)
  })

  it('nível máximo não tem meta', () => {
    const state = getLevelState(2000, 0)
    expect(state.next).toBeNull()
    expect(state.pointsToNext).toBe(0)
    expect(state.wordsToNext).toBe(0)
    expect(state.progressPct).toBe(100)
  })
})
