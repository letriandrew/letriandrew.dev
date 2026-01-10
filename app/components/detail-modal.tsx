'use client'

import { useEffect, ReactNode, useRef } from 'react'

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  period?: string
  description?: string
  details?: {
    bullets?: string[]
    images?: { src: string; alt: string }[]
    links?: { text: string; url: string }[]
    content?: ReactNode
  }
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  period,
  description,
  details,
}: DetailModalProps) {
  const scrollPositionRef = useRef<number>(0)

  useEffect(() => {
    if (isOpen) {
      // Get scroll position from sessionStorage or current position
      const savedScroll = sessionStorage.getItem('modalScrollPosition')
      const scrollY = savedScroll ? parseInt(savedScroll, 10) : (window.scrollY || window.pageYOffset || document.documentElement.scrollTop)
      scrollPositionRef.current = scrollY
      
      // Prevent scrolling on body
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.style.left = '0'
      document.body.style.right = '0'
      
      // Prevent scrolling on html element
      document.documentElement.style.overflow = 'hidden'
      
      // Also prevent scrolling on the main container
      const mainContainer = document.querySelector('.terminal-main-container')
      if (mainContainer) {
        ;(mainContainer as HTMLElement).style.overflow = 'hidden'
      }
      
      return () => {
        // Restore scroll position after a brief delay to ensure styles are reset
        const scrollY = scrollPositionRef.current
        
        // Reset body styles
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        document.body.style.left = ''
        document.body.style.right = ''
        
        // Reset html styles
        document.documentElement.style.overflow = ''
        
        // Reset main container
        const mainContainer = document.querySelector('.terminal-main-container')
        if (mainContainer) {
          ;(mainContainer as HTMLElement).style.overflow = ''
        }
        
        // Restore scroll position using requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY)
            sessionStorage.removeItem('modalScrollPosition')
          })
        })
      }
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay - completely covers everything */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 99998,
          backgroundColor: '#1a1a1a',
          pointerEvents: 'auto'
        }}
        aria-hidden="true"
      />
      {/* Modal content */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      >
      <div
        className="relative bg-[#1a1a1a] border border-terminal-border rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#2d2d2d] border-b border-terminal-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-terminal-amber text-2xl font-semibold mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-terminal-text text-sm mb-1">{subtitle}</p>
            )}
            {period && (
              <p className="text-terminal-text text-xs opacity-70">{period}</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="text-terminal-text hover:text-terminal-blue transition-colors ml-4 flex-shrink-0"
            aria-label="Close modal"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {description && (
            <p className="text-terminal-text mb-6 leading-relaxed">
              {description}
            </p>
          )}

          {details?.bullets && details.bullets.length > 0 && (
            <div className="mb-6">
              <h3 className="text-terminal-amber text-lg font-medium mb-3">
                Key Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-2 text-terminal-text">
                {details.bullets.map((bullet, index) => (
                  <li key={index} className="ml-2">{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {details?.images && details.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-terminal-amber text-lg font-medium mb-3">
                Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="rounded-lg border border-terminal-border w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {details?.links && details.links.length > 0 && (
            <div className="mb-6">
              <h3 className="text-terminal-amber text-lg font-medium mb-3">
                Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {details.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 border border-terminal-blue text-terminal-blue rounded hover:bg-terminal-blue hover:text-white transition-colors text-sm"
                  >
                    {link.text} →
                  </a>
                ))}
              </div>
            </div>
          )}

          {details?.content && (
            <div className="mb-6">
              {details.content}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
