'use client'

import { useState, useEffect, useRef } from 'react'

interface SequentialAnimationOptions {
  items: Array<{ id: string; delay?: number }>
  startDelay?: number
  onItemStart?: (id: string) => void
  onItemComplete?: (id: string) => void
  onAllComplete?: () => void
}

export function useSequentialAnimations({
  items,
  startDelay = 0,
  onItemStart,
  onItemComplete,
  onAllComplete,
}: SequentialAnimationOptions) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const isVisibleRef = useRef(false)

  const startAnimations = () => {
    if (items.length === 0) return
    setActiveIndex(0)
    onItemStart?.(items[0].id)
  }

  const handleItemComplete = (id: string) => {
    setCompletedItems((prev) => new Set(prev).add(id))
    onItemComplete?.(id)

    const currentIndex = items.findIndex((item) => item.id === id)
    if (currentIndex !== -1 && currentIndex < items.length - 1) {
      const nextIndex = currentIndex + 1
      const nextItem = items[nextIndex]
      const delay = nextItem.delay || 200

      setTimeout(() => {
        setActiveIndex(nextIndex)
        onItemStart?.(nextItem.id)
      }, delay)
    } else if (currentIndex === items.length - 1) {
      onAllComplete?.()
    }
  }

  const isItemActive = (id: string) => {
    const index = items.findIndex((item) => item.id === id)
    return index === activeIndex
  }

  const isItemCompleted = (id: string) => {
    return completedItems.has(id)
  }

  const shouldAnimate = (id: string) => {
    return isItemActive(id) && isVisibleRef.current
  }

  return {
    startAnimations,
    handleItemComplete,
    isItemActive,
    isItemCompleted,
    shouldAnimate,
    setVisible: (visible: boolean) => {
      isVisibleRef.current = visible
      if (visible && activeIndex === null) {
        setTimeout(() => startAnimations(), startDelay)
      }
    },
  }
}
