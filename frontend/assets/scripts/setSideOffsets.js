export default () => {
  if (typeof window === 'undefined') return
  const container = document.querySelector('.container')
  if (!container) return

  const { left } = container.getBoundingClientRect()

  document.documentElement.style.setProperty('--container-offset', `${left}px`)
}
