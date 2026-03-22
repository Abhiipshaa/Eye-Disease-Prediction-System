import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Building2, AlertCircle, ArrowLeft, ShieldCheck, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

export default function ClinicLogin() {
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
    if (!form.email.trim()) e.email = t('clinicLogin.errors.clinicIdRequired')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = t('clinicLogin.errors.passwordRequired')
    else if (form.password.length < 6) e.password = t('clinicLogin.errors.passwordMin')
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
      const res = await fetch('/api/login/clinic', {
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
      localStorage.setItem('eyescreen_user', JSON.stringify({ name: data.name, email: data.email, role: data.role, token: data.token }))
      toast.success(t('clinicLogin.toast.accessGranted'))
      navigate('/upload')
    } catch {
      setErrors({ general: 'Server unreachable. Please try again.' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 pt-16 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-8">
            <ArrowLeft size={14} /> {t('clinicLogin.backHome')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
              <Building2 size={12} /> {t('clinicLogin.badge')}
            </span>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 mx-auto mb-4">
              <Building2 size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">{t('clinicLogin.title')}</h1>
            <p className="text-slate-400 text-sm">{t('clinicLogin.subtitle')}</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

            <div className="p-8">
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
                  <label className="label">Clinic Email</label>
                  <div className="relative">
                    <input
                      className={`input pl-10 ${errors.email ? 'border-red-400 focus:border-red-400' : 'focus:border-indigo-400 focus:ring-indigo-500/20'}`}
                      type="email"
                      placeholder="clinic@example.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                    />
                    <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle size={11} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">{t('clinicLogin.passwordLabel')}</label>
                  <div className="relative">
                    <input
                      className={`input pr-11 ${errors.password ? 'border-red-400 focus:border-red-400' : 'focus:border-indigo-400 focus:ring-indigo-500/20'}`}
                      type={showPwd ? 'text' : 'password'}
                      placeholder={t('clinicLogin.passwordPlaceholder')}
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

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('clinicLogin.authenticating')}
                    </span>
                  ) : (
                    <>
                      <ShieldCheck size={16} /> {t('clinicLogin.accessPortal')}
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl">
                <p className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1.5">
                  <Phone size={12} /> {t('clinicLogin.supportTitle')}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('clinicLogin.supportTextPrefix')}{' '}
                  <span className="text-indigo-600 font-medium">clinics@eyescreen.ai</span>{' '}
                  {t('clinicLogin.supportTextMiddle')}{' '}
                  <span className="text-indigo-600 font-medium">1800-EYE-SCREEN</span>.
                  {' '}{t('clinicLogin.supportHours')}
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            {t('clinicLogin.patientPrompt')}{' '}
            <Link to="/patient-login" className="text-blue-600 font-semibold hover:underline">
              {t('clinicLogin.patientLogin')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}