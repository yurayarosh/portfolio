import { mapGetters } from 'vuex'
import { DELAYS } from '~/assets/scripts/constants'

export default {
  transition: {
    // name: 'layout',
    beforeLeave(el) {
      this.$store.commit('preloader/start')
    },
    afterEnter(el) {
      setTimeout(() => {
        this.$store.commit('preloader/finish')
        this.$lazyLoader.init()
      }, DELAYS.routing)
    },
  },
  computed: {
    ...mapGetters(['isLoaded']),
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.isLoaded) {
        setTimeout(() => {
          this.$store.commit('preloader/finish')
          this.$lazyLoader.init()
          this.animateEntrance()
        }, DELAYS.preloader)
      } else {
        setTimeout(() => {
          this.$lazyLoader.init()
          this.animateEntrance()
        }, DELAYS.routing)
      }
    })
  },
  methods: {
    animateEntrance() {},
  },
}
