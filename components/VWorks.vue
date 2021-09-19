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

    this.$el.addEventListener('wheel', this.onWheel)
    this.$el.addEventListener('touchstart', this.onTouchStart)
    this.$el.addEventListener('touchend', this.onTouchEnd)
    this.$el.addEventListener('touchmove', this.onTouchMove)

    this.transformCards()
  },
  beforeDestroy() {
    this.$el.removeEventListener('wheel', this.onWheel)
    this.$el.removeEventListener('touchstart', this.onTouchStart)
    this.$el.removeEventListener('touchend', this.onTouchEnd)
  },
  methods: {
    transformCards() {
      this.cards.forEach((card, i) => {
        const index = i % 2 === 0 ? -1 : 1
        const delay = i * 400
        const translate = this.lastScroll * 50 - delay
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
    onTouchMove(e) {
      // console.log('move', e)
      this.touchend = e.changedTouches[0].clientY
      if (this.touchstart > this.touchend + 5) {
        console.log('scroll down')
      } else if (this.touchstart < this.touchend - 5) {
        console.log('scroll up')
      }
    },
    onTouchStart(e) {
      this.touchstart = e.touches[0].clientY
    },
    onTouchEnd(e) {
      // this.touchend = e.changedTouches[0].clientY
      // if (this.touchstart > this.touchend + 5) {
      //   console.log('scroll down')
      // } else if (this.touchstart < this.touchend - 5) {
      //   console.log('scroll up')
      // }
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

    transition: transform 0.4s linear, opacity 0.4s linear;

    @for $i from 1 through 6 {
      &--#{$i} {
        z-index: #{6 - $i};
      }
    }

    // &--1 {
    //   max-width: 50%;

    //   @extend %visible;
    // }

    // &--2 {
    //   // margin-top: 50px;
    // }

    // &--3 {
    //   // margin-left: 5%;
    // }

    // &--4 {
    //   max-width: 45%;
    //   // margin-top: -100px;
    //   // margin-right: 3%;
    // }

    // &--5 {
    //   // margin-top: 100px;
    //   // margin-left: 2%;
    //   max-width: 43%;
    // }

    // &--6 {
    //   // margin-right: 1%;
    //   max-width: 50%;
    // }
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
