import { DependencyList, useEffect, useState } from 'react'

const defaultDelay = 500 // 500ms

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay || defaultDelay
    )

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function useDebounceEffect(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: any,
  waitTime: number,
  deps: DependencyList
): void {
  useEffect(() => {
    const t = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
