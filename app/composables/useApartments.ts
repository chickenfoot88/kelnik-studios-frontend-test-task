import type { IApartment } from '~/types/apartments.type'
import type { IApartmentsQuery } from '~/types/apartments-query.types'
import { getQuery } from 'h3'
import { wait } from '~/utils/delay'


export function useApartments() {
  const fetchApartments = async function(filterParams: IApartmentsQuery): Promise<{ data: IApartment[], total: number }> {
    // Имитирует задержку ответа от сервера
    await wait(100)
    const data = await $fetch<IApartment[]>('/mock/apartments.json')

    const {
      limit,
      sortBy,
      sortOrder,
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      rooms,
    } = filterParams

    
    const filtered = data.filter((apartment: IApartment) => {
      if (priceMin !== null && apartment.price < priceMin) return false
      if (priceMax !== null && apartment.price > priceMax) return false
      if (areaMin !== null && apartment.area < areaMin) return false
      if (areaMax !== null && apartment.area > areaMax) return false
      if (rooms !== null && rooms !== apartment.rooms) return false
      return true
    })
    
    const direction = sortOrder === 'asc' ? 1 : -1
    const sorted = filtered.sort((left: IApartment, right: IApartment) => {
      const leftValue = left[sortBy]
      const rightValue = right[sortBy]
      if (leftValue === rightValue) return 0
      return leftValue > rightValue ? direction : -direction
    })
    
    const paginated = sorted.slice(0, limit)
    
    return {
      data: paginated,
      total: filtered.length,
    }
  }

  return { fetchApartments }
  
}


