<template>
  <ul class="works-list">
    <li
      v-for="(item, i) in list"
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
</template>

<script>
export default {
  name: 'VWorks',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="scss">
.works-list {
  position: relative;

  flex-grow: 1;

  overflow: auto;
  white-space: nowrap;
  font-size: 0;

  &__item {
    display: inline-block;
    vertical-align: top;
    font-size: 1rem;

    height: 50%;
    width: 35vw;

    &:not(:first-child) {
      margin-left: -4%;
    }

    &:nth-child(6n + 2),
    &:nth-child(6n + 6) {
      margin-top: 20%;
    }

    &:nth-child(6n + 3) {
      margin-top: 10%;
    }

    &:nth-child(6n + 4) {
      margin-top: 17%;
    }

    &:nth-child(6n + 5) {
      margin-top: 4%;
    }
  }
}

.work-card {
  display: flex;
  flex-direction: column;

  color: $white;
  position: relative;

  text-align: center;

  height: 100%;
  width: 100%;

  &__img {
    position: relative;
    z-index: 0;
    // padding-top: 66%;
    background-color: $light;

    width: 100%;
    height: 100%;

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
