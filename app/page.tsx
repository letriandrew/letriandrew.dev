import { Projects } from 'app/components/projects'
import { getProjects } from 'app/work/utils'
import { experience, education } from 'app/data/experience'
import { FigletBanner } from 'app/components/figlet-banner'

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
          {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
          Vim's keystroke commands and tabs' flexibility for personal viewing
          preferences. This extends to my support for static typing, where its
          early error detection ensures cleaner code, and my preference for dark
          mode, which eases long coding sessions by reducing eye strain.`}
        </p>
      </div>

      <div id="work" className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat experience.txt</span>
      </div>
      <div className="terminal-output mb-8">
        {experience.map((exp, index) => (
          <div key={index} className="mb-4 pb-4 border-b border-terminal-border last:border-0 flex items-start gap-4">
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
              <div className="text-terminal-text text-sm">{exp.description}</div>
            </div>
          </div>
        ))}
        {education.length > 0 && (
          <>
            <div className="text-terminal-text text-sm font-medium mt-6 mb-3">Education</div>
            {education.map((edu, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-terminal-border last:border-0">
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
