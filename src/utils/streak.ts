// ============================================================
// UTILITÁRIOS DE SEQUÊNCIA DIÁRIA — Juridiquês
// Fuso horário: America/Sao_Paulo (BRT/BRST)
// ============================================================

/** Fuso horário explícito do produto */
export const PRODUCT_TIMEZONE = 'America/Sao_Paulo'

/**
 * Retorna a data atual no formato YYYY-MM-DD no fuso horário do produto.
 * Aceita um timestamp opcional para facilitar testes controlados.
 */
export function getTodayDateString(nowMs?: number): string {
  const now = nowMs !== undefined ? new Date(nowMs) : new Date()
  return now.toLocaleDateString('sv-SE', { timeZone: PRODUCT_TIMEZONE })
}

/**
 * Verifica se duas strings de data são dias consecutivos (d2 = d1 + 1 dia).
 */
export function areConsecutiveDays(d1: string, d2: string): boolean {
  const date1 = new Date(`${d1}T12:00:00`)
  const date2 = new Date(`${d2}T12:00:00`)
  const diffMs = date2.getTime() - date1.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
  return diffDays === 1
}

/**
 * Calcula a nova sequência após uma atividade válida.
 *
 * @param lastDate  - Data da última atividade (YYYY-MM-DD) ou null se nunca houve.
 * @param today     - Data de hoje (YYYY-MM-DD).
 * @param currentStreak - Sequência atual.
 */
export function computeNewStreak(
  lastDate: string | null,
  today: string,
  currentStreak: number,
): number {
  if (lastDate === null) return 1
  if (lastDate === today) return currentStreak // já computado hoje
  if (areConsecutiveDays(lastDate, today)) return currentStreak + 1
  return 1 // dia perdido — reinicia
}

/**
 * Verifica se a atividade de hoje já foi registrada.
 */
export function hasActivityToday(lastDate: string | null, today: string): boolean {
  return lastDate === today
}
