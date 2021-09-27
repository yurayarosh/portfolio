<template>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">
        <div class="hero__content">
          <p class="hero__subttl title title--h1">Yurii Yaroshenko</p>
          <h1 class="hero__title">Frontend developer.</h1>

          <p class="hero__text">
            Hi, nice to see you here! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perspiciatis, quia.
          </p>
        </div>

        <!-- <div class="hero__img" /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHome',
}
</script>

<style lang="scss">
.hero {
  position: relative;

  &__inner {
    display: flex;
    align-items: center;

    height: calc(100vh - #{$header-height + $footer-height + px});

    @include md {
      height: calc(100vh - #{$header-height-md + $footer-height-md + px});
    }
  }

  &__text {
    @include xsmin {
      width: 50%;
    }
  }

  &__text {
    font-size: 40px;

    padding-right: 15px;

    @include xxxl {
      font-size: vw(40);
    }

    @include xl {
      font-size: vw(50);
    }

    @include xs {
      font-size: 1rem;
    }
  }

  &__img {
    padding-left: 15px;
  }

  &__title {
    font-size: 56px;
    margin-bottom: 40px;

    @include xxxl {
      font-size: vw(56);
    }

    @include xl {
      font-size: vw(70);
    }

    @include xs {
      font-size: 1.1rem;
    }
  }

  &__subttl {
    @include notlast {
      margin-bottom: 30px;
    }
  }
}
</style>
