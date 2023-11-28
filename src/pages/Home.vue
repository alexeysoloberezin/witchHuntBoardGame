<template>
  <div id="home">
    <div class="mb-4">
      <vs-checkbox v-model="ghostMode" @change="changeMode" >
        Сейф мод, без картинок
      </vs-checkbox>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="(card, index) in cardsItems" :key="index" class="cursor-pointer">
        <router-link :to="`/main/cards/${card.id}`">
          <img v-if="!ghostMode" :src="card.image"  alt="" />
          <div v-else>
            <CardSafe :card="card"/>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapState } from "vuex";

import cards from "@/store/cards";
import CardSafe from "@/components/Card";

export default {
  name: "DashboardHome",
  components: {
    CardSafe,
  },
  computed: {
    ...mapState([

    ]),
  },
  data() {
    return {
      ghostMode: true,
      cardsItems: cards,
      modalVisible: false,
    };
  },
  methods: {
    changeMode(){
        localStorage.setItem('ghostMode', this.ghostMode)
    }
  },
  mounted() {
    let mode = localStorage.getItem('ghostMode')
    if(mode){
      mode = JSON.parse(mode)
    }

    if(mode && typeof mode === 'boolean') {
      this.ghostMode = mode
    }else{
      this.ghostMode = false
    }
  },

};
</script>