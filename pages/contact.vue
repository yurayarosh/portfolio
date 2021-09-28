<template>
  <section class="section s-contacts">
    <div class="container">
      <div class="s-contacts__inner">
        <div class="s-contacts__title-wrap">
          <h1 ref="title" class="s-contacts__title title title--h1">Contact me</h1>
        </div>

        <form ref="form" class="s-contacts__form form" @submit.prevent="onSubmit">
          <div class="form__field">
            <v-input
              v-model="$v.name.$model"
              :class="{ 'input--error': $v.name.$error }"
              :error-message="errorMessages.name"
              :show-errors="$v.name.$error"
              label="Your name"
            />
          </div>
          <div class="form__field">
            <v-input
              v-model="$v.message.$model"
              :class="{ 'input--error': $v.message.$error }"
              :error-message="errorMessages.message"
              :show-errors="$v.message.$error"
              label="Your phone, email or just say hello"
            />
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
import anime from 'animejs'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import transitionMixin from '~/mixins/transition'

export default {
  name: 'PageContact',
  mixins: [validationMixin, transitionMixin],
  data() {
    return {
      name: '',
      message: '',
      submitStatus: null,
    }
  },
  computed: {
    errorMessages() {
      const self = this
      return {
        get name() {
          const { required, minLength, maxLength, format, $error } = self.$v.name
          if (!required)
            return "You haven' t provided a name. Isn' t there some way you'd like me to address you?"
          if (!minLength) return 'It should be more then two characters.'
          if (!maxLength) return 'I won’t remember such a long name.'
          if (!format) return 'Only letters, numbers, spaces and dashes are allowed.'
          if ($error) return 'The name contains errors.'
          return ''
        },
        get message() {
          const { required, minLength, $error } = self.$v.message
          if (!required)
            return "You haven' t provided any message or contact. I won' t be able to answer you."
          if (!minLength) return 'It should be more then two characters.'
          if ($error) return 'The message contains errors.'
          return ''
        },
      }
    },
  },
  mounted() {
    this.animateEntrance()
  },
  methods: {
    animateEntrance() {
      const { title, form } = this.$refs
      const tl = anime.timeline({ easing: 'easeInOutSine' })

      tl.add({
        targets: title,
        translateY: ['102%', '0%'],
        duration: 750,
      })
        .add(
          {
            targets: form,
            opacity: [0, 1],
            duration: 750,
          },
          '-=500'
        )
    },
    onSubmit() {
      this.$v.$touch()

      this.formData = {
        name: this.name,
        message: this.message,
      }

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'

          // console.log('success', this.formData)
        }, 500)
      }
    },
  },
  validations: {
    name: {
      required,
      format(value) {
        return /^[A-Za-zА-Яа-я0-9 -]*?$/.test(value) // only letters(latin, cyr), numbers, spaces, minus sign
      },
      minLength: minLength(2),
      maxLength: maxLength(20),
    },
    message: {
      required,
      minLength: minLength(2),
    },
  },
}
</script>

<style lang="scss">
.s-contacts {
  &__title-wrap {
    overflow: hidden;
    margin-bottom: 50px;
  }

  &__title {
    transform: translate(0, 102%);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: calc(100vh - #{$header-height + $footer-height + px});
  }

  &__form {
    max-width: 500px;
    opacity: 0;
  }
}

.form {
  &__field {
    @include notlast {
      margin-bottom: 60px;
    }

    &:last-child {
      margin-top: 30px;
    }
  }
}
</style>
