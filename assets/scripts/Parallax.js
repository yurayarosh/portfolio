// import { breakpoints } from '../../helpers'

const defaultConfig = {
  direction: 'vertical',
  observe: true,
}

export default class Parallax {
  constructor(els, options = {}) {
    this.parallaxEls = [...els]
    this.options = { ...defaultConfig, ...options }
    this.visibleParallaxEls = []
  }

  makeParralaxElsArray(entries) {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        console.log({ target })
        this.visibleParallaxEls = [...this.visibleParallaxEls, target]
      } else {
        this.visibleParallaxEls = this.visibleParallaxEls.filter(t => t !== target)
      }
    })
  }

  animateParallaxEls() {
    if (!this.parallaxEls.length) return
    if (this.options.observe && !this.visibleParallaxEls.length) return

    const transformElement = block => {
      const SPEED_DECIMAL_INDEX = 10
      const SPEED_REDUCE_INDEX = 0.4

      const transform = block.dataset.transform || 'translate'
      const speed = (+block.dataset.speed / SPEED_DECIMAL_INDEX) * SPEED_REDUCE_INDEX || -0.2
      const blockOffset =
        transform === 'rotate'
          ? Math.floor(block.parentNode.getBoundingClientRect().top)
          : this.options.direction === 'horizontal'
            ? Math.floor(block.getBoundingClientRect().left)
            : Math.floor(block.getBoundingClientRect().top)
      const blockSize =
        this.options.direction === 'horizontal' ? block.offsetWidth : block.offsetHeight

      const transformNmb = blockOffset * speed

      if (transform === 'rotate') {
        if (blockOffset > 0) {
          block.style.transform = `rotate(${transformNmb}deg)`
        } else if (blockOffset <= 0 && blockOffset >= -blockSize) {
          block.style.transform = `rotate(${transformNmb}deg)`
        }
      } else if (transform === 'translate') {
        if (blockOffset > 0) {
          if (this.options.direction === 'vertical') {
            block.style.transform = `translate3d(0px, ${transformNmb}px, 0)`
          }
          if (this.options.direction === 'horizontal') {
            block.style.transform = `translate3d(${transformNmb}px, 0, 0)`
          }
        } else if (blockOffset <= 0 && blockOffset >= -blockSize) {
          if (this.options.direction === 'vertical') {
            block.style.transform = `translate3d(0px, ${transformNmb}px, 0)`
          }
          if (this.options.direction === 'horizontal') {
            block.style.transform = `translate3d(${transformNmb}px, 0, 0)`
          }
        }
      }
    }

    if (this.options.observe) this.visibleParallaxEls.forEach(transformElement)
    else this.parallaxEls.forEach(transformElement)
  }

  removeTransform() {
    this.parallaxEls.forEach(el => {
      el.style.transform = ''
    })
  }

  handleScroll = () => {
    this.animateParallaxEls()
  }

  handleObserving = entries => {
    this.makeParralaxElsArray(entries)
  }

  addListeners() {
    this.onScroll = this.handleScroll

    if (this.options.observe) {
      this.observer = new IntersectionObserver(this.handleObserving, { rootMargin: '200px' })
      this.parallaxEls.forEach(el => this.observer.observe(el))
    }
  }

  removeListeners() {
    this.onScroll = null

    if (this.options.observe) {
      this.parallaxEls.forEach(el => this.observer.unobserve(el))
    }
  }

  init() {
    // if (!breakpoints.xs.matches) return

    this.addListeners()
    setTimeout(() => {
      this.animateParallaxEls()

      this.inited = true
    }, 0)
  }

  destroy() {
    this.removeListeners()
    this.removeTransform()

    this.inited = false
  }

  // onBreakpointChange = () => {
  //   if (!this.inited) this.init()
  //   else this.destroy()
  // }
}
