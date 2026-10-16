// ============================================================
// QuestionView — Apresentação de uma questão com alternativas
// ============================================================

import { useState } from 'react'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import type { Question } from '@/types'

/** Campos usados pela view — permite questões de vocabulário além das estáticas. */
type QuestionData = Pick<Question, 'id' | 'stem' | 'options' | 'correctOptionId' | 'explanation'>

interface QuestionViewProps {
  question: QuestionData
  questionIndex: number
  totalQuestions: number
  /** ID da alternativa já confirmada (null se ainda não respondida) */
  confirmedAnswer: string | null
  onConfirm: (optionId: string) => void
  onNext: () => void
}

export function QuestionView({
  question,
  questionIndex,
  totalQuestions,
  confirmedAnswer,
  onConfirm,
  onNext,
}: QuestionViewProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const isAnswered = confirmedAnswer !== null
  const isCorrect = confirmedAnswer === question.correctOptionId

  const handleConfirm = () => {
    if (selected && !isAnswered) {
      onConfirm(selected)
    }
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Questão {questionIndex + 1} de {totalQuestions}
        </span>
      </div>

      {/* Enunciado */}
      <h3 className="text-lg font-semibold text-gray-900 mb-5 leading-relaxed">
        {question.stem}
      </h3>

      {/* Alternativas */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selected === option.id || confirmedAnswer === option.id
          const isThisCorrect = option.id === question.correctOptionId
          const isThisWrong = isAnswered && confirmedAnswer === option.id && !isThisCorrect

          let borderColor = 'border-gray-200'
          let bgColor = 'bg-card'
          let textColor = 'text-gray-700'

          if (isAnswered) {
            if (isThisCorrect) {
              borderColor = 'border-aqua-400'
              bgColor = 'bg-aqua-50'
              textColor = 'text-aqua-800'
            } else if (isThisWrong) {
              borderColor = 'border-red-400'
              bgColor = 'bg-red-50'
              textColor = 'text-red-800'
            } else {
              borderColor = 'border-gray-100'
              bgColor = 'bg-gray-50'
              textColor = 'text-gray-400'
            }
          } else if (isSelected) {
            borderColor = 'border-navy-400'
            bgColor = 'bg-navy-50'
            textColor = 'text-navy-800'
          }

          return (
            <button
              key={option.id}
              id={`option-${question.id}-${option.id}`}
              onClick={() => !isAnswered && setSelected(option.id)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderColor} ${bgColor} ${textColor} ${
                !isAnswered
                  ? 'hover:border-navy-300 hover:bg-navy-50/60 cursor-pointer'
                  : 'cursor-default'
              } ${isAnswered && isThisCorrect ? 'answer-correct' : ''} ${
                isAnswered && isThisWrong ? 'answer-wrong' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold shrink-0 mt-0.5 ${
                    isAnswered && isThisCorrect
                      ? 'bg-aqua-500 border-aqua-500 text-white'
                      : isAnswered && isThisWrong
                      ? 'bg-red-500 border-red-500 text-white'
                      : isSelected && !isAnswered
                      ? 'bg-navy-600 border-navy-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {isAnswered && isThisCorrect ? (
                    <CheckCircle2 size={14} />
                  ) : isAnswered && isThisWrong ? (
                    <XCircle size={14} />
                  ) : (
                    option.id.toUpperCase()
                  )}
                </span>
                <span className="text-sm leading-relaxed">{option.text}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div
          className={`mt-5 p-4 rounded-xl border fade-in ${
            isCorrect
              ? 'bg-aqua-50 border-aqua-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            {isCorrect ? (
              <CheckCircle2 size={18} className="text-aqua-600" />
            ) : (
              <XCircle size={18} className="text-red-600" />
            )}
            <span
              className={`text-sm font-bold ${
                isCorrect ? 'text-aqua-700' : 'text-red-700'
              }`}
            >
              {isCorrect ? 'Resposta correta!' : 'Resposta incorreta'}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Ações */}
      <div className="mt-6 flex gap-3 justify-end">
        {!isAnswered ? (
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="btn btn-primary"
            id={`confirm-${question.id}`}
          >
            Confirmar resposta
          </button>
        ) : (
          <button
            onClick={onNext}
            className="btn btn-success"
            id={`next-${question.id}`}
          >
            {questionIndex + 1 < totalQuestions ? (
              <>
                Próxima <ArrowRight size={16} />
              </>
            ) : (
              'Ver resultado'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
