'use client'

import { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
  className?: string
  prompt?: string
}

export function TerminalWindow({
  title = 'terminal',
  children,
  className = '',
  prompt = '$',
}: TerminalWindowProps) {
  return (
    <div
      className={`terminal-window rounded-lg overflow-hidden ${className}`}
    >
      {/* Windows Style Header Bar */}
      <div className="terminal-header flex items-center justify-between px-3 py-1.5">
        {/* Terminal Title */}
        <div className="flex-1">
          <span className="terminal-text text-xs text-white">
            {title}
          </span>
        </div>
        {/* Window Controls - Windows style on the right */}
        <div className="flex items-center gap-0.5">
          <button className="terminal-windows-button terminal-windows-minimize w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <span className="leading-none text-xs">−</span>
          </button>
          <button className="terminal-windows-button terminal-windows-maximize w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <span className="leading-none text-[10px]">□</span>
          </button>
          <button className="terminal-windows-button terminal-windows-close w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500 transition-colors">
            <span className="leading-none text-sm">×</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body p-4 text-sm overflow-x-auto">
        <div className="terminal-content terminal-text">
          {children}
        </div>
      </div>
    </div>
  )
}
