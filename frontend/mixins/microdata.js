export default {
  data() {
    return {
      pageData: {},
    }
  },
  computed: {
    organizationName() {
      return this.generalInfo?.organization_name[`title_${this.LANGUAGE}`]
    },
  },
  jsonld() {
    // type person example
    // {
    //   "@context": "http://schema.org",
    //   "@type": "Person",
    //   "name": "Jane Doe",
    //   "jobTitle": "Frontend developer",
    //   "gender": "http://schema.org/Male",
    //   "email": "info@example.com",
    //   "telephone": "(123) 456-6789",
    //   "url": "http://www.example.com",
    //   "sameAs": ["https://www.linkedin.com/in/yurayarosh/"]
    // }

    const baseOrganization = {
      '@type': 'Organization',
      name: this.organizationName,
      url: `${process.env.BASE_URL_PROD}/`,
      logo: {
        '@context': 'http://schema.org',
        '@type': 'ImageObject',
        url: `${process.env.BASE_URL_PROD}${this.$icon(512)}`,
        width: 512,
        height: 512,
      },
    }

    const organization = {
      '@context': 'https://schema.org',
      ...baseOrganization,
      sameAs: this.generalInfo?.social.map(({ url }) => url),
      diversityPolicy: `${process.env.BASE_URL_PROD}/`,
      ethicsPolicy: `${process.env.BASE_URL_PROD}/`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: this.generalInfo?.phones?.[0].title,
          contactType: 'sales',
          areaServed: this.LANGUAGE,
        },
      ],
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

    return [
      // organization,
      breadcrumbs
    ].filter(item => item)
  },
}
