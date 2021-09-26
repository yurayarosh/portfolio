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
import Pointer from '~/assets/scripts/Pointer'

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

    this.pointer = new Pointer(this.$el)
    this.pointerSm = new Pointer(this.$el, {
      className: 'layout__cursor layout__cursor--sm',
      isInteractive: false,
    })

    this.pointer.init()
    this.pointerSm.init()

    window.addEventListener('resize', this.onResize)
    document.addEventListener('mousemove', this.onMouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    onResize() {
      debounce(DELAYS.long, setSideOffsets())
    },
    onMouseMove(e) {
      this.pointer.onMouseMove(e)
      this.pointerSm.onMouseMove(e)
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

  &__cursor {
    display: block;
    pointer-events: none;

    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index-pointer;

    width: 50px;
    height: 50px;

    border: 1px solid $c-text;
    border-radius: 50%;

    transition: transform 0.2s $easeOutSine, background-color 0.4s, border-color 0.4s, opacity 0.4s;

    // &[data-state='active'] {
    //   // background-color: rgba($white, 0.5);
    // }

    &--sm {
      width: 10px;
      height: 10px;
      opacity: 1;
      background-color: $c-text;

      transition: none;
    }
  }

  &--has-menu-open {
    #{$this}__main,
    #{$this}__footer {
      opacity: 0;
    }
  }
}
</style>
