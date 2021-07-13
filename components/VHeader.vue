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
          class="header__burger burger"
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

<style lang="scss">
.header {
  &__inner {
    display: flex;
    align-items: center;

    height: $header-height + px;
  }

  &__burger {
    margin-left: auto;
  }
}

.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  position: relative;

  width: 50px;
  height: 30px;

  &::before,
  &::after {
    content: '';
    display: block;

    width: 100%;
    height: 5px;

    background-color: currentColor;
  }

  &::after {
    width: 70%;
  }
}
</style>
