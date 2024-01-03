<template>
  <div class="p-6">
    <div class="mb-3 flex gap-3">
      <router-link to="/GameStart" class="">
        <Button class="">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
        </Button>
      </router-link>
      <InputText v-model.number="players" placeholder="Кол. игроков" class="w-full"/>
    </div>
    <div>
      <CardVariantGame
          v-for="(variant, index) in variants"
          :key="variant.title"
          :title="variant.title"
          :players-length="players"
          :description="variant.description"
          :rolesList="variant.roles"
          @click="setVariant(variant)"
      />
    </div>
  </div>
</template>

<script setup>
import GameVariants from "@/js/GameModModules/GameVariants.ts";
import CardVariantGame from "@/components/Game/CardVariantGame.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

const variants = GameVariants.getVariants();
const players = ref(10)
const router = useRouter()

const setVariant = (variant) => {
  GameVariants.setVariant(variant.roles.slice(0, players.value))
  router.push('/GameStart')
}
</script>

<style scoped>

</style>