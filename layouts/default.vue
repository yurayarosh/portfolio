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
import { preventScroll, allowScroll, isTouch } from '~/assets/scripts/helpers'
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
  async mounted() {
    setHTMLClassNames()
    setSideOffsets()

    if (!isTouch) await this.initPointer()

    window.addEventListener('resize', this.onResize)
    document.addEventListener('mousemove', this.onMouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('mousemove', this.onMouseMove)

    if (!isTouch) {
      this.pointer.destroy()
      this.pointerSm.destroy()
    }
  },
  methods: {
    async initPointer() {
      const { default: Pointer } = await import('~/assets/scripts/Pointer')

      this.pointer = new Pointer(this.$el)
      this.pointerSm = new Pointer(this.$el, {
        className: 'layout__cursor layout__cursor--sm',
        isInteractive: false,
      })

      this.pointer.init()
      this.pointerSm.init()
    },
    onResize() {
      debounce(DELAYS.long, setSideOffsets())
    },
    onMouseMove(e) {
      this.pointer?.onMouseMove(e)
      this.pointerSm?.onMouseMove(e)
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

    @include md {
      padding-top: $header-height-md + px;
    }
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

    &[data-state='active'] {
      background-color: rgba($white, 0.25);
    }

    &--sm {
      width: 8px;
      height: 8px;
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
