const className = 'js-lazy'

// export default async app => {
//   const element = document.querySelector(`.${className}`)
//   if (!element) return

//   const { default: LazyLoader } = await import(/* webpackChunkName: "LazyLoader" */ './LazyLoader')
//   app.lazyLoader = new LazyLoader(`.${className}`)
// }

export default ({ app }, inject) => {
  inject('lazyLoader', async () => {
    if (typeof window === 'undefined') return {}
    const element = document.querySelector(`.${className}`)
    if (!element) return {}

    const { default: LazyLoader } = await import('../assets/scripts/LazyLoader/LazyLoader')

    return new LazyLoader(`.${className}`)
  })
}
