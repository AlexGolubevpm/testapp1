'use client'
import React, { useState } from 'react'
import type { Card } from '@/lib/cards'
import { toggleKnown } from '@/lib/store'

export default function CardView({ card }:{ card:Card }){
  const [mode, setMode] = useState<'hanzi'|'pinyin'|'ru'>('hanzi')
  return (
    <div className="card flex items-start justify-between gap-4 hover:bg-white/10 transition">
      <div onClick={()=>setMode(mode==='hanzi'?'pinyin':mode==='pinyin'?'ru':'hanzi')} className="cursor-pointer select-none space-y-1">
        {mode==='hanzi' && <div className="text-4xl tracking-wide">{card.hanzi}</div>}
        {mode==='pinyin' && <div className="text-xl text-teal-300">{card.pinyin}</div>}
        {mode==='ru' && <div className="text-base text-gray-300">{card.translation_ru}</div>}
        <div className="text-xs text-gray-500">HSK {card.hsk_level}</div>
      </div>
      <button className="btn" onClick={()=>toggleKnown(card.id)}>Знаю</button>
    </div>
  )
}
