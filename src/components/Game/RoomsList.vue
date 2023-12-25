<script setup>
import {computed, onMounted, ref} from "vue";
import RoomItem from "@/components/Game/RoomItem.vue";
import {useRoomsStore} from "@/store/rooms";
import useSocketListener from "@/composables/socketListen.ts";

const roomsStore = useRoomsStore()
const socket = computed(() => roomsStore.$state.socket)
const rooms = computed(() => roomsStore.$state.rooms)

onMounted(() => {
  roomsStore.getRoomsList()
})

useSocketListener(
    'roomCreated',
    ({rooms}) => {
      roomsStore.$patch({
        rooms,
        loading: false
      })
    },
)
</script>

<template>
  <div v-if="rooms.length" class="border-gray-800 border p-4 grid gap-3 lg:grid-cols-4 sm:grid-cols-2">
    <RoomItem v-for="room in rooms" :room="room"/>
  </div>
  <div v-else>
    <h2 class="text-xl text-center">Комнат нет :)</h2>
  </div>
</template>

<style scoped>

</style>