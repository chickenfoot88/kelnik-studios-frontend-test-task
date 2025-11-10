import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { IApartment, IApartmentFormatted } from '~/types/apartments.type'
import type { IApartmentsQuery } from '~/types/apartments-query.types' 
import { formatter } from '~/utils/formatter'

export const useApartmentsStore = defineStore('apartments', () => {
  const baseURL = useRuntimeConfig().app.baseURL
  const apartmentsList = ref<IApartment[]>([])
  const totalApartmentsLength = ref<number>(0)
  
  const apartmentListComputed = computed<IApartmentFormatted[]>(() => formatApartmentsList(apartmentsList.value))

  function formatApartmentsList(apartmentsList: IApartment[]): IApartmentFormatted[] {
    return apartmentsList.map(apartment => ({
      ...apartment,
      price: formatter.format(apartment.price),
      area: formatter.format(apartment.area),
      imgUrl: `${baseURL}images/${apartment.imgUrl}`,
    }))
  }

  async function getApartments(filterParams: IApartmentsQuery) {
    const { data, total } = await useApartments(baseURL).fetchApartments(filterParams)
    apartmentsList.value = data
    totalApartmentsLength.value = total
  }

  return { apartmentListComputed, getApartments, totalApartmentsLength }
})