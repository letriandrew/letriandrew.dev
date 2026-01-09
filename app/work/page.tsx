import { Projects } from 'app/components/projects'
import { getProjects } from 'app/work/utils'

export const metadata = {
  title: 'Work',
  description: 'My projects and work.',
}

export default function Page() {
  const projects = getProjects()
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-terminal-blue">My Work</h1>
      <div className="my-8">
        <Projects projects={projects} />
      </div>
    </section>
  )
}
