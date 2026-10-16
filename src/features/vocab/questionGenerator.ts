// ============================================================
// GERAÇÃO DE QUESTÕES DE VOCABULÁRIO — Juridiquês
// Formato exclusivo: associação palavra → sinônimo (4 alternativas).
// Determinística por tentativa (semente = lessonId + startedAt).
// ============================================================

import type { Palavra, QuestionOption, VocabSynonymQuestion } from '@/types'

/** Máximo de questões por sessão de lição/revisão. */
export const MAX_QUESTIONS_PER_SESSION = 10

const OPTION_LETTERS = ['a', 'b', 'c', 'd'] as const

/** Normaliza texto para comparação (minúsculas, sem acentos, sem espaços extras). */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Detecta pares ambíguos: textos iguais ou que compartilham um prefixo comum
 * de 6+ caracteres (ex.: "Penalidade" × "Penalidade prevista",
 * "Concordância" × "Concordar"). Evita alternativas que também poderiam
 * ser aceitas como corretas.
 */
export function isAmbiguousPair(a: string, b: string): boolean {
  const na = normalizeText(a)
  const nb = normalizeText(b)
  if (na === nb) return true
  const minLen = Math.min(na.length, nb.length)
  let common = 0
  while (common < minLen && na[common] === nb[common]) common++
  return common >= 6
}

/** PRNG determinístico (mulberry32) para embaralhamentos reprodutíveis. */
export function createRng(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Hash FNV-1a de uma string em número (semente). */
export function hashSeed(text: string): number {
  let hash = 2166136261
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Embaralha uma cópia do array (Fisher–Yates) usando o RNG fornecido. */
function shuffle<T>(items: T[], rng: () => number): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Monta uma questão de sinônimo para `palavra`.
 *
 * - Resposta correta: `sinonimo` do termo.
 * - Distratores: sinônimos de outros termos, priorizando a mesma categoria,
 *   excluindo duplicatas e pares ambíguos (radical em comum).
 * - Retorna null quando não há 3 distratores adequados — a questão não é
 *   gerada em vez de forçar alternativas ruins.
 */
export function buildSynonymQuestion(
  palavra: Palavra,
  pool: Palavra[],
  rng: () => number,
): VocabSynonymQuestion | null {
  const correct = palavra.sinonimo

  const candidates = pool.filter(
    (p) =>
      p.id !== palavra.id &&
      normalizeText(p.sinonimo) !== normalizeText(correct) &&
      !isAmbiguousPair(p.sinonimo, correct),
  )

  const sameCategory = shuffle(
    candidates.filter((p) => p.categoria === palavra.categoria),
    rng,
  )
  const others = shuffle(
    candidates.filter((p) => p.categoria !== palavra.categoria),
    rng,
  )

  const chosen: string[] = []
  for (const candidate of [...sameCategory, ...others]) {
    if (chosen.length >= 3) break
    // Evita duplicatas e radicais em comum também entre os próprios distratores
    if (chosen.some((c) => isAmbiguousPair(c, candidate.sinonimo))) continue
    chosen.push(candidate.sinonimo)
  }

  if (chosen.length < 3) return null

  const optionTexts = shuffle([correct, ...chosen], rng)
  const options: QuestionOption[] = optionTexts.map((text, i) => ({
    id: OPTION_LETTERS[i],
    text,
  }))
  const correctOptionId =
    options.find((o) => o.text === correct)?.id ?? OPTION_LETTERS[0]

  return {
    id: `q-${palavra.id}`,
    wordId: palavra.id,
    stem: `Qual é o sinônimo de “${palavra.palavra}”?`,
    options,
    correctOptionId,
    expectedSynonym: correct,
    explanation: palavra.explicacao,
  }
}

export interface VocabSession {
  questions: VocabSynonymQuestion[]
  /** Termos ignorados por falta de distratores adequados (revisão editorial). */
  skippedWordIds: string[]
}

/**
 * Gera uma sessão completa (até `limit` questões) a partir de uma lista de
 * ids de palavras. A semente deve ser estável durante uma tentativa para que
 * as questões sejam as mesmas ao recarregar a página no meio do quiz.
 */
export function generateVocabSession(
  wordIds: string[],
  pool: Palavra[],
  seed: string,
  limit: number = MAX_QUESTIONS_PER_SESSION,
): VocabSession {
  const rng = createRng(hashSeed(seed))
  const words = wordIds
    .map((id) => pool.find((p) => p.id === id))
    .filter((p): p is Palavra => p !== undefined)

  const picked = shuffle(words, rng).slice(0, limit)

  const questions: VocabSynonymQuestion[] = []
  const skippedWordIds: string[] = []
  for (const word of picked) {
    const question = buildSynonymQuestion(word, pool, rng)
    if (question) {
      questions.push(question)
    } else {
      skippedWordIds.push(word.id)
    }
  }

  return { questions, skippedWordIds }
}