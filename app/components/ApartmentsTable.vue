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
          <div v-if="!apartmentsList.length && !isLoading" class="apartments-table-no-result">
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить параметры фильтра.</p>
          </div>
          <div v-for="apartment in apartmentsList" :key="apartment.id">
            <button v-if="isDesktop" class="apartments-table-card" tabindex="0" type="button">
              <img
              class="apartments-table-card-image"
              :src="`${apartment.imgUrl}`"
              :alt="apartment.imgAlt"
              />
              <h3 class="apartments-table-card-title">{{ apartment.title }}</h3>
              <span class="apartments-table-card-area">{{ apartment.area }}</span>
              <span class="apartments-table-card-level">
                {{ apartment.level }}
                <span class="apartments-table-card-level__max">из 17</span>
              </span>
              <span class="apartments-table-card-price">{{ apartment.price }}</span>
            </button>
            <ApartmentCard v-else :apartment="apartment" tabindex="0" aria-label="Открыть карточку квартиры"/>
          </div>
        </TransitionGroup>
      </TransitionGroup>
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
import type { IApartmentFormatted } from '~/types/apartments.type'
import type { ISortParamsType } from '~/types/apartment-sort.types'
import ButtonBase from '~/components/ui/ButtonBase.vue'
import ButtonSort from '~/components/ui/ButtonSort.vue'
import ApartmentCard from '~/components/ApartmentCard.vue'
import { useWindowSize } from '@vueuse/core'

const apartmentsStore = useApartmentsStore()

const SORT_BUTTONS: { field: ISortParamsType['sortBy'], label: string, sup?: number }[] = [
  { field: 'area', label: 'S, м', sup: 2 },
  { field: 'level', label: 'Этаж' },
  { field: 'price', label: 'Цена, \u20BD' },
]

const { apartmentsList, isLoading, sortParams } = defineProps<{
  apartmentsList: IApartmentFormatted[],
  isLoading: boolean,
  sortParams: ISortParamsType,
}>()

const emit = defineEmits<{
  nextPage: [pageNumber: number]
  nextSort: [sortParams: ISortParamsType]
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

const { width } = useWindowSize()
const isDesktop = computed(() => width.value > 1440)
</script>

<style scoped lang="sass">
.apartments-table
  width: 100%
  .apartment-card
    margin-bottom: 8px

.apartments-table-header,
.apartments-table-card
  display: grid
  grid-template-columns: 100px minmax(150px, 1fr) repeat(3, minmax(70px, 150px))
  gap: $space-6

.apartments-table-header
  padding-bottom: $space-6

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
    transition: opacity calc($animation-duration * 1.5) linear

  &.loading
    &::before
      visibility: visible
      opacity: 0.7

  &__preloader
    top: 0
    min-height: 200px
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    width: 100%

.apartments-table-card
  padding: $space-7 0 $space-5 0
  line-height: rem(24px)
  background: none
  border: none
  border-top: 1px solid rgba($color-black, 0.1)
  transition: background-color $animation-duration ease-out, box-shadow $animation-duration ease
  cursor: pointer
  width: 100%
  font-size: rem(16px)
  text-align: left

  &:hover
    background: rgba($color-black, 0.025)
    box-shadow: 0 3px 9px rgba($color-black, 0.1)
  &:active
    box-shadow: 0 1px 5px rgba($color-black, 0.1)

  &-title
    font-weight: 500
    font-size: rem(16px)

  &-level__max
    color: rgba($color-text-primary, 0.5)

.apartments-table-footer
  padding-top: $space-4

.transition-container
  position: relative
  & > div:last-child
    .apartments-table-card
      border-bottom: 1px solid rgba($color-black, 0.1)

.apartments-table-no-result
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  min-height: 300px
  flex-wrap: wrap
  flex-direction: column

@media (max-width: $bp-lg)
  .apartments-table-header
    display: flex

  .apartments-table-header__image,
  .apartments-table-header__title
    display: none

</style>
