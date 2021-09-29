<template>
  <transition name="preloader" :css="false" @enter="onEnter">
    <div v-if="isLoading" class="preloader">
      <div class="spinner" />
    </div>
  </transition>
</template>

<script>
import anime from 'animejs'
import { mapGetters } from 'vuex'

export default {
  name: 'VPreloader',
  computed: {
    ...mapGetters({
      isLoading: 'layout/isLoading',
    }),
  },
  // mounted() {
  //   console.log('preloader', this.isLoading)
  // },
  methods: {
    onEnter(el, done) {
      // setTimeout(done, 1000)
      // const tl = anime.timeline({ easing: 'easeInOutSine' })

      // tl.add({
      //   targets
      // })
      console.log({ el })
      anime({
        targets: el,
        translateY: ['-100%', '0%'],
        duration: 750,
        easing: 'easeOutQuad'
      })
      done()
    },
  },
}
</script>

<style lang="scss">
.preloader {
  @extend %flex-center;
  @extend %overlay;
  z-index: $z-index-preloader;

  background-color: $black;
  color: $white;

  transform: translate(0, -100%);
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
