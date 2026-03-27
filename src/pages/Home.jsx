import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useGitHubRepos } from '../hooks/useGitHub'

// ── Stagger animation variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}
const itemUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Section reveal hook
function useReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return [ref, inView]
}

// ─────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 160])

  const words = ['Développeuse Data / IA',' Alternance']

  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 48px 60px',
        borderBottom: '1px solid var(--line)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax background text */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          top: '15%',
          left: 100,
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(100px, 8vw, 260px)',
          fontWeight: 300,
          color: 'var(--fg)',
          opacity: 0.025,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'normal',
          letterSpacing: '-0.04em',
        }}
      >
          Curious by nature
      </motion.div>



      {/* Title */}
      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(60px, 10vw, 130px)',
          fontWeight: 300,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          marginBottom: 48,
        }}
      >
        {words.map((word, i) => (
          <span
            key={word}
            style={{ display: 'block', overflow: 'hidden' }}
          >
            <motion.em
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: 'block',
                fontStyle: 'italic',
                color: i === 1 ? 'var(--accent)' : 'var(--fg)',
              }}
            >
              {word}
            </motion.em>
          </span>
        ))}
      </h1>

      {/* Footer row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <p
          style={{
            maxWidth: 600,
            lineHeight: 1.85,
            color: 'var(--fg-mid)',
              textAlign: 'justify',
          }}
        >
            Musculation le matin, pâtisserie le soir, et une chanson dans un tiroir je suis quelqu'un qui crée, tout le temps,
            sous toutes les formes. Cette énergie, je la mets aussi dans le code : en Mastère Full Stack Data IA en alternance,
            je construis une app skincare qui mêle IA et transparence des ingrédients, parce que ma passion pour la beauté m'a
            appris que les meilleurs produits naissent d'une vraie compréhension.
            Ce que je cherche ? Une équipe qui construit des choses qui comptent.
        </p>

      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────
// PROJECT ROW
// ─────────────────────────────────────────────────
function ProjectRow({ project, index }) {
  const [ref, inView] = useReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: '1px solid var(--line)' }}
    >
      <Link
        to={`/project/${project.name}`}
        data-cursor="project"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="project-row-link"
      >
        {/* hover bg fill */}
        <motion.div
          className="project-hover-bg"
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: 0,
            background: 'rgba(200,184,154,0.06)',
            pointerEvents: 'none',
          }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '28px 0',
            gap: 0,
            position: 'relative',
            flexWrap: 'wrap',
          }}
        >
          {/* Number */}
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.15em',
              color: 'var(--fg-dim)',
              width: 60,
              flexShrink: 0,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Name */}
          <motion.span
            whileHover={{ x: 8, color: project.color }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              flex: 1,
              lineHeight: 1,
              color: 'var(--fg)',
            }}
          >
            {project.title}
          </motion.span>

          {/* Meta */}
          <div
            className="project-meta"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 8,
              minWidth: 220,
            }}
          >
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {project.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    border: '1px solid var(--line)',
                    color: 'var(--fg-dim)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 16,
                fontSize: 10,
                color: 'var(--fg-dim)',
                letterSpacing: '0.08em',
              }}
            >
              {project.stars > 0 && <span>★ {project.stars}</span>}
              <span>{project.year}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                View ↗
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────────
function Projects({ repos, loading }) {
  const [ref, inView] = useReveal()

  return (
    <section id="projects" style={{ borderBottom: '1px solid var(--line)' }}>
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="projects-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '28px 48px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
          }}
        >
          Projets sélectionnés
        </span>
        <span
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 14,
            fontStyle: 'italic',
            color: 'var(--fg-dim)',
          }}
        >
          {loading ? '—' : `${repos.length.toString().padStart(2, '0')} works`}
        </span>
      </motion.div>

      {/* Project rows */}
      {loading ? (
        <div style={{ padding: '60px 48px', color: 'var(--fg-dim)', fontSize: 12 }}>
          Chargement depuis GitHub API…
        </div>
      ) : (
        repos.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))
      )}
    </section>
  )
}

// ─────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────
function About() {
  const [ref, inView] = useReveal()

  const skills = [
    { label: 'Langages', value: 'JS · PHP · Ruby · Java · Python' },
    { label: 'Frameworks', value: 'React · Symfony · Spring Boot · Angular' },
    { label: 'Data & IA', value: 'Pandas · Streamlit · PowerBI · Databricks' },
    { label: 'Cloud', value: 'Microsoft Azure · Docker · Git' },
    { label: 'BDD', value: 'MySQL · PostgreSQL · SQLServer' },
    { label: 'Formation', value: 'Sup De Vinci · LeWagon · ENI · NEXA' },
  ]

  return (
    <section
      id="about"
      className="about-section"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="about-left"
        style={{
          padding: '40px 50px',
          borderRight: '1px solid var(--line)',
            margin: 'auto'
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}
        >
          À propos<br />de moi
        </h2>
        <p style={{ color: 'var(--fg-mid)', lineHeight: 1.9, maxWidth: 380, textAlign: 'justify' }}>
            Développeuse full-stack et data en devenir, je prépare un Mastère Full Stack Data IA en alternance avec une conviction : la tech est plus puissante quand elle résout de vrais problèmes humains.
            Mon projet du moment en est la preuve : une application intelligente de recommandation skincare, née d'une frustration que je partage avec des millions de gens, ne pas vraiment savoir ce qu'on met sur sa peau.
            J'y combine analyse visuelle par IA, traitement de données produits et chatbot personnalisé pour aider chacun à comprendre sa peau et faire des choix éclairés.
            Un projet à la croisée de ce que j'aime faire et de ce que je vis au quotidien.
            Parce que oui, en dehors du code, je suis une vraie passionnée de skincare et makeup, j'analyse les compositions d'ingrédients comme d'autres lisent les menus. Je m'entraîne à la musculation pour me vider la tête, je pâtisse pour le plaisir de créer quelque chose de concret avec mes mains,
            et j'ai même écrit une chanson.
            Ce qui me motive dans mon alternance, c'est ça : apprendre vite, créer des choses utiles, et rejoindre une équipe où la curiosité est une qualité, pas un défaut
          <br /><br />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="about-right"
        style={{ padding: '80px 48px' }}
      >
        <div>
          {skills.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="skill-row"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 0',
                borderBottom: '1px solid var(--line)',
                ...(i === 0 ? { borderTop: '1px solid var(--line)' } : {}),
              }}
            >
              <span
                className="skill-label"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-dim)',
                  width: 110,
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <span className="skill-value" style={{ color: 'var(--fg-mid)', fontSize: 12, textAlign: 'right' }}>
                {value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useReveal()

  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        padding: '100px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 48,
        borderBottom: '1px solid var(--line)',
      }}
    >
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(48px, 8vw, 110px)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 0.9,
            fontStyle: 'italic'
        }}
      >
        Travaillons<br />
        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>ensemble</em>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end' }}
      >
        {[
          { label: 'GitHub', href: 'https://github.com/kimiis' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/isabelle-kim-6ab129235/' },
          { label: 'Email', href: 'mailto:kimi.0208@outlook.fr' },
        ].map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            target={label !== 'Email' ? '_blank' : undefined}
            rel="noreferrer"
            data-cursor="pointer"
            whileHover={{ x: -6, color: 'var(--accent)' }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 20,
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--fg)',
            }}
          >
            {label} ↗
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="footer-section"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        borderTop: '1px solid var(--line)',
        fontSize: 11,
        letterSpacing: '0.08em',
        color: 'var(--fg-dim)',
      }}
    >
      <span>© 2026 — Kim Isabelle</span>
      <span>Nantes, France</span>
    </footer>
  )
}

// ─────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────
export default function Home() {
  const { repos, loading } = useGitHubRepos('kimiis')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Projects repos={repos} loading={loading} />
      <About />
      <Contact />
      <Footer />
    </motion.div>
  )
}
