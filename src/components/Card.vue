<template>
  <div>
    <div v-if="card" class="cardSafe">
      <img v-if="hideImage" :src="card.ava" style="max-width: 70px;" alt="">
      <div>
        <h3><span class="text-white">{{ card.name }}</span> <span class="text-sm" style="line-height: 1.1">({{ card.name_en }})</span></h3>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSafe",
  props: ['card', 'hideImage']
}
</script>

<style >

</style>