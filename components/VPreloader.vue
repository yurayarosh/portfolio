<template>
  <transition name="preloader" :css="false" @enter="onEnter" @leave="onLeave">
    <client-only>
      <div v-if="isLoading" class="preloader">
        <div class="preloader__inner">
          <div class="preloader__ball" />
          <p class="preloader__text">loading...</p>
        </div>
      </div>
    </client-only>
  </transition>
</template>

<script>
import anime from 'animejs'
import { mapGetters } from 'vuex'

export default {
  name: 'VPreloader',
  computed: {
    ...mapGetters({
      isLoading: 'preloader/isLoading',
    }),
  },
  methods: {
    onEnter(el, done) {
      const tl = anime.timeline({ easing: 'easeOutQuad' })
      const header = document.querySelector('.layout__header')
      const footer = document.querySelector('.layout__footer')
      const inner = el.querySelector('.preloader__inner')

      tl.add({
        targets: inner,
        translateY: ['-100%', '0%'],
        duration: 750,
      })
        .add({
          targets: header,
          opacity: [1, 0],
          duration: 750,
        })
        .add(
          {
            targets: footer,
            opacity: [1, 0],
            duration: 750,
          },
          '-=750'
        )

      tl.finished.then(done)
    },
    onLeave(el, done) {
      const tl = anime.timeline({ easing: 'easeOutQuad' })
      const header = document.querySelector('.layout__header')
      const footer = document.querySelector('.layout__footer')

      tl.add({
        targets: el,
        translateY: ['0%', '100%'],
        duration: 750,
      })
        .add({
          targets: header,
          opacity: [0, 1],
          duration: 750,
        })
        .add(
          {
            targets: footer,
            opacity: [0, 1],
            duration: 750,
          },
          '-=750'
        )

      tl.finished.then(done)
    },
  },
}
</script>

<style lang="scss">
// Bouncing ball animation idea from https://codepen.io/wabeshew/pen/XdbBdM?editors=0110
$bounce-height: em(60);
$width: em(30);
$height: em(30);

.preloader {
  @extend %overlay;
  z-index: $z-index-preloader;

  // background-color: $light;
  overflow: hidden;

  font-size: 1.5em;

  &__inner {
    @extend %flex-center;

    width: 100%;
    height: 100%;

    background-color: $black;
    color: $white;

    transform: translate(0, -100%);
  }

  &__ball {
    display: inline-block;
    position: relative;
    height: $bounce-height + ($height * 2);
    width: $width;

    &:before {
      content: '';
      display: block;

      position: absolute;
      top: 0;

      width: $width;
      height: $height;

      border-radius: 50%;
      background-color: currentColor;
      animation: bounce 500ms alternate infinite $easeOutSine;
    }
  }

  &__text {
    display: inline-block;
    text-transform: uppercase;
    margin-left: 1em;
  }
}

@keyframes bounce {
  0% {
    height: em(20);
    border-radius: em(200) em(200) em(100) em(100);
    transform: translate(0, $bounce-height) scaleX(2);
  }
  35% {
    border-radius: 50%;
    transform: translate(0, $height) scaleX(1);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
