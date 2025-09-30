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

export type { IApartment, IApartmentFormatted }
