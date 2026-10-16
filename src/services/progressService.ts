// ============================================================
// SERVIÇO DE PERSISTÊNCIA — Juridiquês
// Chave: juridiques.progress.v1
// ============================================================

import type { UserProgress, VocabProgress, WordStat } from '@/types'
import { ACHIEVEMENTS_DEFINITIONS } from '@/features/gamification/achievements'

const STORAGE_KEY = 'juridiques.progress.v1'
const CURRENT_VERSION = 2 as const

/** Estado inicial limpo */
export function createInitialProgress(): UserProgress {
  return {
    version: CURRENT_VERSION,
    xp: 0,
    lessons: {},
    currentAttempt: null,
    streak: 0,
    lastActivityDate: null,
    achievements: Object.fromEntries(
      ACHIEVEMENTS_DEFINITIONS.map((a) => [
        a.id,
        { id: a.id, name: a.name, description: a.description, unlockedAt: null },
      ]),
    ),
    vocab: { wrongWords: {}, wordStats: {} },
    updatedAt: Date.now(),
  }
}

/** Garante que toda conquista definida no código exista no registro salvo. */
function withAchievementShells(
  achievements: UserProgress['achievements'],
): UserProgress['achievements'] {
  const merged = { ...achievements }
  for (const def of ACHIEVEMENTS_DEFINITIONS) {
    if (!merged[def.id]) {
      merged[def.id] = {
        id: def.id,
        name: def.name,
        description: def.description,
        unlockedAt: null,
      }
    }
  }
  return merged
}

/**
 * Migra um progresso v1 para v2 de forma retrocompatível:
 * preserva XP, lições, conquistas e sequência; apenas acrescenta
 * o campo `vocab` (vazio) e normaliza as conquistas.
 */
function migrateV1toV2(obj: Record<string, unknown>): UserProgress {
  const achievements = (obj['achievements'] ?? {}) as UserProgress['achievements']
  return {
    version: 2,
    xp: obj['xp'] as number,
    lessons: obj['lessons'] as UserProgress['lessons'],
    currentAttempt: (obj['currentAttempt'] ?? null) as UserProgress['currentAttempt'],
    streak: obj['streak'] as number,
    lastActivityDate: (obj['lastActivityDate'] ?? null) as string | null,
    achievements: withAchievementShells(achievements),
    vocab: { wrongWords: {}, wordStats: {} },
    updatedAt: (obj['updatedAt'] as number) ?? Date.now(),
  }
}

/** Normaliza um progresso já na versão 2 (preenche campos ausentes). */
function normalizeV2(obj: Record<string, unknown>): UserProgress {
  const vocab = (obj['vocab'] ?? {}) as Partial<VocabProgress>
  const wordStats = (vocab.wordStats ?? {}) as Record<string, WordStat>
  return {
    ...(obj as unknown as UserProgress),
    version: 2,
    achievements: withAchievementShells(
      (obj['achievements'] ?? {}) as UserProgress['achievements'],
    ),
    // Extensão retrocompatível: dados v2 antigos ganham wordStats vazio
    // sem perder wrongWords, XP, lições ou conquistas.
    vocab: { wrongWords: vocab.wrongWords ?? {}, wordStats },
  }
}

/**
 * Valida se um objeto recuperado é um UserProgress válido (v1 ou v2).
 * Retorna null se inválido ou de versão incompatível.
 */
function validateProgress(raw: unknown): UserProgress | null {
  if (typeof raw !== 'object' || raw === null) return null
  const obj = raw as Record<string, unknown>
  const version = obj['version']
  if (version !== 1 && version !== 2) return null
  if (typeof obj['xp'] !== 'number') return null
  if (typeof obj['lessons'] !== 'object' || obj['lessons'] === null) return null
  if (typeof obj['streak'] !== 'number') return null
  // Migração retrocompatível: v1 → v2 (nunca apaga dados)
  if (version === 1) return migrateV1toV2(obj)
  return normalizeV2(obj)
}

/** Indica se o localStorage está disponível */
function isStorageAvailable(): boolean {
  try {
    const test = '__juridiques_test__'
    localStorage.setItem(test, '1')
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Carrega o progresso do localStorage.
 * Retorna o estado inicial se não houver dados ou se forem inválidos.
 */
export function loadProgress(): { progress: UserProgress; storageAvailable: boolean } {
  const storageAvailable = isStorageAvailable()
  if (!storageAvailable) {
    return { progress: createInitialProgress(), storageAvailable: false }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { progress: createInitialProgress(), storageAvailable: true }

    const parsed: unknown = JSON.parse(raw)
    const validated = validateProgress(parsed)

    if (!validated) {
      // Dado inválido ou versão incompatível — reseta sem derrubar a aplicação
      console.warn('[Juridiquês] Dados de progresso inválidos ou incompatíveis. Reiniciando.')
      return { progress: createInitialProgress(), storageAvailable: true }
    }

    return { progress: validated, storageAvailable: true }
  } catch (err) {
    console.warn('[Juridiquês] Erro ao ler progresso:', err)
    return { progress: createInitialProgress(), storageAvailable: true }
  }
}

/**
 * Salva o progresso no localStorage.
 * Retorna false se o armazenamento não estiver disponível ou ocorrer erro.
 */
export function saveProgress(progress: UserProgress): boolean {
  if (!isStorageAvailable()) return false
  try {
    const updated: UserProgress = { ...progress, updatedAt: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch (err) {
    console.warn('[Juridiquês] Erro ao salvar progresso:', err)
    return false
  }
}

/**
 * Reinicia o progresso apagando todos os dados.
 * Retorna o novo estado inicial.
 */
export function resetProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silencioso — se não conseguir remover, retorna estado limpo mesmo assim
  }
  return createInitialProgress()
}

/**
 * Retorna a chave de armazenamento usada (para testes).
 */
export function getStorageKey(): string {
  return STORAGE_KEY
}
