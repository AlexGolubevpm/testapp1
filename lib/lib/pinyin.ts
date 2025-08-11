import { pinyin } from 'pinyin-pro'
// Use supported "symbol" tone type; "mark" is deprecated and caused build errors.
export const toPinyin = (txt: string) => pinyin(txt, { toneType: 'symbol' })
