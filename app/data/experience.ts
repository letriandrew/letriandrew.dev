export interface Experience {
  company: string
  role: string
  period: string
  description: string
  logo?: string
  slug?: string
  details?: {
    bullets?: string[]
    images?: { src: string; alt: string }[]
    links?: { text: string; url: string }[]
    content?: string
  }
}

export const experience: Experience[] = [
  {
    company: 'Panasonic Avionics Corporation',
    role: 'Software Engineer Intern',
    period: 'Jun 2025 - Dec 2025',
    description: 'Backend systems, API development, security practices',
    logo: '/images/panasonic.jpeg',
  },

  {
    company: 'Panasonic Avionics Corporation',
    role: 'Software Test Engineer',
    period: 'Nov 2023 - May 2025',
    description: 'Backend systems, API development, security practices',
    logo: '/images/panasonic.jpeg',
  },

  {
    company: 'Trees.app',
    role: 'Software Engineer Intern',
    period: 'Jun 2022 - Sept 2022',
    description: 'Backend systems, API development, security practices',
    logo: '/images/trees.jpeg',
  },
  // Add more experiences here - just add new objects to this array
]

export const education: Experience[] = [
  // Add education entries here
  // {
  //   company: 'University Name',
  //   role: 'Degree',
  //   period: 'Year',
  //   description: 'Details',
  // },
]
