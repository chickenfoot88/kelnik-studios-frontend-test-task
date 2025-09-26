import { defineStore } from 'pinia'
import type { IApartment } from '~/types/apartments.type'

export const useApartmentsStore = defineStore('apartments', () => {
  const apartmentsList = ref<IApartment[]>([])

  function fetchApartments()
  return { apartmentsList }
})