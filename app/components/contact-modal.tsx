'use client'

import { useEffect } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function ContactModal({ isOpen, onClose, email }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-8 max-w-md w-full mx-4 border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          aria-label="Close modal"
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
        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          Contact Me
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Feel free to reach out via email:
        </p>
        <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 mb-6">
          <span className="text-neutral-900 dark:text-neutral-100 font-mono text-lg">
            {email}
          </span>
          <button
            onClick={handleEmailClick}
            className="ml-4 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm font-medium"
          >
            Open Email
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
