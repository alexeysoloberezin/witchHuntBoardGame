<script>
import SocketApi from "@/api/socket-api";

export default {
  name: "GameConnectUsers",
  data(){
    return{
      message: '',
      rooms: [],
      messages: []
    }
  },
  mounted() {
    SocketApi.createConnection()

    SocketApi.socket?.on('roomCreated', (data) => {
      console.log('Room created:', data.room);
      this.rooms.push(data.room);
    });

    // SocketApi.getRoomsList((roomsList) => {
    //   console.log('Received rooms list:', roomsList);
    //   this.rooms = roomsList
    // });
    //
    // SocketApi.socket?.on("roomJoined", (roomsList) => {
    //   console.log('roomsList', roomsList)
    // });
  },
  methods: {
    leaveRoom(){
      console.log('leaveRoom')
      SocketApi.socket?.emit('leaveRoom')
    },
    createRoom() {
      // Отправить запрос на создание комнаты
      SocketApi.socket?.emit('createRoom', this.message);
    },
    joinRoom(roomName) {
      // Отправить запрос на присоединение к комнате
      SocketApi.socket?.emit('joinRoom', roomName);
    },

  }
}
</script>

<template>
  <div class="text-white">
    <div>connect users</div>
    <InputText placeholder="Message" v-model="message"/>
    <Button @click="createRoom">Create</Button>
    <Button @click="leaveRoom">Leave</Button>

    <div class="border-gray-800 border p-4">
      {{ rooms }}
    </div>
  </div>
</template>

<style scoped>

</style>