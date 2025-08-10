import { pinyin } from 'pinyin-pro'
export const toPinyin = (txt:string) => pinyin(txt, { toneType: 'mark' })
