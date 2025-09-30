import type { ISortParamsType } from '~/types/apartment-sort.types'
import type { IFilterParamsType } from '~/types/apartments-filter.types'

interface IApartmentsQuery extends ISortParamsType, IFilterParamsType {
  limit: number
}

export type { IApartmentsQuery }