<template>
  <section v-if="error.statusCode === 404" class="hero hero--static">
    <div class="container">
      <transition name="fade">
        <div v-if="isLoaded" class="hero__inner">
          <div class="hero__content">
            <p class="hero__title title title--xl">{{ metatags.h1 }}</p>

            <p class="hero__text" v-html="text" />

            <v-btn
              :href="$URL(link.url)"
              @click.prevent="$router.push($URL(link.url))"
              class="hero__btn"
              >{{ link.title }}</v-btn
            >
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
// import transitionMixin from '~/mixins/transition'
import microdataMixin from '~/mixins/microdata'
import headMixin from '~/mixins/head'

export default {
  name: 'ErrorPage',
  layout: 'error',
  mixins: [
    headMixin,
    // transitionMixin,
    microdataMixin,
  ],
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    const pageData = await this.$store.dispatch('fetchCollection', {
      // baseUrl: 'production',
      collection: 'error-page',
    })

    const globalData = await this.$store.dispatch('fetchCollection', {
      // baseUrl: 'production',
      collection: 'global',
    })

    const { navigation } = await this.$store.dispatch('fetchCollection', {
      collection: 'menu',
    })

    this.metatags = pageData.metatags
    this.text = pageData.text
    this.link = pageData.link

    this.$store.commit('setGlobalData', globalData)
    this.$store.commit('setNavigation', navigation)
  },
  data() {
    return {
      metatags: {},
      text: '',
      link: {},
    }
  },
  computed: {
    ...mapGetters(['isLoaded']),
  },
  beforeDestroy() {
    this.$store.commit('preloader/start')
  },
}
</script>
