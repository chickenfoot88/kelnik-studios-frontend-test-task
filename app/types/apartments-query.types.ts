import type { ISortParamsType } from '~/types/apartment-sort.types'
import type { IFilterParamsType } from '~/types/apartments-filter.types'

interface IApartmentsQuery extends Omit<IFilterParamsType, 'rooms'>, ISortParamsType {
  rooms: number | null
  limit: number
}

export type { IApartmentsQuery }