// ============================================================
// TESTES — Progresso de vocabulário: migração, XP e revisão
// ============================================================

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProgressProvider } from '@/features/progress/ProgressContext'
import { useProgress } from '@/hooks/useProgress'
import { getMasteredCount } from '@/features/vocab/mastery'
import { getVocabLessons } from '@/features/vocab/catalog'
import { getStorageKey } from '@/services/progressService'
import { HomePage } from '@/pages/HomePage'
import { VocabLessonPage } from '@/pages/VocabLessonPage'

const KEY = getStorageKey()

function Harness() {
  const { progress, startAttempt, completeLesson, recordVocabAnswer } = useProgress()
  return (
    <div>
      <span data-testid="xp">{progress.xp}</span>
      <span data-testid="version">{progress.version}</span>
      <span data-testid="streak">{progress.streak}</span>
      <span data-testid="review-json">
        {JSON.stringify(Object.values(progress.vocab.wrongWords))}
      </span>
      <span data-testid="stats-json">
        {JSON.stringify(Object.values(progress.vocab.wordStats))}
      </span>
      <span data-testid="mastered">{getMasteredCount(progress)}</span>
      <button onClick={() => startAttempt('vocab-lesson-1')}>start</button>
      <button onClick={() => completeLesson(5, 5)}>complete</button>
      <button onClick={() => recordVocabAnswer('anuencia', false, false)}>wrong</button>
      <button onClick={() => recordVocabAnswer('anuencia', false, false)}>wrong-2</button>
      <button onClick={() => recordVocabAnswer('anuencia', true, false)}>lesson-anuencia</button>
      <button onClick={() => recordVocabAnswer('anuencia', true, true)}>review-anuencia</button>
      <button onClick={() => recordVocabAnswer('litigio', true, true)}>master</button>
    </div>
  )
}

function renderHarness() {
  return render(
    <ProgressProvider>
      <Harness />
    </ProgressProvider>,
  )
}

/** Progresso v1 de um usuário existente (formato antigo, sem campo vocab). */
function legacyV1Progress() {
  return {
    version: 1,
    xp: 100,
    lessons: {
      'lesson-intro-1': {
        lessonId: 'lesson-intro-1',
        completedAt: 1700000000000,
        bestScore: 5,
        attempts: 2,
        xpAwarded: true,
      },
    },
    currentAttempt: null,
    streak: 5,
    lastActivityDate: '2026-10-10',
    achievements: {
      'first-lesson': {
        id: 'first-lesson',
        name: 'Primeira Lição',
        description: 'Conclua sua primeira lição.',
        unlockedAt: 1700000000000,
      },
    },
    updatedAt: 1700000000000,
  }
}

describe('Migração de dados existentes (v1 → v2)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('preserva XP, lições, conquistas e sequência do formato antigo', () => {
    localStorage.setItem(KEY, JSON.stringify(legacyV1Progress()))

    renderHarness()

    expect(screen.getByTestId('xp').textContent).toBe('100')
    expect(screen.getByTestId('streak').textContent).toBe('5')
    expect(screen.getByTestId('version').textContent).toBe('2')

    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    expect(saved.version).toBe(2)
    expect(saved.xp).toBe(100)
    expect(saved.lessons['lesson-intro-1'].bestScore).toBe(5)
    expect(saved.achievements['first-lesson'].unlockedAt).toBe(1700000000000)
    expect(saved.vocab).toEqual({ wrongWords: {}, wordStats: {} })
  })

  it('não reinicia o progresso quando a chave não existe (estado inicial)', () => {
    renderHarness()
    expect(screen.getByTestId('xp').textContent).toBe('0')
    expect(screen.getByTestId('version').textContent).toBe('2')
  })

  it('desbloqueia conquista nova em dados antigos ao concluir lição de vocabulário', async () => {
    localStorage.setItem(KEY, JSON.stringify(legacyV1Progress()))
    const user = userEvent.setup()
    renderHarness()

    await user.click(screen.getByText('start'))
    await user.click(screen.getByText('complete'))

    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    expect(saved.achievements['first-vocab-lesson'].unlockedAt).not.toBeNull()
    expect(saved.lessons['vocab-lesson-1'].completedAt).toBeTruthy()
    // Dados antigos preservados
    expect(saved.lessons['lesson-intro-1'].bestScore).toBe(5)
  })
})

describe('XP e progresso de vocabulário', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('concede 25 XP na primeira conclusão e nenhum XP duplicado ao refazer', async () => {
    const user = userEvent.setup()
    renderHarness()

    await user.click(screen.getByText('start'))
    await user.click(screen.getByText('complete'))
    expect(screen.getByTestId('xp').textContent).toBe('25')

    // Refazer a mesma lição não concede XP novo
    await user.click(screen.getByText('start'))
    await user.click(screen.getByText('complete'))
    expect(screen.getByTestId('xp').textContent).toBe('25')
  })

  it('persiste o progresso atualizado no localStorage', async () => {
    const user = userEvent.setup()
    renderHarness()

    await user.click(screen.getByText('start'))
    await user.click(screen.getByText('complete'))

    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    expect(saved.xp).toBe(25)
    expect(saved.lessons['vocab-lesson-1'].completedAt).toBeTruthy()
  })

  it('marca palavras erradas para revisão e acumula erros', async () => {
    const user = userEvent.setup()
    renderHarness()

    await user.click(screen.getByText('wrong'))
    let entries = JSON.parse(screen.getByTestId('review-json').textContent ?? '[]')
    expect(entries).toHaveLength(1)
    expect(entries[0].wordId).toBe('anuencia')
    expect(entries[0].timesWrong).toBe(1)

    await user.click(screen.getByText('wrong-2'))
    entries = JSON.parse(screen.getByTestId('review-json').textContent ?? '[]')
    expect(entries[0].timesWrong).toBe(2)
  })

  it('acerto em sessão de revisão remove a palavra da lista', async () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...legacyV1Progress(),
        version: 2,
        vocab: {
          wrongWords: {
            litigio: { wordId: 'litigio', timesWrong: 2, lastWrongAt: 1700000000000 },
          },
        },
      }),
    )
    const user = userEvent.setup()
    renderHarness()

    expect(JSON.parse(screen.getByTestId('review-json').textContent ?? '[]')).toHaveLength(1)
    await user.click(screen.getByText('master'))
    expect(JSON.parse(screen.getByTestId('review-json').textContent ?? '[]')).toHaveLength(0)
  })
})

describe('Navegação entre vocabulário e conteúdo complementar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('HomePage destaca vocabulário e preserva as trilhas existentes', () => {
    render(
      <ProgressProvider>
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </ProgressProvider>,
    )

    // Cartão principal
    expect(
      screen.getByRole('heading', { name: 'Aprenda vocabulário jurídico por sinônimos' }),
    ).toBeTruthy()
    expect(screen.getByText('Começar primeira lição')).toBeTruthy()
    expect(screen.getByText('Ver todas as trilhas de palavras')).toBeTruthy()

    // Caminho de aprendizagem — unidades derivadas dos dados
    expect(screen.getByText('Caminho de aprendizagem')).toBeTruthy()
    expect(screen.getByText('Termos essenciais')).toBeTruthy()
    expect(screen.getByText('Processo e procedimentos')).toBeTruthy()
    expect(screen.getByText('Direitos e obrigações')).toBeTruthy()

    // Revisão
    expect(screen.getByText('Revisão')).toBeTruthy()

    // Área complementar preservada
    expect(screen.getAllByText('Explorar o Direito').length).toBeGreaterThan(0)
    expect(screen.getByText('Introdução ao Direito')).toBeTruthy()
    expect(screen.getByText('Direito Civil')).toBeTruthy()
    expect(screen.getByText('Direito Constitucional')).toBeTruthy()

    // Conquistas e reset preservados
    expect(screen.getByRole('heading', { name: 'Conquistas' })).toBeTruthy()
    expect(screen.getByText('Reiniciar progresso')).toBeTruthy()
  })
})

describe('Fluxo de quiz de vocabulário', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('exibe 4 alternativas, feedback de acerto/erro e avança', async () => {
    const user = userEvent.setup()
    render(
      <ProgressProvider>
        <MemoryRouter initialEntries={['/vocabulario/vocab-lesson-1']}>
          <Routes>
            <Route path="/vocabulario/:lessonId" element={<VocabLessonPage />} />
          </Routes>
        </MemoryRouter>
      </ProgressProvider>,
    )

    // Introdução → iniciar
    await user.click(screen.getByText(/Iniciar \(/))

    // Questão com exatamente 4 alternativas
    const options = () =>
      Array.from(document.querySelectorAll('[id^="option-"]'))
    expect(options()).toHaveLength(4)

    // Seleciona e confirma a primeira alternativa
    await user.click(options()[0])
    await user.click(screen.getByText('Confirmar resposta'))

    // Feedback visual de acerto ou erro, com exatamente uma resposta correta destacada
    expect(screen.getByText(/Resposta correta!|Resposta incorreta/)).toBeTruthy()
    const correctMarked = options().filter((el) =>
      el.className.includes('answer-correct'),
    )
    expect(correctMarked).toHaveLength(1)

    // Avança para a próxima questão
    await user.click(screen.getByText(/Próxima/))
    expect(screen.getByText('Questão 2 de 10')).toBeTruthy()
  })
})

describe('Palavras dominadas (regra consistente)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('acerto em lição marca a palavra como dominada', async () => {
    const user = userEvent.setup()
    renderHarness()
    expect(screen.getByTestId('mastered').textContent).toBe('0')

    await user.click(screen.getByText('lesson-anuencia'))

    const stats = JSON.parse(screen.getByTestId('stats-json').textContent ?? '[]')
    expect(stats[0]).toMatchObject({
      wordId: 'anuencia',
      lessonCorrect: true,
      masteredAt: expect.any(Number),
    })
    expect(screen.getByTestId('mastered').textContent).toBe('1')
  })

  it('erro impede a dominação até acertar a revisão', async () => {
    const user = userEvent.setup()
    renderHarness()

    await user.click(screen.getByText('wrong')) // entra na fila de revisão
    await user.click(screen.getByText('lesson-anuencia')) // acertou a lição, mas está pendente
    expect(screen.getByTestId('mastered').textContent).toBe('0')

    await user.click(screen.getByText('review-anuencia')) // acerta a revisão → sai da fila
    expect(screen.getByTestId('mastered').textContent).toBe('1')
    expect(JSON.parse(screen.getByTestId('review-json').textContent ?? '[]')).toHaveLength(0)
  })

  it('erro depois de dominar remove a dominação (fica pendente de revisão)', async () => {
    const user = userEvent.setup()
    renderHarness()

    await user.click(screen.getByText('lesson-anuencia'))
    expect(screen.getByTestId('mastered').textContent).toBe('1')

    await user.click(screen.getByText('wrong'))
    expect(screen.getByTestId('mastered').textContent).toBe('0')
  })
})

describe('Resultado e avanço entre lições de vocabulário', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('mostra o total correto de questões no resultado e avança para a próxima lição', async () => {
    const user = userEvent.setup()
    render(
      <ProgressProvider>
        <MemoryRouter initialEntries={['/vocabulario/vocab-lesson-1']}>
          <Routes>
            <Route path="/vocabulario/:lessonId" element={<VocabLessonPage />} />
          </Routes>
        </MemoryRouter>
      </ProgressProvider>,
    )

    await user.click(screen.getByText(/Iniciar \(/))

    // Responde as 10 questões do início ao fim
    for (let i = 0; i < 10; i++) {
      const options = Array.from(document.querySelectorAll('[id^="option-"]'))
      await user.click(options[0])
      await user.click(screen.getByText('Confirmar resposta'))
      await user.click(screen.getByText(i < 9 ? /^Próxima/ : /Ver resultado/))
    }

    // Regressão 1: o resultado congelava o total (mostrava "de 0 corretas")
    expect(screen.getByText('de 10 corretas')).toBeTruthy()
    expect(screen.queryByText('de 0 corretas')).toBeNull()

    // Regressão 2: clicar em "Próxima lição" precisa trocar de tela
    await user.click(screen.getByText(/^Próxima lição/))
    expect(screen.getByRole('heading', { name: getVocabLessons()[1].title })).toBeTruthy()
    expect(screen.getByText(/Iniciar \(/)).toBeTruthy()
  })
})
