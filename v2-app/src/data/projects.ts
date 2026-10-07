/**
 * MOTOR DE DATOS — PROYECTOS REALES
 * ─────────────────────────────────────────────────────────────────
 * Fuente única de verdad para la web.
 */

export type Lang = 'fr' | 'es' | 'en'
export type Category = 'web' | 'practice' | 'game' | 'python'

export interface ProjectText {
  title: string
  shortDescription: string
  longDescription: string
}

export interface Project {
  id: number
  slug: string
  category: Category
  portfolioSection: 'active' | 'history' | 'both'
  historyCategory: 'apps' | 'webs' | 'misc' | null
  isLegacy: boolean
  i18n: Record<Lang, ProjectText>
  stack: string[]
  images: {
    thumbnail: string
    preview: string
    gallery: string[]
  }
  links: {
    liveUrl: string | null
    githubUrl: string | null
  }
  meta: {
    year: number
    featured: boolean
  }
}

export const projects: Project[] = [
  // ────────────────────────────────────────────────────────────────
  // PROYECTOS ACTUALES (isLegacy: false)
  // ────────────────────────────────────────────────────────────────
  
  // 1. Radar CHF/EUR
  {
    id: 1,
    slug: 'radar-chf-eur',
    category: 'web',
    portfolioSection: 'both',
    historyCategory: 'apps',
    isLegacy: false,
    i18n: {
      fr: { title: 'Radar CHF/EUR', shortDescription: 'Suivi conversion', longDescription: 'Moniteur financier en temps réel via des scrapers personnalisés pour des décisions rapides.' },
      es: { title: 'Radar CHF/EUR', shortDescription: 'Seguimiento divisa', longDescription: 'Monitor financiero en tiempo real mediante scrapers personalizados para decisiones rápidas.' },
      en: { title: 'Radar CHF/EUR', shortDescription: 'Currency tracking', longDescription: 'Real-time financial monitor via custom scrapers for quick decisions.' }
    },
    stack: ['Python', 'Scrapers', 'API'],
    images: { thumbnail: '/assets/img/portfolio/radar.png', preview: '/assets/img/portfolio/radar.png', gallery: [] },
    links: { liveUrl: 'https://radar-chf-eur.vercel.app/', githubUrl: null },
    meta: { year: 2025, featured: true }
  },

  // 2. Titelli Mongo Pro
  {
    id: 2,
    slug: 'titelli-mongo-pro',
    category: 'web',
    portfolioSection: 'active',
    historyCategory: null,
    isLegacy: false,
    i18n: {
      fr: { title: 'Titelli Mongo Pro', shortDescription: 'CRM Web', longDescription: 'CRM architecturé sur MongoDB pour l\'automatisation des opérations commerciales à grande échelle.' },
      es: { title: 'Titelli Mongo Pro', shortDescription: 'CRM Web', longDescription: 'CRM arquitecturado sobre MongoDB para automatización de operaciones de negocio a gran escala.' },
      en: { title: 'Titelli Mongo Pro', shortDescription: 'Web CRM', longDescription: 'CRM architected on MongoDB for large-scale business operations automation.' }
    },
    stack: ['MongoDB', 'CRM', 'Node.js'],
    images: { thumbnail: '/assets/img/portfolio/titelli.png', preview: '/assets/img/portfolio/titelli.png', gallery: [] },
    links: { liveUrl: 'https://youseea.com/', githubUrl: null },
    meta: { year: 2025, featured: true }
  },

  // 3. Hivan Kebab
  {
    id: 3,
    slug: 'hivan-kebab',
    category: 'web',
    portfolioSection: 'active',
    historyCategory: null,
    isLegacy: false,
    i18n: {
      fr: { title: 'Hivan Kebab', shortDescription: 'Fast-food Turc', longDescription: 'Landing page à fort taux de conversion axée sur l\'UX/UI pour la visibilité locale.' },
      es: { title: 'Hivan Kebab', shortDescription: 'Fast-food Turco', longDescription: 'Landing page de alta conversión enfocada en UX/UI para visibilidad local.' },
      en: { title: 'Hivan Kebab', shortDescription: 'Turkish Fast-food', longDescription: 'High-conversion landing page focused on UX/UI for local visibility.' }
    },
    stack: ['React', 'UI/UX'],
    images: { thumbnail: '/assets/img/portfolio/box1.jpeg', preview: '/assets/img/portfolio/herotroisplats.jpg', gallery: [] },
    links: { liveUrl: 'http://hivan-kebab.fr', githubUrl: null },
    meta: { year: 2024, featured: false }
  },

  // 4. Annapurna Yoga
  {
    id: 4,
    slug: 'annapurna-yoga',
    category: 'web',
    portfolioSection: 'history',
    historyCategory: 'webs',
    isLegacy: false,
    i18n: {
      fr: { title: 'Annapurna Yoga', shortDescription: 'Site Bien-être', longDescription: 'Expérience web immersive avec galeries intégrées et design apaisant.' },
      es: { title: 'Annapurna Yoga', shortDescription: 'Sitio Bienestar', longDescription: 'Experiencia web inmersiva con galerías integradas y diseño apacible.' },
      en: { title: 'Annapurna Yoga', shortDescription: 'Wellness Site', longDescription: 'Immersive web experience with integrated galleries and peaceful design.' }
    },
    stack: ['React', 'UI/UX'],
    images: { thumbnail: '/assets/img/portfolio/logotipoAnnapurna.jpg', preview: '/assets/img/portfolio/paja3.jpeg', gallery: [] },
    links: { liveUrl: 'https://tonmoment.wordpress.com/', githubUrl: null },
    meta: { year: 2024, featured: false }
  },


  // 7. Casse Briques
  {
    id: 7,
    slug: 'casse-briques',
    category: 'game',
    portfolioSection: 'history',
    historyCategory: 'misc',
    isLegacy: false,
    i18n: {
      fr: { title: 'Casse Briques', shortDescription: 'Petit Jeu', longDescription: 'Jeu classique de casse-briques avec logique de collisions.' },
      es: { title: 'Rompe Ladrillos', shortDescription: 'Juego', longDescription: 'Juego clásico de ruptura de bloques con lógica de colisiones.' },
      en: { title: 'Brick Breaker', shortDescription: 'Game', longDescription: 'Classic brick breaker game with collision logic.' }
    },
    stack: ['JavaScript', 'Canvas'],
    images: { thumbnail: '/assets/img/portfolio/cassebrique.jpg', preview: '/assets/img/portfolio/gameboy.gif', gallery: [] },
    links: { liveUrl: 'https://superchoco3000.github.io/mini-jeu-pong/', githubUrl: 'https://github.com/superchoco3000' },
    meta: { year: 2025, featured: false }
  }
];

export function filterProjects(category: Category | '*' = '*'): Project[] {
  if (category === '*') return projects
  return projects.filter((p) => p.category === category)
}

export function getProjectText(project: Project, lang: Lang): ProjectText {
  return project.i18n[lang] ?? project.i18n['fr']
}
