<template>
  <button
    :class="[
      'button-sort',
      buttonClasses,
        {
          disabled: isDisabled
        }
      ]"
      @click="handleClick"
    >
    <span class="button-sort-text">
      <slot/>
    </span>
    <span class="button-sort-icons">
      <CaretUp class="button-sort-icon button-sort-icon__asc"/>
      <CaretUp class="button-sort-icon button-sort-icon__desc"/>
    </span>
  </button>
</template>

<script setup lang="ts">
import CaretUp from '~/assets/images/icons/CaretUp.vue'
import type { ISortParamsType } from '~/types/apartment-sort.types'
import { SORT_ORDER } from '~/types/apartment-sort.types'

const {
  sortParams,
  field,
  disabled = false,
  loading = false,
} = defineProps<{
  sortParams: ISortParamsType,
  field: ISortParamsType['sortBy'],
  disabled?: boolean,
  loading?: boolean
}>()

const emit = defineEmits<{(event: 'nextSort', value: ISortParamsType): void}>()

const buttonClasses = computed(() => ({
  'button-sort-active': field === sortParams.sortBy,
  'button-sort-asc': sortParams.sortOrder === 'asc',
  'button-sort-desc': sortParams.sortOrder === 'desc',
}))

const isDisabled = computed(() => disabled || loading)

function handleClick() {
  if (isDisabled.value) return
  const nextSortOrder = sortParams.sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC
  emit('nextSort', { sortOrder: nextSortOrder, sortBy: field })
}

</script>

<style scoped lang="sass">
.button-sort
  cursor: pointer
  color: $color-text-primary
  border: none
  background: none
  display: flex
  align-items: center
  gap: 8px
  font-size: 14px
  line-height: 20px
  padding: 0
  
  &-icons
    display: flex
    flex-direction: column
    gap: 2px
  
  &-icon
    fill: rgba($color-text-primary, 0.1)
    &__desc
      transform: rotate(180deg)

  &-active
    .button-sort-text
      color: $color-text-success

.button-sort-active
  &.button-sort-asc
    .button-sort-icon__asc
      fill: $color-success-primary
      
  &.button-sort-desc
    .button-sort-icon__desc
      fill: $color-success-primary
</style>