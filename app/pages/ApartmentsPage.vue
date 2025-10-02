<template>
  <main class="apartments-page" aria-labelledby="apartments-page-header">
    <section class="apartments-page-container" aria-label="Список и фильтр квартир">
      <header>
        <PageHeader id="apartments-page-header" class="apartments-page-header">Квартиры</PageHeader>
      </header>
      <ApartmentsTable
        :apartments-list="apartmentsStore.apartmentListComputed"
        :sort-params="sortParams"
        :is-loading
        @next-page="nextPage"
        @next-sort="nextSort"
      />
    </section>
    <aside class="apartments-page-filter-container" aria-label="Фильтр квартир">
      <ClientOnly>
        <Transition name="fade-in">
          <ApartmentsFilter v-model="filterParams" :is-loading  @reset-filter="resetFilter"/>
        </Transition>
      </ClientOnly>
    </aside>
  </main>
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

useHead({
  title: 'Квартиры',
})

const apartmentsStore = useApartmentsStore()
const initialPageLength = 5
const filterParamsInitial:IApartmentsQuery = {
  limit: initialPageLength,
  sortBy: '',
  sortOrder: SORT_ORDER.ASC,
  priceMin: PRICE_RANGE.MIN,
  priceMax: PRICE_RANGE.MAX,
  areaMin: AREA_RANGE.MIN,
  areaMax: AREA_RANGE.MAX,
  rooms: null,
}
const STORAGE_KEY = 'FILTER_PARAMS'

const filterParams = ref<IApartmentsQuery>(filterParamsInitial)

const sortParams = computed(() => ({
  sortBy: filterParams.value.sortBy,
  sortOrder: filterParams.value.sortOrder,
}))

const isLoading = ref<boolean>(true)

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
  localStorage.removeItem(STORAGE_KEY)
}

function saveFilterParams() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filterParams.value))
}

function loadFilterPrarms() {
  const storedFilterParams = localStorage.getItem(STORAGE_KEY)
  if (storedFilterParams) {
    filterParams.value = JSON.parse(storedFilterParams)
  }
}

onMounted(() => {
  loadFilterPrarms()
  runFetch()
})

watch(
  () => ({ ...filterParams.value }),
  () => {
    if (import.meta.client) {
      saveFilterParams()
    }
    isLoading.value = true
    debouncedFetch()
  },
  { deep: true },
)
</script>

<style scoped lang="sass">
.apartments-page
  display: flex
  gap: $space-2

.apartments-page-container
  display: flex
  flex-direction: column
  width: 100%
.apartments-page-filter-container
  min-width: 320px

main
  width: 100%

@media (max-width: $bp-lg)
  .apartments-page
    gap: $space-5
</style>