<template>
  <div class="input" :class="classes">
    <label v-if="label" class="input__label" :for="id || _uid">{{ label }}</label>
    <div class="input__input-wrap">
      <component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        :id="id || _uid"
        v-bind="$attrs"
        class="input__input"
        :value="value"
        :type="type"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        >{{ type === 'textarea' ? value : '' }}</component
      >
    </div>
    <transition name="input__errors" duration="1000">
      <div v-show="errorMessage && showErrors" class="input__errors">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>
<script>
import { HAS_FOCUS, HAS_LABEL, HAS_TEXT } from '~/assets/scripts/constants'

export default {
  name: 'Input',
  inheritAttrs: false,
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    showErrors: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFocus: false,
    }
  },
  computed: {
    classes() {
      return {
        [`input--${HAS_FOCUS}`]: this.isFocus,
        [`input--${HAS_LABEL}`]: !!this.label,
        [`input--${HAS_TEXT}`]: !!this.value,
      }
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    onFocus(e) {
      this.$emit('focus', e)
      this.isFocus = true
    },
    onBlur(e) {
      this.$emit('blur', e)
      this.isFocus = false
    },
  },
}
</script>

<style lang="scss">
.input {
  $this: &;

  position: relative;

  &__input-wrap {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      border-bottom: 3px solid $c-text;
      transform: translate(-101%, 0);

      transition: transform 0.5s $easeInSine;
    }
  }

  &__label {
    display: block;

    position: absolute;
    pointer-events: none;

    top: 14px;
    left: 0;

    transition: transform 0.35s $easeInSine, font-size 0.35s $easeInSine;

    @include xs {
      top: 7px;
    }
  }

  &__errors {
    position: absolute;
    left: 0;
    top: 100%;

    margin-top: 0.5em;

    color: $danger;
    font-size: 0.7em;

    transition: opacity 0.5s;

    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  #{$text-inputs} {
    width: 100%;
    height: 49px;
    background-color: transparent;
    border-bottom: 3px solid lighten($c-text, 50%);
    padding: 0.5em 0;

    transition: border-color 0.4s, color 0.4s;

    @include placeholder {
      color: lighten($c-text, 30%);
    }

    @include xs {
      height: 40px;
    }
  }

  textarea {
    min-height: 100px;
  }

  &--focus,
  &--has-text {
    #{$this}__input-wrap {
      &::after {
        transform: translate(0, 0);
      }
    }

    #{$this}__label {
      transform: translate(0, -30px);
      font-size: 0.8em;

      @include xs {
        transform: translate(0, -24px);
      }
    }
  }
}
</style>
