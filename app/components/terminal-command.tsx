'use client'

import { ReactNode, useState } from 'react'
import { useTypingAnimation } from './use-typing-animation'

interface TerminalCommandProps {
  command: string
  output?: ReactNode
  prompt?: string
  className?: string
  onClick?: () => void
  showPrompt?: boolean
  showCursor?: boolean
  type?: 'command' | 'output' | 'error' | 'success' | 'info'
  animateTyping?: boolean
  typingSpeed?: number
  expandable?: boolean
  defaultExpanded?: boolean
  onAnimationComplete?: () => void
}

export function TerminalCommand({
  command,
  output,
  prompt = '$',
  className = '',
  onClick,
  showPrompt = true,
  showCursor = false,
  type = 'command',
  animateTyping = false,
  typingSpeed = 50,
  expandable = false,
  defaultExpanded = false,
  onAnimationComplete,
}: TerminalCommandProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const isClickable = !!onClick || expandable

  const { displayedText, isTyping, isComplete } = useTypingAnimation({
    text: command,
    speed: typingSpeed,
    startDelay: animateTyping ? 200 : 0,
    enabled: animateTyping,
    onComplete: onAnimationComplete,
  })

  const typeClasses = {
    command: 'terminal-command',
    output: 'terminal-output',
    error: 'terminal-error',
    success: 'terminal-success',
    info: 'terminal-info',
  }

  const handleClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded)
    }
    onClick?.()
  }

  const displayCommand = animateTyping ? displayedText : command
  const showBlinkingCursor = showCursor || (animateTyping && isTyping)

  return (
    <div className={`terminal-line ${className}`}>
      {/* Command Line */}
      <div
        className={`flex items-start terminal-gap terminal-command-wrapper ${
          isClickable ? 'terminal-clickable' : ''
        }`}
        onClick={handleClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        {showPrompt && (
          <span className="terminal-prompt flex-shrink-0">
            {prompt}
          </span>
        )}
        <span className={`terminal-text ${typeClasses[type]}`}>
          {displayCommand}
        </span>
        {showBlinkingCursor && <span className="terminal-cursor"></span>}
        {expandable && (
          <span className="terminal-expand-indicator ml-2">
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
      </div>

      {/* Output/Response */}
      {output && (!expandable || isExpanded) && (
        <div className="terminal-output terminal-spacing-sm ml-0 pl-0 terminal-output-animated">
          {typeof output === 'string' ? (
            <pre className="terminal-text text-sm whitespace-pre-wrap">{output}</pre>
          ) : (
            output
          )}
        </div>
      )}
    </div>
  )
}
