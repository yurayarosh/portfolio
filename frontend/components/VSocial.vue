<template>
  <ul class="social">
    <li v-for="item in list" :key="item.id" class="social__item">
      <a
        :href="item.url"
        :target="item.url.includes('http') ? '_blank' : false"
        :rel="item.url.includes('http') ? 'noopener nofollow' : false"
        class="social__link"
        ><svgicon :name="item.icon" width="1em" height="1em"
      /></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VSocial',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.list.forEach(async ({ icon }) => await import(`~/assets/icons/${icon}`))
  },
}
</script>

<style lang="scss">
.social {
  display: flex;
  align-items: center;
  font-size: 1.5em;

  &__item {
    @include notlast {
      margin-right: 0.5em;
    }
  }
}
</style>
