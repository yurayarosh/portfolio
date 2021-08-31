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
}
</script>

<style lang="scss">
.work-card {
  color: $black;
  position: relative;

  &__img {
    position: relative;
    z-index: 0;
    padding-top: 50%;
    background-color: $light;

    img {
      @extend %coverdiv;
      @extend %coverimage;
    }
  }

  &__content {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
  }
}
</style>
