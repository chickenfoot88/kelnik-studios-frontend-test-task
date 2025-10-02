interface IFilterParamsType {
  priceMin: number
  priceMax: number
  areaMin: number
  areaMax: number
  rooms: number
}

const APARTMENTS_ROOMS_OPTIONS = [1, 2, 3, 4]
const PRICE_RANGE = {
  MIN: 1000000,
  MAX: 28000000,
}
const AREA_RANGE = {
  MIN: 16,
  MAX: 200,
}

export { APARTMENTS_ROOMS_OPTIONS, PRICE_RANGE, AREA_RANGE, type IFilterParamsType }