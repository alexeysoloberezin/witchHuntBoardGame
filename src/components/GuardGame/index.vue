<template>
  <div class="p-4">
    <div class="cardBox space-y-3">
      <h2 class="text-xl text-white ">Подтвердите доступ.</h2>
      <InputText
          v-model="password"
          placeholder="Пароль"
      />
      <Button
        @click="checkPassword"
      >
        Подтвердить
      </Button>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()
const password = ref('')

const checkPassword = () => {
  if(password.value === 'Qwerty123'){
    localStorage.setItem('jwt-token', '2af9b1ba42dc5eb01743e6b3759b6e4b')
    password.value = ''
    router.push('/GameStart')
  }
}
</script>

<style scoped>

</style>