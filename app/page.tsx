import { Projects } from 'app/components/projects'
import { TerminalWindow } from 'app/components/terminal-window'
import { TerminalCommand } from 'app/components/terminal-command'
import { getProjects } from 'app/work/utils'

export default function Page() {
  const projects = getProjects()
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-terminal-blue">
        Andrew Le is a software engineer and security engineer.
      </h1>
      <p className="mb-4 text-terminal-text">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="mb-8">
        <h2 className="text-sm font-medium text-terminal-cyan mb-3">
          Experience and Education
        </h2>
        <TerminalWindow title="experience">
          <TerminalCommand 
            command="whoami" 
            type="info" 
            animateTyping={true}
            typingSpeed={80}
          />
          <TerminalCommand
            command=""
            output="Software Engineer & Security Engineer"
            showPrompt={false}
            type="success"
          />
          <TerminalCommand command="" output="" showPrompt={false} />
          <TerminalCommand 
            command="cat ~/.bash_history | grep -i 'worked\|company\|education'" 
            type="command"
            animateTyping={true}
            typingSpeed={30}
          />
          <TerminalCommand
            command=""
            output="ls -la companies/"
            showPrompt={false}
            type="output"
          />
          <TerminalCommand 
            command="ls -la companies/" 
            type="command"
            expandable={true}
            animateTyping={true}
            typingSpeed={40}
          />
          <TerminalCommand
            command=""
            output={
              <div className="terminal-output">
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center hover:border-terminal-cyan transition-colors">
                    <span className="text-xs text-terminal-text opacity-70">Logo</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center hover:border-terminal-cyan transition-colors">
                    <span className="text-xs text-terminal-text opacity-70">Logo</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center hover:border-terminal-cyan transition-colors">
                    <span className="text-xs text-terminal-text opacity-70">Logo</span>
                  </div>
                </div>
              </div>
            }
            showPrompt={false}
            type="output"
          />
          <TerminalCommand command="" output="" showPrompt={false} />
          <TerminalCommand 
            command="cat companies/company-a.txt" 
            type="command"
            expandable={true}
            animateTyping={true}
            typingSpeed={40}
          />
          <TerminalCommand
            command=""
            output={
              <div className="terminal-output">
                <div className="terminal-text text-terminal-amber mb-1">
                  Software Engineer
                </div>
                <div className="terminal-text text-neutral-400 text-xs">
                  2020 - 2023
                </div>
                <div className="terminal-text text-neutral-300 mt-2">
                  Backend systems, API development, security practices
                </div>
              </div>
            }
            showPrompt={false}
            type="output"
          />
        </TerminalWindow>
      </div>
      <div id="work" className="my-8">
        <h2 className="text-sm font-medium text-terminal-cyan mb-3">
          Projects
        </h2>
        <Projects projects={projects} />
      </div>
    </section>
  )
}
