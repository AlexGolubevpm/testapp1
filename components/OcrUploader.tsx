'use client'
import React, { useState } from 'react'
import { ocrImage } from '@/lib/ocr'
import { toPinyin } from '@/lib/pinyin'

export default function OcrUploader(){
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const onFile = async (f: File)=>{
    setLoading(true)
    try{ const t = await ocrImage(f); setText(t.trim()) }
    finally{ setLoading(false) }
  }

  return (
    <div className="card space-y-3">
      <label className="text-sm text-gray-400">Загрузите фото с китайским текстом</label>
      <input type="file" accept="image/*" onChange={e=>e.target.files && onFile(e.target.files[0])} />
      {loading && <div>Распознаю… (первый раз может занять 10–15 сек)</div>}
      {text && (
        <div className="space-y-2">
          <div className="text-gray-300 whitespace-pre-wrap">{text}</div>
          <div className="text-teal-300 text-sm">{toPinyin(text)}</div>
        </div>
      )}
    </div>
  )
}
