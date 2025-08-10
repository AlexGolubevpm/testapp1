'use client'
import React, { useEffect, useState } from 'react'
import type { Card } from '@/lib/cards'
import { getAllUserCards, updateReview } from '@/lib/store'

export default function ReviewPanel({ cards }:{ cards:Card[] }){
  const [queue, setQueue] = useState<Card[]>([])
  const [current, setCurrent] = useState<Card|undefined>()
  const [reveal, setReveal] = useState(false)

  useEffect(()=>{(async()=>{
    const map = await getAllUserCards()
    const dueNow = cards.filter(c=>{
      const st = map[c.id]
      return !st || !st.due || st.due <= Date.now()
    })
    setQueue(dueNow.slice(0,20))
    setCurrent(dueNow[0])
  })()},[cards])

  if(!current) return <div className="card">Сегодня повторов нет 🎉</div>

  const grade = async (g:'Again'|'Hard'|'Good'|'Easy')=>{
    await updateReview(current.id, g)
    const next = queue.slice(1)
    setQueue(next)
    setReveal(false)
    setCurrent(next[0])
  }

  return (
    <div className="card flex flex-col gap-4 items-center">
      <div className="text-5xl text-center leading-tight">{current.hanzi}</div>
      {reveal && (
        <div className="text-center space-y-1">
          <div className="text-xl text-teal-300">{current.pinyin}</div>
          <div className="text-gray-300">{current.translation_ru}</div>
        </div>
      )}
      <div className="flex gap-2 flex-wrap justify-center">
        {!reveal ? (
          <button className="btn" onClick={()=>setReveal(true)}>Показать</button>
        ) : (
          <>
            <button className="btn bg-white/10" onClick={()=>grade('Again')}>Again</button>
            <button className="btn bg-white/10" onClick={()=>grade('Hard')}>Hard</button>
            <button className="btn" onClick={()=>grade('Good')}>Good</button>
            <button className="btn" onClick={()=>grade('Easy')}>Easy</button>
          </>
        )}
      </div>
      <div className="text-xs text-gray-500">Осталось: {queue.length}</div>
    </div>
  )
}
