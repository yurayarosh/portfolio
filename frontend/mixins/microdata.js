import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['globalData']),
  },
  jsonld() {
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: `${this.globalData?.name} ${this.globalData?.surname}`,
      jobTitle: this.globalData?.job_title,
      gender: 'http://schema.org/Male',
      url: `${process.env.BASE_URL_PROD}/`,
      logo: {
        '@context': 'http://schema.org',
        '@type': 'ImageObject',
        url: `${process.env.BASE_URL_PROD}${this.$icon(512)}`,
        width: 512,
        height: 512,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: this.globalData?.phone,
          email: this.globalData?.email,
          contactType: 'Frontend services',
        },
      ],
      sameAs: this.globalData?.socials.reduce(
        (arr, { url }) =>
          url.includes('http') && !url.includes('t.me') ? [...arr, url] : [...arr],
        []
      ),
    }

    let breadcrumbsItems = []

    if (this.breadcrumbs) {
      breadcrumbsItems = this.breadcrumbs.map((item, i) => {
        const id = `${process.env.BASE_URL_PROD}${this.$URL(item.url)}`

        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            id,
            '@type': 'WebPage',
            name: item.title,
          },
        }
      })
    }

    const breadcrumbs =
      breadcrumbsItems.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbsItems,
          }
        : null

    return [person, breadcrumbs].filter(item => item)
  },
}
