<template>
  <section class="section s-contacts">
    <div class="container">
      <div class="s-contacts__inner">
        <h1 class="section__title title title--h1">Contact me.</h1>

        <form class="s-contacts__form form" @submit.prevent="onSubmit">
          <div class="form__field">
            <v-input v-model="name" placeholder="Your name" />
          </div>
          <div class="form__field">
            <v-input v-model="message" placeholder="Your phone, email or just say hello" />
          </div>

          <div class="form__field">
            <v-btn>send</v-btn>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageContact',
  data() {
    return {
      name: '',
      message: '',
    }
  },
  methods: {
    onSubmit() {
      this.formData = {
        name: this.name,
        message: this.message,
      }

      console.log(this.formData)
    },
  },
}
</script>

<style lang="scss">
.s-contacts {

  &__form {
    max-width: 500px;
  }
}

.form {
  &__field {
    @include notlast {
      margin-bottom: 15px;
    }

    &:last-child {
      margin-top: 30px;
    }
  }
}
</style>
