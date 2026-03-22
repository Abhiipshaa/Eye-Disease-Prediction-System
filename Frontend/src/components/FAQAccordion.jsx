import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-semibold text-slate-800 text-sm pr-4">{item.q}</span>
            <ChevronDown
              size={16}
              className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 border-t border-slate-100">
              <p className="text-slate-500 text-sm leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
