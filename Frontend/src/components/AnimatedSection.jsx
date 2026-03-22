import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
}
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}
export const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
export const slideRight = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
export const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}
export const staggerFast = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const variantMap = { fadeUp, fadeIn, scaleIn, slideLeft, slideRight }

export default function AnimatedSection({ children, className = '', delay = 0, variant = 'fadeUp' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const chosen = variantMap[variant] || fadeUp

  return (
    <motion.div
      ref={ref}
      variants={chosen}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
