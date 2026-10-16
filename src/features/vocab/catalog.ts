// ============================================================
// CATÁLOGO DE VOCABULÁRIO — Juridiquês
// Fonte única: src/content/palavras.json (não duplicar em TS).
// ============================================================

import type { Palavra, Trail, VocabLesson, VocabUnit } from '@/types'
import rawPalavras from '@/content/palavras.json'

// ------ Validação do catálogo ------

const REQUIRED_FIELDS = ['id', 'palavra', 'sinonimo'] as const
const OPTIONAL_FIELDS = ['explicacao', 'categoria', 'contexto'] as const

/** Problemas editoriais registrados na validação (termos ignorados ou incompletos). */
const catalogIssues: string[] = []

function validateEntries(raw: unknown): Palavra[] {
  if (!Array.isArray(raw)) {
    catalogIssues.push('palavras.json não contém um array no nível raiz.')
    return []
  }

  const valid: Palavra[] = []
  const seenIds = new Set<string>()

  raw.forEach((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      catalogIssues.push(`Entrada #${index}: não é um objeto — ignorada.`)
      return
    }
    const obj = entry as Record<string, unknown>

    for (const field of REQUIRED_FIELDS) {
      const value = obj[field]
      if (typeof value !== 'string' || value.trim() === '') {
        catalogIssues.push(
          `Entrada #${index} (${String(obj['id'] ?? 'sem id')}): campo obrigatório "${field}" ausente ou vazio — ignorada.`,
        )
        return
      }
    }

    const id = (obj['id'] as string).trim()
    if (seenIds.has(id)) {
      catalogIssues.push(`id duplicado "${id}" — ocorrência posterior ignorada.`)
      return
    }
    seenIds.add(id)

    const palavra: Palavra = {
      id,
      palavra: (obj['palavra'] as string).trim(),
      sinonimo: (obj['sinonimo'] as string).trim(),
      explicacao: '',
      categoria: 'Termos gerais',
      contexto: '',
    }
    for (const field of OPTIONAL_FIELDS) {
      const value = obj[field]
      if (typeof value === 'string') {
        palavra[field] = value.trim()
      } else if (value !== undefined && value !== null) {
        catalogIssues.push(`Termo "${id}": campo "${field}" com tipo inválido — ignorado.`)
      }
    }
    if (palavra.explicacao === '') {
      catalogIssues.push(`Termo "${id}": sem "explicacao" — questões seguirão sem mini-explicação.`)
    }

    valid.push(palavra)
  })

  return valid
}

const PALAVRAS: Palavra[] = validateEntries(rawPalavras)

// ------ Agrupamento em lições e unidades ------

/** Palavras por lição (meta derivada do conteúdo: 152 → 15 lições de 10). */
const WORDS_PER_LESSON = 10
/** Lições por unidade temática do caminho de aprendizagem. */
const LESSONS_PER_UNIT = 5

/**
 * Ordem semântica das categorias — agrupa temas afins antes de fatiar,
 * para que as unidades fiquem coerentes sem cadastro manual.
 * Categorias fora da lista entram no final (e são registradas).
 */
const CATEGORY_ORDER = [
  'Termos gerais',
  'Termos normativos',
  'Processo',
  'Processo civil',
  'Direito civil',
  'Direito sucessório',
  'Direito penal',
  'Registros',
  'Verbos jurídicos',
]

/** Títulos das unidades (exemplo inicial); unidades extras usam fallback. */
const UNIT_DEFS = [
  {
    title: 'Termos essenciais',
    description: 'O vocabulário essencial para entender textos jurídicos.',
  },
  {
    title: 'Processo e procedimentos',
    description: 'Pedidos, petições, atos e etapas do procedimento.',
  },
  {
    title: 'Direitos e obrigações',
    description: 'Direitos, deveres e relações jurídicas na prática.',
  },
]

function categoryRank(categoria: string): number {
  const idx = CATEGORY_ORDER.indexOf(categoria)
  return idx === -1 ? CATEGORY_ORDER.length : idx
}

/** Ordena preservando a ordem do JSON dentro de cada categoria (sort estável). */
function orderByCategory(words: Palavra[]): Palavra[] {
  return [...words].sort((a, b) => categoryRank(a.categoria) - categoryRank(b.categoria))
}

/** Categoria com mais ocorrências na lição (empate → posição em CATEGORY_ORDER). */
function dominantCategory(words: Palavra[]): string {
  const counts = new Map<string, number>()
  for (const w of words) counts.set(w.categoria, (counts.get(w.categoria) ?? 0) + 1)
  let best = words[0].categoria
  let bestCount = -1
  for (const [categoria, count] of counts) {
    const better = count > bestCount || (count === bestCount && categoryRank(categoria) < categoryRank(best))
    if (better) {
      best = categoria
      bestCount = count
    }
  }
  return best
}

/**
 * Fatia o catálogo ordenado em lições de 10 palavras.
 * Excedentes (< 10) não descartam palavras: ficam registrados em
 * getUnusedWordIds() para expansão futura.
 */
function buildLessons(): VocabLesson[] {
  const ordered = orderByCategory(PALAVRAS)
  const lessons: VocabLesson[] = []
  const seqByCategory = new Map<string, number>()

  for (let i = 0; i + WORDS_PER_LESSON <= ordered.length; i += WORDS_PER_LESSON) {
    const chunk = ordered.slice(i, i + WORDS_PER_LESSON)
    const dominant = dominantCategory(chunk)
    const seq = (seqByCategory.get(dominant) ?? 0) + 1
    seqByCategory.set(dominant, seq)
    const order = lessons.length + 1
    const categories = [...new Set(chunk.map((w) => w.categoria))]
    lessons.push({
      id: `vocab-lesson-${order}`,
      order,
      unitId: `vocab-unit-${Math.ceil(order / LESSONS_PER_UNIT)}`,
      title: `${dominant} ${seq}`,
      description: `${WORDS_PER_LESSON} palavras — ${categories.slice(0, 2).join(' · ')}${
        categories.length > 2 ? '…' : ''
      }`,
      wordIds: chunk.map((w) => w.id),
    })
  }

  return lessons
}

/** Agrupa as lições em unidades de 5 (títulos derivados dos dados + defs). */
function buildUnits(lessons: VocabLesson[]): VocabUnit[] {
  const units: VocabUnit[] = []
  for (let i = 0; i < lessons.length; i += LESSONS_PER_UNIT) {
    const slice = lessons.slice(i, i + LESSONS_PER_UNIT)
    const order = units.length + 1
    const def = UNIT_DEFS[order - 1]
    units.push({
      id: `vocab-unit-${order}`,
      order,
      title: def?.title ?? `Unidade ${order}`,
      description:
        def?.description ??
        `Lição ${slice[0].order} a ${slice[slice.length - 1].order} do vocabulário.`,
      lessonIds: slice.map((l) => l.id),
    })
  }
  return units
}

const LESSONS: VocabLesson[] = buildLessons()
const UNITS: VocabUnit[] = buildUnits(LESSONS)

/**
 * Termos fora das 15 lições atuais (152 = 15 × 10 + 2).
 * Motivo: excedente do catálogo — não descartados, reservados para expansão
 * (entrarão em nova lição quando o catálogo ou a estrutura crescerem) e
 * disponíveis para revisão editorial. Nenhum termo é apagado do JSON.
 */
const UNUSED_WORD_IDS: string[] = (() => {
  const used = new Set(LESSONS.flatMap((l) => l.wordIds))
  return PALAVRAS.filter((p) => !used.has(p.id)).map((p) => p.id)
})()

/** Lição especial de revisão (wordIds dinâmicos, vem do progresso). */
export const REVIEW_LESSON: VocabLesson = {
  id: 'vocab-review',
  order: 99,
  title: 'Revisão de palavras',
  description: 'Reforce palavras que você errou ou marcou para reforço.',
  wordIds: [],
}

// ------ Acessos ------

export function getAllPalavras(): Palavra[] {
  return PALAVRAS
}

export function getPalavraById(id: string): Palavra | undefined {
  return PALAVRAS.find((p) => p.id === id)
}

export function getVocabLessons(): VocabLesson[] {
  return LESSONS
}

/** Unidades temáticas do caminho de aprendizagem (5 lições cada). */
export function getVocabUnits(): VocabUnit[] {
  return UNITS
}

/**
 * Termos do catálogo fora das lições atuais (excedente do fatiamento de 10).
 * Motivo: 152 = 15 × 10 + 2 — reservados para expansão/revisão editorial;
 * nenhum termo é descartado nem duplicado entre lições.
 */
export function getUnusedWordIds(): string[] {
  return [...UNUSED_WORD_IDS]
}

export function getVocabLessonById(id: string): VocabLesson | undefined {
  if (id === REVIEW_LESSON.id) return REVIEW_LESSON
  return LESSONS.find((l) => l.id === id)
}

/**
 * "Trilha" de vocabulário — reutiliza o tipo Trail para aproveitar
 * os utilitários de desbloqueio existentes. Não aparece na seção
 * complementar de trilhas (mantida separada de getAllTrails()).
 */
export function getVocabTrail(): Trail {
  return {
    id: 'trail-vocab',
    title: 'Vocabulário jurídico',
    description: 'Aprenda palavras jurídicas pela associação de sinônimos.',
    order: 0,
    color: '#8B5CF6',
    icon: 'Scale',
    lessonIds: LESSONS.map((l) => l.id),
  }
}

/** Termos que precisam de revisão editorial (registro fiel, sem ocultar). */
export function getCatalogIssues(): string[] {
  return [...catalogIssues]
}