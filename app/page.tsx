'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { loadCards } from '@/lib/cards'
import { getAllUserCards } from '@/lib/store'
import { ProgressRing } from '@/components/ProgressRing'
import StatCard from '@/components/StatCard'

export default function Home(){
  const [pct, setPct] = useState(0)
  const [by, setBy] = useState<{[k:string]:number}>({})

  useEffect(()=>{(async()=>{
    const cards = await loadCards()
    const state = await getAllUserCards()
    const knownIds = new Set(
      Object.entries(state).filter(([,v])=>v.known).map(([id])=>Number(id))
    )
    const total = cards.length
    const known = cards.filter(c=>knownIds.has(c.id)).length
    const h:any = {1:0,2:0,3:0,4:0,5:0}
    const ht:any = {1:0,2:0,3:0,4:0,5:0}
    cards.forEach(c=>{ ht[c.hsk_level]++; if(knownIds.has(c.id)) h[c.hsk_level]++ })
    setPct(total? (known*100/total):0)
    setBy({
      'HSK 1': Math.round((h[1]||0)*100/(ht[1]||1)),
      'HSK 2': Math.round((h[2]||0)*100/(ht[2]||1)),
      'HSK 3': Math.round((h[3]||0)*100/(ht[3]||1)),
      'HSK 4': Math.round((h[4]||0)*100/(ht[4]||1)),
      'HSK 5': Math.round((h[5]||0)*100/(ht[5]||1))
    })
  })()},[])

  return (
    <div className="space-y-6">
      <section className="card grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold">Твой быстрый путь к <span className="text-teal-400">HSK</span></h1>
          <p className="text-gray-400">Учись 10–20 минут в день: карточки с пиньин, SRS‑повторы, генератор предложений и OCR прямо в браузере.</p>
          <div className="flex gap-2">
            <Link className="btn" href="/review">Начать повтор</Link>
            <Link className="btn-ghost" href="/cards">Смотреть карточки</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <ProgressRing value={pct}/>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(by).map(([k,v])=> (
          <StatCard key={k} label={k} value={`${v}%`} />
        ))}
      </section>

      <section className="grid md:grid-cols-3 gap-3">
        <Link href="/trainer" className="card hover:bg-white/10 transition">
          <div className="text-sm text-gray-400">Тренажёр</div>
          <div className="text-xl">Перевод RU↔CN</div>
          <div className="mt-2 text-gray-400">Шаблоны HSK, мгновенная проверка, пиньин‑подсказки.</div>
        </Link>
        <Link href="/ocr" className="card hover:bg-white/10 transition">
          <div className="text-sm text-gray-400">Камера‑словарь</div>
          <div className="text-xl">OCR → пиньин</div>
          <div className="mt-2 text-gray-400">Фото текста → распознавание → карточки.</div>
        </Link>
        <Link href="/cards" className="card hover:bg-white/10 transition">
          <div className="text-sm text-gray-400">Словарь</div>
          <div className="text-xl">2 500 карточек</div>
          <div className="mt-2 text-gray-400">Hanzi → пиньин → перевод. В один тап.</div>
        </Link>
      </section>
    </div>
  )
}
