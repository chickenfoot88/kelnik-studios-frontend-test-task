<template>
  <div class="layout">
    <div class="layout-container">
      <slot />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.layout
  display: flex
  justify-content: center
  width: 100%

.layout-container
  width: 100%
  max-width: 1440px
  margin: 0 auto
  padding: $space-1 $space-2
  min-width: 960px

@media (max-width: $bp-md)
  .layout-container
    padding: $space-4 $space-3
</style>
