<template>
  <section class="section s-contacts">
    <div class="container">
      <div class="s-contacts__inner">
        <div class="s-contacts__title-wrap">
          <h1 ref="title" class="s-contacts__title title title--h1">Contact me</h1>
        </div>

        <div class="form__wrap s-contacts__form">
          <transition name="form">
            <div v-if="submitStatus === 'OK'" class="form__success">
              <p class="form__success-message">Thank you. I' ll contact you shortly.</p>
              <button
                class="form__success-close"
                type="button"
                aria-label="close"
                @click="onSuccessCloseClick"
              >
                Close
              </button>
            </div>
          </transition>

          <form
            class="form"
            :class="{ 'form--hidden': submitStatus === 'OK' }"
            @submit.prevent="onSubmit"
          >
            <div
              v-for="input in form.inputs"
              :key="input.id"
              class="form__field"
              :class="{ 'form__field--overflow-hidden': !animationsComplete }"
            >
              <v-input
                v-if="$v[input.name]"
                :ref="`VInput-${input.name}`"
                v-model.trim="$v[input.name].$model"
                :type="input.type"
                :name="input.name"
                :label="input.label"
                :placeholder="input.placeholder"
                :error-message="errorMessages[input.name]"
                :show-errors="$v[input.name].$error"
                :class="{
                  'input--error': input.validation ? $v.$dirty && $v[input.name].$error : false,
                }"
              />
            </div>

            <div
              class="form__field"
              :class="{ 'form__field--overflow-hidden': !animationsComplete }"
            >
              <v-btn ref="button" :disabled="submitStatus === 'PENDING'">send</v-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from 'animejs'
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'

import transitionMixin from '~/mixins/transition'
import { getFormInputs } from '~/assets/scripts/helpers'

export default {
  name: 'PageContact',
  mixins: [validationMixin, transitionMixin],
  data() {
    const { inputs } = getFormInputs(this.$store.state.feedbackForm)

    return {
      ...inputs,
      formName: 'feedback',
      submitStatus: null,
      animationsComplete: false,
    }
  },
  computed: {
    ...mapState({
      form: ({ feedbackForm }) => feedbackForm,
    }),
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
    formData() {
      const { inputs } = getFormInputs(this.form)
      const data = {
        type: this.formName,
      }

      Object.keys(inputs).forEach(key => {
        data[key] = this[key]
      })

      return data
    },
  },
  methods: {
    animateEntrance() {
      const { title } = this.$refs
      const inputs = Object.values(this.$refs)
        .filter((ref, i) => Object.keys(this.$refs)[i].includes('VInput'))
        .map(ref => ref[0]?.$el || ref.$el)

      const fields = [...inputs, this.$refs.button.$el]
      const tl = anime.timeline({ easing: 'easeInOutSine' })

      tl.add({
        targets: title,
        translateY: ['102%', '0%'],
        duration: 750,
      }).add(
        {
          targets: fields,
          translateY: ['150%', '0%'],
          duration: 750,
        },
        '-=500'
      )

      tl.finished.then(() => {
        this.animationsComplete = true
      })
    },
    async handleFeedback() {
      const date = new Date().toLocaleString()
      let message = `Дата: ${date}`

      if (this.formData.name) message += `\nИмя: ${this.formData.name}`
      if (this.formData.message) message += `\nСообщение: ${this.formData.message}`

      try {
        // Save data to `feedbacks` mongodb collection.
        const dbResponse = await fetch(`${process.env.BASE_URL_BACK}/feedbacks`, {
          method: 'post',
          body: JSON.stringify(this.formData),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // Send data to telegram chat.
        const telegramResponse = await fetch(
          `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: message,
            }),
          }
        )

        if (dbResponse.ok && telegramResponse.ok) {
          this.submitStatus = 'OK'
        } else {
          this.submitStatus = 'ERROR'

          throw new Error('Feedback form responce error.', {
            dbResponse: dbResponse.statusText,
            telegramResponse: telegramResponse.statusText,
          })
        }
      } catch (error) {
        this.submitStatus = 'ERROR'
        throw new Error('Form submit error.', error)
      }
    },
    resetForm() {
      const { inputs } = getFormInputs(this.form)

      Object.keys(inputs).forEach(key => {
        const inputElement = this.$refs[`VInput-${key}`][0]?.$el.querySelector('input, textarea')

        this[key] = ''
        inputElement.value = ''
      })

      this.submitStatus = null
      this.$v.$reset()
    },
    onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.handleFeedback()
      }
    },
    onSuccessCloseClick() {
      this.resetForm()
    },
  },
  validations() {
    const { validations } = getFormInputs(this.form)

    return {
      ...validations,
    }
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
  }
}

.form {
  transition: opacity 0.5s, visibility 0.5s;

  &__wrap {
    position: relative;
  }

  &__success {
    @extend %coverdiv;
    @extend %flex-center;
    text-align: center;
    padding: 10px;

    z-index: 1;

    border: 2px solid $c-text;
  }

  &__success-message {
    @include f-title;
    font-size: 1.2em;
  }

  &__success-close {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &__field {
    .input,
    .btn {
      transform: translate(0, calc(102% + 2.3em));
    }

    @include notlast {
      margin-bottom: 60px;
    }

    &:last-child {
      margin-top: 30px;
    }

    &--overflow-hidden {
      overflow: hidden;
    }
  }

  &--hidden {
    @extend %hidden;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
