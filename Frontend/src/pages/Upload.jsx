import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Upload, X, ImagePlus, Loader2, AlertCircle, User, Eye } from 'lucide-react'

const MAX_MB = 10

export default function UploadPage() {
  const { t } = useTranslation()

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [form, setForm] = useState({ name: '', id: '', age: '', gender: '', eye: '', notes: '' })
  const inputRef = useRef()
  const navigate = useNavigate()

  const handleFile = useCallback(
    (f) => {
      if (!f) return
      if (!f.type.startsWith('image/')) {
        toast.error(t('upload.toasts.invalidImage'))
        return
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        toast.error(t('upload.toasts.maxFileSize', { max: MAX_MB }))
        return
      }
      setFile(f)
      setPreview(URL.createObjectURL(f))
      toast.success(t('upload.toasts.imageLoaded'))
    },
    [t]
  )

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const clear = () => {
    setFile(null)
    setPreview(null)
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const analyze = async () => {
    if (!file) {
      toast.error(t('upload.toasts.imageRequired'))
      return
    }
    if (!form.name) {
      toast.error(t('upload.toasts.nameRequired'))
      return
    }
    if (!form.id) {
      toast.error(t('upload.toasts.patientIdRequired'))
      return
    }

    setLoading(true)
    setProgress(0)
    const tid = toast.loading(t('upload.toasts.analyzing'))
    const fd = new FormData()
    fd.append('image', file)
    // Append patient metadata so the backend can store it with the report
    fd.append('name',      form.name)
    fd.append('patientId', form.id)
    fd.append('age',       form.age)
    fd.append('gender',    form.gender)
    fd.append('eye',       form.eye)
    fd.append('notes',     form.notes)

    try {
      const user = JSON.parse(localStorage.getItem('eyescreen_user') || '{}')
      const { data } = await axios.post('/api/predict', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100)),
      })

      sessionStorage.setItem(
        'eyescreen_result',
        JSON.stringify({ ...data, patient: form, timestamp: Date.now() })
      )
      toast.success(t('upload.toasts.analysisComplete'), { id: tid })
      navigate('/report')
    } catch {
      toast.error(t('upload.toasts.analysisFailed'), { id: tid })
      setLoading(false)
    }
  }

  const ready = form.name && form.id && file && !loading
  const guidelineItems = t('upload.guidelines.items', { returnObjects: true })

  return (
    <div className="min-h-screen pt-16 bg-[#F4F6FA]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          <h1 className="text-xl font-bold text-slate-800">{t('upload.header.title')}</h1>
          <p className="text-sm text-slate-400 mt-0.5">{t('upload.header.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User size={13} className="text-blue-600" />
                </div>
                <p className="font-semibold text-slate-800 text-sm">{t('upload.patient.title')}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">
                    {t('upload.patient.fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="input"
                    placeholder={t('upload.patient.placeholders.fullName')}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      {t('upload.patient.patientId')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="input"
                      placeholder={t('upload.patient.placeholders.patientId')}
                      value={form.id}
                      onChange={(e) => set('id', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label">{t('upload.patient.age')}</label>
                    <input
                      className="input"
                      type="number"
                      placeholder={t('upload.patient.placeholders.age')}
                      min="1"
                      max="120"
                      value={form.age}
                      onChange={(e) => set('age', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">{t('upload.patient.gender')}</label>
                    <select
                      className="input"
                      value={form.gender}
                      onChange={(e) => set('gender', e.target.value)}
                    >
                      <option value="">{t('upload.patient.select')}</option>
                      <option>{t('upload.patient.genderOptions.male')}</option>
                      <option>{t('upload.patient.genderOptions.female')}</option>
                      <option>{t('upload.patient.genderOptions.other')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">{t('upload.patient.eyeScanned')}</label>
                    <select
                      className="input"
                      value={form.eye}
                      onChange={(e) => set('eye', e.target.value)}
                    >
                      <option value="">{t('upload.patient.select')}</option>
                      <option>{t('upload.patient.eyeOptions.right')}</option>
                      <option>{t('upload.patient.eyeOptions.left')}</option>
                      <option>{t('upload.patient.eyeOptions.both')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">{t('upload.patient.clinicalNotes')}</label>
                  <textarea
                    className="input resize-none"
                    rows={3}
                    placeholder={t('upload.patient.placeholders.notes')}
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4"
            >
              <AlertCircle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                {t('upload.disclaimer.prefix')} <strong>{t('upload.disclaimer.highlight')}</strong>{' '}
                {t('upload.disclaimer.suffix')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Eye size={13} className="text-blue-600" />
                </div>
                <p className="font-semibold text-slate-800 text-sm">{t('upload.image.title')}</p>
              </div>

              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div
                    key="dropzone"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current.click()}
                    className={`border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition-all select-none ${
                      dragging
                        ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files[0])}
                    />

                    <motion.div
                      animate={{ y: dragging ? -4 : 0 }}
                      className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4"
                    >
                      <ImagePlus size={24} className="text-blue-500" />
                    </motion.div>

                    <p className="font-semibold text-slate-700 mb-1">{t('upload.image.dropTitle')}</p>
                    <p className="text-slate-400 text-sm mb-4">{t('upload.image.dropSubtitle')}</p>
                    <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-500 font-medium">
                      {t('upload.image.formats', { max: MAX_MB })}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl overflow-hidden border border-slate-200"
                  >
                    <div className="relative bg-slate-900">
                      <img
                        src={preview}
                        alt={t('upload.image.previewAlt')}
                        className="w-full max-h-64 object-contain"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={clear}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 border border-slate-200 flex items-center justify-center shadow-sm"
                      >
                        <X size={13} className="text-slate-600" />
                      </motion.button>
                    </div>

                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700 truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>

                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold"
                      >
                        {t('upload.image.ready')}
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4"
                  >
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>{t('upload.progress.analyzing')}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="card p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                {t('upload.guidelines.title')}
              </p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {Array.isArray(guidelineItems) &&
                  guidelineItems.map((item) => (
                    <p key={item} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <span className="text-blue-500 font-bold mt-0.5">·</span>
                      {item}
                    </p>
                  ))}
              </div>
            </div>

            <motion.button
              onClick={analyze}
              disabled={!ready}
              whileHover={ready ? { scale: 1.01 } : {}}
              whileTap={ready ? { scale: 0.98 } : {}}
              className="btn-primary w-full py-3.5 text-base"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> {t('upload.actions.analyzing')}
                </>
              ) : (
                <>
                  <Upload size={16} /> {t('upload.actions.runAnalysis')}
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}