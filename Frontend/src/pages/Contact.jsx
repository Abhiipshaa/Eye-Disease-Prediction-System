import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Send, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import AnimatedSection, { stagger, fadeUp } from '../components/AnimatedSection'

export default function Contact() {
  const { t } = useTranslation()

  const infoCards = [
    {
      icon: <Mail size={18} className="text-blue-600" />,
      bg: 'bg-blue-50',
      title: t('contact.info.email.title'),
      lines: [t('contact.info.email.line1'), t('contact.info.email.line2')],
    },
    {
      icon: <MessageSquare size={18} className="text-violet-600" />,
      bg: 'bg-violet-50',
      title: t('contact.info.support.title'),
      lines: [t('contact.info.support.line1'), t('contact.info.support.line2')],
    },
    {
      icon: <MapPin size={18} className="text-emerald-600" />,
      bg: 'bg-emerald-50',
      title: t('contact.info.builtAt.title'),
      lines: [t('contact.info.builtAt.line1'), t('contact.info.builtAt.line2')],
    },
  ]

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    setErrors((p) => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t('contact.validation.nameRequired')
    if (!form.email) e.email = t('contact.validation.emailRequired')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('contact.validation.emailInvalid')
    if (!form.subject.trim()) e.subject = t('contact.validation.subjectRequired')
    if (!form.message.trim()) e.message = t('contact.validation.messageRequired')
    else if (form.message.trim().length < 20) e.message = t('contact.validation.messageMin')
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
      toast.success(t('contact.toast.success'))
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] pt-16 overflow-x-hidden">
      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-b from-blue-50/60 to-[#F4F6FA]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block"
          >
            {t('contact.badge')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-extrabold text-slate-900 mb-3"
          >
            {t('contact.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-slate-400 text-sm leading-relaxed"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Info Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {infoCards.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ x: 4, boxShadow: '0 6px 20px rgba(0,0,0,0.07)' }}
                className="card p-5 flex gap-4 cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
                  {item.lines.map((l) => (
                    <p key={l} className="text-xs text-slate-400">{l}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <AnimatedSection variant="slideRight" className="md:col-span-2">
            <div className="card p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4"
                  >
                    <CheckCircle size={28} className="text-emerald-500" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {t('contact.success.title')}
                  </h3>

                  <p className="text-slate-400 text-sm mb-6">
                    {t('contact.success.subtitle')}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="btn-ghost"
                  >
                    {t('contact.success.button')}
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">{t('contact.form.name')}</label>
                      <input
                        className={`input ${errors.name ? 'border-red-400' : ''}`}
                        placeholder={t('contact.form.namePlaceholder')}
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="label">{t('contact.form.email')}</label>
                      <input
                        className={`input ${errors.email ? 'border-red-400' : ''}`}
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="label">{t('contact.form.subject')}</label>
                    <input
                      className={`input ${errors.subject ? 'border-red-400' : ''}`}
                      placeholder={t('contact.form.subjectPlaceholder')}
                      value={form.subject}
                      onChange={(e) => set('subject', e.target.value)}
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1.5">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="label">{t('contact.form.message')}</label>
                    <textarea
                      className={`input resize-none ${errors.message ? 'border-red-400' : ''}`}
                      rows={5}
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full py-3"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.form.sending')}
                      </span>
                    ) : (
                      <>
                        <Send size={15} /> {t('contact.form.submit')}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}