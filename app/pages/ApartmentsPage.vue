<template>
  <div class="apartments-page">
    <PageHeader class="apartments-page-header">Квартиры</PageHeader>
    <div class="apartments-page-container">
      <ApartmentsTable
        :apartments-list="apartmentsStore.apartmentListComputed"
        :sort-params="{
          sortBy: filterParams.sortBy,
          sortOrder: filterParams.sortOrder
        }"
        :is-loading
        @next-page="nextPage"
        @next-sort="nextSort"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ApartmentsTable from '~/components/ApartmentsTable.vue'
import { useApartmentsStore } from '~/stores/apartments.store'
import { SORT_ORDERS, type IApartmentsQuery, type sortParamsType } from '~/types/apartments.type'
import { debounce } from '~/utils/debounce'

const apartmentsStore = useApartmentsStore()
const initialPageLength = 5
const filterParams = ref<IApartmentsQuery>({
  limit: initialPageLength,
  sortBy: 'area',
  sortOrder: SORT_ORDERS.ASC,
  priceMin: 5500000,
  priceMax: 18900000,
  areaMin: 33,
  areaMax: 123,
})
const isLoading = ref<boolean>(false)

function nextPage(pageNumber:number) {
  filterParams.value.limit = initialPageLength * pageNumber
}

function nextSort(sortParams: sortParamsType) {
  let sortOrder = sortParams.sortOrder
  if (sortParams.sortBy !== filterParams.value.sortBy) {
    sortOrder = SORT_ORDERS.ASC
  } 
  filterParams.value.sortOrder = sortOrder
  filterParams.value.sortBy = sortParams.sortBy
}

const runFetch = async () => {
  isLoading.value = true
  try {
    await apartmentsStore.getApartments({ ...filterParams.value })
  } finally {
    isLoading.value = false
  }
}

const debouncedFetch = debounce(runFetch, 500)

watch(
  () => ({ ...filterParams.value }),
  () => {
    isLoading.value = true
    debouncedFetch()
  },
  { immediate: true, deep: true },
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