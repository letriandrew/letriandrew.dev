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
    description: 'Built and scaled Python-based test automation for avionics systems across 300+ airline configurations, improving QA reliability and runtime efficiency. Accelerated CI/CD pipelines with Dockerized end-to-end testing and reusable libraries, and implemented AI-assisted test generation to reduce manual effort and speed delivery.',
    logo: '/images/panasonic.jpeg',
    details: {
      bullets: [
        'Built and scaled Python-based test automation for avionics systems across 300+ airline configurations, improving QA reliability and runtime efficiency.',
        'Accelerated CI/CD pipelines with Dockerized end-to-end testing and reusable libraries, and implemented AI-assisted test generation to reduce manual effort and speed delivery.',
      ],
    },
  },

  {
    company: 'Panasonic Avionics Corporation',
    role: 'Software Test Engineer',
    period: 'Nov 2023 - May 2025',
    description: 'Supported deployment and integration of $5M+ in in-flight entertainment systems across active aircraft for major airlines, ensuring reliability and compliance. Reduced issue resolution time through cross-layer debugging and automation, combining Linux, Bash scripting, and detailed incident analysis across hardware, software, and network systems.',
    logo: '/images/panasonic.jpeg',
  },

  {
    company: 'Trees.app',
    role: 'Software Engineer Intern',
    period: 'Jun 2022 - Sept 2022',
    description: 'Designed and implemented mobile app features using Flutter and Dart, translating user feedback into improved navigation, usability, and gamification. Optimized Python backend logic and algorithms, reducing runtime and improving overall system efficiency.',
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
