<template>
  <div class="layout">
    <div class="layout-container">
      <slot />
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  </div>
</template>
<script setup land="ts">
import ScrollToTopButton from '~/components/ui/ButtonScrollToTop.vue'
</script>

<style lang="sass" scoped>
.layout
  display: flex
  justify-content: center
  width: 100%

.layout-container
  width: 100%
  max-width: $bp-lg
  margin: 0 auto
  padding: $space-1 $space-2
  min-width: $bp-md

.scroll-to-top
  position: fixed
  right: $space-5
  bottom: $space-5
  z-index: 10

@media (max-width: $bp-lg)
  .layout-container
    padding: $space-4 $space-3

</style>
