import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

export default function Login() {
  const { t } = useTranslation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '', general: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.email) e.email = t('login.validation.emailRequired')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('login.validation.emailInvalid')

    if (!form.password) e.password = t('login.validation.passwordRequired')
    else if (form.password.length < 6) e.password = t('login.validation.passwordMin')

    return e
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('eyescreen_users') || '[]')
      const match = users.find(u => u.email === form.email && u.password === form.password)

      if (match) {
        localStorage.setItem('eyescreen_user', JSON.stringify({ name: match.name, email: match.email }))
        toast.success(t('login.toast.welcomeBack', { name: match.name }))
        navigate('/upload')
      } else {
        setErrors({ general: t('login.validation.invalidCredentials') })
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] pt-16 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <LogIn size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">{t('login.title')}</h1>
          <p className="text-slate-400 text-sm">{t('login.subtitle')}</p>
        </div>

        <div className="card p-8">
          {errors.general && (
            <div className="flex gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5">
              <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="label">{t('login.form.emailLabel')}</label>
              <input
                className={`input ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : ''}`}
                type="email"
                placeholder={t('login.form.emailPlaceholder')}
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">{t('login.form.passwordLabel')}</label>
                <button type="button" className="text-xs text-blue-600 hover:underline">
                  {t('login.form.forgotPassword')}
                </button>
              </div>

              <div className="relative">
                <input
                  className={`input pr-11 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : ''}`}
                  type={showPwd ? 'text' : 'password'}
                  placeholder={t('login.form.passwordPlaceholder')}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('login.form.signingIn')}
                </span>
              ) : (
                t('login.form.submit')
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            {t('login.footer.noAccount')}{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              {t('login.footer.createOne')}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          {t('login.legal.prefix')}{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            {t('login.legal.terms')}
          </span>{' '}
          {t('login.legal.and')}{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            {t('login.legal.privacy')}
          </span>
          .
        </p>
      </div>
    </div>
  )
}