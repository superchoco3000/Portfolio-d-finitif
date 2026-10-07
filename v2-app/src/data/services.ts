export type Lang = 'fr' | 'es' | 'en'

export interface ServiceText {
  title: string
  subtitle: string
  shortDescription: string
  fullSalesCopy: string
  features: string[]
}

export interface ServiceData {
  id: string
  icon: string // Bootstrap icon class
  imagePath: string
  examples: string[]
  i18n: Record<Lang, ServiceText>
}

export const services: ServiceData[] = [
  {
    id: 'platforms',
    icon: 'bi-cloud-check',
    imagePath: '/assets/img/portfolio/titelli.png',
    examples: ['titelli-mongo-pro'],
    i18n: {
      fr: {
        title: 'Plateformes',
        subtitle: 'SaaS',
        shortDescription: 'Application CRM sur mesure avec base de données MongoDB.',
        fullSalesCopy: 'Vous avez besoin d\'un système centralisé pour gérer votre entreprise ? Je développe des plateformes SaaS et des CRM sur mesure, robustes et sécurisés, parfaitement adaptés à vos processus internes.',
        features: [
          'Architecture évolutive et sécurisée (Node.js, MongoDB)',
          'Interfaces d\'administration complètes et intuitives',
          'Gestion des utilisateurs et rôles avancée',
          'Intégration d\'APIs tierces et automatisation',
          'Déploiement sur le Cloud avec haute disponibilité'
        ]
      },
      es: {
        title: 'Plataformas',
        subtitle: 'SaaS',
        shortDescription: 'Aplicación CRM a medida con base de datos MongoDB.',
        fullSalesCopy: '¿Necesitas un sistema centralizado para gestionar tu negocio? Desarrollo plataformas SaaS y CRMs a medida, robustos y seguros, perfectamente adaptados a tus procesos internos.',
        features: [
          'Arquitectura escalable y segura (Node.js, MongoDB)',
          'Interfaces de administración completas e intuitivas',
          'Gestión de usuarios y roles avanzada',
          'Integración de APIs de terceros y automatización',
          'Despliegue en la nube con alta disponibilidad'
        ]
      },
      en: {
        title: 'Platforms',
        subtitle: 'SaaS',
        shortDescription: 'Bespoke CRM web application with MongoDB database.',
        fullSalesCopy: 'Do you need a centralized system to manage your business? I develop robust and secure bespoke SaaS platforms and CRMs, perfectly tailored to your internal processes.',
        features: [
          'Scalable and secure architecture (Node.js, MongoDB)',
          'Comprehensive and intuitive administration interfaces',
          'Advanced user and role management',
          'Third-party API integration and automation',
          'Cloud deployment with high availability'
        ]
      }
    }
  },
  {
    id: 'creation',
    icon: 'bi-globe',
    imagePath: '/assets/img/portfolio/herotroisplats.jpg',
    examples: ['hivan-kebab', 'annapurna-yoga'],
    i18n: {
      fr: {
        title: 'Création',
        subtitle: 'Web',
        shortDescription: 'Site vitrine pour un restaurant ou commerce local.',
        fullSalesCopy: 'Votre présence en ligne est la vitrine de votre activité. Je conçois des sites web modernes, rapides et optimisés pour le référencement (SEO) qui transforment vos visiteurs en clients.',
        features: [
          'Design unique, épuré et adapté à votre image de marque',
          'Navigation fluide et expérience utilisateur (UX) optimale',
          'Entièrement responsive (parfait sur mobile et tablette)',
          'Optimisation SEO technique pour Google',
          'Hébergement sécurisé et configuration HTTPS'
        ]
      },
      es: {
        title: 'Creación',
        subtitle: 'Web',
        shortDescription: 'Sitio vitrina para restaurante o comercio local.',
        fullSalesCopy: 'Tu presencia en línea es el escaparate de tu negocio. Diseño sitios web modernos, rápidos y optimizados para SEO que transforman a tus visitantes en clientes.',
        features: [
          'Diseño único, limpio y adaptado a tu imagen de marca',
          'Navegación fluida y experiencia de usuario (UX) óptima',
          'Totalmente responsivo (perfecto en móvil y tablet)',
          'Optimización SEO técnica para Google',
          'Alojamiento seguro y configuración HTTPS'
        ]
      },
      en: {
        title: 'Creation',
        subtitle: 'Web',
        shortDescription: 'Showcase website for a restaurant or local business.',
        fullSalesCopy: 'Your online presence is your business storefront. I design modern, fast, and SEO-optimized websites that turn your visitors into customers.',
        features: [
          'Unique, clean design adapted to your brand image',
          'Smooth navigation and optimal user experience (UX)',
          'Fully responsive (perfect on mobile and tablet)',
          'Technical SEO optimization for Google',
          'Secure hosting and HTTPS configuration'
        ]
      }
    }
  },
  {
    id: 'applications',
    icon: 'bi-phone',
    imagePath: '/assets/img/portfolio/radar.png',
    examples: ['radar-chf-eur'],
    i18n: {
      fr: {
        title: 'Applications',
        subtitle: 'Web & Mobile',
        shortDescription: 'Plateforme de suivi en temps réel et utilitaires.',
        fullSalesCopy: 'Transformez vos idées en applications interactives et performantes. Que ce soit pour un outil de suivi financier en temps réel ou une app grand public, je crée des solutions techniques solides.',
        features: [
          'Développement React / React Native ultra-réactif',
          'Traitement de données en temps réel et WebSockets',
          'Architecture frontend moderne (State management, Hooks)',
          'Design System cohérent et animations fluides (Framer Motion)',
          'Tests de performance et d\'accessibilité'
        ]
      },
      es: {
        title: 'Aplicaciones',
        subtitle: 'Web & Mobile',
        shortDescription: 'Plataforma de seguimiento en tiempo real y utilidades.',
        fullSalesCopy: 'Transforma tus ideas en aplicaciones interactivas y de alto rendimiento. Ya sea una herramienta de seguimiento financiero en tiempo real o una app de consumo, creo soluciones técnicas sólidas.',
        features: [
          'Desarrollo React / React Native ultra-reactivo',
          'Procesamiento de datos en tiempo real y WebSockets',
          'Arquitectura frontend moderna (State management, Hooks)',
          'Design System coherente y animaciones fluidas (Framer Motion)',
          'Pruebas de rendimiento y accesibilidad'
        ]
      },
      en: {
        title: 'Applications',
        subtitle: 'Web & Mobile',
        shortDescription: 'Real-time tracking platform and utilities.',
        fullSalesCopy: 'Transform your ideas into interactive, high-performance applications. Whether it\'s a real-time financial tracking tool or a consumer app, I build solid technical solutions.',
        features: [
          'Ultra-responsive React / React Native development',
          'Real-time data processing and WebSockets',
          'Modern frontend architecture (State management, Hooks)',
          'Coherent Design System and smooth animations (Framer Motion)',
          'Performance and accessibility testing'
        ]
      }
    }
  },
  {
    id: 'code',
    icon: 'bi-code-slash',
    imagePath: '/assets/img/portfolio/analyse.jpeg',
    examples: ['casse-briques'],
    i18n: {
      fr: {
        title: 'Code',
        subtitle: 'Sur Mesure',
        shortDescription: 'Création d\'outils, algorithmes personnalisés.',
        fullSalesCopy: 'Besoin d\'un script Python pour automatiser une tâche, d\'un algorithme d\'analyse de texte ou d\'un mini-jeu en JavaScript ? Je code des solutions sur mesure pour vos besoins les plus spécifiques.',
        features: [
          'Scripts d\'automatisation et de scraping (Python, JS)',
          'Développement d\'algorithmes complexes et traitement de données',
          'Création de mini-jeux interactifs en JavaScript pur',
          'Refactoring de code existant et optimisation de performance',
          'Documentation technique claire et code maintenable'
        ]
      },
      es: {
        title: 'Code',
        subtitle: 'A Medida',
        shortDescription: 'Creación de herramientas, algoritmos personalizados.',
        fullSalesCopy: '¿Necesitas un script Python para automatizar una tarea, un algoritmo de análisis de texto o un minijuego en JavaScript? Codifico soluciones a medida para tus necesidades más específicas.',
        features: [
          'Scripts de automatización y scraping (Python, JS)',
          'Desarrollo de algoritmos complejos y procesamiento de datos',
          'Creación de minijuegos interactivos en JavaScript puro',
          'Refactorización de código existente y optimización de rendimiento',
          'Documentación técnica clara y código mantenible'
        ]
      },
      en: {
        title: 'Code',
        subtitle: 'Custom',
        shortDescription: 'Creation of tools, personalized algorithms.',
        fullSalesCopy: 'Need a Python script to automate a task, a text analysis algorithm, or a JavaScript mini-game? I code bespoke solutions for your most specific needs.',
        features: [
          'Automation and scraping scripts (Python, JS)',
          'Complex algorithm development and data processing',
          'Creation of interactive mini-games in pure JavaScript',
          'Existing code refactoring and performance optimization',
          'Clear technical documentation and maintainable code'
        ]
      }
    }
  }
]

export function getServiceText(service: ServiceData, lang: Lang): ServiceText {
  return service.i18n[lang] ?? service.i18n['fr']
}
