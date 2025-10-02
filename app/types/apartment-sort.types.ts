import type { IApartment } from '~/types/apartments.type'

const SORT_ORDER = { ASC: 'asc', DESC: 'desc'} as const

interface ISortParamsType {
  sortBy: keyof Pick<IApartment, 'price' | 'area' | 'level'> | ''
  sortOrder: typeof SORT_ORDER[keyof typeof SORT_ORDER]
}

export { SORT_ORDER, type ISortParamsType }
