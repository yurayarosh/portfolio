<template>
  <ul class="works-list">
    <li
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
    </li>
  </ul>
</template>

<script>
import Swipe from 'swipelistener-js/build'
import { isTouch } from '@/assets/scripts/helpers'

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
      touchstart: 0,
      touchend: 0,
      TRANSLATE_INDEX: 0,
      hasReachEnd: false,
    }
  },
  mounted() {
    this.cards = [...this.$el.querySelectorAll('.works-list__item')]

    if (isTouch) {
      this.swipe = new Swipe(this.$el, {
        moveCallbacks: true,
      })
      this.swipe.init()

      this.swipe.on('movedown', this.onMoveDown).on('moveup', this.onMoveUp)
    } else {
      this.$el.addEventListener('wheel', this.onWheel)
    }

    this.transformCards()
  },
  beforeDestroy() {
    if (isTouch) {
      this.swipe.destroy()
    } else {
      this.$el.removeEventListener('wheel', this.onWheel)
    }
  },
  methods: {
    transformCards() {
      const SPEED_INDEX = isTouch ? 10 : 50

      this.cards.forEach((card, i) => {
        const index = i % 2 === 0 ? -1 : 1
        const delay = i * 400
        const translate = this.lastScroll * SPEED_INDEX - delay
        let translateX = translate * index
        const translateY = translate * index
        const translateZ = translate

        if (i % 3 === 0) translateX = -translateX

        const opacity = Math.abs(translate) < 1000 ? 1 : 0

        card.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`
        card.style.opacity = opacity

        if (i === this.cards.length - 1 && translateZ > 100) {
          this.hasReachEnd = true
        } else {
          this.hasReachEnd = false
        }
      })
    },

    onMoveDown() {
      if (this.lastScroll < 0) {
        this.lastScroll = 0
        return
      }

      this.lastScroll -= 1

      this.transformCards()
    },

    onMoveUp() {
      if (this.lastScroll < 0) {
        this.lastScroll = 0
        return
      }

      if (this.hasReachEnd) return

      this.lastScroll += 1

      this.transformCards()
    },

    onWheel(e) {
      const { deltaY } = e
      const direction = deltaY > 0 ? 1 : -1

      if (this.lastScroll < 0) {
        this.lastScroll = 0
        return
      }

      if (direction > 0 && this.hasReachEnd) return

      this.lastScroll += direction

      this.transformCards()
    },
  },
}
</script>

<style lang="scss">
.works-list {
  position: relative;
  width: 100%;
  flex-grow: 1;

  perspective: 1000px;

  &__item {
    width: 100%;
    max-width: 30%;
    margin-bottom: 100px;

    position: absolute;
    top: 30%;
    left: 30%;

    transition: opacity 0.4s $easeInSine;

    .no-touch & {
      transition: transform 0.4s linear, opacity 0.4s $easeInSine;
    }

    @for $i from 1 through 6 {
      &--#{$i} {
        z-index: #{6 - $i};
      }
    }
  }
}

.work-card {
  display: flex;
  flex-direction: column;

  color: $white;
  position: relative;

  text-align: center;

  &__img {
    position: relative;
    z-index: 0;
    padding-top: 100%;
    background-color: $light;

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
