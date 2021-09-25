<template>
  <section class="s-works">
    <div class="s-works__inner">
      <div class="container">
        <h1 class="s-works__title section__title title title--h1">Works</h1>
      </div>

      <div class="s-works__body">
        <v-works :list="worksList" />
      </div>
    </div>
  </section>
</template>

<script>
import { chunkArray } from '@/assets/scripts/helpers'

export default {
  name: 'PageWorks',
  data() {
    return {
      works: [
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
        {
          productionUrl: '#',
          image: {
            src: 'https://source.unsplash.com/Y7GUOQ83OMg/600x400',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
      ],
    }
  },
  computed: {
    worksList() {
      const NUMBER_OF_DIFFERENT_STYLED_ITEMS = 6
      // sortList(this.works, 'date') // Sort posts by date.

      const chunkedList = chunkArray(this.works, NUMBER_OF_DIFFERENT_STYLED_ITEMS) // Output: [[{}, ...], [{}, ...], ...]

      const listWithIndexes = chunkedList.map(arr =>
        arr.map((item, i) => ({ ...item, index: i + 1 }))
      )

      return listWithIndexes.flat()
    },
  },
}
</script>

<style lang="scss">
.s-works {
  // overflow: hidden;

  &__title {
    position: relative;
    z-index: 1;

    margin-bottom: 100px;

    @include xxxl {
      margin-bottom: vw(100);
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;

    height: calc(100vh - #{$header-height + $footer-height + px});
  }

  &__body {
    padding-left: var(--container-offset);

    flex-grow: 1;

    .works-list {
      height: 100%;
    }
  }
}
</style>
