import { required, minLength, maxLength } from 'vuelidate/lib/validators'

// const detectBrowser = exp => {
//   if (!window) return false
//   return exp
// }

export const {
  // isAndroid,
  // isCordova,
  // isEdge,
  isFirefox,
  // isChrome,
  // isChromeIOS,
  // isChromiumBased,
  isIE,
  // isIOS,
  // isOpera,
  isSafari,
} = {
  // isAndroid: detectBrowser(/Android/.test(navigator.userAgent)),
  // isCordova: detectBrowser(!!window.cordova),
  // isEdge: detectBrowser(/Edge/.test(navigator.userAgent)),
  isFirefox: typeof window !== 'undefined' ? /Firefox/.test(navigator.userAgent) : false,
  // isChrome: detectBrowser(/Google Inc/.test(navigator.vendor)),
  // isChromeIOS: detectBrowser(/CriOS/.test(navigator.userAgent)),
  // isChromiumBased: detectBrowser(!!window.chrome && !/Edge/.test(navigator.userAgent)),
  isIE: typeof window !== 'undefined' ? /Trident/.test(navigator.userAgent) : false,
  // isIOS: detectBrowser(/(iPhone|iPad|iPod)/.test(navigator.platform)),
  // isOpera: detectBrowser(/OPR/.test(navigator.userAgent)),
  isSafari:
    typeof window !== 'undefined'
      ? /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      : false,
}

// const detectWebkit = () => {
//   if (!window) return false
//   return isChrome || isChromiumBased || isChromeIOS || isSafari || isAndroid || isIOS
// }
// export const isWebkit = detectWebkit()

const detectTouch = () => {
  if (typeof window === 'undefined') return
  return 'ontouchstart' in window || navigator.maxTouchPoints
}

export const isTouch = detectTouch()

export function preventScroll() {
  if (typeof window === 'undefined') return

  const getScrollbarWidth = (() => window.innerWidth - document.documentElement.clientWidth)()
  document.body.style.overflow = 'hidden'
  if (getScrollbarWidth > 0) document.body.style.marginRight = `${getScrollbarWidth}px`
}

export function allowScroll() {
  if (typeof window === 'undefined') return

  document.body.style.overflow = ''
  document.body.style.marginRight = ''
}

export function toggleScroll(condition) {
  if (typeof window === 'undefined') return

  condition ? preventScroll() : allowScroll()
}

export const sortList = (list, type = 'date', options = {}) => {
  if (type === 'date') {
    return list.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  }

  if (type === 'title') {
    const { title } = options

    return list.sort((a, b) => {
      if (a[title] < b[title]) {
        return -1
      }
      if (a[title] > b[title]) {
        return 1
      }
      return 0
    })
  }

  if (type === 'number') {
    const { title } = options
    return list.sort((a, b) => a[title] - b[title])
  }

  return list
}

export const getFormInputs = form => {
  if (!form) return {}

  const inputs = {}
  const validations = {}

  form.inputs?.forEach(({ name, validation: v }) => {
    inputs[name] = ''

    if (!v) return
    // console.log(JSON.parse(v.format_string)?.test('blah'))

    validations[name] = {
      required,
      ...(v.min_length ? { minLength: minLength(v.min_length) } : {}),
      ...(v.max_length ? { maxLength: maxLength(v.max_length) } : {}),
      ...(v.format_string
        ? {
            format(value) {
              return new RegExp(v.format_string).test(value)
            },
          }
        : {}),
    }
  })

  return {
    inputs,
    validations,
  }
}

export const chunkArray = (arr, size) =>
  arr.length > size ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)] : [arr]

export const breakpoints = {
  xxxxl: typeof window !== 'undefined' ? window.matchMedia('(min-width: 2100px)') : null,
  xxxl: typeof window !== 'undefined' ? window.matchMedia('(min-width: 1921px)') : null,
  xxl: typeof window !== 'undefined' ? window.matchMedia('(min-width: 1500px)') : null,
  xl: typeof window !== 'undefined' ? window.matchMedia('(min-width: 1400px)') : null,
  lg: typeof window !== 'undefined' ? window.matchMedia('(min-width: 1200px)') : null,
  md: typeof window !== 'undefined' ? window.matchMedia('(min-width: 992px)') : null,
  sm: typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)') : null,
  xs: typeof window !== 'undefined' ? window.matchMedia('(min-width: 576px)') : null,
  xxs: typeof window !== 'undefined' ? window.matchMedia('(min-width: 480px)') : null,
  xxxs: typeof window !== 'undefined' ? window.matchMedia('(min-width: 375px)') : null,
}

export const canUseWebp = (() => {
  if (typeof window === 'undefined') return false

  const elem = document.createElement('canvas')
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  return false
})()
