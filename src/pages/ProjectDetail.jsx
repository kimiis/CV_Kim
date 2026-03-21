import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGitHubRepos } from '../hooks/useGitHub'

export default function ProjectDetail() {
  const { name } = useParams()
  const { repos, loading } = useGitHubRepos('kimiis')

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--fg-dim)',
          fontSize: 12,
          letterSpacing: '0.1em',
        }}
      >
        Chargement…
      </div>
    )
  }

  const project = repos.find(r => r.name === name)
  const currentIndex = repos.findIndex(r => r.name === name)
  const prev = repos[currentIndex - 1]
  const next = repos[currentIndex + 1]

  if (!project) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <p style={{ color: 'var(--fg-dim)' }}>Projet non trouvé.</p>
        <Link
          to="/"
          data-cursor="pointer"
          style={{ color: 'var(--accent)', fontSize: 12, letterSpacing: '0.1em' }}
        >
          ← Retour
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: '100vh' }}
    >
      {/* Hero */}
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '120px 48px 60px',
          borderBottom: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background project name */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: -10,
            transform: 'translateY(-50%)',
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(80px, 18vw, 240px)',
            fontWeight: 300,
            color: project.color,
            opacity: 0.04,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
          }}
        >
          {project.title}
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            to="/"
            data-cursor="pointer"
            style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 48,
            }}
          >
            ← Index
          </Link>
        </motion.div>

        {/* Number + title */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'var(--fg-dim)',
            marginBottom: 16,
          }}
        >
          {String(currentIndex + 1).padStart(2, '0')} / {String(repos.length).padStart(2, '0')}
        </motion.span>

        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(64px, 12vw, 160px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            overflow: 'hidden',
            marginBottom: 40,
          }}
        >
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'block',
              fontStyle: 'italic',
              color: project.color,
            }}
          >
            {project.title}
          </motion.span>
        </h1>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
        >
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 12px',
                border: `1px solid ${project.color}40`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Content */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--line)',
        }}
      >
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            padding: '80px 48px',
            borderRight: '1px solid var(--line)',
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              marginBottom: 24,
            }}
          >
            Description
          </p>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'var(--fg)',
              maxWidth: 480,
            }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ padding: '80px 48px' }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              marginBottom: 24,
            }}
          >
            Détails
          </p>

          {[
            { label: 'Année', value: project.year },
            { label: 'Langage', value: project.language || project.tags[0] },
            { label: 'Stars GitHub', value: project.stars || '—' },
            { label: 'Forks', value: project.forks || '—' },
            {
              label: 'Lien',
              value: (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  style={{ color: project.color, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  GitHub ↗
                </a>
              ),
            },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid var(--line)',
                ...(i === 0 ? { borderTop: '1px solid var(--line)' } : {}),
              }}
            >
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
                {label}
              </span>
              <span style={{ color: 'var(--fg-mid)', fontSize: 12 }}>
                {value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Next / Prev navigation */}
      <nav
        style={{
          display: 'grid',
          gridTemplateColumns: prev ? '1fr' : '0fr',
          ...(prev && next ? { gridTemplateColumns: '1fr 1fr' } : {}),
          ...(next && !prev ? { gridTemplateColumns: '1fr' } : {}),
        }}
      >
        {prev && (
          <Link
            to={`/project/${prev.name}`}
            data-cursor="pointer"
            style={{
              padding: '40px 48px',
              borderRight: next ? '1px solid var(--line)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              borderTop: '1px solid var(--line)',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,184,154,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
              ← Précédent
            </span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 28, fontStyle: 'italic', color: 'var(--fg)' }}>
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            to={`/project/${next.name}`}
            data-cursor="pointer"
            style={{
              padding: '40px 48px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'flex-end',
              borderTop: '1px solid var(--line)',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,184,154,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
              Suivant →
            </span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 28, fontStyle: 'italic', color: 'var(--fg)' }}>
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </motion.div>
  )
}
