<template>
  <div>
    <h1 class="page-header">
      <slot/>
    </h1>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
.page-header
  font-size: rem($font-header-size)
  margin-bottom: $space-4
</style>