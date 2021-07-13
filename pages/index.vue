<template>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">
        <div class="hero__content">
          <p class="hero__subttl title title--h1">Yurii Yaroshenko</p>
          <h1 class="hero__title">Frontend developer.</h1>

          <p class="hero__text">
            Hi, nice to see you here!
          </p>
        </div>

        <div class="hero__img" />
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
  }

  &__text,
  &__img {
    width: 50%;
  }

  &__text {
    font-size: 40px;

    padding-right: 15px;
  }

  &__img {
    padding-left: 15px;
  }

  &__title {
    font-size: 56px;
    margin-bottom: 40px;
  }

  &__subttl {
    @include notlast {
      margin-bottom: 30px;
    }
  }
}
</style>
