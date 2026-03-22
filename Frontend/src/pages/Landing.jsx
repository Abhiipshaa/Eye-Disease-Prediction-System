import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight, ScanLine, Shield, Zap, BarChart2,
  CheckCircle, Eye, ChevronRight, AlertTriangle,
  User, Building2, Sparkles, Activity
} from 'lucide-react'
import FeatureCard from '../components/FeatureCard'
import AnimatedSection, { stagger, fadeUp, scaleIn } from '../components/AnimatedSection'
import Chatbot from '../components/Chatbot.jsx'



export default function Landing() {
  const { t } = useTranslation()

  const stats = [
    { value: '4+', label: t('landing.conditionsDetected') || 'Conditions Detected' },
    { value: '4K+', label: t('landing.trainingImages') || 'Training Images' },
  ]

  const features = [
    {
      icon: <Zap size={20} className="text-blue-600" />,
      iconBg: 'bg-blue-50',
      title: t('landing.feat1Title'),
      desc: t('landing.feat1Desc'),
    },
    {
      icon: <Shield size={20} className="text-violet-600" />,
      iconBg: 'bg-violet-50',
      title: t('landing.feat2Title'),
      desc: t('landing.feat2Desc'),
    },
    {
      icon: <Eye size={20} className="text-cyan-600" />,
      iconBg: 'bg-cyan-50',
      title: t('landing.feat3Title'),
      desc: t('landing.feat3Desc'),
    },
    {
      icon: <BarChart2 size={20} className="text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      title: t('landing.feat4Title'),
      desc: t('landing.feat4Desc'),
    },
  ]

  const conditions = [
    { name: t('landing.cond1'), color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
    { name: t('landing.cond2'), color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
    { name: t('landing.cond3'), color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { name: t('landing.cond4'), color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  ]

  const steps = [
    { num: '01', title: t('landing.step1Title'), desc: t('landing.step1Desc') },
    { num: '02', title: t('landing.step2Title'), desc: t('landing.step2Desc') },
    { num: '03', title: t('landing.step3Title'), desc: t('landing.step3Desc') },
    { num: '04', title: t('landing.step4Title'), desc: t('landing.step4Desc') },
  ]

  const whyMatters = [
    t('landing.why1'),
    t('landing.why2'),
    t('landing.why3'),
    t('landing.why4'),
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <section className="relative px-6 pt-32 pb-24 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_35%),radial-gradient(circle_at_right,_rgba(6,182,212,0.12),_transparent_25%),linear-gradient(to_bottom,_#eff6ff,_#f8fafc_55%,_#f8fafc)]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-[10%] h-40 w-40 rounded-full bg-blue-200/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-28 right-[8%] h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-indigo-200/20 blur-3xl"
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-blue-700 shadow-sm backdrop-blur">
                <Sparkles size={14} className="text-blue-600" />
                {t('landing.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              {t('landing.headline1')}
              <span className="mt-2 block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                {t('landing.headline2')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mb-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              {t('landing.subtext')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
  <a
    href="http://172.16.15.95:5000" // 🔴 ← PASTE YOUR MAP LINK HERE
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2.5 rounded-2xl border border-green-200 bg-green-50 px-6 py-3.5 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-100 hover:shadow-md"
  >
    🗺️ Show Map of Clinics all over India
  </a>
</motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/patient-login"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:shadow-xl"
                >
                  <User size={17} />
                  {t('landing.loginPatient')}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/clinic-login"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-xl"
                >
                  <Building2 size={17} />
                  {t('landing.loginClinic')}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
              className="flex items-center gap-4 text-sm text-slate-500"
            >
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 font-medium text-slate-500 transition-colors hover:text-slate-700"
              >
                {t('landing.howItWorks')} <ChevronRight size={15} />
              </a>
              <span className="hidden h-4 w-px bg-slate-300 sm:block" />
              <span className="hidden sm:inline">{t('landing.fast')}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-5 shadow-2xl shadow-blue-100 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  {/* Landing preview */}
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {t('landing.livePreview')}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-800">{t('landing.aiDashboard')}</h3>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  {t('landing.active')}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Activity size={16} className="text-blue-600" />
                    <p className="text-sm font-semibold text-slate-700">{t('landing.latestResult')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <p className="text-xs text-slate-500">{t('landing.prediction')}</p>
                      <p className="mt-1 font-semibold text-slate-800">{t('landing.glaucomaRisk')}</p>
                    </div>

                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700">{t('landing.analysisProgress')}</p>
                    <p className="text-xs font-medium text-slate-400">{t('landing.seconds')}</p>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 1.4, delay: 0.7 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-blue-50 p-3">
                      <p className="text-lg font-bold text-blue-600">4K+</p>
                      <p className="text-[11px] text-slate-500">{t('landing.images')}</p>
                    </div>
                    <div className="rounded-xl bg-violet-50 p-3">
                      <p className="text-lg font-bold text-violet-600">4+</p>
                      <p className="text-[11px] text-slate-500">{t('landing.conditions')}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <p className="text-lg font-bold text-emerald-600">24/7</p>
                      <p className="text-[11px] text-slate-500">{t('landing.screening')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -right-4 top-8 hidden rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-lg md:block"
            >
              <p className="text-xs text-slate-500">{t('landing.avgTime')}</p>
              <p className="text-sm font-bold text-blue-600">{t('landing.lessThan3s')}</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
              className="absolute -left-5 bottom-8 hidden rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-lg md:block"
            >
              <p className="text-xs text-slate-500">{t('landing.clinicalSupport')}</p>
              <p className="text-sm font-bold text-emerald-600">{t('landing.aiAssisted')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md"
            >
              <p className="mb-1 text-2xl font-black text-blue-600">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <AnimatedSection>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
                {t('landing.problemBadge')}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                {t('landing.whyTitle')}
              </h2>
              <p className="mb-6 text-sm leading-7 text-slate-600 sm:text-base">
                {t('landing.whyDesc')}
              </p>

              <ul className="space-y-4">
                {whyMatters.map((w, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700"
                  >
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-blue-500" />
                    {w}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { val: t('landing.stat1Val'), label: t('landing.stat1Label'), color: 'text-red-600', bg: 'bg-red-50' },
                { val: t('landing.stat2Val'), label: t('landing.stat2Label'), color: 'text-orange-600', bg: 'bg-orange-50' },
                { val: t('landing.stat3Val'), label: t('landing.stat3Label'), color: 'text-blue-600', bg: 'bg-blue-50' },
                { val: t('landing.stat4Val'), label: t('landing.stat4Label'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={scaleIn}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`rounded-3xl border border-slate-100 p-6 text-center shadow-sm transition-all ${s.bg}`}
                >
                  <p className={`mb-2 text-3xl font-black ${s.color}`}>{s.val}</p>
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">{t('landing.howTitle')}</h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {t('landing.howDesc')}
            </p>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid gap-5 md:grid-cols-4"
          >
            {steps.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-80" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-md shadow-blue-200">
                  {s.num}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-slate-800 sm:text-base">{s.title}</h3>
                <p className="text-xs leading-6 text-slate-600 sm:text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">{t('landing.whyAITitle')}</h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {t('landing.whyAIDesc')}
            </p>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-5 md:grid-cols-2"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4 }}>
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <AnimatedSection className="mx-auto max-w-5xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900">{t('landing.condTitle')}</h2>
          <p className="mb-10 text-sm leading-7 text-slate-600 sm:text-base">
            {t('landing.condDesc')}
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {conditions.map((c) => (
              <motion.span
                key={c.name}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm ${c.bg} ${c.border} ${c.color}`}
              >
                <CheckCircle size={14} />
                {c.name}
              </motion.span>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      <section className="px-6 pb-10">
        <AnimatedSection className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 shadow-sm">
            <div className="flex gap-3">
              <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-amber-600" />
              <div>
                <p className="mb-1 text-sm font-semibold text-amber-800">{t('landing.disclaimerTitle')}</p>
                <p className="text-xs leading-6 text-amber-700 sm:text-sm">
                  {t('landing.disclaimerText')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="border-t border-slate-200 bg-white px-6 py-20">
        <AnimatedSection variant="scaleIn" className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/40 p-10 text-center shadow-xl shadow-slate-100">
            <div className="pointer-events-none absolute -top-10 right-0 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-100/40 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-200">
                <ScanLine size={28} className="text-white" />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                {t('landing.ctaTitle')}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {t('landing.ctaDesc')}
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/patient-login"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:shadow-lg"
                  >
                    <User size={16} />
                    {t('landing.ctaPatient')}
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/clinic-login"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg"
                  >
                    <Building2 size={16} />
                    {t('landing.ctaClinic')}
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                  >
                    {t('landing.ctaCreate')}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
      <Chatbot />
    </div>
  )
}