import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { IApartment, IApartmentWithFormatted, IApartmentsQuery } from '~/types/apartments.type'
import { formatter } from '~/utils/formatter'

export const useApartmentsStore = defineStore('apartments', () => {
  const apartmentsList = ref<IApartment[]>([])
  const totalApartmentsLength = ref<number>(0)
  
  const apartmentListComputed = computed<IApartmentWithFormatted[]>(() => formatApartmentsList(apartmentsList.value))

  function formatApartmentsList(apartmentsList: IApartment[]): IApartmentWithFormatted[] {
    return apartmentsList.map(apartment => ({
      ...apartment,
      price: formatter.format(apartment.price),
    }))
  }

  async function getApartments(filterParams: IApartmentsQuery) {
    const { data, total } = await useApartments().fetchApartments(filterParams)
    console.log(data)
    
    apartmentsList.value = data
    totalApartmentsLength.value = total
  }

  return { apartmentListComputed, getApartments, totalApartmentsLength }
})