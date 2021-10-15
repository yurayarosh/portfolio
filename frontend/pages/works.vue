<template>
  <section class="s-works">
    <div class="s-works__inner">
      <div class="container">
        <div class="s-works__title-wrap">
          <h1 ref="title" class="s-works__title title title--h1">{{ metatags.h1 }}</h1>
        </div>
      </div>

      <div ref="body" class="s-works__body">
        <v-works :list="worksList" :animations-complete="animationsComplete" />
      </div>
    </div>
  </section>
</template>

<script>
import anime from 'animejs'
import transitionMixin from '~/mixins/transition'
import microdataMixin from '~/mixins/microdata'
import headMixin from '~/mixins/head'
import { sortList } from '~/assets/scripts/helpers'

export default {
  name: 'PageWorks',
  mixins: [headMixin, transitionMixin, microdataMixin],
  async asyncData({ store }) {
    const { alias, metatags, breadcrumbs } =
      (await store.dispatch('fetchCollection', {
        collection: 'works',
      })) || {}

    const works =
      (await store.dispatch('fetchCollection', {
        collection: 'work-items',
      })) || []

    return {
      alias,
      metatags,
      breadcrumbs,
      works,
    }
  },
  data() {
    return {
      animationsComplete: false,
    }
  },
  computed: {
    worksList() {
      // const NUMBER_OF_DIFFERENT_STYLED_ITEMS = 6
      sortList(this.works, 'number', { title: 'index' }) // Sort by date.
      return this.works

      // const chunkedList = chunkArray(this.works, NUMBER_OF_DIFFERENT_STYLED_ITEMS) // Output: [[{}, ...], [{}, ...], ...]

      // const listWithIndexes = chunkedList.map(arr =>
      //   arr.map((item, i) => ({ ...item, index: i + 1 }))
      // )

      // return listWithIndexes.flat()
    },
  },
  methods: {
    animateEntrance() {
      const { title, body } = this.$refs
      const cards = body.querySelectorAll('.work-card')
      const tl = anime.timeline({ easing: 'easeInOutSine' })

      tl.add({
        targets: title,
        translateY: ['102%', '0%'],
        duration: 750,
      }).add(
        {
          targets: cards,
          translateY: ['102%', '0%'],
          duration: 750,
          // easing: 'easeInSine',
        },
        0
      )

      tl.finished.then(() => {
        this.animationsComplete = true
        cards.forEach(card => {
          card.style.transform = ''
        })
      })
    },
  },
}
</script>

<style lang="scss">
.s-works {
  &__title-wrap {
    overflow: hidden;
    margin-bottom: 100px;

    @include xxxl {
      margin-bottom: vw(100);
    }
  }

  &__title {
    position: relative;
    z-index: 1;
    transform: translate(0, 102%);
  }

  &__inner {
    display: flex;
    flex-direction: column;

    height: calc(100vh - #{$header-height + $footer-height + px});

    @include md {
      height: calc(100vh - #{$header-height-md + $footer-height-md + px});
    }

    @include xs {
      height: auto;
    }
  }

  &__body {
    flex-grow: 1;
    // opacity: 0;

    @media (min-width: 100vh) {
      padding-left: var(--container-offset);
    }

    @media (max-width: 100vh) {
      width: 100%;
      max-width: $base-container + px;
      padding-left: $gap-container + px;
      padding-right: $gap-container + px;
    }

    .works-list {
      height: 100%;
    }

    html:not(.no-touch) & {
      overflow: hidden;

      .works-list {
        @media (min-width: 100vh) {
          margin-bottom: -17px;
          height: calc(100% + 17px);
        }

        @media (max-width: 100vh) {
          margin-right: -17px;
          width: calc(100% + 17px);
        }

        @include xs {
          margin-right: 0;
          width: 100%;
        }
      }
    }
  }
}
</style>
