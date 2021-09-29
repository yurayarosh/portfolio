const className = 'js-lazy'

export default async app => {
  const element = document.querySelector(`.${className}`)
  if (!element) return

  const { default: LazyLoader } = await import(/* webpackChunkName: "LazyLoader" */ './LazyLoader')
  app.lazyLoader = new LazyLoader(`.${className}`)
}

export default ({ app }, inject) => {
  inject('lazyLoader', msg => console.log(`Hello ${msg}!`))
}
