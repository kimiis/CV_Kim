import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        height: 2,
        background: 'var(--accent)',
        transformOrigin: 'left',
        scaleX: scrollYProgress,
        zIndex: 9997,
        pointerEvents: 'none',
        width: '100%',
      }}
    />
  )
}
