import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 }
  const followerX = useSpring(dotX, springConfig)
  const followerY = useSpring(dotY, springConfig)

  const isHovering = useRef(false)
  const dotRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const over = (e) => {
      const target = e.target
      const isLink = target.closest('a, button, [data-cursor="pointer"]')
      const isProject = target.closest('[data-cursor="project"]')

      if (dotRef.current && followerRef.current) {
        if (isProject) {
          dotRef.current.style.width = '6px'
          dotRef.current.style.height = '6px'
          dotRef.current.style.background = 'var(--accent)'
          followerRef.current.style.width = '64px'
          followerRef.current.style.height = '64px'
          followerRef.current.style.borderColor = 'var(--accent)'
          followerRef.current.style.opacity = '0.6'
        } else if (isLink) {
          dotRef.current.style.width = '4px'
          dotRef.current.style.height = '4px'
          followerRef.current.style.width = '44px'
          followerRef.current.style.height = '44px'
          followerRef.current.style.opacity = '1'
        } else {
          dotRef.current.style.width = '6px'
          dotRef.current.style.height = '6px'
          dotRef.current.style.background = 'var(--fg)'
          followerRef.current.style.width = '36px'
          followerRef.current.style.height = '36px'
          followerRef.current.style.borderColor = 'rgba(240,236,228,0.3)'
          followerRef.current.style.opacity = '1'
        }
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          width: 6,
          height: 6,
          background: 'var(--fg)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
        }}
      />
      <motion.div
        ref={followerRef}
        style={{
          position: 'fixed',
          left: followerX,
          top: followerY,
          width: 36,
          height: 36,
          border: '1px solid rgba(240,236,228,0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          x: '-50%',
          y: '-50%',
          transition: 'width 0.25s, height 0.25s, opacity 0.25s, border-color 0.25s',
        }}
      />
    </>
  )
}
