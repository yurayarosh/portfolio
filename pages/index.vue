<template>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">
        <div class="hero__text">
          <h1 class="hero__title title title--h1">Lorem, ipsum.</h1>

          <p class="hero__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, voluptatum!</p>
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

    min-height: 100vh;
  }

  &__text,
  &__img {
    width: 50%;
  }

  &__text {
    padding-right: 15px;
  }

  &__img {
    padding-left: 15px;
  }

  &__title {
    margin-bottom: 40px;
  }
}
</style>
