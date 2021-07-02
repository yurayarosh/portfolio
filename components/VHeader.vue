<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
          <div v-if="hasMenuOpen" class="header__nav-wrap">
            <v-nav class="header__nav" />
          </div>
        </transition>

        <button
          class="header__burger"
          type="button"
          aria-label="Toggle menu"
          @click="onBurgerClick"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VHeader',
  computed: {
    ...mapGetters({
      hasMenuOpen: 'menu/isOpen',
    }),
  },
  methods: {
    onBurgerClick() {
      this.$store.commit('menu/toggle')
    },
    onMenuEnter(el, done) {
      done()
    },
    onMenuLeave(el, done) {
      done()
    },
  },
}
</script>
