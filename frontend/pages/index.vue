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
import headMixin from '~/mixins/head'

export default {
  name: 'PageHome',
  mixins: [headMixin, transitionMixin, microdataMixin],
  async asyncData({ store }) {
    const { alias, title, text, metatags, breadcrumbs } =
      (await store.dispatch('fetchCollection', {
        collection: 'home',
      })) || {}

    return {
      alias,
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
