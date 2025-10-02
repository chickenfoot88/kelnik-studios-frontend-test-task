<template>
  <button class="button-text">
    <slot name="label"/>
    <div class="button-text-icon">
      <slot name="icon" />
    </div>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.button-text
  color: $color-black
  background: none
  border: none
  cursor: pointer
  font-size: rem(14px)
  padding: 0
  display: flex
  justify-content: space-between
  gap: 6px
  transition: color $animation-duration ease

  &:hover
    color: $color-success-primary
    .button-text-icon
      fill: $color-success-primary
      
.button-text-icon
  transition: fill $animation-duration ease
  fill: $color-black
  
</style>