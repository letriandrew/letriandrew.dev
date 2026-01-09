'use client'

import Link from 'next/link'
import { formatDate } from 'app/work/date-utils'
import { TerminalWindow } from './terminal-window'
import { TerminalCommand } from './terminal-command'

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
    <TerminalWindow title="projects">
      <TerminalCommand 
        command="ls -la projects/" 
        type="info"
        animateTyping={true}
        typingSpeed={60}
      />
      <TerminalCommand
        command=""
        output={`Found ${allProjects.length} project(s)`}
        showPrompt={false}
        type="success"
      />
      {allProjects
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((project, index) => (
          <div key={project.slug} className="terminal-spacing-md">
            <TerminalCommand
              command={`cat projects/${project.slug}.mdx`}
              type="command"
              expandable={true}
              animateTyping={index === 0}
              typingSpeed={40}
            />
            <TerminalCommand
              command=""
              output={
                <div className="terminal-output">
                  <div className="terminal-text text-terminal-amber mb-1">
                    {project.metadata.title}
                  </div>
                  <div className="terminal-text text-neutral-400 text-xs mb-2">
                    {formatDate(project.metadata.publishedAt, false)}
                  </div>
                  {project.metadata.summary && (
                    <div className="terminal-text text-neutral-300 mb-2">
                      {project.metadata.summary}
                    </div>
                  )}
                  <Link
                    href={`/work/${project.slug}`}
                    className="terminal-text text-terminal-cyan hover:text-terminal-blue transition-colors underline inline-block"
                  >
                    Read more →
                  </Link>
                </div>
              }
              showPrompt={false}
              type="output"
            />
            {index < allProjects.length - 1 && (
              <TerminalCommand command="" output="" showPrompt={false} />
            )}
          </div>
        ))}
    </TerminalWindow>
  )
}
