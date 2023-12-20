import {ref} from "vue";
import {io} from "socket.io-client";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import {useRoomUserStore} from "@/store/roomUser";
import {toast} from "vue3-toastify";

export const useRoomsStore = defineStore('rooms', () => {
  const socket = ref(null);
  const rooms = ref([]);
  const clients = ref([])
  const isActive = ref(false)
  const router = useRouter()
  const roomUserStore = useRoomUserStore()

  const createConnection = async () => {
    socket.value = await io('http://83.222.9.67:3000/sockets');
    // socket.value = io('http://localhost:5222/');

    socket.value.on('connect', () => {
      console.log('connect');
      isActive.value = true
    });

    socket.value.on('disconnect', async (e) => {
      console.log('disconnect', e);
      rooms.value = []
      clients.value = []
      isActive.value = true
      await router.push('/GameRoom/rooms')
    });
  };

  const deleteAllRooms = () => {
    socket.value?.emit('deleteAllRooms', () => {
      rooms.value = []
      clients.value = []
    })
  }

  const listenRoom = () => {
    socket.value?.on('roomChanged', (data) => {
      if (Array.isArray(data)) {
        clients.value = data
      } else {
        clients.value = data.clients
      }
    })
  }

  const getClients = async (roomId) => {
    socket.value?.emit('getClientsList', {roomId}, (data) => {
      console.log('Clients in room:', data);
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
    socket.value?.emit("getRoomsList", (roomsList) => {
      rooms.value = roomsList || [];
    });

    socket.value?.on('roomCreated', (data) => {
      rooms.value = data.rooms;
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
    listenRoom,
    createRoom,
    createConnection,
    leaveRoom,
    joinRoom
  };
});
