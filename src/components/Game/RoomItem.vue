<script setup>
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="room">
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center">
        <h5 class="text-sm mr-2">
          Users: {{ room.clients.length }}
        </h5>
        <div class="opacity-25 text-sm">
          #{{ room._id }}
        </div>
      </div>
      <h5 class="mb-0 text-lg tracking-tight text-gray-900 dark:text-white">Комната:
        <b class="text-xl ">{{
            room?.name || '-'
          }}</b>
      </h5>

      <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
        Автор: {{ room.authorName }}
      </p>
      <router-link :to="'/GameRoom/connectInRoom/' + room._id"
                   class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Подключиться
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>