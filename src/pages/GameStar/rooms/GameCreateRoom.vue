<script setup>
import {onMounted, ref} from 'vue';
import { useRoomsStore } from "@/store/rooms";
import RoomsList from "@/components/Game/RoomsList.vue";
import axios from 'axios';

const nameRoom = ref('');
const roomsStore = useRoomsStore();

const createRoom = () => {
  roomsStore.createRoom(nameRoom.value);
};

const deleteAllRooms = () => {
  roomsStore.deleteAllRooms()
}

</script>

<template>
  <div class="text-white p-5 grid gap-4">
    <h1>Создать комнату</h1>
    <InputText placeholder="Название комнаты" v-model="nameRoom"/>
    <div class="flex gap-2">
      <Button @click="createRoom">Создать комнату</Button>
      <Button @click="deleteAllRooms">Удалить все комнаты</Button>
    </div>
    <h2 style="font-size: 26px" class="text-center">Комнаты:</h2>

    <RoomsList />
  </div>
</template>

<style scoped>
/* Ваши стили */
</style>
