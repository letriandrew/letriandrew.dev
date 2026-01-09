'use client'

import { useState, useEffect } from 'react'

interface UseTypingAnimationOptions {
  text: string
  speed?: number
  startDelay?: number
  onComplete?: () => void
  enabled?: boolean
}

export function useTypingAnimation({
  text,
  speed = 50,
  startDelay = 0,
  onComplete,
  enabled = true,
}: UseTypingAnimationOptions) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : text)
  const [isTyping, setIsTyping] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text)
      setIsTyping(false)
      setHasCompleted(false)
      return
    }

    // Reset when enabled becomes true
    setDisplayedText('')
    setIsTyping(false)
    setHasCompleted(false)

    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true)
      }, startDelay)
      return () => clearTimeout(delayTimer)
    } else {
      setIsTyping(true)
    }
  }, [startDelay, enabled, text])

  useEffect(() => {
    if (!enabled || !isTyping || hasCompleted) return

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)

      return () => clearTimeout(timer)
    } else if (displayedText.length === text.length && text.length > 0 && !hasCompleted) {
      // Animation complete
      setIsTyping(false)
      setHasCompleted(true)
      // Call completion callback
      onComplete?.()
    }
  }, [displayedText, text, speed, isTyping, enabled, hasCompleted, onComplete])

  return { displayedText, isTyping, isComplete: displayedText === text }
}
