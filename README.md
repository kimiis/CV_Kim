# Portfolio — Kim Isabelle

Portfolio personnel conçu pour présenter mes projets, mes compétences et me mettre en contact avec de futurs collaborateurs. Actuellement en Mastère Full Stack Data IA à Sup De Vinci (Nantes), je recherche une alternance (3 sem. entreprise / 1 sem. école).

## Stack

- **React 18** + **Vite** — rendu rapide, DX agréable
- **Framer Motion** — animations et transitions de pages
- **React Router v6** — navigation SPA avec transitions animées
- **GitHub API** — les projets sont chargés dynamiquement depuis mon profil GitHub et enrichis avec des métadonnées locales (description, tags, couleur)

## Structure du projet

```
src/
├── components/
│   ├── Cursor.jsx          # Curseur personnalisé avec effet spring
│   ├── Nav.jsx             # Barre de navigation + toggle dark/light
│   └── ScrollProgress.jsx  # Barre de progression au scroll
├── context/
│   └── ThemeContext.jsx    # Thème dark/light persisté en localStorage
├── hooks/
│   └── useGitHub.js        # Fetch GitHub API + fallback statique
├── pages/
│   ├── Home.jsx            # Page principale (Hero, Projets, About, Contact)
│   └── ProjectDetail.jsx   # Page détail d'un projet
├── styles/
│   └── globals.css         # Variables CSS, typographie, reset
└── App.jsx                 # Routing + providers
```

## Lancer le projet en local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

Le projet tourne sur `http://localhost:5173` par défaut.

## Fonctionnalités

**Hero animé** — les titres s'animent à l'entrée avec un effet slide-up, un texte parallaxe en arrière-plan suit le scroll.

**Liste de projets** — récupérée depuis l'API GitHub, enrichie localement avec titres, descriptions, tags et couleurs. Un fallback statique prend le relais si l'API est indisponible.

**Curseur custom** — deux cercles superposés avec effet spring. La taille et la couleur changent selon le contexte (lien, projet, zone neutre).

**Theme dark / light** — toggle disponible dans la nav, préférence sauvegardée en localStorage.

**Transitions de pages** — `AnimatePresence` de Framer Motion gère le fade entre les routes.

**Scroll progress** — fine barre en haut de page indiquant la progression de lecture.

## Projets mis en avant

| Nom             | Technologies | Année |
|-----------------|---|---|
| BarbieNB        | Ruby on Rails, PostgreSQL, Devise | 2024 |
| Onstage         | Ruby on Rails, Stimulus, JS | 2024 |
| BideHub         | Java, Spring Boot, SQLServer | 2023 |
| CleanSkin       | React, Python, PostgreSQL, IA | 2025 |
| Portfolio — Kim | React, Vite, Framer Motion | 2026 |
| ClimatFrance    | Python, Streamlit, Pandas | 2026 |

## Contact

- GitHub : [github.com/kimiis](https://github.com/kimiis)
- LinkedIn : [linkedin.com/in/isabelle-kim-6ab129235](https://www.linkedin.com/in/isabelle-kim-6ab129235/)
- Email : kimi.0208@outlook.fr