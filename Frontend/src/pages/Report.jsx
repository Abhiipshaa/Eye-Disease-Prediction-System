import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  AlertTriangle, CheckCircle, AlertCircle,
  Printer, RefreshCw, ArrowLeft,
  User, Eye, FileText, Clock
} from 'lucide-react'
import { stagger, fadeUp } from '../components/AnimatedSection'

// ── Severity config ────────────────────────────────────────────────────────
// Maps the backend "severity" string to Tailwind colour tokens + icons.
// Kept outside the component so it is not recreated on every render.
const SEV_CONFIG = {
  high: {
    color:    'text-red-700',
    bg:       'bg-red-50',
    border:   'border-red-200',
    bar:      'bg-red-500',
    badgeCls: 'bg-red-50 text-red-700 border border-red-200',
    icon:     <AlertTriangle size={16} className="text-red-600" />,
  },
  medium: {
    color:    'text-amber-700',
    bg:       'bg-amber-50',
    border:   'border-amber-200',
    bar:      'bg-amber-500',
    badgeCls: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon:     <AlertCircle size={16} className="text-amber-600" />,
  },
  low: {
    color:    'text-emerald-700',
    bg:       'bg-emerald-50',
    border:   'border-emerald-200',
    bar:      'bg-emerald-500',
    badgeCls: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    icon:     <CheckCircle size={16} className="text-emerald-600" />,
  },
}

export default function Report() {
  const { t }          = useTranslation()
  const navigate       = useNavigate()
  const [data, setData]         = useState(null)
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    // sessionStorage holds the JSON blob written by Upload.jsx after a
    // successful /predict response.  If it is missing, redirect back.
    const raw = sessionStorage.getItem('eyescreen_result')
    if (!raw) { navigate('/upload'); return }

    const parsed = JSON.parse(raw)
    setData(parsed)

    // Delay the confidence bar animation so it plays after the card mounts.
    setTimeout(() => setBarWidth(parsed.confidence), 600)
  }, [navigate])

  // Nothing to render until sessionStorage is read
  if (!data) return null

  // ── Derived display values ─────────────────────────────────────────────────
  const sev      = SEV_CONFIG[data.severity] || SEV_CONFIG.low
  const p        = data.patient || {}
  const reportId = `RPT-${String(data.timestamp).slice(-7)}`
  const generated = new Date(data.timestamp).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  // Severity label + action come from en.json  report.severity.*
  const sevLabel  = t(`report.severity.${data.severity}.label`,  { defaultValue: data.severity })
  const sevShort  = t(`report.severity.${data.severity}.short`,  { defaultValue: data.severity })
  const sevAction = t(`report.severity.${data.severity}.action`, { defaultValue: '' })

  return (
    <div className="min-h-screen pt-16 bg-[#F4F6FA]">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-7 no-print"
        >
          <div>
            {/* t('report.header.title') → "Screening Report" */}
            <h1 className="text-xl font-bold text-slate-800">
              {t('report.header.title')}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Clock size={12} />
              {/* t('report.header.generatedLabel') → "Generated" */}
              {t('report.header.generatedLabel')} {generated}
              &nbsp;·&nbsp;
              {/* t('report.header.reportIdLabel') → "Report ID" */}
              {t('report.header.reportIdLabel')} {reportId}
            </p>
          </div>

          <div className="flex gap-2.5">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              className="btn-ghost"
            >
              <Printer size={14} /> {t('report.actions.print')}
            </motion.button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/upload" className="btn-primary">
                <RefreshCw size={14} /> {t('report.actions.newScan')}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Print-only header ────────────────────────────────────────────── */}
        <div className="hidden print:flex items-center justify-between mb-6 pb-4 border-b border-slate-300">
          <div>
            <p className="text-lg font-bold text-slate-800">
              {t('report.printHeader.title')}
            </p>
            <p className="text-sm text-slate-500">{reportId} · {generated}</p>
          </div>
        </div>

        {/* ── Severity banner ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-start gap-3 px-5 py-4 rounded-xl border mb-5 ${sev.bg} ${sev.border}`}
        >
          <div className="mt-0.5">{sev.icon}</div>
          <div>
            <p className={`font-bold text-sm ${sev.color}`}>{sevLabel}</p>
            <p className={`text-xs mt-0.5 ${sev.color} opacity-75`}>{sevAction}</p>
          </div>
        </motion.div>

        {/* ── Low-confidence warning (only shown when model is unsure) ─────── */}
        {data.low_confidence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5"
          >
            <AlertCircle size={14} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>Low confidence result.</strong> The model is less than 60% certain.
              Please repeat with a higher-quality fundus image and confirm with a specialist.
            </p>
          </motion.div>
        )}

        {/* ── Three info cards: Patient | Diagnosis | Report Info ──────────── */}
        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="grid md:grid-cols-3 gap-4 mb-5"
        >
          {/* Patient card */}
          <motion.div variants={fadeUp} className="card p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <User size={13} className="text-slate-400" />
              {/* t('report.sections.patient') → "Patient" */}
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {t('report.sections.patient')}
              </p>
            </div>

            <div className="space-y-2.5">
              <div>
                {/* t('report.patient.fullName') → "Full Name" */}
                <p className="text-xs text-slate-400">{t('report.patient.fullName')}</p>
                <p className="font-semibold text-slate-800 text-sm">
                  {p.name || t('report.patient.empty')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-400">{t('report.patient.patientId')}</p>
                  <p className="font-semibold text-slate-700 text-sm">
                    {p.id || t('report.patient.empty')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t('report.patient.ageGender')}</p>
                  <p className="font-semibold text-slate-700 text-sm">
                    {p.age || t('report.patient.empty')}
                    {p.gender ? ` · ${p.gender[0]}` : ''}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400">{t('report.patient.eyeScanned')}</p>
                <p className="font-semibold text-slate-700 text-sm flex items-center gap-1">
                  <Eye size={11} className="text-slate-400" />
                  {p.eye || t('report.patient.empty')}
                </p>
              </div>

              {p.notes && (
                <div>
                  <p className="text-xs text-slate-400">{t('report.patient.notes')}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.notes}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Diagnosis card */}
          <motion.div variants={fadeUp} className="card p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <Eye size={13} className="text-slate-400" />
              {/* t('report.sections.diagnosis') → "Diagnosis" */}
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {t('report.sections.diagnosis')}
              </p>
            </div>

            {/* Disease name from the model */}
            <p className={`text-xl font-black leading-tight mb-3 ${sev.color}`}>
              {data.disease}
            </p>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${sev.badgeCls}`}>
              {sev.icon} {sevShort}
            </span>

            {/* Confidence bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                {/* t('report.diagnosis.confidence') → "AI Confidence" */}
                <span className="font-semibold text-slate-500">
                  {t('report.diagnosis.confidence')}
                </span>
                <span className="font-bold text-slate-700">{data.confidence}%</span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${sev.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-300 mt-1">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>

            {/* Top-2 predictions from the model (transparency) */}
            {data.top_predictions?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">
                  Top predictions
                </p>
                {data.top_predictions.map((tp) => (
                  <div key={tp.label} className="flex justify-between text-xs text-slate-600 mb-1">
                    <span className="capitalize">{tp.label.replace(/_/g, ' ')}</span>
                    <span className="font-semibold">{tp.confidence}%</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Report info card */}
          <motion.div variants={fadeUp} className="card p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <FileText size={13} className="text-slate-400" />
              {/* t('report.sections.reportInfo') → "Report Information" */}
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {t('report.sections.reportInfo')}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400">{t('report.reportInfo.reportId')}</p>
                <p className="font-mono font-semibold text-slate-700 text-sm">{reportId}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">{t('report.reportInfo.generated')}</p>
                <p className="font-semibold text-slate-700 text-sm">{generated}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">{t('report.reportInfo.model')}</p>
                <p className="font-semibold text-slate-700 text-sm">EyeScreen AI v2.1</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">{t('report.reportInfo.status')}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"
                  />
                  {t('report.reportInfo.completed')}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Clinical recommendations ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="card p-6 mb-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText size={13} className="text-blue-600" />
            </div>
            {/* t('report.sections.recommendations') → "Clinical Recommendations" */}
            <p className="font-semibold text-slate-800 text-sm">
              {t('report.sections.recommendations')}
            </p>
          </div>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-3"
          >
            {/* data.recommendations is the array returned by the backend */}
            {(data.recommendations || []).map((rec, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show:   { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.4 + i * 0.08 } },
                }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Disclaimer ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 bg-slate-100 border border-slate-200 rounded-xl p-4 mb-6"
        >
          <AlertCircle size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            {/* t('report.disclaimer.text1') → "This report was generated by EyeScreen AI (v2.1) for" */}
            {t('report.disclaimer.text1')}{' '}
            <strong className="text-slate-600">{t('report.disclaimer.highlight')}</strong>
            {'. '}{t('report.disclaimer.text2')}
          </p>
        </motion.div>

        {/* ── Action buttons ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex gap-3 no-print"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
            <Link to="/upload" className="btn-primary w-full py-3">
              <RefreshCw size={14} /> {t('report.actions.screenAnother')}
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.print()}
            className="btn-ghost"
          >
            <Printer size={14} /> {t('report.actions.print')}
          </motion.button>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" className="btn-ghost">
              <ArrowLeft size={14} /> {t('report.actions.home')}
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
