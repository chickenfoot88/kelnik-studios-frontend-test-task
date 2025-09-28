<template>
  <Transition name="scroll-to-top-fade">
    <ButtonRound
      v-if="isVisible"
      class="scroll-to-top"
      variant="success"
      @click="scrollToTop"
    >
      <ArrowUp/>
    </ButtonRound>
  </Transition>
</template>

<script setup lang="ts">
import ButtonRound from '~/components/ui/ButtonRound.vue'
import ArrowUp from '~/assets/images/icons/ArrowUp.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isVisible = ref(false)

const canScroll = () => {
  const { documentElement } = document

  if (!documentElement) {
    return false
  }

  const scrollableHeight = documentElement.scrollHeight - documentElement.clientHeight

  return scrollableHeight > 0
}

const updateVisibility = () => {
  if (!canScroll()) {
    isVisible.value = false
    return
  }

  isVisible.value = window.scrollY > 100
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
  window.addEventListener('resize', updateVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
  window.removeEventListener('resize', updateVisibility)
})
</script>

<style scoped lang="sass">
.scroll-to-top
  position: fixed
  right: $space-5
  bottom: $space-5
  z-index: 10
  box-shadow: 0 8px 24px rgba($color-text-primary, 0.15)

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
