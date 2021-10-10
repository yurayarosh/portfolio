import { mapState } from 'vuex'

export default {
  data() {
    return {
      LANGUAGE: 'en',
    }
  },
  computed: {
    ...mapState({
      globalData: ({ globalData }) => globalData,
    }),
  },
  head() {
    const title = `${this.globalData?.name || ''} ${this.globalData?.surname || ''} | ${this
      .globalData?.job_title || ''}`
      
    return {
      htmlAttrs: {
        lang: this.LANGUAGE,
      },
      title: this.metatags?.title || title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metatags?.description || title,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.metatags?.title || title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metatags?.description || title,
        },
        {
          property: 'og:url',
          content: `${process.env.BASE_URL_PROD}${this.$URL(this.alias || '')}`,
        },
        {
          property: 'og:locale',
          content: this.LANGUAGE,
        },
        {
          property: 'og:image',
          content:
            this.metatags?.media_og_image?.url ||
            this.globalData?.media_og_image?.url ||
            this.$icon(512),
        },
        {
          property: 'og:image:height',
          content: '628',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:type',
          content: 'image/jpeg',
        },
      ],
      link: [
        {
          rel: 'alternate',
          href: `${process.env.BASE_URL_PROD}/${this.alias || ''}`,
          hreflang: this.LANGUAGE,
        },
        {
          rel: 'alternate',
          href: `${process.env.BASE_URL_PROD}/${this.alias || ''}`,
          hreflang: 'x-default',
        },
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL_PROD}${this.$URL(this.alias || '')}`,
        },
      ],
    }
  },
}
