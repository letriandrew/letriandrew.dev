'use client'

import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react'
import { Experience } from 'app/data/experience'
import { ExperienceList } from './experience-list'
import { Projects } from './projects'

type Project = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
  }
}

interface InteractiveTerminalProps {
  experiences?: Experience[]
  projects?: Project[]
}

export function InteractiveTerminal({ experiences = [], projects = [] }: InteractiveTerminalProps) {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [outputs, setOutputs] = useState<{ command: string; output: string | null; component?: ReactNode }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [cursorLeft, setCursorLeft] = useState(0)
  const [tabCompletionIndex, setTabCompletionIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  // Available commands and files for tab completion
  const commands = ['cat', 'ls', 'pwd', 'clear', 'help']
  const files = ['about.txt', 'experience.txt', 'projects.txt']

  const updateCursorPosition = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (command.trim()) {
        const cmd = command.trim()
        
        // Always add to history first
        const newHistory = [...history, cmd]
        setHistory(newHistory)
        setHistoryIndex(-1)
        
        // Handle clear command - clear outputs but keep history
        if (cmd.toLowerCase() === 'clear') {
          setOutputs([])
          setCommand('')
          setCursorPosition(0)
          return
        }
        
        // Handle other commands (or show error for unknown commands)
        handleCommand(cmd)
        
        // Clear command input
        setCommand('')
        setCursorPosition(0)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        const newCommand = history[newIndex]
        setCommand(newCommand)
        setTimeout(() => {
          setCursorPosition(newCommand.length)
          inputRef.current?.setSelectionRange(newCommand.length, newCommand.length)
        }, 0)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setCommand('')
          setCursorPosition(0)
        } else {
          setHistoryIndex(newIndex)
          const newCommand = history[newIndex]
          setCommand(newCommand)
          setTimeout(() => {
            setCursorPosition(newCommand.length)
            inputRef.current?.setSelectionRange(newCommand.length, newCommand.length)
          }, 0)
        }
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Update cursor position after arrow key navigation
      setTimeout(updateCursorPosition, 0)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      handleTabCompletion()
    }
  }

  const handleTabCompletion = () => {
    const words = command.trim().split(/\s+/)
    const currentWord = words[words.length - 1] || ''
    const isFirstWord = words.length === 1
    
    let completions: string[] = []
    
    if (isFirstWord) {
      // Complete commands
      completions = commands.filter(cmd => cmd.startsWith(currentWord.toLowerCase()))
    } else {
      // Complete files (for cat command)
      const firstWord = words[0].toLowerCase()
      if (firstWord === 'cat') {
        completions = files.filter(file => file.startsWith(currentWord.toLowerCase()))
      }
    }
    
    if (completions.length === 0) {
      return // No completions found
    }
    
    if (completions.length === 1) {
      // Single completion - replace the current word
      const newWords = [...words]
      newWords[newWords.length - 1] = completions[0]
      const newCommand = newWords.join(' ') + (isFirstWord ? ' ' : '')
      setCommand(newCommand)
      setTimeout(() => {
        setCursorPosition(newCommand.length)
        inputRef.current?.setSelectionRange(newCommand.length, newCommand.length)
      }, 0)
      setTabCompletionIndex(-1)
    } else {
      // Multiple completions - cycle through them
      const currentIndex = tabCompletionIndex >= 0 ? tabCompletionIndex : 0
      const nextIndex = (currentIndex + 1) % completions.length
      setTabCompletionIndex(nextIndex)
      
      const newWords = [...words]
      newWords[newWords.length - 1] = completions[nextIndex]
      const newCommand = newWords.join(' ')
      setCommand(newCommand)
      setTimeout(() => {
        setCursorPosition(newCommand.length)
        inputRef.current?.setSelectionRange(newCommand.length, newCommand.length)
      }, 0)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value)
    setTabCompletionIndex(-1) // Reset tab completion when typing
    setTimeout(updateCursorPosition, 0)
  }

  const handleClick = () => {
    setTimeout(updateCursorPosition, 0)
  }

  const handleSelect = () => {
    setTimeout(updateCursorPosition, 0)
  }

  const handleCommand = (cmd: string) => {
    const cmdLower = cmd.toLowerCase().trim()
    let output: string | null = null
    let component: ReactNode = null

    // Handle ls command
    if (cmdLower === 'ls' || cmdLower.startsWith('ls ')) {
      output = `about.txt\nexperience.txt\nprojects.txt`
    }
    // Handle pwd command
    else if (cmdLower === 'pwd') {
      output = '/home/portfolio'
    }
    // Handle help command
    else if (cmdLower === 'help') {
      output = `Available commands:

  cat <file>     Display the contents of a file
                 Files: about.txt, experience.txt, projects.txt
  
  ls             List all available files
  
  pwd            Print working directory
  
  clear          Clear terminal output
  
  help           Show this help message

Use Tab for command and filename completion.`
    }
    // Handle cat commands for the three files (supports various formats)
    else if (cmdLower.match(/^cat\s+(\.\/|\/)?(about|experience|projects)\.txt$/)) {
      const fileMatch = cmdLower.match(/(about|experience|projects)\.txt/)
      if (fileMatch) {
        const fileName = fileMatch[1]
        
        if (fileName === 'about') {
          component = (
            <div className="terminal-output">
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
          )
        } else if (fileName === 'experience') {
          component = (
            <div className="terminal-output mb-8">
              <ExperienceList experiences={experiences} />
            </div>
          )
        } else if (fileName === 'projects') {
          component = (
            <div className="terminal-output">
              <Projects projects={projects} />
            </div>
          )
        }
      }
    }
    // For unknown commands, show nothing (command is still in history and displayed)

    // Always store the command in outputs, even if there's no output
    setOutputs(prev => [...prev, { command: cmd, output, component }])
  }

  useEffect(() => {
    // Ensure page starts at top on initial load
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    
    // Don't auto-focus on mount to prevent scrolling to input
    // Input will be focused when user clicks or types anywhere on page
    updateCursorPosition()

    // Global click handler to refocus input
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Don't refocus if clicking on:
      // - Links
      // - Buttons (except the terminal input area)
      // - Inputs, textareas, or contenteditable elements
      // - Elements with data-no-refocus attribute
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]') ||
        target.hasAttribute('data-no-refocus') ||
        target.closest('[data-no-refocus]')
      ) {
        return
      }

      // Don't auto-focus on click to prevent scrolling
      // User can click the input directly if they want to focus it
      // Auto-focus only happens when typing (handled in keydown handler)
    }

    // Global keydown handler to focus input when typing
    const handleDocumentKeyDown = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement
      
      // Don't intercept if already in an input/textarea/contenteditable
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]')
      ) {
        return
      }

      // Focus input when typing printable characters or common navigation keys
      if (
        (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) ||
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Home' ||
        e.key === 'End'
      ) {
        if (inputRef.current && document.activeElement !== inputRef.current) {
          // Check if input is in viewport
          const rect = inputRef.current.getBoundingClientRect()
          const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight
          
          // Save current scroll position
          const scrollY = window.scrollY
          // Focus without scrolling
          inputRef.current.focus({ preventScroll: true })
          
          // Only restore scroll if input was not in viewport (to prevent unwanted scrolling)
          if (!isInViewport) {
            requestAnimationFrame(() => {
              window.scrollTo(0, scrollY)
            })
          }
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  }, [])

  useEffect(() => {
    // Update cursor position when command changes
    updateCursorPosition()
  }, [command])

  useEffect(() => {
    // Update cursor left position when text before cursor changes
    if (measureRef.current) {
      setCursorLeft(measureRef.current.offsetWidth)
    }
  }, [cursorPosition, command])

  // Get the text before cursor for measuring width
  const textBeforeCursor = command.substring(0, cursorPosition)

  return (
    <div className="mt-8">
      {/* Display command history with outputs */}
      {outputs.map((item, index) => (
        <div key={index}>
          <div className="terminal-line mb-2">
            <span className="terminal-prompt text-terminal-blue">$</span>
            <span className="terminal-text text-terminal-text ml-2">{item.command}</span>
          </div>
          {item.output && (
            <div className="terminal-output mb-4 text-terminal-text font-mono text-sm whitespace-pre-wrap leading-relaxed">
              {item.output}
            </div>
          )}
          {item.component && (
            <div className="mb-4">
              {item.component}
            </div>
          )}
        </div>
      ))}
      
      {/* Interactive input line */}
      <div className="terminal-line flex items-center flex-nowrap" style={{ display: 'flex' }}>
        <span className="terminal-prompt text-terminal-blue flex-shrink-0">$</span>
        <div className="flex-1 flex items-center ml-2 min-w-0 relative flex-nowrap">
          {/* Hidden span to measure text width */}
          <span
            ref={measureRef}
            className="absolute invisible font-mono whitespace-pre"
            style={{ fontFamily: 'inherit', lineHeight: 'inherit' }}
            aria-hidden="true"
          >
            {textBeforeCursor}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            onSelect={handleSelect}
            className="bg-transparent border-none outline-none text-terminal-text flex-1 font-mono min-w-0 relative z-10 inline-block"
            style={{ 
              fontFamily: 'inherit', 
              caretColor: 'transparent', 
              width: '100%',
              lineHeight: 'inherit',
              padding: 0,
              margin: 0,
              height: 'auto',
              display: 'inline-block'
            }}
          />
          {/* Terminal cursor positioned at cursor location */}
          <span
            className="terminal-cursor absolute z-20 pointer-events-none"
            style={{
              left: `${cursorLeft}px`,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          ></span>
        </div>
      </div>
    </div>
  )
}
