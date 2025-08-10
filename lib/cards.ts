export type Card = {
  id: number
  hsk_level: 1|2|3|4|5
  hanzi: string
  pinyin: string
  translation_ru: string
}

export async function loadCards(): Promise<Card[]> {
  const res = await fetch('/data/cards.json', { cache: 'force-cache' })
  return res.json()
}
