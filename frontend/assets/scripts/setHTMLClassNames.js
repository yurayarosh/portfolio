import { isTouch } from './helpers'
import { IS_READY, NO_TOUCH } from './constants'

const setHTMLClassNames = () => {
  if (typeof window === 'undefined') return

  const DOC = document.documentElement
  if (!isTouch) {
    DOC.classList.add(NO_TOUCH)
  }

  DOC.classList.add(IS_READY)
}

export default setHTMLClassNames
