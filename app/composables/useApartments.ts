import type { IApartment } from '~/types/apartments.type';

export function useApartments() {
  const fetchApartments = async () => {

    const data = await $fetch<IApartment[]>(
      'mock/apartments.json',
      {
        method: 'GET',
      },
    )
   
    return { data }
    
  }

  return { fetchApartments }
}