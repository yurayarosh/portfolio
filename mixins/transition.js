export default {
  transition: {
    // name: 'layout',
    beforeLeave(el) {
      const layout = document.querySelector('.layout')
      console.log(layout)
    },
    afterLeave(el) {
      console.log('after leave', el)
    },
  },
}
