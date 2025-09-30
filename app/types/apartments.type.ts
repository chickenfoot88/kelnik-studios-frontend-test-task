interface IApartment {
  imgUrl: string
  imgAlt: string
  title: string
  area: number
  level: number
  price: number
  id: number
}

type IApartmentFormatted = Omit<IApartment, 'price' | 'area'> & {
  price: string
  area: string
}

const SORT_ORDERS = { ASC: 'asc', DESC: 'desc'} as const
type sortByType = keyof Pick<IApartment, 'price' | 'area' | 'level'>
type sortOrderType = typeof SORT_ORDERS[keyof typeof SORT_ORDERS]
interface sortParamsType { sortOrder: sortOrderType, sortBy: sortByType }

interface IApartmentsQuery {
  limit: number
  sortBy: sortByType
  sortOrder: sortOrderType
  priceMin: number
  priceMax: number
  areaMin: number
  areaMax: number
}

export type { IApartment, IApartmentFormatted, IApartmentsQuery, sortOrderType, sortByType, sortParamsType }
export { SORT_ORDERS }
