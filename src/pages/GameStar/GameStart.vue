<template>
  <div class="min-h-screen text-white p-6 bg-gray-200 dark:bg-gray-900">
    <div class="mb-5">
      <div class="text-sm opacity-50 mb-1">Кол. игроков</div>
      <vs-input v-model.number="players" placeholder="Кол. игроков" class="w-full"/>
    </div>
    <div>
      <div class="text-sm opacity-50 mb-1">Роли</div>
      <div class="opacity-75">
        <vs-checkbox v-for="role in rolesItems" :val="role.name" v-model="roles" :key="role.id" class="mb-1" @change="saveRoles">
          <div>
            <span class="mr-2">{{ role.name }}</span> <span style="font-size: 12px; opacity: 0.35">({{ role.name_en.slice(0, 7) }}..)</span>
          </div>
        </vs-checkbox>
      </div>
    </div>
    <hr class="my-2 opacity-25"/>
    <div class="flex items-center gap-4">
        <vs-button :active-disabled="roles.length !== players" @click="start">
            Начать игру
        </vs-button>
      <vs-button @click="resetPrevGame">
          Сбросить предыдущую игру
      </vs-button>
      <div class="text-sm opacity-50">
        Ролей: {{ roles.length }}
      </div>
      <div class="text-sm opacity-50">
        Игроков: {{ players }}
      </div>
    </div>
  </div>
</template>

<script >
import cards from "@/store/cards";

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
  data(){
    return {
      players: 10,
      roles: defRoles,
      rolesItems: cards
    }
  },
  methods: {
    start(){
      this.saveRoles()
      this.$router.push('/GameComming')
    },
    saveRoles(){
      localStorage.setItem('gameRoles', JSON.stringify(this.roles))
    },
    resetPrevGame(){
      const userConfirmed = confirm("Вы уверены?");
      if (userConfirmed) {
        localStorage.removeItem('playersRoles')
        localStorage.removeItem('gameRoles')
        localStorage.removeItem('saveGame')
        localStorage.removeItem('saveGame_all')
        localStorage.removeItem('logList')
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
  },
}
</script>

<style scoped>

</style>