// ============================================================
// PÁGINA INICIAL — Redesign (15/10/2026)
// Cartão principal + caminho de aprendizagem por unidades + coluna
// lateral de resumo + áreas complementares preservadas.
// ============================================================

import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Award,
  BookOpenCheck,
  Flame,
  PlayCircle,
  RotateCcw,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getAllTrails } from '@/content/trails'
import { getAllLessons } from '@/content/lessons'
import { getVocabLessons, getVocabTrail, getVocabUnits, getPalavraById } from '@/features/vocab/catalog'
import { getMasteredCount, getAccuracyPercent } from '@/features/vocab/mastery'
import { getNextLesson, getTrailCompletedCount } from '@/utils/unlock'
import { getLevelState } from '@/utils/xp'
import { ACHIEVEMENTS_DEFINITIONS } from '@/features/gamification/achievements'
import { TrailCard } from '@/components/learning/TrailCard'
import { UnitPath } from '@/components/learning/UnitPath'
import { XpBadge } from '@/components/ui/XpBadge'
import { StreakBadge } from '@/components/ui/StreakBadge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

export function HomePage() {
  const { progress, resetAllProgress, storageAvailable } = useProgress()
  const [confirmReset, setConfirmReset] = useState(false)
  const [params, setParams] = useSearchParams()

  // Rolagem para as âncoras vindas do menu do cabeçalho (?ir=explorar-direito|conquistas)
  useEffect(() => {
    const target = params.get('ir')
    if (!target) return
    const el = document.getElementById(target)
    if (el) {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
    const nextParams = new URLSearchParams(params)
    nextParams.delete('ir')
    setParams(nextParams, { replace: true })
  }, [params, setParams])

  // ------ Dados reais do usuário ------
  const trails = getAllTrails()
  const contentLessons = getAllLessons()
  const completedContent = contentLessons.filter(
    (l) => progress.lessons[l.id]?.completedAt,
  ).length

  const vocabTrail = getVocabTrail()
  const vocabLessons = getVocabLessons()
  const units = getVocabUnits()
  const vocabCompleted = getTrailCompletedCount(vocabTrail, progress)
  const vocabTotal = vocabLessons.length
  const nextLesson = getNextLesson(vocabTrail, vocabLessons, progress)

  const reviewCount = Object.keys(progress.vocab.wrongWords).filter((id) =>
    getPalavraById(id),
  ).length
  const masteredCount = getMasteredCount(progress)
  const level = getLevelState(progress.xp, masteredCount)
  const accuracy = getAccuracyPercent(progress, vocabLessons, contentLessons)

  const inProgressLessonId =
    progress.currentAttempt && !progress.currentAttempt.completedAt
      ? progress.currentAttempt.lessonId
      : null
  const continueLabel = !nextLesson
    ? 'Revisar palavras'
    : inProgressLessonId === nextLesson.id
      ? 'Continuar lição em andamento'
      : vocabCompleted === 0
        ? 'Começar primeira lição'
        : 'Continuar de onde parou'

  return (
    <div className="fade-in space-y-6">
      {/* ===== Cartão principal ===== */}
      <section className="card p-6 sm:p-8 border-2 border-navy-200 bg-gradient-to-br from-navy-50/70 via-card to-plum-50/50">
        <span className="badge bg-plum-100 text-plum-700 mb-3">
          Experiência principal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
          Aprenda vocabulário jurídico por sinônimos
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
          Veja a palavra, escolha o sinônimo certo entre quatro alternativas e fixe o
          significado com prática, feedback imediato e revisão das palavras erradas.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={nextLesson ? `/vocabulario/${nextLesson.id}` : '/vocabulario'}
            className="btn btn-primary"
            id="continue-cta"
          >
            <PlayCircle size={18} />
            {continueLabel}
          </Link>
          <Link to="/vocabulario" className="btn btn-secondary" id="all-trails-cta">
            Ver todas as trilhas de palavras
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="badge bg-navy-100 text-navy-700">
            <BookOpenCheck size={14} />
            {vocabCompleted}/{vocabTotal} lições de palavras
          </span>
          <span className="badge bg-aqua-100 text-aqua-700">
            <Target size={14} />
            {masteredCount} palavras dominadas
          </span>
          <XpBadge xp={progress.xp} />
          <StreakBadge streak={progress.streak} size="sm" />
          <span className="badge bg-plum-100 text-plum-700">
            <Award size={14} />
            {level.level.title}
          </span>
        </div>

        {!storageAvailable && (
          <div className="mt-4 p-3 rounded-xl bg-gold-50 border border-gold-200 text-sm text-gold-800">
            Seu navegador não permite salvar dados localmente — o progresso será perdido ao
            fechar a página.
          </div>
        )}
      </section>
      {/* ===== Grid: conteúdo principal + coluna lateral ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Caminho de aprendizagem — unidades derivadas dos dados */}
          <section aria-labelledby="caminho-titulo">
            <h2 id="caminho-titulo" className="text-base font-bold text-gray-900 mb-1">
              Caminho de aprendizagem
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              Unidades de cinco lições com desbloqueio progressivo — conclua a etapa para
              liberar a seguinte.
            </p>
            <div className="space-y-4">
              {units.map((unit) => (
                <UnitPath key={unit.id} unit={unit} progress={progress} />
              ))}
            </div>
          </section>

          {/* Explorar o Direito — área complementar preservada */}
          <section
            id="explorar-direito"
            aria-labelledby="explorar-titulo"
            tabIndex={-1}
            className="scroll-mt-28 focus:outline-none"
          >
            <h2 id="explorar-titulo" className="text-base font-bold text-gray-900 mb-1">
              Explorar o Direito
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              Trilhas complementares com conceitos, exemplos e referências das áreas do
              Direito — conteúdo teórico completo, como sempre.
            </p>
            <div className="space-y-3">
              {trails.map((trail) => (
                <TrailCard key={trail.id} trail={trail} progress={progress} />
              ))}
            </div>
          </section>

          {/* Conquistas */}
          <section
            id="conquistas"
            aria-labelledby="conquistas-titulo"
            tabIndex={-1}
            className="scroll-mt-28 focus:outline-none"
          >
            <h2
              id="conquistas-titulo"
              className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2"
            >
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

          {/* Reiniciar progresso */}
          <section className="pt-2">
            <button
              onClick={() => setConfirmReset(true)}
              className="btn btn-secondary text-sm"
              id="reset-progress"
            >
              Reiniciar progresso
            </button>
          </section>
        </div>
        {/* ===== Coluna lateral — resumo do progresso ===== */}
        <aside className="space-y-3" aria-label="Resumo do progresso">
          {/* Nível */}
          <div className="card p-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <Award size={16} className="text-plum-500" />
              Seu nível
            </h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-grad-level text-white font-bold shadow-md shrink-0">
                {level.level.level}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">{level.level.title}</p>
                <p className="text-xs text-gray-500">
                  {masteredCount}{' '}
                  {masteredCount === 1 ? 'palavra dominada' : 'palavras dominadas'}
                </p>
              </div>
            </div>
            <ProgressBar
              value={level.progressPct}
              color="var(--color-brand-plum)"
              height={6}
              className="mt-3"
            />
            <p className="text-xs text-gray-500 mt-2">
              {level.next
                ? `Meta ${level.next.title}: faltam ${level.pointsToNext} pontos — ${level.xp} XP ou ${level.wordsToNext} ${
                    level.wordsToNext === 1 ? 'palavra dominada' : 'palavras dominadas'
                  } de bônus.`
                : 'Nível máximo atingido — continue praticando!'}
            </p>
          </div>

          {/* Progresso geral */}
          <div className="card p-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <BookOpenCheck size={16} className="text-aqua-600" />
              Progresso geral
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Vocabulário</span>
                  <span className="text-gray-400 font-medium">
                    {vocabCompleted}/{vocabTotal}
                  </span>
                </div>
                <ProgressBar
                  value={vocabTotal > 0 ? (vocabCompleted / vocabTotal) * 100 : 0}
                  color="#8B5CF6"
                  height={6}
                  label="Progresso no vocabulário"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Conteúdo do Direito</span>
                  <span className="text-gray-400 font-medium">
                    {completedContent}/{contentLessons.length}
                  </span>
                </div>
                <ProgressBar
                  value={
                    contentLessons.length > 0
                      ? (completedContent / contentLessons.length) * 100
                      : 0
                  }
                  color="#1E3A8A"
                  height={6}
                  label="Progresso no conteúdo do Direito"
                />
              </div>
              {accuracy !== null && (
                <p className="flex items-center gap-1.5 text-xs text-gray-600">
                  <TrendingUp size={14} className="text-aqua-600 shrink-0" />
                  Taxa de acerto (melhores pontuações):{' '}
                  <strong className="text-gray-900">{accuracy}%</strong>
                </p>
              )}
            </div>
          </div>

          {/* XP e sequência */}
          <div className="card p-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Zap size={13} className="text-gold-500" />
                XP total
              </p>
              <p className="text-lg font-extrabold text-gray-900">{progress.xp}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Flame size={13} className="text-plum-500" />
                Sequência
              </p>
              <p className="text-lg font-extrabold text-gray-900">
                {progress.streak} {progress.streak === 1 ? 'dia' : 'dias'}
              </p>
            </div>
          </div>
          {/* Revisão */}
          <div className="card p-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-1">
              <RotateCcw size={16} className="text-gold-500" />
              Revisão
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              {reviewCount > 0
                ? `${reviewCount} ${reviewCount === 1 ? 'palavra precisa' : 'palavras precisam'} de reforço.`
                : 'Nenhuma palavra pendente — siga praticando.'}
            </p>
            <Link to="/revisao" className="btn btn-secondary text-sm w-full justify-center">
              {reviewCount > 0 ? 'Revisar agora' : 'Ver revisão'}
            </Link>
          </div>

          {/* Acesso rápido a Explorar o Direito */}
          <div className="card p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Explorar o Direito</h3>
            <p className="text-xs text-gray-500 mb-3">
              {trails.length} trilhas teóricas — {completedContent}/{contentLessons.length}{' '}
              lições concluídas.
            </p>
            <Link
              to="/?ir=explorar-direito"
              className="btn btn-secondary text-sm w-full justify-center"
            >
              Ver trilhas
            </Link>
          </div>
        </aside>
      </div>

      <ConfirmModal
        open={confirmReset}
        title="Reiniciar todo o progresso?"
        message="Esta ação apaga seu XP, sequência, lições concluídas, conquistas, palavras dominadas e em revisão deste navegador."
        bullets={[
          `${progress.xp} XP serão perdidos`,
          `${vocabCompleted} lições de vocabulário concluídas serão apagadas`,
          `${masteredCount} palavras dominadas perderão o registro`,
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
