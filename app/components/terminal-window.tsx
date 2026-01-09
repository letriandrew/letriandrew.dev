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
      {/* Terminal Header Bar */}
      <div className="terminal-header flex items-center gap-2 px-4 py-2">
        {/* Window Controls */}
        <div className="flex gap-1.5">
          <div className="terminal-control w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="terminal-control w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="terminal-control w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        {/* Terminal Title */}
        <div className="flex-1 text-center">
          <span className="terminal-text text-xs text-neutral-400 dark:text-neutral-500">
            {title}
          </span>
        </div>
        {/* Spacer for symmetry */}
        <div className="w-[42px]"></div>
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
