<template>
    <ButtonRound :class="['button-round-filter', { active: active }]" :disabled="disabled" >
      <slot/>
    </ButtonRound>
</template>

<script setup lang="ts">
import ButtonRound from '~/components/ui/ButtonRound.vue'
const { active = false, disabled = false } = defineProps<{ active?: boolean, disabled?: boolean }>()
</script>

<style scoped lang="sass">
.button-round-filter
  background: $color-white
  color: $color-text-primary
  transition: background $animation-duration ease-out, box-shadow $animation-duration ease-out, transform $animation-duration ease-out

  &:disabled
    pointer-events: none
    cursor: default

  &.active,
  &:hover
    background: $color-success-primary
    box-shadow: 0 6px 20px $color-success-secondary

  &:active
    box-shadow: 0 3px 5px $color-success-secondary
    transform: scale(0.95)

  &.loading
    cursor: default
    pointer-events: none
    opacity: 0.6
        
    .button-base-text
      opacity: 0

@media (max-width: $bp-md)
  .scroll-to-top
    right: $space-6
    bottom: $space-6

.scroll-to-top-fade-enter-active,
.scroll-to-top-fade-leave-active
  transition: opacity $animation-duration ease

.scroll-to-top-fade-enter-from,
.scroll-to-top-fade-leave-to
  opacity: 0
</style>
