'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ContactModal } from './contact-modal'

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
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
      <aside className="-ml-[8px] mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <nav
            className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              {Object.entries(navItems).map(([path, { name }]) => {
                if (path === '#work') {
                  return (
                    <a
                      key={path}
                      href="#work"
                      onClick={handleWorkClick}
                      className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                    >
                      {name}
                    </a>
                  )
                }
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </Link>
                )
              })}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                contact
              </button>
            </div>
          </nav>
        </div>
      </aside>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        email={email}
      />
    </>
  )
}
