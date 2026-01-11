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
          I specialize in building reliable, scalable software in high-stakes environments where performance and maintainability are non-negotiable. At Panasonic Avionics, I designed and implemented a Python-based automation framework that supported large-scale, deployed avionics systems in CI/CD fashion. These systems improved QA reliability across hundreds of airline configurations while significantly reducing engineering effort and time to resolution.
        </p>
        <p className="mb-4 text-terminal-text leading-relaxed">
          My experience extends beyond writing code. I've worked directly with production systems, performing deep, cross-layer debugging across software, hardware, and networks. This hands-on exposure has fundamentally shaped how I design backend services and automation, with an emphasis on resilience, observability, and security from the ground up.
        </p>
        <p className="mb-4 text-terminal-text leading-relaxed">
          I'm seeking backend and security engineering roles where I can build systems that are robust by design, automate away operational pain, and deliver real-world impact at scale.
        </p>
      </div>

      <div className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat education.txt</span>
      </div>
      <div className="terminal-output mb-8">
        <ExperienceList experiences={education} />
      </div>

      <div id="work" className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat experience.txt</span>
      </div>
      <div className="terminal-output mb-8">
        <ExperienceList experiences={experience} />
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
