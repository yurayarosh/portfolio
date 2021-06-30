<template>
  <div class="layout">
    <v-header class="layout__header" />
    <main class="main layout__main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import setHTMLClassNames from '~/assets/scripts/setHTMLClassNames'

export default {
  mounted() {
    setHTMLClassNames()
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
  
  background-image: url("/img/dark-stone-texture.jpg");
  background-position: 50% 50%;
  background-size: cover;
  background-color: $black;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height + px;
  }

  &__main {
    padding-top: $header-height + px;
    flex-grow: 1;
  }
}
</style>
