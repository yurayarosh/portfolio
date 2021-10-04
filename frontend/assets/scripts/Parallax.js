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

  makeParralaxElsArray() {
    this.visibleParallaxEls = this.parallaxEls.filter(el => {
      const offset = 600
      const { left } = el.getBoundingClientRect()
      const isVisible = left <= this.options.VComponent.scrollTarget + window.innerWidth + offset
      return isVisible
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
    this.makeParralaxElsArray()
    this.animateParallaxEls()
  }

  addListeners() {
    this.onScroll = this.handleScroll
  }

  removeListeners() {
    this.onScroll = null
  }

  init() {
    this.addListeners()
    setTimeout(() => {
      this.makeParralaxElsArray()
      this.animateParallaxEls()

      this.inited = true
    })
  }

  destroy() {
    this.removeListeners()
    this.removeTransform()

    this.inited = false
  }
}
