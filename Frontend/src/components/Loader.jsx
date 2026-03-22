export default function Loader({ text = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
      <p className="text-sm text-slate-400 font-medium">{text}</p>
    </div>
  )
}
