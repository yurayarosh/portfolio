<template>
  <div class="works-list">
    <div
      v-for="(item, i) in list"
      :key="i"
      :class="`works-list__item works-list__item--${item.index}`"
    >
      <a
        :href="item.productionUrl"
        rel="noopener nofollow"
        target="_blank"
        :class="`work-card work-card--${item.index}`"
      >
        <span class="work-card__img">
          <img :src="item.image.src" :alt="item.image.alt" :title="item.image.title" />
        </span>

        <span class="work-card__content">
          <span class="work-card__title">{{ item.title }}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar'
import { LEFT, RIGHT } from '@/assets/scripts/constants'

export default {
  name: 'VWorks',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lastScroll: 0,
      isScrolling: false,
      direction: '',
      scrollTarget: 0,
      SCROLL_DURATION: 1000,
    }
  },
  mounted() {
    this.scrollbar = Scrollbar.init(this.$el)

    window.addEventListener('wheel', this.onWheel, { passive: false })
  },
  beforeDestroy() {
    this.scrollbar.destroy()
    window.removeEventListener('wheel', this.onWheel, { passive: false })
  },
  methods: {
    onWheel(e) {
      e.preventDefault()

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        // do something
        this.lastScroll += 1
        this.$el.setAttribute('data-scroll-direction', '')
      }, 500)

      const { deltaY } = e
      this.direction = deltaY > 0 ? RIGHT : LEFT
      const width = this.scrollbar.contentEl.scrollWidth - this.$el.offsetWidth

      const index = this.direction === RIGHT ? 1 : -1

      this.scrollTarget += index * (e.clientY / 10) * 4

      if (this.scrollTarget < 0) {
        this.scrollTarget = 0
      } else if (this.scrollTarget > width) {
        this.scrollTarget = width
      }

      this.scrollbar.scrollTo(this.scrollTarget, 0, this.SCROLL_DURATION)

      this.$el.setAttribute('data-scroll-direction', this.direction)
    },
  },
}
</script>

<style lang="scss">
.works-list {
  position: relative;

  .scroll-content {
    display: block;
    white-space: nowrap;
    height: 100%;
    font-size: 0;
  }

  .scrollbar-track {
    display: none !important;
  }

  &__item {
    display: inline-block;
    vertical-align: top;
    font-size: 1rem;

    height: 50%;
    width: 35vw;

    &:not(:last-child) {
      margin-right: 4%;
    }

    &:last-child {
      margin-right: $gap-container + px;
    }

    &:nth-child(6n + 2),
    &:nth-child(6n + 6) {
      margin-top: 20%;
    }

    &:nth-child(6n + 3) {
      margin-top: 10%;
    }

    &:nth-child(6n + 4) {
      margin-top: 17%;
    }

    &:nth-child(6n + 5) {
      margin-top: 4%;
    }
  }
}

.work-card {
  display: flex;
  flex-direction: column;

  color: $white;
  position: relative;

  text-align: center;

  height: 100%;
  width: 100%;

  &__img {
    position: relative;
    z-index: 0;
    // padding-top: 66%;
    background-color: $light;

    width: 100%;
    height: 100%;

    img {
      @extend %coverdiv;
      @extend %coverimage;
    }
  }

  &__title {
    display: block;

    @include f-title;
    line-height: 1;

    font-size: 56px;

    @include xxxl {
      font-size: vw(56);
    }
  }

  &__content {
    @extend %vcenter;

    padding: 25px;
    width: 100%;
  }
}
</style>
