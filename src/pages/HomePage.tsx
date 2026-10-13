// ============================================================
// PÁGINA INICIAL — Mapa de aprendizagem
// ============================================================

import { useState } from 'react'
import { Award, BookOpenCheck, Trophy } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getAllTrails } from '@/content/trails'
import { getAllLessons } from '@/content/lessons'
import { ACHIEVEMENTS_DEFINITIONS } from '@/features/gamification/achievements'
import { TrailCard } from '@/components/learning/TrailCard'
import { XpBadge } from '@/components/ui/XpBadge'
import { StreakBadge } from '@/components/ui/StreakBadge'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

export function HomePage() {
  const { progress, resetAllProgress, storageAvailable } = useProgress()
  const [confirmReset, setConfirmReset] = useState(false)

  const trails = getAllTrails()
  const totalLessons = getAllLessons().length
  const completedLessons = Object.values(progress.lessons).filter((l) => l.completedAt).length

  return (
    <div className="fade-in space-y-8">
      {/* Hero */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
          Aprenda Direito passo a passo
        </h1>
        <p className="mt-1.5 text-gray-500">
          Trilhas estruturadas, exercícios comentados e progresso salvo no seu navegador.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <XpBadge xp={progress.xp} />
          <StreakBadge streak={progress.streak} />
          <span className="badge bg-navy-100 text-navy-700">
            <BookOpenCheck size={14} />
            {completedLessons}/{totalLessons} lições
          </span>
        </div>

        {!storageAvailable && (
          <div className="mt-4 p-3 rounded-xl bg-gold-50 border border-gold-200 text-sm text-gold-800">
            Seu navegador não permite salvar dados localmente — o progresso será perdido ao fechar
            a página.
          </div>
        )}
      </section>

      {/* Trilhas */}
      <section>
        <h2 className="text-base font-bold text-gray-900 mb-3">Trilhas</h2>
        <div className="space-y-3">
          {trails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} progress={progress} />
          ))}
        </div>
      </section>

      {/* Conquistas */}
      <section>
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Trophy size={18} className="text-gold-500" />
          Conquistas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS_DEFINITIONS.map((def) => {
            const unlockedAt = progress.achievements[def.id]?.unlockedAt ?? null
            const unlocked = unlockedAt !== null
            return (
              <div
                key={def.id}
                id={`achievement-${def.id}`}
                className={`card p-4 flex items-start gap-3 ${
                  unlocked ? '' : 'opacity-55 grayscale'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    unlocked ? 'bg-gold-100 text-gold-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Award size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{def.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{def.description}</p>
                  {unlocked && (
                    <p className="text-[11px] text-aqua-700 font-medium mt-1">
                      Desbloqueada em {new Date(unlockedAt).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Reset */}
      <section className="pt-2">
        <button
          onClick={() => setConfirmReset(true)}
          className="btn btn-secondary text-sm"
          id="reset-progress"
        >
          Reiniciar progresso
        </button>
      </section>

      <ConfirmModal
        open={confirmReset}
        title="Reiniciar todo o progresso?"
        message="Esta ação apaga seu XP, sequência, lições concluídas e conquistas deste navegador."
        bullets={[
          `${progress.xp} XP serão perdidos`,
          `${completedLessons} lições concluídas serão apagadas`,
          `Sequência de ${progress.streak} dias será zerada`,
        ]}
        confirmLabel="Sim, reiniciar"
        cancelLabel="Manter progresso"
        onConfirm={() => {
          resetAllProgress()
          setConfirmReset(false)
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  )
}
