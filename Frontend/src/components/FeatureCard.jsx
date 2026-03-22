export default function FeatureCard({ icon, iconBg, title, desc }) {
  return (
    <div className="card p-6 flex gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-800 mb-1.5">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
