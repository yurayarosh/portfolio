<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <p>Yurii Yaroshenko &copy; {{ year }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'VFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss">
.footer {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;

    height: $footer-height + px;

    @include md {
      height: $footer-height-md + px;
    }
  }
}
</style>
