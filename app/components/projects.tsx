import Link from 'next/link'
import { formatDate } from 'app/work/date-utils'

type Project = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
  }
}

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  let allProjects = projects

  return (
    <div>
      {allProjects
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((project) => (
          <div key={project.slug} className="terminal-line mb-4">
            <div className="terminal-output">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-terminal-amber font-medium mb-1">
                    {project.metadata.title}
                  </div>
                  <div className="text-terminal-text text-xs opacity-70 tabular-nums mb-2">
                    {formatDate(project.metadata.publishedAt, false)}
                  </div>
                  {project.metadata.summary && (
                    <div className="text-terminal-text text-sm mb-2 opacity-80">
                      {project.metadata.summary}
                    </div>
                  )}
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-block text-sm text-terminal-text hover:text-terminal-blue transition-colors underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
