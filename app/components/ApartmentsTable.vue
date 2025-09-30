<template>
  <section class="apartments-table">
    <header class="apartments-table-header">
      <span class="apartments-table-header__label apartments-table-header__image">Планировка</span>
      <span class="apartments-table-header__label apartments-table-header__title">Квартира</span>
      <ButtonSort
        v-for="button in SORT_BUTTONS"
        :key="button.field"
        :field="button.field"
        :sort-params="sortParams"
        :loading="isLoading"
        @next-sort="payload => emit('nextSort', payload)"
      >
        <span>
          {{ button.label }}<sup v-if="button.sup">{{ button.sup }}</sup>
        </span>
      </ButtonSort>
    </header>
    <div :class="['apartments-table-body', { loading: isLoading }]">
      <TransitionGroup name="fade-in">
        <div v-if="isPreloaderShown" class="apartments-table-body__preloader">
          <div class="apartments-table-body__preloader-spinner spinner-lg"></div>
        </div>
        <TransitionGroup v-else name="fade-up" tag="div" class="transition-container">
          <article v-for="apartment in apartmentsList" :key="`${apartment.title} - ${apartment.level}`" class="apartment-card">
            <img
              class="apartment-card-image"
              :src="`/images/${apartment.imgUrl}`"
              :alt="apartment.imgAlt"
            />
            <h3 class="apartment-card-title">{{ apartment.title }}</h3>
            <span class="apartment-card-area">{{ apartment.area }}</span>
            <span class="apartment-card-level">{{ apartment.level }}</span>
            <span class="apartment-card-price">{{ apartment.price }}</span>
          </article>
        </TransitionGroup>
      </TransitionGroup>
      <!-- <ApartmentCard
        v-for="apartment in apartmentsList"
        :key="apartment.title"
        v-bind="apartment"
        /> -->
      </div>
      <div class="apartments-table-footer">
        <ButtonBase
          v-if="isSPaginationButtonShown"
          :loading="isLoading"
          @click="nextPage"
        >
          Загрузить еще
        </ButtonBase>
      </div>
  </section>
</template>

<script setup lang="ts">
import type { IApartmentWithFormatted, sortParamsType } from '~/types/apartments.type'
import ButtonBase from '~/components/ui/ButtonBase.vue'
import ButtonSort from '~/components/ui/ButtonSort.vue'
const apartmentsStore = useApartmentsStore()
// import ApartmentCard from '~/components/ApartmentC   ard.vue'

const SORT_BUTTONS: { field: sortParamsType['sortBy'], label: string, sup?: number }[] = [
  { field: 'area', label: 'S, м', sup: 2 },
  { field: 'level', label: 'Этаж' },
  { field: 'price', label: 'Цена, \u20BD' },
]

const { apartmentsList, isLoading, sortParams } = defineProps<{
  apartmentsList: IApartmentWithFormatted[],
  isLoading: boolean,
  sortParams: sortParamsType
}>()

const emit = defineEmits<{
  nextPage: [pageNumber: number]
  nextSort: [sortParams: sortParamsType]
}>()

const pageNumber = ref<number>(1)

function nextPage() {
  pageNumber.value++
  emit('nextPage', pageNumber.value)
}

const isSPaginationButtonShown = computed<boolean>(() => {
  return !!apartmentsList.length && (apartmentsStore.totalApartmentsLength > apartmentsList.length)
})

const isPreloaderShown = computed<boolean>(() => {
  return !apartmentsList.length && isLoading
})
</script>

<style scoped lang="sass">
.apartments-table
  width: 100%

.apartments-table-header,
.apartment-card
  display: grid
  grid-template-columns: 100px minmax(160px, 1fr) repeat(3, minmax(110px, auto))
  gap: $space-6

.apartments-table-header
  padding-bottom: $space-6
  box-shadow: 0 1px 0 0 rgba($color-black, 0.1)

.apartments-table-label
  font-size: rem(16px)

.apartments-table-body
  position: relative

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-white
    opacity: 0
    visibility: hidden
    z-index: 1
    pointer-events: none
    transition: opacity calc($animation-duration * 1.5) linear

  &.loading
    &::before
      visibility: visible
      opacity: 0.7

  &__preloader
    top: 0
    height: 400px
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    width: 100%

.transition-container
  position: relative

.apartments-table-footer
  padding-top: $space-4

.apartment-card
  padding: $space-7 0 $space-5 0
  line-height: rem(24px)
  box-shadow: 0 1px 0 0 rgba($color-black, 0.1)

  &-title
    font-weight: 500
    font-size: rem(16px)

@media (max-width: $bp-md)
  .apartments-table-header
    // grid-template-columns: repeat(3, minmax(min-content, max-content))
    // gap: $space-5
  .apartments-table-header__image,
  .apartments-table-header__title
    display: none

  // .apartment-card
  //   grid-template-columns: repeat(4, 1fr)
  //   grid-template-rows: 50% 50%
  //   &-title
  //     grid-column: 1 / 3
  //     grid-row: 1 / 1
  //   &-area, &-price, &-level
  //     grid-row: 2 / 2
  //   &-image
  //     grid-column: 4 / 4
</style>
