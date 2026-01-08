import Link from 'next/link'
import { formatDate, getProjects } from 'app/work/utils'

export function Projects() {
  let allProjects = getProjects()

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
          <div key={project.slug} className="flex flex-col space-y-1 mb-4">
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(project.metadata.publishedAt, false)}
              </p>
              <div className="flex-1">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight mb-1">
                  {project.metadata.title}
                </p>
                {project.metadata.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                    {project.metadata.summary}
                  </p>
                )}
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-block text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
