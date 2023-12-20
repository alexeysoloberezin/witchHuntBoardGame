<script setup>
import {computed, onBeforeMount, onBeforeUnmount, onMounted} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {useRoute, useRouter} from "vue-router";
import {toast} from "vue3-toastify";
import RoomUserList from "@/components/Game/RoomUserList.vue";

const props = defineProps([])

const roomsStore = useRoomsStore()
const router = useRouter()
const route = useRoute()

const clients = computed(() => roomsStore.clients.sort((a, b) => a.subtitle - b.subtitle))
const activeRoom = route.params?.id

onBeforeMount(() => {
  if(!activeRoom){
    toast.warn('Нет ID комнаты')
    router.push('/GameRoom/createRoom')
  }

  roomsStore.$patch({
    rooms: [],
    clients: []
  })

  roomsStore.listenRoom()
  roomsStore.getClients(activeRoom)
})

onBeforeUnmount(() => {
  console.log('unmount')
  roomsStore.leaveRoom(activeRoom)
})
</script>

<template>
  <div>
<!--    <Button @click="roomsStore.leaveRoom(activeRoom)">Leave</Button>-->
    <RoomUserList
        v-if="clients"
        :users="clients"
    />
  </div>
</template>

<style scoped>

</style>