'use client'

import { ReactNode } from 'react'

interface TerminalShellProps {
  children: ReactNode
  prompt?: string
  showPrompt?: boolean
}

export function TerminalShell({ children, prompt = '$', showPrompt = true }: TerminalShellProps) {
  return (
    <div className="terminal-shell min-h-screen">
      <div className="terminal-content-wrapper">
        {showPrompt && (
          <div className="terminal-prompt-line mb-2">
            <span className="terminal-prompt text-terminal-green">{prompt}</span>
            <span className="terminal-text text-terminal-text">Welcome to my portfolio</span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
