<template>
  <transition :css="false" @enter="onEnter" @leave="onLeave">
    <div v-if="hasMenuOpen" class="menu">
      <v-nav class="header__nav" />
    </div>
  </transition>
</template>

<script>
import anime from 'animejs'
import { mapGetters } from 'vuex'

export default {
  name: 'VMenu',
  computed: {
    ...mapGetters({
      hasMenuOpen: 'menu/isOpen',
    }),
  },
  methods: {
    onEnter(el, done) {
      setTimeout(() => {
        const targets = el.querySelectorAll('.nav__item')

        const tl = anime.timeline({
          easing: 'easeOutExpo',
        })

        tl.add({
          targets,
          opacity: [0, 1],
          translateX: ['-5em', '0em'],
          duration: 750,
          delay: anime.stagger(300),
        })

        tl.finished.then(done)
      }, 66)
    },
    onLeave(el, done) {
      const targets = el.querySelectorAll('.nav__item')

      const tl = anime.timeline({
        easing: 'easeInExpo',
      })

      tl.add(
        {
          targets,
          opacity: 0,
          translateX: '-3.5em',
          duration: 300,
          delay: anime.stagger(100),
        },
        0
      )

      tl.finished.then(done)
    },
  },
}
</script>

<style lang="scss">
.menu {
  display: flex;
  align-items: center;
  justify-content: center;

  @extend %overlay;
  z-index: $z-index-modal;
}
</style>
