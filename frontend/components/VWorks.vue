<template>
  <div class="works-list">
    <div
      v-for="(item, i) in list"
      :ref="`work-item${i}`"
      :key="item.id"
      class="works-list__item"
      :class="{
        [`works-list__item--${item.index}`]: item.index,
        'works-list__item--overflow-hidden': !animationsComplete,
      }"
      :data-speed="i % 2 === 0 ? 1 : -3"
    >
      <a
        :href="item.url"
        rel="noopener nofollow"
        target="_blank"
        class="work-card"
        :class="{ [`work-card--${item.index}`]: item.index }"
      >
        <span class="work-card__img">
          <img
            class="js-lazy"
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            :data-src="item.media_image.url"
            :alt="item.media_image.alternativeText"
            :title="item.media_image.caption"
          />
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
import Parallax from '~/assets/scripts/Parallax'
import { LEFT, RIGHT } from '~/assets/scripts/constants'
import { breakpoints, isTouch } from '~/assets/scripts/helpers'

export default {
  name: 'VWorks',
  props: {
    animationsComplete: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lastScroll: 0,
      lastScrollDirection: 0,
      isScrolling: false,
      direction: '',
      scrollTarget: 0,
      SCROLL_DURATION: 1500,
    }
  },
  mounted() {
    if (!isTouch) {
      this.scrollbar = Scrollbar.init(this.$el, {
        damping: 0.05,
      })
      this.$el.addEventListener('wheel', this.onWheel, { passive: false })
    } else {
      this.$el.addEventListener('scroll', this.onScroll)
    }

    breakpoints.xs.addEventListener('change', this.onXSBreakpointChange)

    if (breakpoints.xs.matches) this.initParallax()
  },
  beforeDestroy() {
    if (!isTouch) {
      this.scrollbar.destroy()
      this.$el.removeEventListener('wheel', this.onWheel, { passive: false })
    } else {
      this.$el.removeEventListener('scroll', this.onScroll)
    }

    this.destroyParallax()
  },
  methods: {
    initParallax() {
      const itemCardsKeys = Object.keys(this.$refs).filter(key => key.includes('work-item'))
      const itemCards = itemCardsKeys.map(key => this.$refs[key][0] || this.$refs[key])

      this.parallax = new Parallax(itemCards, {
        VComponent: this,
        direction: 'horizontal',
        // observe: false,
      })
      this.parallax.init()
    },
    destroyParallax() {
      this.parallax?.destroy()
    },
    getScrollDirection() {
      const sl = this.$el.scrollLeft
      if (sl > this.lastScrollDirection) {
        this.direction = RIGHT
      } else {
        this.direction = LEFT
      }
      this.lastScrollDirection = sl <= 0 ? 0 : sl
    },
    triggerScrollStop() {
      const STOP_TIMEOUT = isTouch ? 250 : 500
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        // scroll is stopped
        this.lastScroll += 1
        this.$el.setAttribute('data-scroll-direction', '')
      }, STOP_TIMEOUT)
    },
    onXSBreakpointChange() {
      if (breakpoints.xs.matches) {
        this.initParallax()
      } else {
        this.destroyParallax()
      }
    },
    onScroll() {
      this.triggerScrollStop()
      this.getScrollDirection()

      this.$el.setAttribute('data-scroll-direction', this.direction)

      this.parallax?.onScroll()
    },
    onWheel(e) {
      e.preventDefault()

      this.triggerScrollStop()

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

      this.parallax.onScroll()
    },
  },
}
</script>

<style lang="scss">
.works-list {
  position: relative;

  .scroll-content {
    display: block;

    height: 100%;

    @media (min-width: 100vh) {
      font-size: 0;
      white-space: nowrap;
    }
  }

  .scrollbar-track {
    display: none !important;
  }

  html:not(.no-touch) & {
    display: block;

    overflow: auto;

    @media (min-width: 100vh) {
      font-size: 0;
      white-space: nowrap;
    }

    @include xs {
      overflow: visible;
    }
  }

  &__item {
    display: inline-block;
    vertical-align: top;
    font-size: 1rem;
    transition: transform 0.75s $easeOutSine;

    @media (min-width: 100vh) {
      height: 50%;
      width: 35vw;
    }

    @media (max-width: 100vh) {
      height: 35vh;
      width: 70%;
    }

    @media (max-width: 1919px) and (max-height: 62vw) {
      height: 90%;
    }

    @include xs {
      width: 100% !important;
      height: auto !important;
      margin-right: 0 !important;
      margin-left: 0 !important;
      margin-bottom: 30px !important;
    }

    &:not(:last-child) {
      @media (min-width: 100vh) {
        margin-right: 4%;
      }

      @media (max-width: 100vh) {
        margin-bottom: 4%;
      }
    }

    &:last-child {
      @media (min-width: 100vh) {
        margin-right: $gap-container + px;
      }
    }

    &:first-child {
      @media (min-width: 100vh) {
        margin-left: $gap-container + px;
      }
    }

    &:nth-child(6n + 2),
    &:nth-child(6n + 6) {
      @media (min-width: 100vh) {
        margin-top: 18%;
      }

      @media (max-width: 100vh) {
        margin-left: 20%;
      }

      @media (max-width: 1919px) and (max-height: 62vw) {
        margin-top: 3%;
      }
    }

    &:nth-child(6n + 3) {
      @media (min-width: 100vh) {
        margin-top: 7%;
        height: 70%;
        width: 50vw;
      }

      @media (max-width: 100vh) {
        margin-left: 10%;
        width: 80%;
        height: 50vh;
      }

      @media (max-width: 1919px) and (max-height: 62vw) {
        margin-top: 1%;
        height: 90%;
        width: 35vw;
      }
    }

    &:nth-child(6n + 4) {
      @media (min-width: 100vh) {
        margin-top: 15%;
        height: 60%;
        width: 40vw;
      }

      @media (max-width: 100vh) {
        margin-left: 17%;
        width: 70%;
        height: 40vh;
      }

      @media (max-width: 1919px) and (max-height: 62vw) {
        margin-top: 2%;
        height: 90%;
        width: 30vw;
      }
    }

    &:nth-child(6n + 5) {
      @media (min-width: 100vh) {
        margin-top: 4%;
        height: 65%;
        width: 45vw;
      }

      @media (max-width: 100vh) {
        margin-left: 4%;
        width: 75%;
        height: 45vh;
      }

      @media (max-width: 1919px) and (max-height: 62vw) {
        margin-top: 0;
        height: 90%;
        width: 35vw;
      }
    }

    &--overflow-hidden {
      overflow: hidden;

      .work-card {
        transform: translate(0, 102%);
        transition: none;
      }
    }
  }
}

.work-card {
  $this: &;

  display: flex;
  flex-direction: column;

  color: $white;
  position: relative;

  text-align: center;
  white-space: normal;

  height: 100%;
  width: 100%;

  transition: transform 0.5s $easeInSine;

  @include xs {
    height: auto;
    padding-top: 65%;
  }

  @include hover {
    #{$this}__img {
      transform: scale(1.05);
    }
  }

  [data-scroll-direction='left'] & {
    transform: skew(5deg);
  }

  [data-scroll-direction='right'] & {
    transform: skew(-5deg);
  }

  &__img {
    display: block;

    position: relative;
    z-index: 0;
    background-color: $black;

    width: 100%;
    height: 100%;

    transition: transform 0.5s $easeInSine;

    @include xs {
      position: absolute;
      top: 0;
      left: 0;
    }

    &::before {
      content: '';

      @extend %coverdiv;
      z-index: 1;
      background-color: rgba($black, 0.4);
    }

    img {
      @extend %coverdiv;
      @extend %coverimage;
    }
  }

  &__title {
    display: block;

    transition: transform 0.75s linear;

    @include f-title;
    line-height: 1;

    font-size: 56px;

    @include xxxl {
      font-size: vw(56);
    }

    @include xxl {
      font-size: vw(65);
    }

    @include xs {
      font-size: 1.3em;
    }
  }

  &__content {
    @extend %vcenter;

    padding: 25px;
    width: 100%;
  }
}
</style>
