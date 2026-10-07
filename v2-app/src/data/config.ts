export type Lang = 'fr' | 'es' | 'en'

export interface ProfileBio {
  heading: string
  p1: string
  p2: string
}

export interface StackItem {
  label: string
  value: string
}

export interface ProfileData {
  bio: Record<Lang, ProfileBio>
  stack: Record<Lang, StackItem[]>
}

export const profileData: ProfileData = {
  bio: {
    en: {
      heading: "Full-Stack SaaS Builder",
      p1: "Self-taught developer & student at IUT Lyon 1 (BUT Informatique).",
      p2: "I specialize in turning complex requirements into scalable SaaS solutions. From high-performance scrapers to custom CRMs and cloud-native setups (Oracle, Supabase), I build systems that work."
    },
    fr: {
      heading: "Développeur Full-Stack & SaaS Builder",
      p1: "Autodidacte et étudiant au BUT Informatique (IUT Lyon 1).",
      p2: "Je me spécialise dans la transformation d'idées complexes en solutions SaaS évolutives. Des scrapers haute performance aux CRM sur-mesure et infrastructures cloud (Oracle, Supabase), je conçois des systèmes opérationnels."
    },
    es: {
      heading: "Arquitecto SaaS Full-Stack",
      p1: "Desarrollador autodidacta y estudiante del BUT Informatique (IUT Lyon 1).",
      p2: "Especialista en transformar requisitos complejos en soluciones SaaS escalables. Desde scrapers de alto rendimiento hasta CRMs a medida e infraestructura cloud (Oracle, Supabase), construyo sistemas que funcionan."
    }
  },
  stack: {
    en: [
      { label: "Core Engineering", value: "React, TypeScript, Python (FastAPI/Scrapers), Node.js" },
      { label: "Data & Cloud", value: "MongoDB, Supabase (PostgreSQL), Oracle Cloud" },
      { label: "Automation/SaaS", value: "CRM Architecture, International API Integration, Workflow Automation" }
    ],
    fr: [
      { label: "Core Engineering", value: "React, TypeScript, Python (FastAPI/Scrapers), Node.js" },
      { label: "Data & Cloud", value: "MongoDB, Supabase (PostgreSQL), Oracle Cloud" },
      { label: "Automation/SaaS", value: "Architecture CRM, Intégration d'APIs internationales, Automatisation des flux de travail" }
    ],
    es: [
      { label: "Core Engineering", value: "React, TypeScript, Python (FastAPI/Scrapers), Node.js" },
      { label: "Data & Cloud", value: "MongoDB, Supabase (PostgreSQL), Oracle Cloud" },
      { label: "Automation/SaaS", value: "Arquitectura CRM, Integración de APIs internacionales, Automatización de flujos de trabajo" }
    ]
  }
}
