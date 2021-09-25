<template>
  <div class="layout">
    <v-header class="layout__header" />
    <main class="main layout__main">
      <Nuxt />
    </main>
    <v-footer class="layout__footer" />
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { mapGetters } from 'vuex'
import setHTMLClassNames from '~/assets/scripts/setHTMLClassNames'
import setSideOffsets from '~/assets/scripts/setSideOffsets'
import { preventScroll, allowScroll } from '~/assets/scripts/helpers'
import { DELAYS } from '~/assets/scripts/constants'

export default {
  computed: {
    ...mapGetters({
      hasMenuOpen: 'menu/isOpen',
    }),
  },
  watch: {
    $route() {
      this.closeModals()
    },
    hasMenuOpen(isOpen) {
      isOpen ? preventScroll() : allowScroll()
    },
  },
  mounted() {
    setHTMLClassNames()
    setSideOffsets()

    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      debounce(DELAYS.long, setSideOffsets())
    },
    closeModals() {
      this.$store.commit('menu/close')
      allowScroll()
    },
  },
}
</script>

<style lang="scss">
#__nuxt,
#__layout {
  height: 100%;
}

.layout {
  $this: &;

  display: flex;
  flex-direction: column;

  min-height: 100%;

  position: relative;
  z-index: 1;

  overflow: hidden;

  &__header {
    position: fixed;
    z-index: $z-index-controls;
    top: 0;
    left: 0;
    right: 0;
  }

  &__main {
    padding-top: $header-height + px;
    flex-grow: 1;
  }

  &__footer {
    position: relative;
    z-index: $z-index-controls;
  }

  &__main,
  &__footer {
    transition: opacity 0.5s;
  }

  &--has-menu-open {
    #{$this}__main,
    #{$this}__footer {
      opacity: 0;
    }
  }
}
</style>
