<script setup>

import {useRoomsStore} from "@/store/rooms";
import {computed} from "vue";

const roomsStore = useRoomsStore()
</script>

<template>
  <div>
    <div>
      <h1>Подключение:</h1>
    </div>
    {{ isActive }}
  </div>
</template>

<style scoped>

</style>