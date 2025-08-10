'use client'
import { useEffect, useState } from 'react'
import { loadCards, type Card } from '@/lib/cards'
import ReviewPanel from '@/components/ReviewPanel'

export default function ReviewPage(){
  const [cards, setCards] = useState<Card[]>([])
  useEffect(()=>{ loadCards().then(setCards) },[])
  return <ReviewPanel cards={cards}/>
}
