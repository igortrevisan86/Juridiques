// ============================================================
// REVIEWPAGE — Revisão de palavras com erros ou reforço
// Histórico único de erros (progress.vocab.wrongWords).
// ============================================================

import { Link } from 'react-router-dom'
import { ArrowLeft, PlayCircle, RotateCcw, Sparkles } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getPalavraById } from '@/features/vocab/catalog'

export function ReviewPage() {
  const { progress } = useProgress()

  const entries = Object.values(progress.vocab.wrongWords)
    .sort((a, b) => b.lastWrongAt - a.lastWrongAt)
    .map((entry) => ({ entry, palavra: getPalavraById(entry.wordId) }))
    .filter((row) => row.palavra !== undefined)

  const count = entries.length

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
      <section>
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <RotateCcw size={24} className="text-gold-500" />
          Revisão de palavras
        </h1>
        <p className="mt-1.5 text-gray-500 text-sm">
          Termos respondidos incorretamente que merecem reforço. Acertar uma palavra em uma
          sessão de revisão remove-a da lista.
        </p>
      </section>

      {count === 0 ? (
        <section className="card p-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-aqua-100 text-aqua-600 mb-3">
            <Sparkles size={26} />
          </div>
          <h2 className="text-base font-bold text-gray-900">Nenhuma palavra em revisão</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Continue praticando as lições de vocabulário — palavras erradas aparecem aqui
            automaticamente.
          </p>
          <Link to="/vocabulario" className="btn btn-primary mt-5">
            <PlayCircle size={18} />
            Ir para vocabulário
          </Link>
        </section>
      ) : (
        <>
          {/* CTA de revisão */}
          <section className="card p-5 border-2 border-gold-300 bg-gold-50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {count} {count === 1 ? 'palavra para reforçar' : 'palavras para reforçar'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sessão com até 10 questões — mesma mecânica de sinônimos.
                </p>
              </div>
              <Link
                to="/vocabulario/vocab-review"
                className="btn btn-primary shrink-0"
                id="start-review"
              >
                <PlayCircle size={18} />
                Revisar agora
              </Link>
            </div>
          </section>

          {/* Lista de palavras */}
          <section className="space-y-3" aria-label="Palavras em revisão">
            {entries.map(({ entry, palavra }) => (
              <div key={entry.wordId} className="card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900">{palavra!.palavra}</p>
                    <p className="text-sm text-aqua-700 mt-0.5">{palavra!.sinonimo}</p>
                    <p className="text-xs text-gray-400 mt-1">{palavra!.categoria}</p>
                  </div>
                  <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full shrink-0">
                    {entry.timesWrong} {entry.timesWrong === 1 ? 'erro' : 'erros'}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}