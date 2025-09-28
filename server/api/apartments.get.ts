import { defineEventHandler, getQuery } from 'h3'
import type { IApartmentsQuery, IApartment } from '~/types/apartments.type'
import rawApartments from '../mock/apartments.json'
import { wait } from '~/utils/delay'

export default defineEventHandler(async (filterParams) => {
  // Имитирует задержку ответа от сервера
  await wait(500)

  const {
    limit,
    sortBy,
    sortOrder,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
  } = getQuery<IApartmentsQuery>(filterParams)

  const filtered = rawApartments.filter((apartment: IApartment) => {
    if (priceMin != null && apartment.price < priceMin) return false
    if (priceMax != null && apartment.price > priceMax) return false
    if (areaMin != null && apartment.area < areaMin) return false
    if (areaMax != null && apartment.area > areaMax) return false
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
})
