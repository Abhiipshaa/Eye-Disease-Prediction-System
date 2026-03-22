import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import AnimatedSection, { stagger, fadeUp } from '../components/AnimatedSection'
import { useTranslation } from 'react-i18next'

const faqSections = [
  {
    title: 'About AI Screening',
    items: [
      { q: 'How does EyeScreen AI detect eye diseases?', a: 'EyeScreen AI uses a deep learning model (CNN) trained on over 80,000 annotated retinal fundus images. When you upload an image, the model analyzes patterns in the retina — such as microaneurysms, optic disc changes, and blood vessel abnormalities — to identify signs of disease.' },
      { q: 'How accurate is the AI?', a: 'Our model achieves 94.7% detection accuracy across 5+ conditions on our validation dataset. Accuracy can vary based on image quality, patient demographics, and disease stage. Always verify results with a qualified ophthalmologist.' },
      { q: 'What type of images does the system accept?', a: 'EyeScreen AI accepts retinal fundus photographs in JPG, PNG, or TIFF format, up to 10 MB. For best results, use a calibrated fundus camera with a minimum resolution of 512×512 pixels.' },
      { q: 'How long does the analysis take?', a: 'Analysis typically completes in under 3 seconds after the image is uploaded. Total time depends on your internet connection speed.' },
      { q: 'Can EyeScreen AI replace an ophthalmologist?', a: 'No. EyeScreen AI is a screening assistance tool, not a diagnostic device. All results must be reviewed and confirmed by a qualified ophthalmologist before any clinical decision is made.' },
    ],
  },
  {
    title: 'Reports & Results',
    items: [
      { q: 'What does the screening report include?', a: 'Each report includes: detected condition name, risk level (High / Medium / Low), AI confidence score, numbered clinical recommendations, patient details, a unique report ID, and a timestamp. Reports are printable directly from the browser.' },
      { q: 'What do the confidence scores mean?', a: 'The confidence score (0–100%) indicates how certain the AI model is about its prediction. A score above 85% is considered high confidence. However, even high-confidence results must be verified clinically.' },
      { q: 'Can I print or save the report?', a: "Yes. Every report has a Print button. The printed version hides the navigation bar for a clean clinical layout. You can also save it as a PDF using your browser's 'Save as PDF' option." },
      { q: 'How long are reports stored?', a: "Reports are stored temporarily in your browser's session storage and cleared when you close the tab. We do not store reports on any server. Print or save the report as a PDF immediately after generation." },
    ],
  },
  {
    title: 'Privacy & Data',
    items: [
      { q: 'Is my patient data stored on your servers?', a: "No. EyeScreen AI does not store any patient data, retinal images, or personal information on external servers. All data is processed in-session and cleared when you close the browser tab." },
      { q: 'Is the retinal image uploaded to a cloud server?', a: 'In the current version, the image is sent to a local backend server for processing and is not retained after analysis. In production, all transfers are encrypted (HTTPS) and images are deleted immediately after inference.' },
      { q: 'Is EyeScreen AI HIPAA compliant?', a: 'The current version is a hackathon prototype and has not been formally certified for HIPAA compliance. For clinical deployment, additional security measures would need to be implemented.' },
    ],
  },
  {
    title: 'Account & Access',
    items: [
      { q: 'Do I need an account to use EyeScreen AI?', a: 'Yes. You need to create a free account to access the screening tool. Account creation takes less than a minute and requires only your name, email, and a password.' },
      { q: 'Is EyeScreen AI free to use?', a: 'Yes, EyeScreen AI is completely free in its current form. It was built as a hackathon project to demonstrate the potential of AI in healthcare.' },
      { q: 'I forgot my password. How do I reset it?', a: "In the current prototype, passwords are stored in your browser's localStorage. If you forget your password, you can create a new account. A full password reset flow will be available in future versions." },
    ],
  },
]

function AccordionItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-slate-100">
              <p className="text-slate-500 text-sm leading-relaxed pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] pt-16 overflow-x-hidden">

      {/* Hero */}
      <section className="px-6 py-16 bg-gradient-to-b from-blue-50/60 to-[#F4F6FA]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block"
          >
            FAQ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-extrabold text-slate-900 mb-3"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-slate-400 text-sm leading-relaxed"
          >
            Everything you need to know about EyeScreen AI — how it works, what the results mean,
            and how your data is handled.
          </motion.p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-10">
          {faqSections.map((section, si) => (
            <AnimatedSection key={section.title} delay={si * 0.05}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">{section.title}</h2>
              <motion.div
                variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="space-y-3"
              >
                {section.items.map((item, i) => (
                  <AccordionItem key={i} {...item} index={i} />
                ))}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <AnimatedSection variant="scaleIn" className="max-w-2xl mx-auto">
          <div className="card p-8 text-center shadow-md">
            <h3 className="font-bold text-slate-800 mb-2">Still have questions?</h3>
            <p className="text-slate-400 text-sm mb-5">Can't find what you're looking for? Reach out to our team directly.</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="btn-primary gap-2">
                Contact Us <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  )
}
