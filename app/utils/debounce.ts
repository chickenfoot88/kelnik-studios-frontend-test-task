export const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const wrapped = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  wrapped.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return wrapped
}