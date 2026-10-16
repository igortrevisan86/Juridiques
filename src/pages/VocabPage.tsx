// ============================================================
// VOCABPAGE — Hub de aprendizado de vocabulário por sinônimos
// Área principal do Juridiquês.
// ============================================================

import { Link } from 'react-router-dom'
import { ArrowLeft, Languages, PlayCircle, RotateCcw } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getVocabLessons, getVocabTrail, getVocabUnits, getPalavraById } from '@/features/vocab/catalog'
import { getNextLesson, getTrailCompletedCount } from '@/utils/unlock'
import { UnitPath } from '@/components/learning/UnitPath'
import { ProgressBar } from '@/components/ui/ProgressBar'

export function VocabPage() {
  const { progress } = useProgress()

  const trail = getVocabTrail()
  const lessons = getVocabLessons()
  const units = getVocabUnits()
  const completed = getTrailCompletedCount(trail, progress)
  const total = lessons.length
  const nextLesson = getNextLesson(trail, lessons, progress)

  const reviewCount = Object.keys(progress.vocab.wrongWords).filter((id) =>
    getPalavraById(id),
  ).length

  return (
    <div className="fade-in space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Início
      </Link>

      {/* Cabeçalho */}
      <section className="card p-5">
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 shadow-md"
            style={{ background: `linear-gradient(135deg, ${trail.color}, ${trail.color}dd)` }}
          >
            <Languages size={28} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-gray-900">
              Vocabulário jurídico por sinônimos
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Aprenda palavras associando cada termo ao seu sinônimo. 25 XP na primeira
              conclusão de cada lição.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar
                value={total > 0 ? (completed / total) * 100 : 0}
                color={trail.color}
                height={8}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 font-medium shrink-0">
                {completed}/{total} lições
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Revisão */}
      {reviewCount > 0 && (
        <Link
          to="/revisao"
          className="card p-4 flex items-center gap-3 border-2 border-gold-300 bg-gold-50 hover:scale-[1.01] transition-transform"
        >
          <RotateCcw size={22} className="text-gold-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900">
              {reviewCount} {reviewCount === 1 ? 'palavra precisa' : 'palavras precisam'} de revisão
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Reforce os termos que você errou antes de avançar.
            </p>
          </div>
        </Link>
      )}

      {/* Unidades e etapas — caminho reutilizado da página inicial */}
      <section className="space-y-4" aria-label="Unidades de vocabulário">
        {units.map((unit) => (
          <UnitPath key={unit.id} unit={unit} progress={progress} />
        ))}
      </section>

      {/* CTA */}
      {nextLesson && (
        <section className="flex justify-end">
          <Link
            to={`/vocabulario/${nextLesson.id}`}
            className="btn btn-primary"
            style={{ background: trail.color }}
          >
            <PlayCircle size={18} />
            {progress.currentAttempt?.lessonId === nextLesson.id &&
            !progress.currentAttempt.completedAt
              ? 'Continuar'
              : completed > 0
                ? 'Continuar aprendendo'
                : 'Começar agora'}
          </Link>
        </section>
      )}
    </div>
  )
}