import { Experience } from 'app/data/experience'

interface ExperienceListProps {
  experiences: Experience[]
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <>
      {experiences.map((exp, index) => (
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
            <div className="text-terminal-text text-sm mb-3">{exp.description}</div>
            
            {exp.details && (
              <div className="mt-3 space-y-3">
                {exp.details.bullets && exp.details.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-terminal-text text-sm ml-2">
                    {exp.details.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                
                {exp.details.images && exp.details.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {exp.details.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image.src}
                        alt={image.alt}
                        className="rounded-lg border border-terminal-border w-full"
                      />
                    ))}
                  </div>
                )}
                
                {exp.details.links && exp.details.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.details.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1 border border-terminal-blue text-terminal-blue rounded hover:bg-terminal-blue hover:text-white transition-colors text-xs"
                      >
                        {link.text} →
                      </a>
                    ))}
                  </div>
                )}
                
                {exp.details.content && (
                  <div className="text-terminal-text text-sm mt-3 whitespace-pre-wrap">
                    {exp.details.content}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
