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
import { mapGetters } from 'vuex'
import setHTMLClassNames from '~/assets/scripts/setHTMLClassNames'
import { preventScroll, allowScroll } from '~/assets/scripts/helpers'

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
  },
  methods: {
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

  // &__header,
  // &__main,
  // &__footer {
  //   position: relative;
  //   z-index: 1;
  // }

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
