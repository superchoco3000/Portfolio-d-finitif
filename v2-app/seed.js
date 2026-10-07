import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dazqgptejpzlawfcnfyf.supabase.co'
const supabaseAnonKey = 'sb_publishable_r2t6bnStycybok5wXEZERA_Lgx7qURp'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const projects = [
  {
    name: 'Radar CHF/EUR',
    slug: 'radar-chf-eur',
    category: 'active',
    is_legacy: false,
    is_featured: true,
    year: '2025',
    descriptions: {
      fr: 'Moniteur financier en temps réel via des scrapers personnalisés pour des décisions rapides.',
      es: 'Monitor financiero en tiempo real mediante scrapers personalizados para decisiones rápidas.',
      en: 'Real-time financial monitor via custom scrapers for quick decisions.'
    },
    stack: ['Python', 'Scrapers', 'API'],
    image_url: '/assets/img/portfolio/radar.png',
    live_url: 'https://radar-chf-eur.vercel.app/',
    github_url: ''
  },
  {
    name: 'Titelli Mongo Pro',
    slug: 'titelli-mongo-pro',
    category: 'active',
    is_legacy: false,
    is_featured: true,
    year: '2025',
    descriptions: {
      fr: 'CRM architecturé sur MongoDB pour l\'automatisation des opérations commerciales à grande échelle.',
      es: 'CRM arquitecturado sobre MongoDB para automatización de operaciones de negocio a gran escala.',
      en: 'CRM architected on MongoDB for large-scale business operations automation.'
    },
    stack: ['MongoDB', 'CRM', 'Node.js'],
    image_url: '/assets/img/portfolio/titelli.png',
    live_url: 'https://youseea.com/',
    github_url: ''
  },
  {
    name: 'Hivan Kebab',
    slug: 'hivan-kebab',
    category: 'active',
    is_legacy: false,
    is_featured: false,
    year: '2024',
    descriptions: {
      fr: 'Landing page à fort taux de conversion axée sur l\'UX/UI pour la visibilité locale.',
      es: 'Landing page de alta conversión enfocada en UX/UI para visibilidad local.',
      en: 'High-conversion landing page focused on UX/UI for local visibility.'
    },
    stack: ['React', 'UI/UX'],
    image_url: '/assets/img/portfolio/box1.jpeg',
    live_url: 'http://hivan-kebab.fr',
    github_url: ''
  },
  {
    name: 'Annapurna Yoga',
    slug: 'annapurna-yoga',
    category: 'history',
    is_legacy: false,
    is_featured: false,
    year: '2024',
    descriptions: {
      fr: 'Expérience web immersive avec galeries intégrées et design apaisant.',
      es: 'Experiencia web inmersiva con galerías integradas y diseño apacible.',
      en: 'Immersive web experience with integrated galleries and peaceful design.'
    },
    stack: ['React', 'UI/UX'],
    image_url: '/assets/img/portfolio/logotipoAnnapurna.jpg',
    live_url: 'https://tonmoment.wordpress.com/',
    github_url: ''
  },
  {
    name: 'clair et net',
    slug: 'clair-et-net',
    category: 'active',
    is_legacy: false,
    is_featured: false,
    year: '2024',
    descriptions: {
      fr: 'Projet Clair et Net - Description en attente',
      es: 'Proyecto Clair et Net - Descripción pendiente',
      en: 'Clair et Net Project - Description pending'
    },
    stack: [],
    image_url: '',
    live_url: '',
    github_url: ''
  }
]

async function seed() {
  console.log('Insertando proyectos...')
  const { data, error } = await supabase.from('projects').insert(projects)
  
  if (error) {
    console.error('Error insertando:', error)
  } else {
    console.log('Insertados con éxito.')
    const { data: verify, error: vError } = await supabase.from('projects').select('*')
    if (vError) {
      console.error('Error al verificar:', vError)
    } else {
      console.log(`Se encontraron ${verify.length} registros en la tabla.`)
    }
  }
}

seed()
