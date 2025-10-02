<template>
  <div class="apartments-page">
    <PageHeader class="apartments-page-header">Квартиры</PageHeader>
    <div class="apartments-page-container">
      <ApartmentsTable
        :apartments-list="apartmentsStore.apartmentListComputed"
        :sort-params="sortParams"
        :is-loading
        @next-page="nextPage"
        @next-sort="nextSort"
      />
      <ApartmentsFilter v-model="filterParams" :is-loading @reset-filter="resetFilter"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ApartmentsTable from '~/components/ApartmentsTable.vue'
import ApartmentsFilter from '~/components/ApartmentsFilter.vue'
import { useApartmentsStore } from '~/stores/apartments.store'
import type { IApartmentsQuery } from '~/types/apartments-query.types'
import type { ISortParamsType } from '~/types/apartment-sort.types'
import { PRICE_RANGE, AREA_RANGE } from '~/types/apartments-filter.types'
import { SORT_ORDER } from '~/types/apartment-sort.types'
import { debounce } from '~/utils/debounce'


const apartmentsStore = useApartmentsStore()
const initialPageLength = 5
const filterParamsInitial:IApartmentsQuery = {
  limit: initialPageLength,
  sortBy: 'area',
  sortOrder: SORT_ORDER.ASC,
  priceMin: PRICE_RANGE.MIN,
  priceMax: PRICE_RANGE.MAX,
  areaMin: AREA_RANGE.MIN,
  areaMax: AREA_RANGE.MAX,
  rooms: null,
}

const filterParams = ref<IApartmentsQuery>(filterParamsInitial)

const sortParams = computed(() => ({
  sortBy: filterParams.value.sortBy,
  sortOrder: filterParams.value.sortOrder,
}))

const isLoading = ref<boolean>(false)

function nextPage(pageNumber:number) {
  filterParams.value.limit = initialPageLength * pageNumber
}

function nextSort(sortParams: ISortParamsType) {
  let sortOrder = sortParams.sortOrder
  if (sortParams.sortBy !== filterParams.value.sortBy) {
    sortOrder = SORT_ORDER.ASC
  } 
  filterParams.value.sortOrder = sortOrder
  filterParams.value.sortBy = sortParams.sortBy
}

const runFetch = async () => {
  try {
    await apartmentsStore.getApartments({ ...filterParams.value })
  } finally {
    isLoading.value = false
  }
}

const debouncedFetch = debounce(runFetch, 500)

function resetFilter() {
  filterParams.value = { ...filterParamsInitial }
}

onMounted(() => {
  runFetch()
})

watch(
  () => ({ ...filterParams.value }),
  () => {
    isLoading.value = true
    debouncedFetch()
  },
  { deep: true },
)
</script>

<style scoped lang="sass">
.apartments-page
  display: flex
  flex-direction: column

.apartments-page-container
  display: flex
  width: 100%
  gap: $space-2

.apartments-filter
  margin-top: calc(-1* (72px + $space-4))

.apartments-filter
  margin-left: auto

.apartments-filter-mock
  width: 372px
  height: 400px
  background: $color-success-secondary

@media (max-width: $bp-md)
  .apartments-page-container
    gap: $space-6

</style>