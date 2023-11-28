<template>
  <div>
    <router-link to="/main/home/" >
      <vs-button
      >
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
      </vs-button>
    </router-link>

    <div v-if="card" class="mt-4">
      <div class="grid lg:grid-cols-3 gap-5" :class="``">
        <div>
          <img v-if="!ghostMode" :src="card.image"  alt=""/>
          <div v-else class="cardSafe">
            <div class="text-xl">{{ card.name }}</div>
            <div >{{ card.name_en }}</div>
            <div >тип: {{ types[card.type] }}</div>
          </div>
        </div>
        <div class="basis-1/4">
          <h2 class="text-2xl text-white">Информация</h2>
          <div v-html="card.info" class="text-white cardInfo">
          </div>
        </div>
        <div>
          <div v-if="Array.isArray(card.linkCards) && card.linkCards.length > 0" class="basis-1/2">
            <h2 class="text-2xl text-white mb-3">Связанные персонажи</h2>
            <div v-for="(c, i) in getLinks(card.linkCards)" :key="i">
              <router-link  :to="`/main/cards/${c.id}`"   >
                <div v-if="!ghostMode" class="flex items-center mb-3">
                  <img :src="c.ava" alt="" style="max-width: 120px;"/>
                  <div>
                    <!--              <div>{{ c }}</div>-->
                    <div>{{ c.name }}</div>
                  </div>
                </div>
                <CardSafe v-else :card="c"/>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getCardById, getLinks} from "@/store/cards";
import types from "@/js/types";
import CardSafe from "@/components/Card";

export default {
  name: "CardZoom",
  components: {CardSafe},
  data() {
    return {
      ghostMode: true,
      types: types
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
  computed: {
    card(){
      return getCardById(this.$route.params.id)
    }
  },
  methods: {
    cardById(id) {
      return getCardById(id)
    },
    getLinks(ids) {
      return getLinks(ids)
    }
  }

}
</script>

<style>
.cardInfo b, .cardInfo p, .cardInfo h2, .cardInfo h3 {
  display: block;
}
.cardInfo h3{
  margin-bottom: 15px;
  font-size: 18px;
  line-height: 1.3;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  margin-top: 10px;
}
.cardInfo b{
  margin-bottom: 5px;
}
.cardInfo span{
  opacity: 0.3;
}
.cardInfo p{
  margin-bottom: 15px;
  opacity: 0.6;
}
</style>