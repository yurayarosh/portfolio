import { DELAYS } from '~/assets/scripts/constants'

export default {
  transition: {
    // name: 'layout',
    beforeLeave(el) {
      this.$store.commit('preloader/start')
    },
    // afterLeave(el) {
    //   console.log('after leave', el)
    //   // this.$store.commit('preloader/finish')
    // },
    afterEnter(el) {
      setTimeout(() => {
        this.$store.commit('preloader/finish')
      }, DELAYS.preloader)
    }
  },
}
