export interface Experience {
  company: string
  role: string
  period: string
  description: string
  logo?: string
}

export const experience: Experience[] = [
  {
    company: 'Company A',
    role: 'Software Engineer',
    period: '2020 - 2023',
    description: 'Backend systems, API development, security practices',
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
