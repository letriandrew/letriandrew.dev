export interface Experience {
  company: string
  role: string
  period: string
  description: string
  logo?: string
  slug?: string
  skills?: string[]
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
    role: 'Software Engineer Intern - Automation',
    period: 'Jun 2025 - Dec 2025',
    description: 'Developed Python-based test automation frameworks and CI/CD pipelines supporting large-scale avionics systems.',
    logo: '/images/panasonic.jpeg',
    skills: ['Python', 'Selenium', 'Appium', 'Squish', 'Docker', 'GitLab CI', 'REST APIs'],
  },

  {
    company: 'Panasonic Avionics Corporation',
    role: 'Software Test Engineer',
    period: 'Nov 2023 - Feb 2025',
    description: 'Managed systems and infrastructure integration for in-flight entertainment systems deployed on active aircraft.',
    logo: '/images/panasonic.jpeg',
    skills: ['Bash', 'Linux', 'SSH', 'Jira', 'Network Programming'],
  },

  {
    company: 'Trees.app',
    role: 'Software Engineer Intern',
    period: 'Jun 2022 - Sept 2022',
    description: 'Designed mobile app interfaces and optimized backend systems using Flutter, Dart, and Python.',
    logo: '/images/trees.jpeg',
    skills: ['Flutter', 'Dart', 'Figma', 'Python'],
  },
  // Add more experiences here - just add new objects to this array
]

export const education: Experience[] = [
  {
    company: 'University of Colorado Boulder',
    role: 'M.S. Data Science',
    period: '2024 - 2026',
    description: '',
    logo: '/images/boulder.png',
  },
  {
    company: 'California State University San Marcos',
    role: 'B.S. Computer Science',
    period: '2018 - 2023',
    description: '',
    logo: '/images/san_marcos.png',
  },
]
