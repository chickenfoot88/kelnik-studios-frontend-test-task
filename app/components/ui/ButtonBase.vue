<template>
  <button class="button-base" @click="event => emit('click', event)">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

</script>

<style scoped lang="sass">
.button-base
  cursor: pointer
  font-size: rem(16px)
  font-weight: 500
  line-height: rem(24px)
  padding: 8px 24px
  color: $color-text-primary
  background: $color-white
  border-radius: 25px
  border: 1px solid rgba($color-text-primary, 0.2)
  transition: background $animation-duration ease

  &:hover
    background: rgba($color-text-primary, 0.05)

  &:active
    background: rgba($color-text-primary, 0.15)
</style>