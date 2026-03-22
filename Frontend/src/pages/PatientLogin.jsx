import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, AlertCircle, ArrowLeft, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

export default function PatientLogin() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
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
    if (!form.email) e.email = t('patientLogin.errors.emailRequired')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('patientLogin.errors.emailInvalid')
    if (!form.password) e.password = t('patientLogin.errors.passwordRequired')
    else if (form.password.length < 6) e.password = t('patientLogin.errors.passwordMin')
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
      const res = await fetch('/api/login/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ general: data.error || 'Login failed' })
        setLoading(false)
        return
      }
      localStorage.setItem('eyescreen_user', JSON.stringify({ name: data.name, email: data.email, role: data.role, token: data.token, ref_id: data.ref_id }))
      toast.success(t('patientLogin.toast.welcomeBack', { name: data.name }))
      navigate('/upload')
    } catch {
      setErrors({ general: 'Server unreachable. Please try again.' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50/40 pt-16 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-8">
            <ArrowLeft size={14} /> {t('patientLogin.backHome')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200">
                <User size={28} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                <Heart size={10} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">{t('patientLogin.title')}</h1>
            <p className="text-slate-400 text-sm">{t('patientLogin.subtitle')}</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/80 p-8">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5"
              >
                <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errors.general}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="label">{t('patientLogin.emailLabel')}</label>
                <div className="relative">
                  <input
                    className={`input pl-10 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                    type="email"
                    placeholder={t('patientLogin.emailPlaceholder')}
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">{t('patientLogin.passwordLabel')}</label>
                  <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    {t('patientLogin.forgotPassword')}
                  </button>
                </div>
                <div className="relative">
                  <input
                    className={`input pr-11 ${errors.password ? 'border-red-400 focus:border-red-400' : ''}`}
                    type={showPwd ? 'text' : 'password'}
                    placeholder={t('patientLogin.passwordPlaceholder')}
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
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} />
                    {errors.password}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.remember}
                    onChange={e => set('remember', e.target.checked)}
                  />
                  <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-md border-2 transition-all flex items-center justify-center ${form.remember ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                    {form.remember && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-600">{t('patientLogin.remember')}</span>
              </label>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-3 text-base mt-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-200"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('patientLogin.signingIn')}
                  </span>
                ) : (
                  t('patientLogin.signInButton')
                )}
              </motion.button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400">{t('patientLogin.or')}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-500">
              {t('patientLogin.noAccount')}{' '}
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                {t('patientLogin.createFree')}
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            {t('patientLogin.clinicPrompt')}{' '}
            <Link to="/clinic-login" className="text-indigo-600 font-semibold hover:underline">
              {t('patientLogin.clinicLogin')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}