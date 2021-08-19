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
  },

  data() {
    return {
      isFocus: false,
      showErrors: false,
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
      this.showErrors = true
    },
  },
}
</script>

<style lang="scss">
.input {
  &__label {
    display: block;
    margin-bottom: 5px;
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
