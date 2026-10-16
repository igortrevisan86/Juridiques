// ============================================================
// AppLayout — Shell raiz: header + área de conteúdo
// ============================================================

import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-gray-400 leading-relaxed">
          Conteúdo com fins exclusivamente educacionais — não constitui aconselhamento jurídico
          individual. Progresso salvo apenas neste navegador.
        </div>
      </footer>
    </div>
  )
}
