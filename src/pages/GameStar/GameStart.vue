<template>
  <div class="min-h-screen text-white p-6 bg_app">
    <router-link to="/main/home/" class="mb-1">
      <Button >
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
      </Button>
    </router-link>


   <template v-if="savedGame">
     <div>
       <div  class="block mt-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">У вас есть сохраненная игра!</h5>
         <p class="font-normal text-gray-700 dark:text-gray-400 mb-2">Вы можете продолжить или сбросить и начать новую:</p>
         <router-link to="/Game">
           <Button >
             Продолжить
           </Button>
         </router-link>
       </div>
     </div>
   </template>
    <template v-else>
      <div class="mb-5 mt-3">
        <div class="text-sm opacity-50 mb-1">Кол. игроков</div>
        <InputText v-model.number="players" placeholder="Кол. игроков" class="w-full"/>
      </div>
      <div>
        <div class="text-sm opacity-50 mb-1">Роли</div>
        <div v-for="(role) in rolesItems" :key="role.id" class="opacity-75 flex gap-2 mb-2">
          <Checkbox  :value="role.name"  v-model="roles" :input-id="'role-' + role.id" class="mb-1" @change="saveRoles" />
          <label :for="'role-' + role.id">
            <span class="mr-2">{{ role.name }}</span> <span style="font-size: 12px; opacity: 0.35">({{ role.name_en.slice(0, 7) }}..)</span>
          </label>
        </div>
      </div>
      <hr class="my-2 opacity-25"/>

      <div class="flex  items-center gap-4">
        <Button :disabled="roles.length !== players" @click="start" size="small">
          Начать игру
        </Button>
        <div class="text-sm opacity-50">
          Ролей: {{ roles.length }}
        </div>
        <div class="text-sm opacity-50">
          Игроков: {{ players }}
        </div>
      </div>
    </template>
    <hr class="my-2 opacity-25"/>
    <Button @click="resetPrevGame" size="small" outlined >
      Сбросить предыдущую игру
    </Button>
  </div>
</template>

<script >
import cards from "@/store/cards";
import resetGame from "@/js/utils";
import Button from 'primevue/button';
const defRoles = [
  "Священник",
  "Судья",
  "Могильщик",
  "Ученик",
  "Выжившый",
  "Азартный игрок",
  "Охотник",
  "Ассасин",
  "Медсестра",
  "Сторож"
]

export default {
  name: "GameStart",
  components: {Button},
  data(){
    return {
      players: 10,
      roles: defRoles,
      rolesItems: cards,
      savedGame: null,
    }
  },
  methods: {
    start(){
      resetGame()
      this.saveRoles()
      this.$router.push('/GameComming')
    },
    saveRoles(){
      localStorage.setItem('gameRoles', JSON.stringify(this.roles))
    },
    resetPrevGame(){
      const userConfirmed = confirm("Вы уверены?");
      if (userConfirmed) {
        resetGame()
        this.savedGame = null

        this.roles = defRoles
        this.players = 10
      }
    }
  },
  mounted() {
    let roles = localStorage.getItem('gameRoles')
    if(roles){
      roles = JSON.parse(roles)
    }

    if(roles && Array.isArray(roles)) {
      this.roles = roles
    }else{
      this.roles = defRoles
    }


    let saveGame = localStorage.getItem('saveGame')
    if (saveGame) {
      this.savedGame = JSON.parse(saveGame)
      return null
    }

  },
}
</script>

<style scoped>

</style>