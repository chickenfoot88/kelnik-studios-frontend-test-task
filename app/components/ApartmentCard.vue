<template>
  <article class="apartment-card" @click="handleClick(apartment.id)">
    <div>
      <h3 class="apartment-card-title">{{ apartment.title }}</h3>
      <div class="apartment-card-text-container">
        <span class="apartment-card-area">
          {{ apartment.area }} м<sup>2</sup>
        </span>
        <span class="apartment-card-level">
          {{ apartment.level }} <span class="apartment-card-level__max">из 17</span>
        </span>
        <span class="apartment-card-price">{{ apartment.price }} &#x20BD;</span>
      </div>
    </div>
    <img
      class="apartment-card-image"
      :src="`/images/${apartment.imgUrl}`"
      :alt="apartment.imgAlt"
    />
  </article>
</template>

<script setup lang="ts">
import type { IApartmentFormatted } from '~/types/apartments.type'
const { apartment } = defineProps<{ apartment: IApartmentFormatted }>()
const emit = defineEmits<{
  openApartment: [id: number]
}>()

function handleClick(id: number) {
  emit('openApartment', id)
}
</script>

<style scoped lang="sass">
.apartment-card
  display: flex
  flex-wrap: wrap
  gap: $space-7
  justify-content: space-between
  color: $color-text-primary
  padding: $space-7 $space-5
  border-radius: 8px
  border: 1px solid rgba($color-black, 0.1)
  transition: box-shadow $animation-duration ease
  cursor: pointer
  font-weight: 500
  font-size: rem(14px)
  line-height: rem(20px)

  &:hover
    box-shadow: 0 4px 4px rgba($color-black, 25%)
  &:active
    box-shadow: 0 2px 2px rgba($color-black, 25%)

.apartment-card-text-container
  display: grid
  grid-template-columns: repeat(2, 50px) 1fr
  width: 100%
  gap: $space-7

.apartment-card-level__max
  color: rgba($color-text-primary, 0.5)
  font-weight: 400

.apartment-card-title
  font-weight: 500
  margin-bottom: $space-7

.apartment-card-area
  line-height: rem(14px)
</style>