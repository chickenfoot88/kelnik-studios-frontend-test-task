<template>
  <div class="apartments-page">
    <PageHeader class="apartments-page-header">Квартиры</PageHeader>
    <div class="apartments-page-container">
      <ApartmentsTable :apartments-list="apartmentListComputed"/>
      <ApartmentsFilter/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import apartments from '../../server/api/mock-data/apartments.json'
import ApartmentsTable from '~/components/ApartmentsTable.vue';
import type { IApartment, IApartmentWithFormattedPrice } from '~/types/apartments.type'
import ApartmentsFilter from '~/components/ApartmentsFilter.vue';

const apartmentsList = apartments as IApartment[]
const formatter = new Intl.NumberFormat('ru-RU')
const apartmentListComputed = computed<IApartmentWithFormattedPrice[]>(() =>
  apartmentsList.map(apartment => ({
    ...apartment,
    price: formatter.format(apartment.price),
  }),
))

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

// @media (max-width: $bp-lg)
//   .apartments-page-container
//     flex-direction: column-reverse

//   .apartments-filter-mock
//     width: 100%
//     margin: 0

</style>