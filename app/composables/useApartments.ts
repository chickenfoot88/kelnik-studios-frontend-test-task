import type { IApartment, IApartmentsQuery } from '~/types/apartments.type'

export function useApartments() {
  const fetchApartments = async function(filterParams: IApartmentsQuery): Promise<{ data: IApartment[], total: number }> {
    const { data, total } = await $fetch<{ data: IApartment[], total: number }>('/api/apartments', { query: filterParams })
    return { data, total }
  }
  return { fetchApartments }
}