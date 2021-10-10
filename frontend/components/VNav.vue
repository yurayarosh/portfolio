<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="(item, i) in navList" :key="item.id" class="nav__item">
        <nuxt-link
          :ref="`link-${i}`"
          :to="item.to || '/'"
          class="nav__link"
          active-class="nav__link--active"
          exact-active-class="nav__link--exact-active"
          @mouseenter.native="onLinkMouseEnter"
          @mouseleave.native="onLinkMouseLeave"
          ><span class="nav__link-title">{{ item.title }}</span
          ><span class="nav__link-title nav__link-title--hover">{{ item.title }}</span></nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import anime from 'animejs'
import { isTouch } from '~/assets/scripts/helpers'

export default {
  name: 'VNav',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    navList() {
      const list = this.$route.name?.includes('index') ? this.list.slice(1) : this.list
      return list.map(item => ({
        id: item.id,
        title: item.title,
        to: this.$URL(item.url),
      }))
    },
  },
  async mounted() {
    const { default: Splitting } = await import('splitting')

    const links = Object.values(this.$refs).map(comp => comp.$el || comp[0].$el)

    links.forEach(link => {
      const titles = [...link.children]

      titles.forEach(title => {
        Splitting({ target: title, by: 'chars' })
      })
    })
  },
  methods: {
    getLinkChars(link) {
      const titles = [...link.children]
      const title = titles[0]
      const titleHover = titles[1]

      return {
        defaultTitle: title.querySelectorAll('.char'),
        hoverTitle: titleHover.querySelectorAll('.char'),
      }
    },
    onLinkMouseEnter({ currentTarget }) {
      if (isTouch) return

      const { hoverTitle, defaultTitle } = this.getLinkChars(currentTarget)

      const tl = anime.timeline({ easing: 'easeInOutSine' })

      tl.add({
        targets: defaultTitle,
        translateY: ['0%', '101%'],
        duration: 400,
        delay: anime.stagger(40),
      }).add(
        {
          targets: hoverTitle,
          translateY: ['-101%', '0%'],
          duration: 400,
          delay: anime.stagger(40),
        },
        0
      )
    },
    onLinkMouseLeave({ currentTarget }) {
      if (isTouch) return

      const { hoverTitle, defaultTitle } = this.getLinkChars(currentTarget)

      const tl = anime.timeline({ easing: 'easeInOutSine' })

      tl.add({
        targets: defaultTitle,
        translateY: ['101%', '0%'],
        duration: 400,
        delay: anime.stagger(40),
      }).add(
        {
          targets: hoverTitle,
          translateY: ['0%', '-101%'],
          duration: 400,
          delay: anime.stagger(40),
        },
        0
      )
    },
  },
}
</script>

<style lang="scss">
.nav {
  @include f-title;
  font-size: 240px;
  font-weight: 700;
  line-height: 1;

  text-align: center;
  text-transform: uppercase;

  @include xxxl {
    font-size: vw(240);
  }

  @media (max-height: 50vw) {
    font-size: vh(240);
  }

  &__item {
    @extend %flex-center;

    overflow: hidden;

    @include notlast {
      margin-bottom: 0.2em;
    }
  }

  &__link-title {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    .word {
      @extend %flex-center;
      width: 100%;
    }

    &--hover {
      position: relative;
      color: transparent;
      -webkit-text-stroke: 0.05em $c-text;

      .char {
        transform: translate(0, -101%);
      }
    }
  }

  &__link {
    display: inline-block;
    position: relative;
    overflow: hidden;

    padding-left: 0.05em;
    padding-right: 0.05em;

    transform: translate(0, 100%);
  }
}
</style>
