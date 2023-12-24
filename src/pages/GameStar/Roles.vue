<template>
  <div v-if="getInfo" class="p-2">
    <img style="max-width: 95vw;max-height: 95vh" :src="getInfo.card.image"/>


    <img v-if="getInfo.isGood" style="max-width: 95vw;max-height: 95vh" :src="mirImg"/>
    <img v-else style="max-width: 95vw;max-height: 95vh" :src="witchImg"/>
  </div>
</template>

<script setup>
import mirImg from '@/assets/mir.png'
import witchImg from '@/assets/witch.png'

import {useRoute} from "vue-router";
import {computed} from "vue";
import cards from "@/store/cards";

const route = useRoute()
const getInfo = computed(() => {
  const role = route?.query?.role
  const isGood = route?.query?.isGood === 'mir'

  if(!role){
    return null
  }

  return {
    card: cards.find(el => el.name === role.trim()),
    isGood,
    role
  }
})

</script>

<style scoped>

</style>