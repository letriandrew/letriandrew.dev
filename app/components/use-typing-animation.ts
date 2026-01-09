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

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text)
      return
    }

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
    if (!enabled || !isTyping) return

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)

      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
      onComplete?.()
    }
  }, [displayedText, text, speed, isTyping, enabled, onComplete])

  return { displayedText, isTyping, isComplete: displayedText === text }
}
