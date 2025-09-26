export interface IApartment {
  imgUrl: string
  imgAlt: string
  title: string
  area: number
  level: number
  price: number
}

export type IApartmentWithFormattedPrice = Omit<IApartment, 'price'> & { price: string }
