<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <v-menu class="header__nav-wrap" />

        <v-social class="header__social" :list="socials" />

        <button
          class="header__burger burger"
          :class="{ 'burger--active': hasMenuOpen }"
          type="button"
          aria-label="Toggle menu"
          @click="onBurgerClick"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'VHeader',
  computed: {
    ...mapState({
      socials: ({ globalData }) => globalData.socials,
    }),
    ...mapGetters({
      hasMenuOpen: 'menu/isOpen',
    }),
  },
  methods: {
    onBurgerClick() {
      this.$store.commit('menu/toggle')
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

    @include md {
      height: $header-height-md + px;
    }
  }

  &__burger {
    position: relative;
    z-index: $z-index-modal + 1;
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

  @include hover {
    animation: pulsate-fwd 500ms $easeInOutSine 1;
  }

  &::before,
  &::after {
    content: '';
    display: block;

    width: 100%;
    height: em(5);

    background-color: currentColor;

    transition: transform 0.5s, width 0.5s;
  }

  &::after {
    width: 70%;
  }

  &--active {
    &::after {
      width: 100%;
      transform: rotate(45deg) translate(-8px, -7px);
    }

    &::before {
      transform: rotate(-45deg) translate(-10px, 9px);
    }
  }
}
</style>
