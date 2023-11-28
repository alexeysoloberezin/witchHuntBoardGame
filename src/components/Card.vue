<template>
  <div>
    <div v-if="card" class="cardSafe">
      <h3><span class="text-white">{{ card.name }}</span> ({{ card.name_en }})</h3>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSafe",
  props: ['card']
}
</script>

<style >

</style>