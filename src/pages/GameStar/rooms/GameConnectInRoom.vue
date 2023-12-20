<script setup>
import {Form, Field, ErrorMessage} from 'vee-validate';
import * as yup from 'yup';
import {useRoute, useRouter} from "vue-router";
import FormInput from "@/components/FormInput.vue";
import {useRoomUserStore} from "@/store/roomUser";
import {computed, onMounted, ref} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {toast} from "vue3-toastify";

const route = useRoute()
const router = useRouter();
const userRoomStore = useRoomUserStore()
const roomsStore = useRoomsStore()

const user = computed(() => userRoomStore.user)
const loading = computed(() => userRoomStore.loading)

const roomId = route.params?.id

const schema = yup.object({
  name: yup.string().required().min(2),
  subtitle: yup.number().required(),
});

const onSubmit = (fields) => {
  userRoomStore.createUser({...fields, roomId})
}

const goBack = () => router.go(-1);

const goToRoom = () => {
  roomsStore.joinRoom(roomId, user.value)
}


</script>

<template>
  <div class="max-w-md mx-auto mt-6">
    <div class="text-lg text-center mb-4">
      <div>
        Подключиться в комнату
      </div>
      <div class="opacity-25 text-sm">
        {{ route?.params?.id }}
      </div>
    </div>

    <div v-if="user"
         class="userBox p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4 mb-4">
      <h1>
        <span class="opacity-50">Войти как:</span> <b>{{ user }}</b>
      </h1>
      <Button size="small" :loading="loading" @click="goToRoom">
        {{ loading ? 'Loading' : 'Войти' }}
      </Button>
    </div>

    <Form @submit="onSubmit" :validation-schema="schema" class="grid gap-4 border border-gray-700 rounded p-6">
      <h2>Создать нового пользователя:</h2>
      <FormInput
          :name="'name'"
          placeholder="Имя*"
          :type="'text'"
      />
      <FormInput
          :name="'subtitle'"
          placeholder="Игровой номер"
          :type="'number'"
      />
      <Button :loading="loading" type="submit">
        {{ loading ? 'Loading' : 'Создать' }}
      </Button>
    </Form>

    <Button outlined @click="goBack" class="mt-4">Назад</Button>
  </div>
</template>

<style scoped>
</style>