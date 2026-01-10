import { Projects } from 'app/components/projects'
import { getProjects } from 'app/work/utils'
import { experience, education } from 'app/data/experience'
import { FigletBanner } from 'app/components/figlet-banner'
import { InteractiveTerminal } from 'app/components/interactive-terminal'
import { ExperienceList } from 'app/components/experience-list'

export default function Page() {
  const projects = getProjects()
  
  return (
    <section className="terminal-section">
      <FigletBanner />
      <div className="terminal-line mb-6">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat about.txt</span>
      </div>
      <div className="terminal-output mb-8">
        <h1 className="mb-4 text-2xl font-semibold tracking-tighter text-terminal-amber">
          Andrew Le is a software engineer and security engineer.
        </h1>
        <p className="mb-4 text-terminal-text leading-relaxed">
          I'm a software engineer and data science graduate student with experience building scalable automation systems, production software, and data-driven tooling in regulated, high-reliability environments. My background spans test automation, systems integration, backend optimization, and full-stack development, with a strong emphasis on performance, maintainability, and real-world impact.
        </p>
        <p className="mb-4 text-terminal-text leading-relaxed">
          At Panasonic Avionics, I developed Python-based automation frameworks and CI/CD pipelines supporting large-scale avionics systems, reducing engineering effort and improving QA reliability across hundreds of airline configurations. I've also worked hands-on with deployed aircraft systems, performing cross-layer debugging across software, hardware, and networks, and delivering automation that accelerates issue resolution.
        </p>
        <p className="mb-4 text-terminal-text leading-relaxed">
          I'm currently pursuing an M.S. in Data Science and am seeking security engineering and backend engineering roles. My experience designing robust automation, operating distributed systems, and debugging across infrastructure layers directly supports building secure, reliable backend services and security-focused tooling. I'm particularly interested in application and systems security, backend architecture, and automation that improves reliability, observability, and resilience at scale.
        </p>
      </div>

      <div id="work" className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat experience.txt</span>
      </div>
      <div className="terminal-output mb-8">
        <ExperienceList experiences={experience} />
        {education.length > 0 && (
          <>
            <div className="text-terminal-text text-sm font-medium mt-6 mb-3">Education</div>
            {education.map((edu, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-terminal-border-subtle last:border-0">
                <div className="text-terminal-amber font-medium mb-1">{edu.role}</div>
                <div className="text-terminal-text text-sm mb-1">{edu.company}</div>
                <div className="text-terminal-text text-xs opacity-70 mb-2">{edu.period}</div>
                {edu.description && (
                  <div className="text-terminal-text text-sm">{edu.description}</div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat projects.txt</span>
      </div>
      <div className="terminal-output">
        <Projects projects={projects} />
      </div>
      
      <InteractiveTerminal experiences={experience} projects={projects} />
    </section>
  )
}
