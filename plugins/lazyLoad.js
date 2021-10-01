import LazyLoader from '../assets/scripts/LazyLoader/LazyLoader'

const className = 'js-lazy'

export default ({ app }, inject) => {
  inject('lazyLoader', new LazyLoader(`.${className}`))
}
