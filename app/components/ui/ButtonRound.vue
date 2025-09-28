<template>
  <ButtonBase class="button-round" :style>
    <slot/>
  </ButtonBase>
</template>

<script setup lang="ts">
import ButtonBase from './ButtonBase.vue'

const { size = 40 } = defineProps<{ size?: number}>()

const style = computed(() => ({
  width: `${size}px`,
  height: `${size}px`,
}))

</script>

<style scoped lang="sass">
.button-round
  padding: 8px
</style>