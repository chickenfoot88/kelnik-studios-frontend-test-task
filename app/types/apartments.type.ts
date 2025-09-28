interface IApartment {
  imgUrl: string
  imgAlt: string
  title: string
  area: number
  level: number
  price: number
}

type IApartmentWithFormatted = Omit<IApartment, 'price'> & { price: string }

interface IApartmentsQuery {
  limit: number
  sortBy: keyof Pick<IApartment, 'price' | 'area' | 'level'>
  sortOrder: 'asc' | 'desc'
  priceMin: number
  priceMax: number
  areaMin: number
  areaMax: number
}

export type { IApartment, IApartmentWithFormatted, IApartmentsQuery }