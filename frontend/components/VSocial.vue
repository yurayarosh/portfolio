<template>
  <ul class="social">
    <li v-for="item in list" :key="item.id" class="social__item">
      <a
        :href="item.url"
        :target="item.url.includes('mailto:') ? false : '_blank'"
        :rel="item.url.includes('mailto:') ? false : 'noopener nofollow'"
        class="social__link"
        :title="item.title"
        :aria-label="item.icon"
        ><svgicon :class="`svg-icon--${item.icon}`" :name="item.icon" width="1em" height="1em"
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
    const interval = setInterval(() => {
      if (this.list?.length > 0) {
        console.log(this.list)
        this.list.forEach(async ({ icon }) => await import(`~/assets/icons/${icon}`))
        clearInterval(interval)
      }
    }, 300)
  },
}
</script>

<style lang="scss">
.social {
  $this: &;

  display: flex;
  align-items: center;
  font-size: 2em;

  &__item {
    @include notlast {
      margin-right: 0.5em;
    }

    @include hover {
      #{$this}__link {
        animation: wobble-hor-bottom 1000ms $easeInOutSine 1;
      }
    }
  }

  &__link {
    display: block;

    .svg-icon {
      &--download {
        fill: none;
        stroke: currentColor;
        stroke-width: 0.075em;
      }
    }
  }
}
</style>
