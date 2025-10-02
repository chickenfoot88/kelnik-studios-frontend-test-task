<template>
  <button
    :class="['button-base', variantClass, { loading }]"
    :disabled="disabled"
    @click="handleClick"
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
const { disabled = false, loading = false, variant = 'primary' } = defineProps<{
  loading?: boolean,
  disabled?: boolean,
  variant?: 'primary' | 'success'
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isDisabled = computed(() => disabled || loading)
const variantClass = computed(() => `button-base--${variant}`)

function handleClick () {
  if (isDisabled.value) return
  emit('click')
}

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
  border-radius: 25px
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

  &--primary
    border: 1px solid rgba($color-text-primary, 0.2)
    color: $color-text-primary
    background: $color-white

    &:not(:disabled)
      &:hover
        background: rgba($color-text-primary, 0.05)

      &:active
        background: rgba($color-text-primary, 0.15)
        transform: translateY(1px)

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
  
  &--success
    border: none
    color: $color-white
    background: $color-success-secondary

    &:not(:disabled)
      &:hover
        background: rgba($color-success-primary, 0.5)

      &:active
        background: $color-success-primary

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