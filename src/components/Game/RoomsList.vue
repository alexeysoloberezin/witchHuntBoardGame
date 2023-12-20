<script setup>
import {computed, onMounted, ref} from "vue";
import RoomItem from "@/components/Game/RoomItem.vue";
import {useRoomsStore} from "@/store/rooms";

const roomsStore = useRoomsStore()
const socket = computed(() => roomsStore.socket)
const rooms = computed(() => roomsStore.rooms)

onMounted(() => {
  roomsStore.getRoomsList()
})

</script>

<template>
  <div class="border-gray-800 border p-4 grid gap-3 lg:grid-cols-4 sm:grid-cols-2">
    rooms: {{ rooms }}
    <RoomItem v-for="room in rooms" :room="room"/>
  </div>
</template>

<style scoped>

</style>