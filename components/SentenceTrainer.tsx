'use client'
import React, { useMemo, useState } from 'react'
import { toPinyin } from '@/lib/pinyin'

const TEMPLATES = [
  {cn:'我是昨天来的。', ru:'Я пришёл вчера.'},
  {cn:'虽然下雨，但是我们还是去。', ru:'Хотя идёт дождь, мы всё равно идём.'},
  {cn:'如果你有时间，我们就见面。', ru:'Если у тебя будет время, мы тогда встретимся.'},
  {cn:'她喜欢喝茶，不喜欢咖啡。', ru:'Она любит чай, не любит кофе.'}
]

export default function SentenceTrainer(){
  const [dir, setDir] = useState<'CN2RU'|'RU2CN'>('CN2RU')
  const [idx, setIdx] = useState(0)
  const [inp, setInp] = useState('')
  const [show, setShow] = useState(false)

  const item = useMemo(()=>TEMPLATES[idx % TEMPLATES.length], [idx])

  const check = ()=> setShow(true)
  const next = ()=>{ setIdx(v=>v+1); setInp(''); setShow(false) }

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex gap-2">
        <button className={`btn-ghost ${dir==='CN2RU'?'ring-2 ring-teal-500':''}`} onClick={()=>setDir('CN2RU')}>中→俄</button>
        <button className={`btn-ghost ${dir==='RU2CN'?'ring-2 ring-teal-500':''}`} onClick={()=>setDir('RU2CN')}>俄→中</button>
      </div>
      <div className="text-lg">
        {dir==='CN2RU' ? item.cn : item.ru}
      </div>
      {dir==='RU2CN' && <div className="text-sm text-teal-300">{toPinyin(item.cn)}</div>}
      <input className="rounded-xl bg-white/5 px-3 py-2 outline-none" placeholder="Ваш перевод" value={inp} onChange={e=>setInp(e.target.value)} />
      {!show ? (
        <button className="btn w-fit" onClick={check}>Проверить</button>
      ) : (
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Верный ответ:</div>
          <div className="text-gray-200">{dir==='CN2RU' ? item.ru : item.cn}</div>
          {dir==='RU2CN' && <div className="text-teal-300">{toPinyin(item.cn)}</div>}
          <button className="btn w-fit" onClick={next}>Дальше</button>
        </div>
      )}
    </div>
  )
}
