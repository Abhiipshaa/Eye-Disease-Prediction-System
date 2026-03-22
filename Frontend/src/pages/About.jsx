import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, CheckCircle } from 'lucide-react'
import AnimatedSection, { stagger, fadeUp, scaleIn, slideLeft, slideRight } from '../components/AnimatedSection'

const values = [
  { icon: <Target size={20} className="text-blue-600" />,  bg: 'bg-blue-50',   title: 'Accuracy First',    desc: 'Every prediction is backed by a model trained on tens of thousands of clinically annotated retinal images.' },
  { icon: <Heart size={20} className="text-red-500" />,    bg: 'bg-red-50',    title: 'Patient-Centered',  desc: 'We build for the patient — faster detection, clearer reports, and better outcomes.' },
  { icon: <Users size={20} className="text-violet-600" />, bg: 'bg-violet-50', title: 'Accessible to All', desc: 'Designed for healthcare workers in rural and low-resource settings, not just specialists.' },
  { icon: <Eye size={20} className="text-emerald-600" />,  bg: 'bg-emerald-50',title: 'Transparent AI',    desc: 'We clearly communicate confidence scores and always recommend specialist verification.' },
]

const aiPoints = [
  'AI can analyze a retinal image in under 3 seconds — faster than any human specialist.',
  'Deep learning models detect subtle patterns invisible to the untrained eye.',
  'AI screening scales infinitely — one model can serve thousands of patients simultaneously.',
  'It reduces the burden on specialists by pre-filtering low-risk cases.',
  'It empowers non-specialist healthcare workers to make informed referral decisions.',
  'Early detection through AI can reduce treatment costs by up to 80%.',
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] pt-16 overflow-x-hidden">

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-b from-blue-50/60 to-[#F4F6FA]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            We're on a Mission to End Preventable Blindness
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-slate-500 text-base leading-relaxed"
          >
            EyeScreen AI was built during a hackathon by Team Blur Busters — a group of developers
            passionate about using technology to solve real healthcare problems.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <AnimatedSection variant="slideLeft">
            <div className="card p-8 h-full hover:shadow-md transition-shadow">
              <motion.div whileHover={{ scale: 1.08 }} className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5 cursor-default">
                <Target size={20} className="text-blue-600" />
              </motion.div>
              <h2 className="text-lg font-bold text-slate-800 mb-3">Our Mission</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                To make early eye disease detection accessible to every healthcare worker — regardless of
                location, resources, or access to specialists. We believe AI can act as a first-level
                screening tool that saves sight and saves lives.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection variant="slideRight">
            <div className="card p-8 h-full hover:shadow-md transition-shadow">
              <motion.div whileHover={{ scale: 1.08 }} className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-5 cursor-default">
                <Eye size={20} className="text-violet-600" />
              </motion.div>
              <h2 className="text-lg font-bold text-slate-800 mb-3">Our Vision</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                A world where no one loses their vision due to a disease that could have been caught early.
                We envision AI-assisted screening becoming a standard part of primary healthcare in every
                community, especially underserved ones.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-6 py-14 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title">The Problem We're Solving</h2>
            <p className="section-sub">Preventable blindness is a global crisis hiding in plain sight</p>
          </AnimatedSection>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-5 mb-8"
          >
            {[
              { stat: '2.2B',   label: 'People globally with vision impairment',    color: 'text-red-600',    bg: 'bg-red-50' },
              { stat: '90%',    label: 'Of blindness cases are preventable',        color: 'text-blue-600',   bg: 'bg-blue-50' },
              { stat: '1 in 3', label: 'People with diabetes develop retinopathy',  color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map(s => (
              <motion.div key={s.label} variants={scaleIn} whileHover={{ y: -4 }} className={`card p-6 text-center ${s.bg} border-0 cursor-default`}>
                <p className={`text-3xl font-extrabold mb-2 ${s.color}`}>{s.stat}</p>
                <p className="text-xs text-slate-600 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection>
            <div className="card p-7">
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                In rural India and many developing regions, patients travel hours to see an eye specialist —
                only to find out their condition has progressed beyond treatment. The bottleneck isn't
                treatment availability. It's <strong className="text-slate-800">early detection</strong>.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                EyeScreen AI puts a powerful screening tool in the hands of any healthcare worker with a
                fundus camera and an internet connection. No specialist required for the first step.
                The AI flags high-risk cases so the right patients get referred at the right time.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title">What We Stand For</h2>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-5"
          >
            {values.map(v => (
              <motion.div
                key={v.title} variants={fadeUp}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                className="card p-6 flex gap-4 cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center flex-shrink-0`}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1.5">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why AI Screening */}
      <section className="px-6 py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title">Why AI-Assisted Eye Screening Matters</h2>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="space-y-3"
          >
            {aiPoints.map((p, i) => (
              <motion.div
                key={i} variants={fadeUp}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 card px-5 py-4 cursor-default"
              >
                <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">{p}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  )
}
