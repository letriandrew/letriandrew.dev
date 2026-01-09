'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ContactModal } from './contact-modal'

const navItems = {
  '/': {
    name: 'home',
  },
  '#work': {
    name: 'work',
  },
}

export function Navbar() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const email = 'letriandrew@gmail.com'
  const pathname = usePathname()

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      // If already on home page, scroll to work section
      const workSection = document.getElementById('work')
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If on another page, navigate to home with hash
      window.location.href = '/#work'
    }
  }

  return (
    <>
      <div className="terminal-nav mb-8 pb-4 border-b border-terminal-border">
        <div className="flex flex-row items-center gap-4 flex-wrap">
          {Object.entries(navItems).map(([path, { name }]) => {
            if (path === '#work') {
              return (
                <a
                  key={path}
                  href="#work"
                  onClick={handleWorkClick}
                  className="terminal-nav-item text-terminal-text hover:text-terminal-cyan transition-colors"
                >
                  {name}
                </a>
              )
            }
            return (
              <Link
                key={path}
                href={path}
                className="terminal-nav-item text-terminal-text hover:text-terminal-green transition-colors"
              >
                {name}
              </Link>
            )
          })}
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="terminal-nav-item text-terminal-text hover:text-terminal-green transition-colors cursor-pointer"
            type="button"
          >
            contact
          </button>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        email={email}
      />
    </>
  )
}
