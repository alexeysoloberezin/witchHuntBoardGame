<template>
  <div class="min-h-screen text-white p-6 bg-gray-200 dark:bg-gray-900">
    <router-link to="/GameStart" class="mb-1">
      <vs-button >
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
      </vs-button>
    </router-link>

    <div v-if="Array.isArray(roles) && roles.length > 5" :key="JSON.stringify(playersRoles)">
      <div v-for="(card, i) in getCards" :key="card.id" class="cardBox mb-2">
        <div>
          Игрок: {{ i + 1 }}
        </div>
        <select v-model="playersRoles[i + 1]" @change="checkErrors" style="height: 40px;min-height: 40px;" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-[40px] p-2 mt-2 block focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="role in roles" :label="role" :key="role" :value="role">{{ role }}</option>
        </select>
        <div v-if="errorList.includes(playersRoles[i + 1])" class="text-sm text-red-700 ml-2 mt-2">
          Повторение
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <vs-button @click="save">
        Сохранить
      </vs-button>
      <vs-button :active-disabled="errorList.length !== 0 || Object.keys(playersRoles).length !== roles.length || !saved">
        <router-link to="/Game" >
          Роли разданы, далее
        </router-link>
      </vs-button>
    </div>
    <br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script >
import cards, {getByNames} from "@/store/cards";

export default {
  name: "GameComming",
  data(){
    return {
      saved: false,
      playersRoles: {},
      roles: [],
      errorList: [],
      rolesItems: cards
    }
  },
  computed: {
    getCards(){
      return getByNames(this.roles)
    }
  },
  methods: {
    save(){
      localStorage.setItem('playersRoles', JSON.stringify(this.playersRoles))
      this.saved = true
    },
    checkErrors(){
      this.saved = false
      const roles = Object.values(this.playersRoles);
      const errorSet = new Set();

      roles.forEach((role, index, array) => {
        // Проверяем, есть ли дубликаты после текущего элемента в массиве
        if (array.slice(index + 1).includes(role)) {
          // Если есть дубликат, добавляем ошибку в errorSet
          errorSet.add(role);
        }
      });

      const errorList = Array.from(errorSet);

      this.errorList = errorList;

      this.save()
    },
  },
  mounted() {
    let roles = localStorage.getItem('gameRoles')
    let playersRoles = localStorage.getItem('playersRoles')
    if(roles){
      roles = JSON.parse(roles)
    }
    if(playersRoles){
      playersRoles = JSON.parse(playersRoles)
    }

    if(playersRoles) {
      this.playersRoles = playersRoles
      // this.playersRoles = roles
    }else{
      this.playersRoles = {}
    }

    if(roles && Array.isArray(roles)) {
      this.roles = roles
      // this.playersRoles = roles
    }else{
      this.roles = []
    }
  },
}
</script>

<style scoped>

</style>