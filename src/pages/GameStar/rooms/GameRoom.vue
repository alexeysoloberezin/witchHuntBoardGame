<script setup>
import {computed, onBeforeMount, onBeforeUnmount, onMounted} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {useRoute, useRouter} from "vue-router";
import {toast} from "vue3-toastify";
import RoomUserList from "@/components/Game/RoomUserList.vue";
import {useRoomUserStore} from "@/store/roomUser";
import useSocketListener from "@/composables/socketListen";

const props = defineProps([])

const roomsStore = useRoomsStore()
const userRoom = useRoomUserStore()
const router = useRouter()
const route = useRoute()

const clients = computed(() => roomsStore.clients.sort((a, b) => a.subtitle - b.subtitle))
const activeRoom = route.params?.id
const userInRoom = computed(() => userRoom.userInRoom)

onBeforeMount(() => {
  if(!activeRoom){
    toast.warn('Нет ID комнаты')
    router.push('/GameRoom/createRoom')
  }

  roomsStore.$patch({
    rooms: [],
    clients: []
  })

  roomsStore.getClients(activeRoom)
})

const leaveRoomBeforeUnload = async () => {
  await roomsStore.leaveRoom(activeRoom);
};

onBeforeUnmount(async () => {
  await leaveRoomBeforeUnload()
})

// useSocketListener(
//     'roomChanged',
//     data => {
//       roomsStore.$patch({
//         clients: data.clients,
//       })
//     }
// )


</script>

<template>
  <div>
    <RoomUserList
        v-if="clients"
        :userInRoom="userInRoom"
        :users="clients"
    />
  </div>
</template>

<style scoped>

</style>