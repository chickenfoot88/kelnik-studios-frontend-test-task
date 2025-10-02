<template>
  <div class="apartments-filter">
    <div class="apartments-filter-rooms">
      <ButtonRoundFilter
        v-for="rooms in APARTMENTS_ROOMS_OPTIONS" 
        :key="rooms" 
        :size="44"
        class='apartments-filter-rooms__button'
        :active="activeRoom == rooms"
        :disabled="isLoading"
        @click="updateRooms(rooms)"
      >
        <span>{{  rooms  }}к</span>
      </ButtonRoundFilter>
    </div>
    <div class="apartments-filter-slider">
      <FilterRange v-model="priceRange" :min="PRICE_RANGE.MIN" :max="PRICE_RANGE.MAX" :step="10000" :disabled="isLoading">
        Стоимость квартиры, &#x20BD;
      </FilterRange>
      <FilterRange v-model="areaRange" :min="AREA_RANGE.MIN" :max="AREA_RANGE.MAX" :step="5" :disabled="isLoading">
        Площадь, м<sup>2</sup>
      </FilterRange>
    </div>
    <div class="apartments-filter-reset">
      <ButtonText @click="emit('resetFilter')">
        <template #label>Сбросить параметры</template>
        <template #icon><CrossIcon /></template>       
      </ButtonText>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IApartmentsQuery } from '~/types/apartments-query.types'
import { APARTMENTS_ROOMS_OPTIONS, PRICE_RANGE, AREA_RANGE } from '~/types/apartments-filter.types'
import ButtonRoundFilter from '~/components/ui/ButtonRoundFilter.vue'
import ButtonText from '~/components/ui/ButtonText.vue'
import FilterRange from '~/components/ui/FilterRange.vue'
import CrossIcon from '~/assets/images/icons/CrossIcon.vue'

const { modelValue, isLoading = false } = defineProps<{ modelValue: IApartmentsQuery, isLoading?: boolean }>()

const emit = defineEmits<{
  'update:modelValue': [value: IApartmentsQuery],
  'resetFilter': []
}>()

function updateRooms(rooms: number) {
  if(modelValue.rooms === rooms) return
  emit('update:modelValue', { ...modelValue, rooms })
}

const priceRange = computed({
  get: () => [modelValue.priceMin, modelValue.priceMax] as [number, number],
  set: ([min, max]) => {
    emit('update:modelValue', { ...modelValue, priceMin: min, priceMax: max })
  },
})

const areaRange = computed({
  get: () => [modelValue.areaMin, modelValue.areaMax] as [number, number],
  set: ([min, max]) => {
    emit('update:modelValue', { ...modelValue, areaMin: min, areaMax: max })
  },
})

const activeRoom = computed<IApartmentsQuery['rooms']>(() => modelValue.rooms)
</script>

<style scoped lang="sass">
.apartments-filter
  display: flex
  flex-direction: column
  gap: $space-5
  width: 100%

.apartments-filter-rooms
  display: flex
  gap: $space-7

.apartments-filter-slider
  display: flex
  flex-direction: column
  gap: $space-5
</style>