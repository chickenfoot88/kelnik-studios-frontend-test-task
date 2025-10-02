<template>
  <div class="filter-range-container">
    <div class="filter-range">
      <span class="filter-range__header">
        <slot/>
      </span>
      <div class="filter-range__description">
        <div>
          <span>от </span>
          <span class="filter-range__value">{{  formattedPriceRange.min }}</span>
        </div>
        <div>
          <span> до </span>
          <span class="filter-range__value">{{  formattedPriceRange.max }}</span>
        </div>
      </div>
    </div>
    <Slider
      v-model="localRange"
      :min="min"
      :max="max"
      :step="step"
      class="filter-range-slider"
      :tooltips="false"
      :disabled
      :aria="{ 'aria-label': 'Кнопка управления диапозоном'}"
      @slide="handleSlide"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { formatter } from '~/utils/formatter'

const {
  min,
  max,
  step,
  modelValue,
  disabled = false,
} = defineProps<{
  modelValue: [number, number]
  min: number
  max: number
  step: number
  disabled?: boolean,
}>()

const localRange = ref<[number, number]>([...modelValue])
const isSliding = ref(false)

const formattedPriceRange = computed(() => ({
  min: formatter.format(localRange.value[0]),
  max: formatter.format(localRange.value[1]),
}))

const emit = defineEmits<{
  'update:modelValue': [[number, number]]
}>()

function handleSlide(value: [number, number]) {
  isSliding.value = true
  localRange.value = value
}

function handleChange(value: [number, number]) {
  isSliding.value = false
  localRange.value = value
  emit('update:modelValue', localRange.value)
}

watch(
  () => modelValue,
  (value) => {
    if (!isSliding.value) {
      localRange.value = [...value]
    }
  },
  { deep: true },
)
</script>

<style scoped lang="sass">
.filter-range-container
  display: grid
  gap: 12px

.filter-range
  display: flex
  flex-direction: column
  gap: 8px

  &-header
    display: flex
    justify-content: space-between
    font-size: 14px

  &
    display: flex
    flex-wrap: wrap
    gap: 8px
    margin-bottom: 8px

  &__header
    font-size: rem(14px)
    line-height: rem(20px)

  &__description
    color: rgba($color-text-primary, 0.5)
    display: flex
    justify-content: space-between
    width: 100%
    > div
      flex: 1

  &__value
    color: $color-text-primary
    font-weight: 500

.filter-range-slider
  --slider-height: 3px
  --slider-handle-width: 14px
  --slider-handle-height: 14px
  --slider-handle-shadow: none
  --slider-handle-shadow-active: none
  --slider-bg: rgba(var(--color-text-primary), 0.1)
  --slider-handle-bg: rgb(var(--color-success-primary))
  --slider-connect-bg: rgb(var(--color-success-primary))
  --slider-connect-bg-disabled: rgb(var(--color-success-primary))
</style>
