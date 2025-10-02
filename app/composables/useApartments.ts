import type { IApartment } from '~/types/apartments.type'
import type { IApartmentsQuery } from '~/types/apartments-query.types'

export function useApartments() {
  const fetchApartments = async function(filterParams: IApartmentsQuery): Promise<{ data: IApartment[], total: number }> {
    const { data, total } = await $fetch<{ data: IApartment[], total: number }>('/api/apartments', { query: filterParams })
    return { data, total }
  }
  return { fetchApartments }
}