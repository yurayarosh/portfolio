<template>
  <div class="input" :class="classes">
    <label v-if="label" class="input__label" :for="_uid">{{ label }}</label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="_uid"
      v-bind="$attrs"
      class="input__input"
      :value="value"
      :type="type"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      >{{ type === 'textarea' ? value : '' }}</component
    >
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

  &__label {
    display: block;

    position: absolute;
    pointer-events: none;

    top: 14px;
    left: 0;

    transition: transform 0.35s $easeInSine, font-size 0.35s $easeInSine;
  }

  &__errors {
    margin-top: 0.5em;
  }

  #{$text-inputs} {
    width: 100%;
    height: 49px;
    background-color: transparent;
    border: 1px solid transparent;
    border-bottom-color: rgba($c-text, 0.6);
    padding: 0.5em 0;

    @include tr(border-color 0.4s, color 0.4s);

    @include placeholder {
      color: rgba($c-text, 0.6);
    }

    @include xs {
      font-size: 16px;
    }

    &:focus {
      color: $c-text;
      border-bottom-color: currentColor;
    }
  }

  textarea {
    min-height: 100px;
  }

  &--focus,
  &--has-text {
    #{$this}__label {
      transform: translate(0, -21px);
      font-size: 0.8em;
    }
  }

  &--error {
    color: $danger;

    #{$text-inputs} {
      border-bottom-color: $danger;
      color: $danger;

      @include placeholder {
        color: $danger;
      }

      &:focus {
        color: $danger;
      }
    }
  }
}
</style>
