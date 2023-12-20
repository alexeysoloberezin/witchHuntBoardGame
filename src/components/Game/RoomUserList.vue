<script setup>
import RoomUser from "@/components/Game/RoomUser.vue";
import VueQrcode from 'qrcode.vue';
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  userInRoom: {
    type: Boolean,
    default: false,
  }
})

const route = useRoute()
const router = useRouter()
const thisLink = computed(() => window.location.origin + route.fullPath);

const connect = () => {
  router.push('/GameRoom/connectInRoom/' + route.params?.id)
}
</script>

<template>
  <div>
    <div
        class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Button v-if="!userInRoom" outlined size="small" class="mb-4" @click="connect">Подключиться</Button>

      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Список подключенных игроков</h5>
      </div>
      <div class="flow-root divide-y divide-gray-200 dark:divide-gray-700">
        <transition-group name="list" tag="ul">
          <RoomUser v-for="user in users" :user="user" :active="user.id === userInRoom?.id" :key="user._id"/>
        </transition-group>
      </div>

      <div v-if="thisLink" class="border border-gray-700 p-4 rounded flex items-center" style="flex-direction: column">
        <h2 class="text-xl mb-2 text-center">Ссылка на эту страницу:</h2>
        <VueQrcode :value="thisLink" :size="320" />
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>