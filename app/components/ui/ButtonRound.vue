<template>
  <button class="button-round" :style>
    <slot/>
  </button>
</template>

<script setup lang="ts">
const { size = 40 } = defineProps<{ size?: number }>()

const style = computed(() => ({
  width: `${size}px`,
  height: `${size}px`,
}))


</script>

<style scoped lang="sass">
.button-round
  background: none
  border-radius: 25px
  padding: 8px
  font-size: rem(16px)
  font-weight: 400
  border: none
  cursor: pointer
</style>