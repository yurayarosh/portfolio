<template>
  <div class="layout" :class="{ 'layout--has-menu-open': hasMenuOpen }">
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

  background-image: url('/img/dark-stone-texture.jpg');
  background-position: 50% 50%;
  background-size: cover;
  background-color: $black;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  &__main {
    padding-top: $header-height + px;
    flex-grow: 1;
  }
}
</style>
