<template>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">
        <div class="hero__content">
          <div class="hero__title-wrap">
            <p ref="title" class="hero__title title title--h1">{{ title }}</p>
          </div>
          <div class="hero__subttl-wrap">
            <h1 ref="subtitle" class="hero__subttl">{{ metatags.h1 }}</h1>
          </div>

          <p ref="text" class="hero__text" v-html="text" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from 'animejs'
import transitionMixin from '~/mixins/transition'
import microdataMixin from '~/mixins/microdata'

export default {
  name: 'PageHome',
  mixins: [transitionMixin, microdataMixin],
  async asyncData({ store }) {
    const { title, text, metatags, breadcrumbs } =
      (await store.dispatch('fetchCollection', {
        collection: 'home',
      })) || {}

    return {
      title,
      text,
      breadcrumbs,
      metatags,
    }
  },
  methods: {
    animateEntrance() {
      const { title, subtitle, text } = this.$refs
      const tl = anime.timeline({ easing: 'easeInOutSine' })

      tl.add({
        targets: title,
        translateY: ['102%', '0%'],
        duration: 750,
      })
        .add(
          {
            targets: subtitle,
            translateY: ['102%', '0%'],
            duration: 750,
          },
          '-=500'
        )
        .add(
          {
            targets: text,
            opacity: [0, 1],
            duration: 750,
          },
          '-=500'
        )
    },
  },
}
</script>

<style lang="scss">
.hero {
  position: relative;

  &__inner {
    display: flex;
    align-items: center;

    height: calc(100vh - #{$header-height + $footer-height + px});

    @include md {
      height: calc(100vh - #{$header-height-md + $footer-height-md + px});
    }
  }

  &__text {
    @include xsmin {
      width: 50%;
    }
  }

  &__text {
    font-size: 40px;
    opacity: 0;

    padding-right: 15px;

    @include xxxl {
      font-size: vw(40);
    }

    @include xl {
      font-size: vw(50);
    }

    @include xs {
      font-size: 1rem;
    }
  }

  &__img {
    padding-left: 15px;
  }

  &__subttl-wrap {
    overflow: hidden;
    margin-bottom: 40px;
  }

  &__subttl {
    font-size: 56px;
    transform: translate(0, 102%);

    @include xxxl {
      font-size: vw(56);
    }

    @include xl {
      font-size: vw(70);
    }

    @include xs {
      font-size: 1.1rem;
    }
  }

  &__title-wrap {
    overflow: hidden;
    margin-bottom: 30px;
  }

  &__title {
    transform: translate(0, 102%);
  }
}
</style>
