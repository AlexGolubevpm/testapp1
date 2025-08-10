import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HSK Coach',
  description: 'PWA для изучения китайского (HSK 1–5)'
}

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-dvh bg-hero">
        <header className="sticky top-0 z-10 backdrop-blur-md border-b border-white/5 bg-bg/60">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <span className="text-teal-400">HSK</span> Coach
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link className="btn-ghost" href="/cards">Карточки</Link>
              <Link className="btn-ghost" href="/review">Повтор</Link>
              <Link className="btn-ghost" href="/trainer">Перевод</Link>
              <Link className="btn-ghost" href="/ocr">OCR</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-4 space-y-4">
          {children}
        </main>
        <footer className="max-w-4xl mx-auto px-4 py-8 text-xs text-gray-400">
          Сделано для быстрого прогресса по HSK • PWA • офлайн‑режим (IndexedDB)
        </footer>
      </body>
    </html>
  )
}
