<template>
  <component
    :is="tagIs"
    class="btn"
    :class="{ btn_disabled: disabled }"
    :href="href"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onCLick"
  >
    <slot />
  </component>
</template>
<script>
export default {
  name: 'VBtn',
  props: {
    href: {
      type: String,
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
    onCLick(e) {
      this.$emit('click', e)
    },
  },
}
</script>
