import apartmentsRaw from './mock-data/apartments.json'
import type { IApartment } from '~/types/apartments.type'

const apartments: IApartment[] = (apartmentsRaw as IApartment[]).map(apartment => ({
  ...apartment,
  area: parseMetric(apartment.area),
  price: typeof apartment.price === 'number' ? apartment.price : Number(apartment.price),
}))

interface ApartmentsQuery {
  limit?: number
  sortBy?: keyof Pick<IApartment, 'price' | 'area' | 'level'>
  sortOrder?: 'asc' | 'desc'
  priceMin?: number
  priceMax?: number
  areaMin?: number
  areaMax?: number
}

export default defineEventHandler((event) => {
  const query = normalizeQuery(getQuery(event))

  let filtered = apartments.slice()

  if (query.priceMin !== undefined) {
    filtered = filtered.filter(apartment => apartment.price >= query.priceMin!)
  }

  if (query.priceMax !== undefined) {
    filtered = filtered.filter(apartment => apartment.price <= query.priceMax!)
  }

  if (query.areaMin !== undefined) {
    filtered = filtered.filter(apartment => apartment.area >= query.areaMin!)
  }

  if (query.areaMax !== undefined) {
    filtered = filtered.filter(apartment => apartment.area <= query.areaMax!)
  }

  if (query.sortBy) {
    const direction = query.sortOrder === 'desc' ? -1 : 1
    const key = query.sortBy
    filtered = filtered.sort((a, b) => (a[key] - b[key]) * direction)
  }

  const total = filtered.length

  if (query.limit !== undefined) {
    filtered = filtered.slice(0, query.limit)
  }

  return {
    total,
    items: filtered,
  }
})

function normalizeQuery(query: Record<string, any>): ApartmentsQuery {
  return {
    limit: toNumber(query.limit),
    sortBy: toSortKey(query.sortBy),
    sortOrder: toSortOrder(query.sortOrder),
    priceMin: toNumber(query.priceMin),
    priceMax: toNumber(query.priceMax),
    areaMin: toNumber(query.areaMin),
    areaMax: toNumber(query.areaMax),
  }
}

function toNumber(value: any): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined
  }
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

function toSortKey(value: any): ApartmentsQuery['sortBy'] {
  if (value === 'price' || value === 'area' || value === 'level') {
    return value
  }
  return undefined
}

function toSortOrder(value: any): ApartmentsQuery['sortOrder'] {
  if (value === 'asc' || value === 'desc') {
    return value
  }
  return undefined
}

function parseMetric(value: IApartment['area'] | string): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const sanitized = value.replace(',', '.')
    const parsed = Number.parseFloat(sanitized)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}
