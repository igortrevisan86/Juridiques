// ============================================================
// LESSONPAGE — Conteúdo da lição + exercícios interativos
// ============================================================

import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Lock,
  PlayCircle,
} from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getLessonById } from '@/content/lessons'
import { getTrailById } from '@/content/trails'
import { getLessonStatus } from '@/utils/unlock'
import { RichText } from '@/components/ui/RichText'
import { QuestionView } from '@/components/learning/QuestionView'
import { ProgressBar } from '@/components/ui/ProgressBar'

type Phase = 'content' | 'quiz'

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { progress, startAttempt, answerQuestion, completeLesson } = useProgress()

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const trail = lesson ? getTrailById(lesson.trailId) : undefined

  const attempt =
    lesson && progress.currentAttempt?.lessonId === lesson.id ? progress.currentAttempt : null

  // Retoma no midpoint: inicia no quiz se já há tentativa em aberto
  const [phase, setPhase] = useState<Phase>(attempt && !attempt.completedAt ? 'quiz' : 'content')
  const [questionIndex, setQuestionIndex] = useState(() => {
    if (!attempt || attempt.completedAt) return 0
    const firstUnanswered = lesson?.questions.findIndex((q) => !attempt.answers[q.id]) ?? 0
    return firstUnanswered === -1 ? 0 : firstUnanswered
  })

  if (!lesson || !trail) {
    return (
      <div className="fade-in text-center py-16">
        <h1 className="text-xl font-bold text-gray-900">Lição não encontrada</h1>
        <Link to="/" className="btn btn-primary mt-6">
          Voltar ao início
        </Link>
      </div>
    )
  }

  const status = getLessonStatus(lesson, trail, progress)

  // Lição bloqueada
  if (status === 'locked') {
    return (
      <div className="fade-in text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
          <Lock size={32} />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Lição bloqueada</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          Conclua as lições anteriores de &ldquo;{trail.title}&rdquo; para desbloquear esta.
        </p>
        <Link to={`/trilha/${trail.id}`} className="btn btn-secondary mt-6">
          <ArrowLeft size={16} />
          Voltar à trilha
        </Link>
      </div>
    )
  }

  const questions = lesson.questions
  const currentQuestion = questions[questionIndex]
  const confirmedAnswer = attempt?.answers[currentQuestion.id] ?? null

  const handleStart = () => {
    startAttempt(lesson.id)
    setQuestionIndex(0)
    setPhase('quiz')
  }

  const handleConfirm = (optionId: string) => {
    answerQuestion(currentQuestion.id, optionId)
  }

  const handleNext = () => {
    const isLast = questionIndex + 1 >= questions.length
    if (!isLast) {
      setQuestionIndex(questionIndex + 1)
      return
    }

    // Última questão respondida — calcula o score e finaliza
    const answers = progress.currentAttempt?.answers ?? {}
    const score = questions.filter((q) => answers[q.id] === q.correctOptionId).length
    const alreadyCompleted = !!progress.lessons[lesson.id]?.completedAt
    completeLesson(score, questions.length)
    navigate(`/licao/${lesson.id}/resultado`, {
      state: { xpEarned: alreadyCompleted ? 0 : lesson.xpReward },
    })
  }

  // ─── Fase de exercícios ────────────────────────────────────
  if (phase === 'quiz' && currentQuestion) {
    return (
      <div className="fade-in space-y-4">
        <Link
          to={`/trilha/${trail.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          {trail.title}
        </Link>

        <ProgressBar
          value={(questionIndex / questions.length) * 100}
          color={trail.color}
          height={6}
          label="Progresso do exercício"
        />

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

  // ─── Fase de conteúdo ──────────────────────────────────────
  return (
    <div className="fade-in space-y-5">
      <Link
        to={`/trilha/${trail.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        {trail.title}
      </Link>

      {/* Cabeçalho */}
      <section>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <BookOpen size={14} />
          Lição {lesson.order} de {trail.lessonIds.length}
        </div>
        <h1 className="text-2xl font-extrabold text-navy-900 mt-1">{lesson.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>

        {status === 'completed' && (
          <span className="badge bg-aqua-100 text-aqua-700 mt-3">
            ✓ Concluída — melhor pontuação:{' '}
            {progress.lessons[lesson.id]?.bestScore ?? 0}/{questions.length}
          </span>
        )}
      </section>

      {/* Objetivo */}
      <section className="card p-5">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
          <GraduationCap size={18} className="text-navy-600" />
          Objetivo de aprendizagem
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">{lesson.learningObjective}</p>
      </section>

      {/* Explicação */}
      <section className="card p-5">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
          <BookOpen size={18} className="text-navy-600" />
          Conteúdo
        </h2>
        <RichText content={lesson.explanation} />
      </section>

      {/* Exemplo prático */}
      <section className="card p-5">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-gold-500" />
          Exemplo prático
        </h2>
        <RichText content={lesson.practicalExample} />
      </section>

      {/* Referências */}
      {lesson.references.length > 0 && (
        <section className="card p-5">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
            <BookOpen size={18} className="text-gray-500" />
            Referências
          </h2>
          <ul className="space-y-1.5 pl-4">
            {lesson.references.map((ref, i) => (
              <li key={i} className="text-xs text-gray-500 leading-relaxed relative">
                <span className="absolute -left-4 text-gray-300">•</span>
                {ref}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="flex justify-end">
        <button onClick={handleStart} className="btn btn-primary" id="start-quiz">
          <PlayCircle size={18} />
          {status === 'completed'
            ? 'Refazer exercícios'
            : `Iniciar exercícios (${questions.length} questões)`}
        </button>
      </section>
    </div>
  )
}
