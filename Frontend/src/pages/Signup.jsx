import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

export default function Signup() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [showCfm, setShowCfm] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t('signup.errors.nameRequired')
    if (!form.email) e.email = t('signup.errors.emailRequired')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('signup.errors.emailInvalid')
    if (!form.password) e.password = t('signup.errors.passwordRequired')
    else if (form.password.length < 6) e.password = t('signup.errors.passwordMin')
    if (!form.confirm) e.confirm = t('signup.errors.confirmRequired')
    else if (form.confirm !== form.password) e.confirm = t('signup.errors.passwordMismatch')
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()

    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/register/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error?.toLowerCase().includes('email')) {
          setErrors({ email: data.error })
        } else {
          setErrors({ general: data.error })
        }
        return
      }

      localStorage.setItem(
        'eyescreen_user',
        JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token,
          ref_id: data.ref_id,
        })
      )

      toast.success(t('signup.toast.accountCreated', { name: data.name }))
      navigate('/upload')
    } catch {
      setErrors({ general: 'Server unreachable. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const strength =
    form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3

  const strengthLabel = ['', t('signup.strength.weak'), t('signup.strength.good'), t('signup.strength.strong')]
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500']

  return (
    <div className="min-h-screen bg-[#F4F6FA] pt-16 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <UserPlus size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">{t('signup.title')}</h1>
          <p className="text-slate-400 text-sm">{t('signup.subtitle')}</p>
        </div>

        <div className="card p-8">
          {errors.general && (
            <p className="text-sm text-red-500 mb-4 text-center">{errors.general}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="label">{t('signup.nameLabel')}</label>
              <input
                className={`input ${errors.name ? 'border-red-400' : ''}`}
                placeholder={t('signup.namePlaceholder')}
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="label">{t('signup.emailLabel')}</label>
              <input
                className={`input ${errors.email ? 'border-red-400' : ''}`}
                type="email"
                placeholder={t('signup.emailPlaceholder')}
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="label">{t('signup.passwordLabel')}</label>
              <div className="relative">
                <input
                  className={`input pr-11 ${errors.password ? 'border-red-400' : ''}`}
                  type={showPwd ? 'text' : 'password'}
                  placeholder={t('signup.passwordPlaceholder')}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(n => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          strength >= n ? strengthColor[strength] : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="label">{t('signup.confirmLabel')}</label>
              <div className="relative">
                <input
                  className={`input pr-11 ${errors.confirm ? 'border-red-400' : ''}`}
                  type={showCfm ? 'text' : 'password'}
                  placeholder={t('signup.confirmPlaceholder')}
                  value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCfm(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCfm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {form.confirm && form.confirm === form.password && (
                <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                  <CheckCircle size={12} /> {t('signup.passwordsMatch')}
                </p>
              )}

              {errors.confirm && <p className="text-xs text-red-500 mt-1.5">{errors.confirm}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('signup.creating')}
                </span>
              ) : (
                t('signup.createAccount')
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            {t('signup.haveAccount')}{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              {t('signup.signIn')}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          {t('signup.termsPrefix')}{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">{t('signup.terms')}</span>{' '}
          {t('signup.and')}{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">{t('signup.privacy')}</span>.
        </p>
      </div>
    </div>
  )
}