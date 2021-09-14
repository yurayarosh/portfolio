<template>
  <section class="section">
    <div class="container">
      <h1 class="section__title title title--h1">Works</h1>

      <ul class="works-list">
        <li
          v-for="(item, i) in worksList"
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
.works-list {
  @extend %row;
  justify-content: space-between;

  position: relative;

  &__item {
    width: 100%;
    max-width: 40%;
    margin-bottom: 100px;

    &--1 {
      max-width: 50%;
    }

    &--2 {
      margin-top: 50px;
    }

    &--3 {
      margin-left: 5%;
    }

    &--4 {
      max-width: 45%;
      margin-top: -100px;
      margin-right: 3%;
    }

    &--5 {
      margin-top: 100px;
      margin-left: 2%;
      max-width: 43%;
    }

    &--6 {
      margin-right: 1%;
      max-width: 50%;
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
