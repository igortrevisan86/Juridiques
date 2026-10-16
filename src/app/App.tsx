// ============================================================
// APP ROUTER — Juridiquês
// ============================================================

import { HashRouter, Route, Routes } from 'react-router-dom'
import { ProgressProvider } from '@/features/progress/ProgressContext'
import { ThemeProvider } from '@/features/theme/ThemeContext'
import { AppLayout } from '@/components/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { TrailPage } from '@/pages/TrailPage'
import { LessonPage } from '@/pages/LessonPage'
import { ResultPage } from '@/pages/ResultPage'
import { VocabPage } from '@/pages/VocabPage'
import { VocabLessonPage } from '@/pages/VocabLessonPage'
import { ReviewPage } from '@/pages/ReviewPage'

export function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        {/* HashRouter: compatível com GitHub Pages (sem suporte a rotas no servidor) */}
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              {/* Vocabulário — experiência principal */}
              <Route path="/vocabulario" element={<VocabPage />} />
              <Route path="/vocabulario/:lessonId" element={<VocabLessonPage />} />
              <Route path="/revisao" element={<ReviewPage />} />
              {/* Explorar o Direito — conteúdo complementar (preservado) */}
              <Route path="/trilha/:trailId" element={<TrailPage />} />
              <Route path="/licao/:lessonId" element={<LessonPage />} />
              <Route path="/licao/:lessonId/resultado" element={<ResultPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ProgressProvider>
    </ThemeProvider>
  )
}
