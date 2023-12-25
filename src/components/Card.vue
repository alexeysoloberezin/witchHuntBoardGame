<template>
  <div>
    <div v-if="card" class="cardSafe">
      <img v-if="hideImage" :src="card.ava" style="max-width: 70px;" alt="">
      <div>
        <h3><span class="text-white">{{ card.name }}</span> <span class="text-sm" style="line-height: 1.1">({{ card.name_en }})</span></h3>
        <p v-if="detail" v-html="card.info" class="text-sm opacity-50"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Card} from "@/store/cards.types";

const props = defineProps<{
  card: Card,
  hideImage: boolean,
  detail: boolean
}>()

</script>

<style >

</style>