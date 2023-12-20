import {computed, ref, watch} from "vue";
import {io} from "socket.io-client";
import {defineStore} from "pinia";
import {useRoute, useRouter} from "vue-router";
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
  const route = useRoute()
  const loading = ref(false)
  const roomUserStore = useRoomUserStore()
  


  const createConnection = async () => {
    console.log('socketUrl.value + socketPORT.value', socketUrl.value + socketPORT.value)
    debugger
    socket.value = await io(socketUrl.value + socketPORT.value);

    socket.value.on('connect', () => {
      isActive.value = true
    });

    socket.value.on('disconnect', async (e) => {
      rooms.value = []
      clients.value = []
      isActive.value = false
      await router.push('/GameRoom/rooms')
    });
  };

  watch(
    () => socket.value,
    (newSocket, oldSocket) => {
      if (newSocket) {
        initListeners();
      }
    }
  );

  const initListeners = () => {
    socket.value?.on('roomCreated', (data) => {
      rooms.value = data.rooms;
      loading.value = false
    });

    socket.value?.on('roomChanged', (data) => {
      if (Array.isArray(data)) {
        clients.value = data
      } else {
        clients.value = data.clients
      }
    })

    getRoomsList()
    getClients(route.params?.id)
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
    loading.value = true
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
            user: {
              userName,
              subtitle
            },
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
    socket.value?.emit("getRoomsList", (roomsList) => {
      rooms.value = roomsList || [];
    });
  };

  return {
    socket,
    isActive,
    rooms,
    clients,
    loading,
    deleteAllRooms,
    getRoomsList,
    getClients,
    createRoom,
    createConnection,
    leaveRoom,
    joinRoom
  };
});
