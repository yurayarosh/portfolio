<template>
  <component
    :is="tagIs"
    class="btn"
    :class="{ btn_disabled: disabled }"
    :href="href"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onClick"
  >
    <span class="btn__title"><slot /></span>
    <svg class="btn__border">
      <!-- <rect class="btn__border-rect btn__border-rect--text" /> -->
      <rect class="btn__border-rect btn__border-rect--accent" />
    </svg>
  </component>
</template>
<script>
export default {
  name: 'VBtn',
  props: {
    href: {
      type: [String, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tagIs() {
      return this.href ? 'a' : 'button'
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss">
.btn {
  $this: &;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 320px;

  padding: 0.95em 0.1em;

  text-transform: uppercase;
  color: $white;

  overflow: hidden;
  position: relative;

  transition: color .75s;

  &::before {
    content: '';

    @extend %coverdiv;
    z-index: 0;
    background-color: $c-text;

    // transform: translate(-101%, 0);
    transition: transform 0.75s cubic-bezier(1,-0.39,.34,.91);
  }

  &:not(#{$this}--no-hover) {
    @include hover {
      color: $c-text;

      #{$this}__border-rect--accent {
        stroke-dashoffset: 0;
        
        transition-delay: 0.35s;
      }

      &::before {
        transform: translate(101%, 0);
        transition-delay: 0s;
      }
    }
  }

  &__border {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__border-rect {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 5;

    &--accent {
      stroke: $c-text;
      stroke-dasharray: 800;
      stroke-dashoffset: 800;

      transition: stroke-dashoffset 0.5s $easeInSine;
      // transition-delay: 0.35s;
    }

    &--text {
      stroke: $c-text;
    }
  }

  &__title {
    position: relative;
    z-index: 1;
  }
}
</style>
