'use client'

import React, { ReactNode, useRef, useEffect } from 'react'
import { TerminalWindow } from './terminal-window'
import { useSequentialAnimations } from './use-sequential-animations'

interface TerminalSectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function TerminalSection({
  title,
  children,
  className = '',
}: TerminalSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const animationItems = Array.from(
    { length: React.Children.count(children) },
    (_, i) => ({ id: `item-${i}` })
  )

  const { setVisible } = useSequentialAnimations({
    items: animationItems,
    startDelay: 300,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
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
  }, [setVisible])

  return (
    <div ref={sectionRef} className={className}>
      <TerminalWindow title={title}>{children}</TerminalWindow>
    </div>
  )
}
