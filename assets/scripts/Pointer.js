import { IS_ACTIVE, STATE } from './constants'

export default class Pointer {
  constructor() {
    this.lastMousePosition = { x: 0, y: 0 }
    this.cursor = null
    this.size = 0
  }

  onMouseMove = ({ clientX, clientY, target }) => {
    this.lastMousePosition.x = clientX - this.size / 2
    this.lastMousePosition.y = clientY - this.size / 2
    requestAnimationFrame(this.update.bind(this, { target }))
  }

  renderCursor() {
    this.cursor = document.createElement('div')
    this.cursor.className = 'layout__cursor cursor js-cursor'
    this.cursor.style.transform = 'translate3d(-100%, -100%, 0)'

    document.body.appendChild(this.cursor)

    this.size = this.cursor.offsetWidth
  }

  removeCursor() {
    if (this.cursor) this.cursor.parentNode.removeChild(this.cursor)
  }

  addListeners() {
    document.addEventListener('mousemove', this.onMouseMove)
  }

  init() {
    this.renderCursor()
    this.addListeners()
  }

  update = ({ target } = {}) => {
    const { x, y } = this.lastMousePosition
    const translate = `translate3d(${x}px, ${y}px, 0)`
    const scale = `scale(1.4)`

    // Get the element we're hovered on
    // const hoveredEl = document.elementFromPoint(x, y)
    // if (!hoveredEl) return

    const button = target?.closest('a, button')

    if (button) {
      this.cursor.setAttribute(STATE, IS_ACTIVE)
      this.cursor.style.transform = `${translate} ${scale}`
      this.cursor.style.transition = 'transform .25s'
    } else if (this.cursor.hasAttribute(STATE)) {
      this.cursor.removeAttribute(STATE)
      this.cursor.style.transform = translate

      setTimeout(() => {
        this.cursor.style.transition = ''
      }, 500)
    } else {
      this.cursor.style.transform = translate
    }
  }
}
