import { IS_ACTIVE, STATE } from './constants'

// function lerp(start, end, amt) {
//   return (1 - amt) * start + amt * end
// }

export default class Pointer {
  constructor(wrap, options) {
    this.wrap = wrap
    this.options = {
      ...{
        className: 'layout__cursor',
        isInteractive: true,
      },
      ...options,
    }
    this.lastMousePosition = { x: 0, y: 0 }
    this.cursor = null
    this.size = 0
  }

  onMouseMove = ({ clientX, clientY, target }) => {
    this.lastMousePosition.x = clientX - this.size / 2
    this.lastMousePosition.y = clientY - this.size / 2

    // this.lastMousePosition.x = lerp(this.lastMousePosition.x, clientX, 0.1)
    // this.lastMousePosition.y = lerp(this.lastMousePosition.y, clientY, 0.1)

    requestAnimationFrame(this.update({ target }))
  }

  renderCursor() {
    this.cursor = document.createElement('div')
    this.cursor.className = this.options.className
    this.cursor.style.transform = 'translate3d(-100%, -100%, 0)'

    this.cursorEl = this.cursor.querySelector('i')

    this.wrap.appendChild(this.cursor)

    this.size = this.cursor.offsetWidth
  }

  removeCursor() {
    if (this.cursor) this.cursor.parentNode.removeChild(this.cursor)
  }

  init() {
    this.renderCursor()
  }

  update = ({ target } = {}) => () => {
    const { x, y } = this.lastMousePosition
    const translate = `translate3d(${x}px, ${y}px, 0)`
    const scale = 'scale(1.4)'

    const button = target?.closest('a, button:not([disabled])')

    if (this.options.isInteractive) {
      if (button) {
        this.cursor.setAttribute(STATE, IS_ACTIVE)
        this.cursor.style.transform = `${translate} ${scale}`
      } else if (this.cursor.hasAttribute(STATE)) {
        this.cursor.removeAttribute(STATE)
        this.cursor.style.transform = translate
      } else {
        this.cursor.style.transform = translate
      }
    } else {
      this.cursor.style.transform = translate
    }
  }
}
