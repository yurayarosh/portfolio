<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <p>Copyright &copy; {{ year }}</p>
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
