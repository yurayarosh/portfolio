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
      TRANSLATE_INDEX: 0,
    }
  },
  mounted() {
    this.cards = [...this.$el.querySelectorAll('.works-list__item')]

    this.$el.addEventListener('wheel', this.onWheel)

    this.transformCards()
  },
  beforeDestroy() {
    this.$el.removeEventListener('wheel', this.onWheel)
  },
  methods: {
    transformCards() {
      this.cards.forEach((card, i) => {
        // const index = this.TRANSLATE_INDEX + (i * 10)
        const delay = (i * 400)
        const translate = this.lastScroll * 50 - delay

        const opacity = Math.abs(translate) < 1000 ? this.lastScroll / 2 / (i + 1) : 0

        console.log({ translate, opacity })

        card.style.transform = `translate3d(0, ${translate}px, ${translate}px)`
        card.style.opacity = opacity
      })
    },
    onWheel(e) {
      const { deltaY } = e
      const direction = deltaY > 0 ? 1 : -1

      // if (this.lastScroll >= this.TRANSLATE_INDEX / 100) {
      //   // this.lastScroll = 0
      //   return
      // }

      this.lastScroll += direction

      this.transformCards()
    },
  },
}
</script>

<style lang="scss">
.works-list {
  // @extend %row;
  // justify-content: space-between;

  position: relative;
  // overflow: hidden;
  width: 100%;
  flex-grow: 1;

  perspective: 1000px;

  &__item {
    width: 100%;
    max-width: 30%;
    margin-bottom: 100px;

    position: absolute;
    top: 10%;
    left: 10%;

    // transform: translate3d(0, 0, -2000px);
    transition: transform 0.4s linear, opacity .4s linear;

    // @extend %hidden;

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
