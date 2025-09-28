<template>
  <button
    :class="['button-base', { loading, disabled }]"
    :disabled
    @click="event => emit('click', event)"
  >
   <span class="button-base-content">
     <div v-show="loading" class="button-base-spinner spinner"></div>
     <span class="button-base-text">
       <slot/>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
const { disabled = false, loading = false } = defineProps<{
  loading?: boolean,
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

</script>

<style scoped lang="sass">
.button-base
  display: inline-flex
  align-items: center
  justify-content: center
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
  
  &-content
    display: inline-grid
    place-items: center

  &-text
    opacity: 1

  &-spinner,
  &-text
    grid-area: 1 / 1
    transition: opacity $animation-duration ease

  &:not(:disabled)
    &:hover
      background: rgba($color-text-primary, 0.05)

    &:active
      background: rgba($color-text-primary, 0.15)

    &.loading
      cursor: default
      pointer-events: none
      opacity: 0.6
          
      .button-base-text
        opacity: 0

  &:disabled
    color: $color-text-secondary
    cursor: not-allowed
    opacity: 0.5

</style>