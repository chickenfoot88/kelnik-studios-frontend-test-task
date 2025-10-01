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
  </div>
</template>

<script setup lang="ts">
import type { IApartmentsQuery } from '~/types/apartments-query.types'
import ButtonRoundFilter from '~/components/ui/ButtonRoundFilter.vue'
const APARTMENTS_ROOMS_OPTIONS = [1, 2, 3, 4]

const { modelValue, isLoading = false } = defineProps<{ modelValue: IApartmentsQuery, isLoading?: boolean }>()

const emit = defineEmits<{
  'update:modelValue': [value: IApartmentsQuery]
}>()

function updateRooms(rooms: number) {
  if(modelValue.rooms === rooms) return
  emit('update:modelValue', { ...modelValue, rooms })
}

const activeRoom = computed<number>(() => modelValue.rooms)
</script>

<style scoped lang="sass">
.apartments-filter-rooms
  display: flex
  gap: $space-7
</style>