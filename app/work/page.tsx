import { Projects } from 'app/components/projects'
import { getProjects } from 'app/work/utils'

export const metadata = {
  title: 'Work',
  description: 'My projects and work.',
}

export default function Page() {
  const projects = getProjects()
  
  return (
    <section className="terminal-section">
      <div className="terminal-line mb-6">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cd work/</span>
      </div>
      <div className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">ls -la projects/</span>
      </div>
      <div className="terminal-output">
        <Projects projects={projects} />
      </div>
      <div className="terminal-line mt-8">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-cursor ml-2"></span>
      </div>
    </section>
  )
}
