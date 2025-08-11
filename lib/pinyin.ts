import { pinyin } from 'pinyin-pro'
// Use the supported option "symbol" for toneType to add tone marks.
// The previous value "mark" is not recognized by the current typings and
// caused the build to fail on Vercel.
export const toPinyin = (txt: string) => pinyin(txt, { toneType: 'symbol' })
