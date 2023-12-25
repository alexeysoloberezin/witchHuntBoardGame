import {computed, onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {io} from "socket.io-client";
import {defineStore} from "pinia";
import {useRoute, useRouter} from "vue-router";
import {useRoomUserStore} from "@/store/roomUser";
import {toast} from "vue3-toastify";
import {useLocalStorage} from "@vueuse/core/index";

export const useRoomsStore = defineStore('rooms', () => {
  const socketUrl = computed(() => import.meta.env.VITE_WS_SERVER)
  const socketPORT = computed(() => import.meta.env.VITE_WS_PORT || '')
  const userClientHistory = useLocalStorage('userClientHistory', [])

  const socket = ref(null);
  const rooms = ref([]);
  const clients = ref([])
  const confirmations = ref([])
  const isActive = ref(false)
  const router = useRouter()
  const route = useRoute()
  const loading = ref(false)
  const roomUserStore = useRoomUserStore()

  const createConnection = async () => {
    socket.value = await io(socketUrl.value + socketPORT.value);

    socket.value.on('connect', () => {
      isActive.value = true
      hashClearUsers()
    });

    socket.value.on('globalRoomChange', (data) => {
      const activeRoom = route.params?.id
      if(!activeRoom){
        return;
      }

      rooms.value = data.rooms
      clients.value = data.rooms.find(room => room._id == activeRoom)?.clients
    })

    socket.value.on('disconnect', async (e) => {
      rooms.value = []
      clients.value = []
      isActive.value = false
      roomUserStore.restoreUser()
    });
  };

  onBeforeUnmount(() => {
    socket.value?.disconnect();
  });

  watch(
    () => socket.value,
    (newSocket, oldSocket) => {
      if (newSocket) {
        initListeners();
      }
    }
  );

  const initListeners = () => {
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

  const hashClearUsers = () => {
    userClientHistory.value.forEach(user => {
      leaveFromAllRooms(user)
    })
    userClientHistory.value = []
  }

  const leaveFromAllRooms = (user) => {
    socket.value?.emit('leaveFromAllRooms', user)
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

  const verifyConnections = () => {
    socket.value?.on('watchClientsResponses', (data) => {
      if(Array.isArray(data) && data.length){
        confirmations.value = data[0]
      }
    })

    socket.value?.emit('checkRoomConnection', {clients: clients.value})
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
          const user =  {
            userName,
            subtitle,
            clientId: data.clientId
          }

          roomUserStore.$patch({
            user,
            loading: false
          })
          userClientHistory.value = [...userClientHistory.value, user]
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
    userClientHistory,
    rooms,
    clients,
    confirmations,
    loading,
    deleteAllRooms,
    getRoomsList,
    getClients,
    createRoom,
    createConnection,
    verifyConnections,
    leaveRoom,
    joinRoom
  };
});
