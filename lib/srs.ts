export type Grade = 'Again'|'Hard'|'Good'|'Easy'
export function nextInterval(prevDays: number|undefined, grade: Grade){
  if (!prevDays) return grade==='Again' ? 0.007 : 1 // 10 минут или 1 день
  if (grade==='Again') return 0.007
  if (grade==='Hard') return Math.max(1, Math.round(prevDays*1.2))
  if (grade==='Good') return Math.round(prevDays*2.5)
  return Math.round(prevDays*3.5) // Easy
}
