import { useState, useEffect } from 'react'

// Static enrichment data to complement GitHub API
const PROJECT_META = {
  barbienb: {
    title: 'BarbieNB',
    description: "Plateforme de location de logements inspirée d'Airbnb, réalisée lors du bootcamp Le Wagon. Gestion complète des annonces, système de réservation et authentification utilisateurs en Ruby on Rails.",
    tags: ['Ruby on Rails', 'PostgreSQL', 'SCSS', 'Devise'],
    color: '#e8b4bc',
    year: '2024',
    featured: true,
  },
  Onstage: {
    title: 'Onstage',
    description: "Application de découverte et de gestion d'événements live. Les utilisateurs peuvent créer leurs événements, parcourir les spectacles à venir et gérer leurs inscriptions. Projet fil rouge du bootcamp Le Wagon.",
    tags: ['Ruby on Rails', 'JavaScript', 'Stimulus', 'PostgreSQL'],
    color: '#8fb3e8',
    year: '2024',
    featured: true,
  },
  Enchere: {
    title: 'BideHub',
    description: "Site d'enchères en ligne développé en Java Spring Boot avec une base de données SQLServer. Gestion des lots, système de mise en temps réel et espace utilisateur sécurisé.",
    tags: ['Java', 'Spring Boot', 'SQLServer'],
    color: '#c8a96e',
    year: '2023',
    featured: true,
  },
  Event: {
    title: 'CleanSkin',
    description: "Application d'accompagnement skincare intégrant l'IA pour l'analyse de peau. Frontend React, backend Python, base de données Postgres — avec automatisation et pipeline d'analyse dermatologique.",
    tags: ['React', 'Python', 'PostgreSQL', 'IA'],
    color: '#7ec8a0',
    year: '2025',
    featured: true,
  },
  CV_kim: {
    title: 'CV Kim',
    description: "Portfolio personnel développé en React avec Vite et Framer Motion. Animations fluides, curseur custom, routing SPA et données chargées depuis l'API GitHub. Déployé en production sur Vercel.",
    tags: ['React', 'Vite', 'Framer Motion', 'Vercel'],
    color: '#b8a0e8',
    year: '2026',
    featured: true,
  },
  HackatonSupDeVinci: {
    title: 'ClimatFrance',
    description: "Dashboard réalisé en 48h lors d'un hackaton national. Visualisation des données climatiques françaises sur Streamlit pour sensibiliser les citoyens au réchauffement climatique.",
    tags: ['Python', 'Streamlit', 'Data Viz', 'Pandas'],
    color: '#e8c87e',
    year: '2026',
    featured: false,
  },
}

const ORDER = ['barbienb', 'Onstage', 'Enchere', 'Event', 'CV_Kim','HackatonSupDeVinci']

export function useGitHubRepos(username = 'kimiis') {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=50`)
        if (!res.ok) throw new Error('GitHub API error')
        const data = await res.json()

        // Merge GitHub data with our enrichment, ordered manually
        const enriched = ORDER.map(name => {
          const repo = data.find(r => r.name === name) || {}
          const meta = PROJECT_META[name] || {}
          return {
            id: repo.id || name,
            name: repo.name || name,
            title: meta.title || repo.name,
            description: meta.description || repo.description || '',
            tags: meta.tags || [],
            color: meta.color || '#c8b89a',
            year: meta.year || '2023',
            featured: meta.featured || false,
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            language: repo.language || '',
            url: repo.html_url || `https://github.com/${username}/${name}`,
            updatedAt: repo.updated_at || null,
          }
        })

        setRepos(enriched)
      } catch (err) {
        // Fallback to static data if API fails
        const fallback = ORDER.map(name => {
          const meta = PROJECT_META[name]
          return {
            id: name,
            name,
            ...meta,
            stars: 0,
            forks: 0,
            language: meta.tags[0] || '',
            url: `https://github.com/${username}/${name}`,
          }
        })
        setRepos(fallback)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  return { repos, loading, error }
}
