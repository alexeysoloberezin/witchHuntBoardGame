<script setup>
import {computed, onBeforeMount, onBeforeUnmount, onMounted} from "vue";
import {useRoomsStore} from "@/store/rooms";
import StatusConnect from "@/components/Game/StatusConnect.vue";

const roomsStore = useRoomsStore()
const isActive = computed(() => roomsStore.isActive)
const socket = computed(() => roomsStore.$state.socket); // Подставьте свой метод для получения сокета

onBeforeMount(() => {
  roomsStore.createConnection()
})

onBeforeUnmount(() => {
  socket.value?.disconnect();
});
</script>

<template>
  <div>
    <div class="fixed" style="top: 10px;right: 10px;">
      <StatusConnect :is-active="isActive"/>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>