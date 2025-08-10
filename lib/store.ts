'use client'
import { get, set } from 'idb-keyval'
import type { Grade } from './srs'
import { nextInterval } from './srs'

export type UserCard = {
  known?: boolean
  due?: number      // timestamp ms
  interval?: number // days
  last?: number     // ts ms
  lapses?: number
}

const KEY = 'hsk_user_cards_v1'

export async function getAllUserCards(): Promise<Record<number, UserCard>>{
  return (await get(KEY)) || {}
}
export async function setAllUserCards(map: Record<number, UserCard>){
  await set(KEY, map)
}

export async function updateReview(cardId:number, grade:Grade){
  const map = await getAllUserCards()
  const now = Date.now()
  const prev = map[cardId] || {}
  const prevDays = prev.interval ?? undefined
  const days = nextInterval(prevDays, grade)
  const due = now + days*24*60*60*1000
  map[cardId] = {
    known: grade!=='Again',
    last: now,
    interval: days,
    due,
    lapses: (prev.lapses||0) + (grade==='Again'?1:0)
  }
  await setAllUserCards(map)
}

export async function toggleKnown(cardId:number, value?:boolean){
  const map = await getAllUserCards()
  const curr = map[cardId] || {}
  curr.known = value ?? !curr.known
  map[cardId] = curr
  await setAllUserCards(map)
}
