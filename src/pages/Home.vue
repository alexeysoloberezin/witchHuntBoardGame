<template>
  <div id="home">
    <div class="mb-4 mt-2">

      <InputText v-model.trim="search" placeholder="Поиск по персонажам"></InputText>
      <div class="flex my-3">
        <Checkbox v-model="ghostMode" binary @update:page="changeMode" label="" />
        <label for="ingredient2" class="ml-2"> Сейф мод, без картинок </label>
      </div>
      <div v-show="!ghostMode" class="flex">
        <Checkbox  v-model="imageGrid" binary @change="changeMode"  />
        <label for="ingredient2" class="ml-2"> Сетка картинок </label>
      </div>
    </div>

    <transition-group name="list" tag="div" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="(card, index) in getCardsItems" :key="index" class="cursor-pointer">
        <router-link :to="`/main/cards/${card.id}`">
          <img v-if="imageGrid" :src="card.image" alt=""/>
          <div v-else>
            <CardSafe :card="card" :hideImage="!ghostMode"/>
          </div>
        </router-link>
      </div>
    </transition-group>
    <br><br><br><br><br>
  </div>
</template>

<style scoped>
</style>

<script>

import cards from "@/store/cards";
import CardSafe from "@/components/Card";

export default {
  name: "DashboardHome",
  components: {
    CardSafe,
  },
  computed: {
    getCardsItems() {
      const search = this.search.toLowerCase()
      if (search) {
        return this.cardsItems.filter(el => {
          return el.name.toLowerCase().includes(search) || el.name_en.toLowerCase().includes(search)
        })
      }
      return this.cardsItems
    }
  },
  data() {
    return {
      ghostMode: true,
      cardsItems: cards,
      imageGrid: false,
      search: '',
      modalVisible: false,
    };
  },
  methods: {
    changeMode() {
      localStorage.setItem('ghostMode', this.ghostMode)
      if (this.ghostMode) {
        this.imageGrid = false
      }
    }
  },
  mounted() {
    let mode = localStorage.getItem('ghostMode')
    if (mode) {
      mode = JSON.parse(mode)
    }

    if (mode && typeof mode === 'boolean') {
      this.ghostMode = mode
    } else {
      this.ghostMode = false
    }
  },

};
</script>