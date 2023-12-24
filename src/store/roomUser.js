import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {useRoomsStore} from "@/store/rooms";


export const useRoomUserStore = defineStore('roomUser', () => {
  const user = ref(null)

  const roomsStore = useRoomsStore()
  const clients = computed(() => roomsStore.clients)
  const loading = ref(false)

  const userInRoom = computed(() => {
    if (!user.value?.clientId || !clients.value.length) {
      return false
    }

    const res = clients.value.find(client => client.id === user.value?.clientId)

    return res || false
  })

  const alreadyHaveName = computed(() => {
    return !!user.value
  })

  const restoreUser = () => {
    user.value = null
  }

  async function createUser({name, subtitle, roomId}) {
    loading.value = true
    await roomsStore.joinRoom(roomId, subtitle, name)
  }

  function clearUser() {
    user.value = null
  }

  return {user, clearUser, loading,restoreUser, userInRoom, createUser, alreadyHaveName}
})