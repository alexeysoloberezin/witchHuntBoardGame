import {computed, ref} from "vue";
import {io} from "socket.io-client";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import {useRoomUserStore} from "@/store/roomUser";
import {toast} from "vue3-toastify";

export const useRoomsStore = defineStore('rooms', () => {
  const socketUrl = computed(() => import.meta.env.VITE_WS_SERVER)
  const socketPORT = computed(() => import.meta.env.VITE_WS_PORT || '')

  const socket = ref(null);
  const rooms = ref([]);
  const clients = ref([])
  const isActive = ref(false)
  const router = useRouter()
  const roomUserStore = useRoomUserStore()


  const createConnection = async () => {
    console.log(socketUrl.value + socketPORT.value)
    socket.value = await io(socketUrl.value + socketPORT.value);

    socket.value.on('connect', () => {
      console.log('connect');
      isActive.value = true

      initListeners()
    });

    socket.value.on('disconnect', async (e) => {
      console.log('disconnect', e);
      rooms.value = []
      clients.value = []
      isActive.value = false
      await router.push('/GameRoom/rooms')
    });
  };

  const initListeners = () => {
    socket.value?.on('roomCreated', (data) => {
      console.log('data roomCreated: ', data)
      rooms.value = data.rooms;
    });

    socket.value?.on('roomChanged', (data) => {
      if (Array.isArray(data)) {
        clients.value = data
      } else {
        clients.value = data.clients
      }
    })
  }

  const deleteAllRooms = () => {
    socket.value?.emit('deleteAllRooms', () => {
      rooms.value = []
      clients.value = []
    })
  }

  const getClients = async (roomId) => {
    socket.value?.emit('getClientsList', {roomId}, (data) => {
      clients.value = data
    });
  }

  const createRoom = (room) => {
    socket.value?.emit('createRoom', {room});
  };

  const leaveRoom = (room) => {
    socket.value?.emit('leaveRoom', {room});
  };

  const joinRoom = async (roomId, subtitle, userName) => {
    roomUserStore.$patch({
      loading: true
    })

    try {
      socket.value?.emit('joinRoom', {roomId, subtitle, userName}, (data) => {
        if (userName === data.userName) {
          roomUserStore.$patch({
            user: userName,
            loading: false
          })
        }
        router.push('/GameRoom/room/' + roomId)
      });
    } catch (err) {
      toast.error('Error join room')
    }
  };

  const getRoomsList = () => {
    console.log('getRoomsList')

    setInterval(() => {
      console.log(rooms.value)
    }, 1000)

    socket.value?.emit("getRoomsList", (roomsList) => {
      rooms.value = roomsList || [];
    });
  };

  return {
    socket,
    isActive,
    rooms,
    clients,
    deleteAllRooms,
    getRoomsList,
    getClients,
    createRoom,
    createConnection,
    leaveRoom,
    joinRoom
  };
});
