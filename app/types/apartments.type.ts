interface IApartment {
  imgUrl: string
  imgAlt: string
  title: string
  area: number
  level: number
  price: number
}

type sortOrder = 'asc' | 'desc'
type sortOrderExtended = sortOrder | undefined
type sortBy = keyof Pick<IApartment, 'price' | 'area' | 'level'>
interface sortParams {
  sortOrder: sortOrderExtended
  sortBy: sortBy
}

type IApartmentWithFormatted = Omit<IApartment, 'price'> & { price: string }

interface IApartmentsQuery {
  limit: number
  sortBy: sortBy
  sortOrder: sortOrder
  priceMin: number
  priceMax: number
  areaMin: number
  areaMax: number
}

export type { IApartment, IApartmentWithFormatted, IApartmentsQuery, sortOrderExtended, sortBy, sortParams }
