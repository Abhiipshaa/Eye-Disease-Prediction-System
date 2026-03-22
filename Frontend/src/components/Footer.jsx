import { Link } from 'react-router-dom'
import { Eye, Mail, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const links = {
    [t('footer.product')]: [
      { to: '/upload', label: t('footer.startScreening') },
      { to: '/report', label: t('footer.sampleReport') },
    ],
    [t('footer.company')]: [
      { to: '/about', label: t('footer.about') },
      { to: '/technology', label: t('footer.technology') },
    ],
    [t('footer.support')]: [
      { to: '/faq', label: t('footer.faq') },
      { to: '/contact', label: t('footer.contact') },
    ],
  }

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              <span className="font-bold text-slate-800 text-sm">
                RetinaSense<span className="text-blue-600"> AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="mailto:support@eyescreen.ai"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 flex items-center justify-center transition-all"
              >
                <Mail size={14} className="text-slate-500" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 flex items-center justify-center transition-all"
              >
                <Github size={14} className="text-slate-500" />
              </a>
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                {group}
              </p>
              <ul className="space-y-2.5">
                {items.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} RetinaSense AI · {t('footer.builtBy')}{' '}
            <span className="font-semibold text-slate-500">Team Blur Busters</span>
          </p>
          <p className="text-xs text-slate-400 text-center">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}