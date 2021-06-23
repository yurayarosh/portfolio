<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="(item, i) in list" :key="i" class="nav__item">
        <nuxt-link
          :to="item.to || '/'"
          class="nav__link"
          active-class="nav__link--active"
          exact-active-class="nav__link--exact-active"
        >{{ item.title }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'VNav',
  props: {
    list: {
      type: Array,
      default: () => [
        {
          title: 'about',
        },
        {
          title: 'portfolio',
        },
        {
          title: 'contact',
        },
      ],
    },
  },
}
</script>

<style lang="sass">
.nav
  text-transform: uppercase
  &__list
    @extend %row
    justify-content: center

  &__item
    margin-left: 10px
    margin-right: 10px

  &__link
    position: relative
    display: inline-block
    overflow: hidden

    +hover
      &::before
        +tr(transform .4s $easeInExpo)
        transform: translate(0, 0)

      &::after
        transition-delay: .3s
        transform: translate(0, 0)

    &::before,
    &::after
      content: ''

      position: absolute
      bottom: 0
      left: 0

      height: 3px
      width: 100%
      background-color: $accent

    &::before
      transform: translate(-100%, 0)

    &::after
      +tr(transform .4s $easeInExpo)
      transform: translate(100%, 0)
</style>
