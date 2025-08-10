'use client'
import { useEffect, useMemo, useState } from 'react'
import { loadCards, type Card } from '@/lib/cards'
import CardView from '@/components/CardView'
import LevelFilter from '@/components/LevelFilter'

export default function CardsPage(){
  const [cards, setCards] = useState<Card[]>([])
  const [lvl, setLvl] = useState<0|1|2|3|4|5>(0)
  const [q, setQ] = useState('')
  useEffect(()=>{ loadCards().then(setCards) },[])
  const filtered = useMemo(()=> {
    let res = lvl? cards.filter(c=>c.hsk_level===lvl): cards
    if(q.trim()){
      const s = q.trim().toLowerCase()
      res = res.filter(c => c.hanzi.includes(q) || c.pinyin.toLowerCase().includes(s) || c.translation_ru.toLowerCase().includes(s))
    }
    return res
  }, [cards,lvl,q])

  return (
    <div className="space-y-3">
      <div className="card flex flex-col md:flex-row md:items-center gap-3">
        <LevelFilter value={lvl} onChange={v=>setLvl(v)} />
        <input className="grow rounded-xl bg-white/5 px-3 py-2 outline-none" placeholder="Поиск: иероглиф / пиньин / перевод" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map(c=> <CardView key={c.id} card={c} />)}
      </div>
    </div>
  )
}
