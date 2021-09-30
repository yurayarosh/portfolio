<template>
  <transition name="preloader" :css="false" @enter="onEnter" @leave="onLeave">
    <client-only>
      <div v-if="isLoading" class="preloader">
        <div class="preloader__inner">
          <div class="spinner" />
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

  // mounted() {
  //   console.log('preloader', this.isLoading)
  // },
  // methods: {
  //   onEnter(el, done) {
  //     // setTimeout(done, 1000)
  //     // const tl = anime.timeline({ easing: 'easeInOutSine' })

  //     // tl.add({
  //     //   targets
  //     // })
  //     console.log({ el })
  //     anime({
  //       targets: el,
  //       translateY: ['-100%', '0%'],
  //       duration: 750,
  //       easing: 'easeOutQuad'
  //     })
  //     done()
  //   },
  // },
}
</script>

<style lang="scss">
.preloader {
  @extend %overlay;
  z-index: $z-index-preloader;

  // background-color: $light;
  overflow: hidden;

  &__inner {
    @extend %flex-center;

    width: 100%;
    height: 100%;

    background-color: $black;
    color: $white;

    transform: translate(0, -100%);
  }
}

.spinner {
  width: 80px;
  height: 80px;
  background-color: currentColor;

  border-radius: 100%;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@keyframes sk-scaleout {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
