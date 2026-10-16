// ============================================================
// TESTES — Catálogo de vocabulário e geração de questões
// ============================================================

import { describe, it, expect } from 'vitest'
import {
  getAllPalavras,
  getPalavraById,
  getVocabLessons,
  getVocabLessonById,
  getVocabTrail,
  getVocabUnits,
  getUnusedWordIds,
  getCatalogIssues,
  REVIEW_LESSON,
} from '@/features/vocab/catalog'
import {
  buildSynonymQuestion,
  generateVocabSession,
  isAmbiguousPair,
  normalizeText,
  createRng,
  hashSeed,
} from '@/features/vocab/questionGenerator'

describe('Catálogo de vocabulário (palavras.json)', () => {
  it('carrega os 152 termos com campos válidos', () => {
    const palavras = getAllPalavras()
    expect(palavras.length).toBe(152)
    for (const p of palavras) {
      expect(p.id).toBeTruthy()
      expect(p.palavra).toBeTruthy()
      expect(p.sinonimo).toBeTruthy()
      expect(typeof p.explicacao).toBe('string')
      expect(typeof p.categoria).toBe('string')
      expect(typeof p.contexto).toBe('string')
    }
  })

  it('não registra problemas editoriais para o catálogo atual', () => {
    expect(getCatalogIssues()).toEqual([])
  })

  it('ids são únicos', () => {
    const ids = getAllPalavras().map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gera 15 lições de 10 palavras sem repetição', () => {
    const lessons = getVocabLessons()
    expect(lessons).toHaveLength(15)
    for (const lesson of lessons) {
      expect(lesson.wordIds).toHaveLength(10)
    }
    const covered = lessons.flatMap((l) => l.wordIds)
    expect(new Set(covered).size).toBe(150)
    for (const id of covered) {
      expect(getPalavraById(id)).toBeDefined()
    }
  })

  it('registra os termos excedentes sem descartá-los', () => {
    const covered = getVocabLessons().flatMap((l) => l.wordIds)
    const unused = getUnusedWordIds()
    // 152 = 15 × 10 + 2
    expect(unused).toHaveLength(2)
    for (const id of unused) {
      expect(getPalavraById(id)).toBeDefined()
      expect(covered).not.toContain(id)
    }
    expect(covered.length + unused.length).toBe(getAllPalavras().length)
  })

  it('ids de lição são estáveis (compatível com progresso salvo) e a revisão é separada', () => {
    const ids = getVocabLessons().map((l) => l.id)
    expect(ids).toEqual(Array.from({ length: 15 }, (_, i) => `vocab-lesson-${i + 1}`))
    expect(getVocabLessonById(REVIEW_LESSON.id)).toBeDefined()
    expect(getVocabTrail().lessonIds).not.toContain(REVIEW_LESSON.id)
    expect(getVocabTrail().lessonIds).toHaveLength(15)
  })

  it('unidades derivadas dos dados: 3 unidades de 5 lições com títulos', () => {
    const units = getVocabUnits()
    expect(units).toHaveLength(3)
    expect(units.map((u) => u.title)).toEqual([
      'Termos essenciais',
      'Processo e procedimentos',
      'Direitos e obrigações',
    ])
    const allLessons = units.flatMap((u) => u.lessonIds)
    expect(allLessons).toHaveLength(15)
    expect(new Set(allLessons).size).toBe(15)
    expect(allLessons).toEqual(getVocabLessons().map((l) => l.id))
    for (const lesson of getVocabLessons()) {
      expect(lesson.unitId).toMatch(/^vocab-unit-\d+$/)
    }
  })

  it('nomes curtos das lições derivam dos dados e são únicos', () => {
    const titles = getVocabLessons().map((l) => l.title)
    expect(new Set(titles).size).toBe(15)
    for (const title of titles) {
      expect(title.trim()).toBeTruthy()
    }
  })
})

describe('Geração de questões de sinônimos', () => {
  const pool = getAllPalavras()

  it('gera questão válida para todo termo do catálogo', () => {
    for (const palavra of pool) {
      const rng = createRng(hashSeed(`test-${palavra.id}`))
      const question = buildSynonymQuestion(palavra, pool, rng)
      expect(question, `questão ausente para ${palavra.id}`).not.toBeNull()

      // 4 alternativas distintas
      expect(question!.options).toHaveLength(4)
      const normalized = question!.options.map((o) => normalizeText(o.text))
      expect(new Set(normalized).size).toBe(4)

      // Única resposta correta = sinonimo do termo
      const correct = question!.options.find((o) => o.id === question!.correctOptionId)
      expect(correct?.text).toBe(palavra.sinonimo)

      // Enunciado referencia a palavra
      expect(question!.stem).toContain(palavra.palavra)

      // Distratores não são alternativamente corretos (nem radicais iguais)
      for (const option of question!.options) {
        if (option.id === question!.correctOptionId) continue
        expect(normalizeText(option.text)).not.toBe(normalizeText(palavra.sinonimo))
        expect(isAmbiguousPair(option.text, palavra.sinonimo)).toBe(false)
      }
    }
  })

  it('é determinística com a mesma semente', () => {
    const a = generateVocabSession(
      pool.map((p) => p.id),
      pool,
      'vocab-lesson-1:123456',
      5,
    )
    const b = generateVocabSession(
      pool.map((p) => p.id),
      pool,
      'vocab-lesson-1:123456',
      5,
    )
    expect(a.questions.map((q) => q.id)).toEqual(b.questions.map((q) => q.id))
    expect(a.questions.map((q) => q.options.map((o) => o.text))).toEqual(
      b.questions.map((q) => q.options.map((o) => o.text)),
    )
  })

  it('respeita o limite de questões por sessão', () => {
    const session = generateVocabSession(
      pool.map((p) => p.id),
      pool,
      'seed',
      4,
    )
    expect(session.questions.length).toBeLessThanOrEqual(4)
    expect(session.questions.length).toBeGreaterThan(0)
  })

  it('retorna null quando não há distratores suficientes', () => {
    const smallPool = pool.slice(0, 3)
    for (const palavra of smallPool) {
      const rng = createRng(1)
      expect(buildSynonymQuestion(palavra, smallPool, rng)).toBeNull()
    }
  })

  it('exclui distratores que são radicais do sinônimo correto', () => {
    const cominacao = getPalavraById('cominacao')! // sinonimo: "Penalidade prevista"
    const sancao = getPalavraById('sancao')! // sinonimo: "Penalidade"
    const others = ['anuencia', 'litigio', 'dirimir'].map((id) => getPalavraById(id)!)

    const question = buildSynonymQuestion(sancao, [sancao, cominacao, ...others], createRng(7))
    expect(question).not.toBeNull()
    const texts = question!.options.map((o) => o.text)
    expect(texts).not.toContain(cominacao.sinonimo)
  })
})

describe('Detecção de pares ambíguos', () => {
  it('detecta igualdade normalizada', () => {
    expect(isAmbiguousPair('Concordância', 'concordancia ')).toBe(true)
  })

  it('detecta radical em comum', () => {
    expect(isAmbiguousPair('Penalidade', 'Penalidade prevista')).toBe(true)
    expect(isAmbiguousPair('Concordância', 'Concordar')).toBe(true)
  })

  it('não marca termos distintos como ambíguos', () => {
    expect(isAmbiguousPair('Disputa', 'Pretensão')).toBe(false)
    expect(isAmbiguousPair('Rejeição', 'Aprovação')).toBe(false)
  })
})
