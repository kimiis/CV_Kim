import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Nav() {
  const { theme, toggle } = useTheme()
  const location = useLocation()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 48px',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 20,
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.05em',
          color: 'var(--fg)',
        }}
        data-cursor="pointer"
      >
        Kim Isabelle
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {[
          { to: '/#projects', label: 'Index' },
          { to: '/#about', label: 'About' },
          { to: '/#contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <a
            key={label}
            href={to}
            data-cursor="pointer"
            style={{
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              opacity: 0.6,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.6}
          >
            {label}
          </a>
        ))}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          data-cursor="pointer"
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: '1px solid var(--line)',
            color: 'var(--fg)',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            cursor: 'none',
            transition: 'border-color 0.3s',
          }}
        >
          {theme === 'dark' ? '○' : '●'}
        </button>
      </div>
    </motion.nav>
  )
}
