import Link from 'next/link'
import { Experience } from 'app/data/experience'

interface ExperienceListProps {
  experiences: Experience[]
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <>
      {experiences.map((exp, index) => {
        // Generate slug from company and role if not provided
        const slug = exp.slug || `${exp.company.toLowerCase().replace(/\s+/g, '-')}-${exp.role.toLowerCase().replace(/\s+/g, '-')}`
        
        return (
          <div key={index} className="mb-4 pb-4 border-b border-terminal-border-subtle last:border-0 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#2d2d2d] border border-[#404040] flex items-center justify-center hover:border-terminal-blue transition-colors flex-shrink-0">
              {exp.logo ? (
                <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain rounded-lg" />
              ) : (
                <span className="text-xs text-terminal-text opacity-70">{exp.company.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="text-terminal-amber font-medium mb-1">{exp.role}</div>
              <div className="text-terminal-text text-sm mb-1">{exp.company}</div>
              <div className="text-terminal-text text-xs opacity-70 mb-2">{exp.period}</div>
              <div className="text-terminal-text text-sm mb-2">{exp.description}</div>
              <Link
                href={`/experience/${slug}`}
                className="inline-block text-sm text-terminal-text hover:text-terminal-blue transition-colors underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        )
      })}
    </>
  )
}
