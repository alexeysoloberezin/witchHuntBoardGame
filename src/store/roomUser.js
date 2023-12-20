import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {useRoomsStore} from "@/store/rooms";

export const useRoomUserStore = defineStore('roomUser', () => {
  const user = useStorage('room_user', null, undefined, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v),
    },
  })
  const roomsStore = useRoomsStore()
  const clients = computed(() => roomsStore.clients)
  const loading = ref(false)

  const userInRoom = computed(() => {
    if (!user.value?.userName || !clients.value.length) {
      return false
    }

    const res = clients.value.find(client => client.name === user.value.userName)

    return res || false
  })

  const alreadyHaveName = computed(() => {
    return !!user.value
  })

  async function createUser({name, subtitle, roomId}) {
    loading.value = true
    await roomsStore.joinRoom(roomId, subtitle, name)
  }

  function clearUser() {
    user.value = null
  }

  return {user, clearUser, loading, userInRoom, createUser, alreadyHaveName}
})