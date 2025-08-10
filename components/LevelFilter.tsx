'use client'
export default function LevelFilter({ value, onChange }:{ value:0|1|2|3|4|5, onChange:(v:0|1|2|3|4|5)=>void }){
  return (
    <div className="flex gap-2">
      {[0,1,2,3,4,5].map(n=> (
        <button key={n} className={`btn-ghost ${value===n?'ring-2 ring-teal-500':''}`} onClick={()=>onChange(n as any)}>
          {n===0?'Все':`HSK ${n}`}
        </button>
      ))}
    </div>
  )
}
