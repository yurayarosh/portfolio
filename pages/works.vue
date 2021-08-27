<template>
  <section class="section">
    <div class="container">
      <h1 class="section__title title title--h1">Works</h1>

      <ul class="works-list">
        <li v-for="(item, i) in worksList" :key="i" class="works-list__item">
          <div class="work-card">
            <div class="work-card__img">
              <img :src="item.image.src" :alt="item.image.alt" :title="item.image.title" />
            </div>

            <div class="work-card__content">
              <p class="work-card__title">{{ item.title }}</p>
              <div class="work-card__text">
                <div v-html="item.text" />
                <a :href="item.productionUrl" class="work-card__link" target="_blank" rel="noopener"
                  >Visit site</a
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageWorks',
  data() {
    return {
      worksList: [
        {
          productiontUrl: '#',
          image: {
            src: '/img/works/works-1.jpg',
            alt: '',
            title: '',
          },
          title: 'Work title',
          text: '<p>Description text</p>',
        },
      ],
    }
  },
}
</script>
