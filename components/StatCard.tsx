export default function StatCard({ label, value }:{ label:string, value:string }){
  return (
    <div className="card text-center">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-2xl text-teal-400">{value}</div>
    </div>
  )
}
