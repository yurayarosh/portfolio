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
      const inner = el.querySelector('.preloader__inner')
      anime({
        targets: inner,
        translateY: ['-100%', '0%'],
        duration: 750,
        easing: 'easeOutQuad',
        complete() {
          done()
        },
      })
    },
    onLeave(el, done) {
      anime({
        targets: el,
        translateY: ['0%', '100%'],
        duration: 750,
        easing: 'easeOutQuad',
        complete() {
          done()
        },
      })
    },
  },
}
</script>

<style lang="scss">
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
