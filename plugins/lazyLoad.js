const className = 'js-lazy'

export default ({ app }, inject) => {
  inject('lazyLoader', async () => {
    // if (typeof window === 'undefined') return {}
    const element = document.querySelector(`.${className}`)
    if (!element) return {}

    const { default: LazyLoader } = await import('../assets/scripts/LazyLoader/LazyLoader')

    return new LazyLoader(`.${className}`)
  })
}
