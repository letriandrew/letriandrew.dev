'use client'

import React, { ReactNode, useRef, useEffect, useState, Children, cloneElement, isValidElement, useMemo } from 'react'
import { TerminalWindow } from './terminal-window'

interface SequentialTerminalCommandsProps {
  title: string
  children: ReactNode
  className?: string
}

export function SequentialTerminalCommands({
  title,
  children,
  className = '',
}: SequentialTerminalCommandsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCommandIndex, setActiveCommandIndex] = useState<number | null>(null)
  const [completedCommands, setCompletedCommands] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            // Start with the first command (index 0)
            setActiveCommandIndex(0)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  // Track all elements and assign them to command groups
  const elementTracking = useMemo(() => {
    const commandIndices = new Map<React.ReactElement, number>()
    const elementToCommandGroup = new Map<React.ReactElement, number>() // Maps each element to its command group
    let currentCommandIndex = -1 // Start at -1, will be 0 for first command

    const traverse = (node: ReactNode) => {
      Children.forEach(node, (child) => {
        if (isValidElement(child)) {
          // Check if this is a TerminalCommand with a non-empty command
          if (child.props && 'command' in child.props && typeof child.props.command === 'string' && child.props.command !== '') {
            currentCommandIndex++
            commandIndices.set(child, currentCommandIndex)
            elementToCommandGroup.set(child, currentCommandIndex)
          } else if (currentCommandIndex >= 0) {
            // This is an output, empty line, or wrapper - assign it to the current command group
            elementToCommandGroup.set(child, currentCommandIndex)
          }
          // Recursively check children
          if (child.props && child.props.children) {
            traverse(child.props.children)
          }
        }
      })
    }

    traverse(children)
    return { commandIndices, elementToCommandGroup }
  }, [children])

  const handleCommandComplete = (commandIndex: number) => {
    // Mark this command as completed
    setCompletedCommands((prev) => new Set(prev).add(commandIndex))
    
    // Find the next command index
    const nextIndex = commandIndex + 1
    const hasNextCommand = Array.from(elementTracking.commandIndices.values()).includes(nextIndex)
    
    if (hasNextCommand) {
      // Small delay before starting next command
      setTimeout(() => {
        setActiveCommandIndex(nextIndex)
      }, 200)
    }
  }

  // Recursively clone children and inject animation props
  const cloneChildrenWithAnimation = (node: ReactNode, depth = 0): ReactNode => {
    return Children.map(node, (child) => {
      if (!isValidElement(child)) return child

      const commandIndex = elementTracking.commandIndices.get(child)
      const elementCommandGroup = elementTracking.elementToCommandGroup.get(child)

      // Check if this is a TerminalCommand with a non-empty command
      if (child.props && 'command' in child.props && typeof child.props.command === 'string' && child.props.command !== '') {
        if (commandIndex !== undefined) {
          // Only show and animate if this command's turn has come (or it's already completed)
          const shouldShow = activeCommandIndex !== null && (commandIndex <= activeCommandIndex || completedCommands.has(commandIndex))
          const shouldAnimate = isVisible && activeCommandIndex === commandIndex && !completedCommands.has(commandIndex)
          
          // Hide commands that haven't started yet
          if (!shouldShow) {
            return cloneElement(child, {
              ...child.props,
              key: child.key || `cmd-${commandIndex}`,
              style: { display: 'none' },
              animateTyping: false,
            })
          }
          
          return cloneElement(child, {
            ...child.props,
            key: child.key || `cmd-${commandIndex}`,
            animateTyping: shouldAnimate,
            onAnimationComplete: () => {
              // Only trigger completion if this command was animating
              if (shouldAnimate) {
                handleCommandComplete(commandIndex)
              }
            },
          })
        }
      }

      // For all other elements (outputs, empty lines, wrappers)
      // Hide if they belong to a future command group
      if (elementCommandGroup !== undefined) {
        const shouldShow = activeCommandIndex !== null && (elementCommandGroup <= activeCommandIndex || completedCommands.has(elementCommandGroup))
        
        if (!shouldShow) {
          return cloneElement(child, {
            ...child.props,
            style: { display: 'none' },
          })
        }
      } else {
        // If element doesn't have a command group assigned, hide it when animations have started
        // This ensures elements before the first command or untracked elements are hidden
        if (activeCommandIndex !== null && activeCommandIndex >= 0) {
          return cloneElement(child, {
            ...child.props,
            style: { display: 'none' },
          })
        }
      }

      // If this element has children, recursively process them
      if (child.props && child.props.children) {
        return cloneElement(child, {
          ...child.props,
          children: cloneChildrenWithAnimation(child.props.children, depth + 1),
        })
      }

      return child
    })
  }

  return (
    <div ref={sectionRef} className={className}>
      <TerminalWindow title={title}>
        {cloneChildrenWithAnimation(children)}
      </TerminalWindow>
    </div>
  )
}
