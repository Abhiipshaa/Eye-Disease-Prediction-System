import { motion } from 'framer-motion'
import { Brain, Layers, Wifi, AlertTriangle, CheckCircle, Cpu, Database, TrendingUp } from 'lucide-react'
import AnimatedSection, { stagger, fadeUp, scaleIn } from '../components/AnimatedSection'

const techFeatures = [
  { icon: <Brain size={20} className="text-blue-600" />,      iconBg: 'bg-blue-50',    title: 'Deep Learning Model',       desc: 'CNNs trained on 80,000+ annotated fundus images to detect retinal abnormalities with high accuracy.' },
  { icon: <Layers size={20} className="text-violet-600" />,   iconBg: 'bg-violet-50',  title: 'Medical Image Analysis',    desc: 'Specialized preprocessing pipelines enhance retinal features — optic disc, macula, and blood vessel patterns.' },
  { icon: <Cpu size={20} className="text-cyan-600" />,        iconBg: 'bg-cyan-50',    title: 'Real-Time Inference',       desc: 'Optimized model inference delivers results in under 3 seconds, even on standard hardware.' },
  { icon: <Database size={20} className="text-emerald-600" />,iconBg: 'bg-emerald-50', title: 'Multi-Class Classification',desc: 'Simultaneously screens for 5+ conditions including diabetic retinopathy, glaucoma, and macular degeneration.' },
  { icon: <TrendingUp size={20} className="text-orange-600" />,iconBg: 'bg-orange-50', title: 'Confidence Scoring',        desc: 'Every prediction includes a calibrated confidence score so clinicians can assess reliability at a glance.' },
  { icon: <Wifi size={20} className="text-pink-600" />,       iconBg: 'bg-pink-50',    title: 'Remote Screening Ready',    desc: 'Web-based interface works on any device with a browser — no installation, no specialist on-site required.' },
]

const pipeline = [
  { step: '01', title: 'Image Ingestion',   desc: 'Fundus image uploaded via web interface. Supported formats: JPG, PNG, TIFF.' },
  { step: '02', title: 'Preprocessing',     desc: 'Image resized, normalized, and enhanced to highlight retinal structures.' },
  { step: '03', title: 'CNN Inference',     desc: 'Deep learning model extracts features and classifies the retinal condition.' },
  { step: '04', title: 'Report Generation', desc: 'Diagnosis, confidence score, severity level, and recommendations are compiled.' },
]

const ruralBenefits = [
  'No ophthalmologist required for initial screening — any trained health worker can operate it.',
  'Works on low-bandwidth connections — image upload is the only network requirement.',
  'Reduces unnecessary specialist referrals by filtering low-risk cases automatically.',
  'Enables mass screening camps — hundreds of patients can be screened in a single day.',
  'Printable reports work even in areas with unreliable internet after the scan.',
  'Bridges the urban-rural healthcare gap with technology that scales to any location.',
]

export default function Technology() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] pt-16 overflow-x-hidden">

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-b from-blue-50/60 to-[#F4F6FA]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block"
          >
            The Technology
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            How AI Powers Retinal Screening
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-slate-500 text-base leading-relaxed"
          >
            EyeScreen AI combines deep learning, medical image analysis, and clinical knowledge
            to deliver fast, accurate, and accessible eye disease screening.
          </motion.p>
        </div>
      </section>

      {/* Tech Features */}
      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">How AI Helps Healthcare</h2>
            <p className="section-sub">Transforming medical imaging with deep learning</p>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-5"
          >
            {techFeatures.map(f => (
              <motion.div
                key={f.title} variants={fadeUp}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                className="card p-6 flex gap-4 cursor-default"
              >
                <div className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center flex-shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1.5">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="px-6 py-14 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">The AI Pipeline</h2>
            <p className="section-sub">From image upload to clinical report in 4 steps</p>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-5"
          >
            {pipeline.map((s, i) => (
              <motion.div
                key={s.step} variants={fadeUp}
                whileHover={{ y: -5, boxShadow: '0 10px 28px rgba(0,0,0,0.09)' }}
                className="card p-6 text-center cursor-default relative"
              >
                {i < pipeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-5 h-px bg-slate-200 z-10" />
                )}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="w-10 h-10 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-4 shadow-sm shadow-blue-200"
                >
                  {s.step}
                </motion.div>
                <h3 className="font-semibold text-slate-800 text-sm mb-2">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Deep Learning */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title">Medical Imaging & Deep Learning</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="card p-8">
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Retinal fundus photography captures a detailed image of the back of the eye — including the
                optic disc, macula, fovea, and blood vessels. These structures carry visible signs of systemic
                and ocular diseases long before symptoms appear.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Deep learning models — specifically Convolutional Neural Networks (CNNs) — learn to identify
                these patterns from thousands of labeled examples. The model learns features like
                microaneurysms (early diabetic retinopathy), cup-to-disc ratio changes (glaucoma),
                and drusen deposits (macular degeneration).
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                EyeScreen AI's model achieves <strong className="text-slate-800">94.7% detection accuracy</strong> across
                5+ conditions, validated on a held-out test set of diverse patient demographics.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Rural Benefits */}
      <section className="px-6 py-14 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title">Rural & Remote Screening Benefits</h2>
            <p className="section-sub">Bringing specialist-level screening to underserved communities</p>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="space-y-3"
          >
            {ruralBenefits.map((b, i) => (
              <motion.div
                key={i} variants={fadeUp}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 card px-5 py-4 cursor-default"
              >
                <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">{b}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ethical Disclaimer */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection variant="scaleIn">
            <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-7">
              <AlertTriangle size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-800 mb-3">Ethical Disclaimer</h3>
                <div className="space-y-2.5 text-sm text-amber-800 leading-relaxed">
                  <p>EyeScreen AI is an <strong>assistive screening tool</strong>, not a diagnostic device.</p>
                  <p>All AI-generated results must be reviewed by a <strong>qualified ophthalmologist</strong> before any clinical decision is made.</p>
                  <p>The model may produce false positives or false negatives. Confidence scores indicate model certainty, not clinical certainty.</p>
                  <p>This tool should never be used as the sole basis for a medical diagnosis or treatment plan.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
