<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="(item, i) in navList" :key="i" class="nav__item">
        <nuxt-link
          :to="item.to || '/'"
          class="nav__link"
          active-class="nav__link--active"
          exact-active-class="nav__link--exact-active"
          >{{ item.title }}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'VNav',
  props: {
    list: {
      type: Array,
      default: () => [
        {
          title: 'home',
          to: '/',
        },
        {
          title: 'about',
          to: '/about',
        },
        {
          title: 'works',
          to: '/works',
        },
        {
          title: 'contact',
          to: '/contact',
        },
      ],
    },
  },
  computed: {
    navList() {
      return this.$route.name.includes('index') ? this.list.slice(1) : this.list
    },
  },
}
</script>

<style lang="scss">
.nav {
  @include f-title;
  font-size: 120px;
  font-weight: 700;

  text-align: center;
  text-transform: uppercase;

  // &__list {
  //   // @extend %row;

  //   // justify-content: center;
  // }

  &__item {
    @extend %flex-center;

    overflow: hidden;
  }

  &__link {
    $transition-duration: 400;

    display: block;
    width: 100%;

    position: relative;
    display: inline-block;
    overflow: hidden;

    transform: translate(-100%, 0);

    &::before {
      content: '';

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      height: 0.1em;
      background-color: $accent;

      transition: transform 0.4s $easeInSine;

      transform: translate(-101%, 0);
    }

    @include hover {
      &::before {
        transform: translate(0, 0);
      }
    }

    // @include hover {
    //   &::before {
    //     @include tr(transform #{$transition-duration + ms} $easeInSine);

    //     transform: translate(0, 0);
    //   }

    //   &::after {
    //     transition-delay: $transition-duration + ms;
    //     transform: translate(0, 0);
    //   }
    // }

    // &::before,
    // &::after {
    //   content: '';
    //   position: absolute;
    //   z-index: 0;
    //   bottom: 0;
    //   left: 0;
    //   height: 3px;
    //   width: 100%;
    //   background-color: $accent;
    // }

    // &::before {
    //   transform: translate(-101%, 0);
    // }

    // &::after {
    //   @include tr(transform 0.4s $easeInSine);

    //   transform: translate(101%, 0);
    // }
  }
}
</style>
