// ============================================================
// SERVIÇO DE PERSISTÊNCIA — Juridiquês
// Chave: juridiques.progress.v1
// ============================================================

import type { UserProgress } from '@/types'
import { ACHIEVEMENTS_DEFINITIONS } from '@/features/gamification/achievements'

const STORAGE_KEY = 'juridiques.progress.v1'
const CURRENT_VERSION = 1 as const

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
    updatedAt: Date.now(),
  }
}

/**
 * Valida se um objeto recuperado é um UserProgress válido.
 * Retorna null se inválido ou de versão incompatível.
 */
function validateProgress(raw: unknown): UserProgress | null {
  if (typeof raw !== 'object' || raw === null) return null
  const obj = raw as Record<string, unknown>
  if (obj['version'] !== CURRENT_VERSION) return null
  if (typeof obj['xp'] !== 'number') return null
  if (typeof obj['lessons'] !== 'object' || obj['lessons'] === null) return null
  if (typeof obj['streak'] !== 'number') return null
  return raw as UserProgress
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
