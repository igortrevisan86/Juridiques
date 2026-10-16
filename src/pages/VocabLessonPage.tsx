// ============================================================
// VOCABLESSONPAGE — Lição/sessão de vocabulário por sinônimos
// Reutiliza QuestionView, tentativas, XP e desbloqueio existentes.
// ============================================================

import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Languages,
  Lock,
  PlayCircle,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import {
  getAllPalavras,
  getVocabLessonById,
  getVocabLessons,
  getVocabTrail,
  REVIEW_LESSON,
} from '@/features/vocab/catalog'
import { generateVocabSession } from '@/features/vocab/questionGenerator'
import { getLessonStatus, getNextLesson } from '@/utils/unlock'
import { QuestionView } from '@/components/learning/QuestionView'
import { XpBadge } from '@/components/ui/XpBadge'

/** XP concedido na primeira conclusão de uma lição (mesma regra do sistema existente). */
const LESSON_XP_REWARD = 25

type Phase = 'intro' | 'quiz' | 'done'

export function VocabLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  // `key` força a remontagem ao trocar de lição: sem ela, o estado (fase,
  // placar) da lição anterior persistiria e a tela não avançaria.
  return <VocabLessonView key={lessonId ?? 'not-found'} lessonId={lessonId} />
}

function VocabLessonView({ lessonId }: { lessonId?: string }) {
  const { progress, startAttempt, answerQuestion, completeLesson, recordVocabAnswer } =
    useProgress()

  const lesson = lessonId ? getVocabLessonById(lessonId) : undefined
  const trail = getVocabTrail()
  const isReview = lesson?.id === REVIEW_LESSON.id

  const attempt =
    lesson && progress.currentAttempt?.lessonId === lesson.id ? progress.currentAttempt : null

  // Semente estável durante a tentativa: recarregar a página mantém as questões.
  const attemptStart = attempt && !attempt.completedAt ? attempt.startedAt : null

  // Snapshot da lista de revisão capturado no início da tentativa.
  // (Evita que a sessão reembaralhe quando o progresso de revisão muda no meio.)
  const [reviewWordIds, setReviewWordIds] = useState<string[]>(() =>
    attempt && !attempt.completedAt && isReview
      ? Object.keys(progress.vocab.wrongWords)
      : [],
  )

  const session = useMemo(() => {
    if (attemptStart === null || !lesson) return null
    const baseIds = isReview ? reviewWordIds : lesson.wordIds
    return generateVocabSession(baseIds, getAllPalavras(), `${lesson.id}:${attemptStart}`)
  }, [attemptStart, lesson, isReview, reviewWordIds])

  const questions = session?.questions ?? []

  const [phase, setPhase] = useState<Phase>(attempt && !attempt.completedAt ? 'quiz' : 'intro')
  const [questionIndex, setQuestionIndex] = useState(() => {
    if (!attempt || attempt.completedAt || !session) return 0
    const firstUnanswered = session.questions.findIndex((q) => !attempt.answers[q.id])
    return firstUnanswered === -1 ? 0 : firstUnanswered
  })
  const [finalScore, setFinalScore] = useState<number | null>(null)
  // Total congelado no momento da conclusão — `questions` esvazia depois
  // (a sessão só existe com tentativa em aberto), então não usar length dela.
  const [finalTotal, setFinalTotal] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)

  if (!lesson) {
    return (
      <div className="fade-in text-center py-16">
        <h1 className="text-xl font-bold text-gray-900">Lição não encontrada</h1>
        <Link to="/vocabulario" className="btn btn-primary mt-6">
          Voltar ao vocabulário
        </Link>
      </div>
    )
  }

  // Lição bloqueada (desbloqueio progressivo — não se aplica à revisão)
  if (!isReview && getLessonStatus(lesson, trail, progress) === 'locked') {
    return (
      <div className="fade-in text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
          <Lock size={32} />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Lição bloqueada</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          Conclua as lições anteriores de vocabulário para desbloquear esta.
        </p>
        <Link to="/vocabulario" className="btn btn-secondary mt-6">
          <ArrowLeft size={16} />
          Voltar ao vocabulário
        </Link>
      </div>
    )
  }

  const reviewWordCount = Object.keys(progress.vocab.wrongWords).length
  const wordCount = isReview ? reviewWordCount : lesson.wordIds.length
  const currentQuestion = questions[questionIndex] ?? null
  const confirmedAnswer =
    currentQuestion && attempt ? (attempt.answers[currentQuestion.id] ?? null) : null
  const alreadyCompleted = !!progress.lessons[lesson.id]?.completedAt

  const handleStart = () => {
    if (wordCount === 0) return
    // Congela a lista de revisão no momento do início da sessão
    setReviewWordIds(isReview ? Object.keys(progress.vocab.wrongWords) : lesson.wordIds)
    startAttempt(lesson.id)
    setQuestionIndex(0)
    setPhase('quiz')
  }

  const handleConfirm = (optionId: string) => {
    if (!currentQuestion) return
    answerQuestion(currentQuestion.id, optionId)
    const correct = optionId === currentQuestion.correctOptionId
    recordVocabAnswer(currentQuestion.wordId, correct, isReview)
  }

  const handleNext = () => {
    if (!currentQuestion) return
    const isLast = questionIndex + 1 >= questions.length
    if (!isLast) {
      setQuestionIndex(questionIndex + 1)
      return
    }

    const answers = progress.currentAttempt?.answers ?? {}
    const score = questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctOptionId ? 1 : 0),
      0,
    )
    completeLesson(score, questions.length)
    setEarnedXp(alreadyCompleted ? 0 : LESSON_XP_REWARD)
    setFinalScore(score)
    setFinalTotal(questions.length)
    setPhase('done')
  }

  // ─── Fase de resultado ─────────────────────────────────────
  if (phase === 'done' && finalScore !== null) {
    const total = finalTotal
    const pct = total > 0 ? Math.round((finalScore / total) * 100) : 0
    const nextLesson = getNextLesson(trail, getVocabLessons(), progress)

    return (
      <div className="fade-in max-w-lg mx-auto space-y-6 py-4">
        <section className="card p-6 sm:p-8 text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              pct >= 60 ? 'bg-aqua-100 text-aqua-600' : 'bg-gold-100 text-gold-600'
            }`}
          >
            <Trophy size={40} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {pct === 100
              ? 'Gabaritou! Sinônimos dominados.'
              : pct >= 60
                ? 'Muito bem! Continue praticando.'
                : 'Quase lá! A revisão ajuda a fixar.'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{lesson.title}</p>

          <div className="mt-6 flex items-center justify-center gap-6">
            <div>
              <p className="text-3xl font-extrabold text-gray-900">{finalScore}</p>
              <p className="text-xs text-gray-400 mt-0.5">de {total} corretas</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p
                className={`text-3xl font-extrabold ${
                  pct >= 60 ? 'text-aqua-600' : 'text-gold-600'
                }`}
              >
                {pct}%
              </p>
              <p className="text-xs text-gray-400 mt-0.5">aproveitamento</p>
            </div>
          </div>

          <div className="mt-5">
            {earnedXp > 0 ? (
              <span className="inline-flex items-center gap-2">
                <XpBadge xp={earnedXp} />
                <span className="text-xs text-gray-400">adicionado ao seu total</span>
              </span>
            ) : (
              <span className="text-xs text-gray-400">
                Lição já concluída anteriormente — sem novo XP
              </span>
            )}
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-3 justify-center">
          {reviewWordCount > 0 && !isReview && (
            <Link to="/revisao" className="btn btn-secondary">
              <RotateCcw size={16} />
              Revisar {reviewWordCount} {reviewWordCount === 1 ? 'palavra' : 'palavras'}
            </Link>
          )}
          {nextLesson && (
            <Link to={`/vocabulario/${nextLesson.id}`} className="btn btn-primary">
              Próxima lição: {nextLesson.title}
              <ArrowRight size={16} />
            </Link>
          )}
        </section>

        <section className="flex items-center justify-center gap-4 text-sm">
          <Link
            to="/vocabulario"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Vocabulário
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors"
          >
            Início
          </Link>
        </section>
      </div>
    )
  }

  // ─── Fase de quiz ──────────────────────────────────────────
  if (phase === 'quiz' && currentQuestion) {
    return (
      <div className="fade-in space-y-5">
        <Link
          to={isReview ? '/revisao' : '/vocabulario'}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          {isReview ? 'Revisão' : 'Vocabulário'}
        </Link>

        <div className="card p-5 sm:p-6">
          <QuestionView
            key={currentQuestion.id}
            question={currentQuestion}
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            confirmedAnswer={confirmedAnswer}
            onConfirm={handleConfirm}
            onNext={handleNext}
          />
        </div>
      </div>
    )
  }

  // ─── Fase de introdução ────────────────────────────────────
  return (
    <div className="fade-in space-y-5">
      <Link
        to={isReview ? '/revisao' : '/vocabulario'}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        {isReview ? 'Revisão' : 'Vocabulário'}
      </Link>

      <section>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <Languages size={14} />
          {isReview ? 'Sessão de revisão' : 'Lição de vocabulário'}
        </div>
        <h1 className="text-2xl font-extrabold text-navy-900 mt-1">{lesson.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>

        {alreadyCompleted && (
          <span className="badge bg-aqua-100 text-aqua-700 mt-3">
            ✓ Concluída — melhor pontuação: {progress.lessons[lesson.id]?.bestScore ?? 0} acertos
          </span>
        )}
      </section>

      <section className="card p-5">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
          <BookOpenCheck size={18} className="text-navy-600" />
          Como funciona
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {wordCount === 0 && isReview
            ? 'Não há palavras na sua lista de revisão no momento.'
            : `Você verá uma palavra jurídica e quatro sinônimos possíveis — escolha o correto.${
                wordCount > 0 ? ` Até ${Math.min(wordCount, 10)} questões desta vez.` : ''
              }`}{' '}
          Palavras erradas entram na revisão; acertos em sessões de revisão removem-nas da
          lista.
        </p>
      </section>

      <section className="flex justify-end">
        <button
          onClick={handleStart}
          disabled={wordCount === 0}
          className="btn btn-primary"
          id="start-vocab-quiz"
        >
          <PlayCircle size={18} />
          {wordCount === 0
            ? isReview
              ? 'Nada para revisar'
              : 'Indisponível'
            : alreadyCompleted
              ? 'Refazer exercícios'
              : `Iniciar (${Math.min(wordCount, 10)} questões)`}
        </button>
      </section>
    </div>
  )
}
