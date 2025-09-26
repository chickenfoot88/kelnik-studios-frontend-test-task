import type { IApartment, IApartmentsQuery } from '~/types/apartments.type';

export function useApartments() {
  const fetchApartments = async () => {
    const params:IApartmentsQuery = {}

    const data = await $fetch<IApartment[]>(
      'mock/apartments.json',
      {
        method: 'GET',
        params,
      },
    )
   
    return { data }
  };

  return { fetchApartments }
}