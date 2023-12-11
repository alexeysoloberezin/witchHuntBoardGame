<template>
  <div class="min-h-screen text-white p-3 bg-gray-200 dark:bg-gray-900">
    <router-link to="/GameStart" class="mb-1">
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>
          arrow-left</title>
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
        </svg>
      </Button>
    </router-link>

    <div class="pl-4 pt-4">
      <HistoryLine
          :array="historyLine"
          :active="pickedUsers"
          @update:clickOnItem="makeRole"
      />
      <vs-dialog modal :visible="showModalRoles" @update:visible="(v) => showModalRoles = v" >
        <template #header>
          <h4 class="not-margin text-white">
            Выберите роль для игрока {{ roleFor }}
          </h4>
        </template>

        <div  :key="JSON.stringify(playersRoles) + roleFor" class=" text-white  max-h-screen  "
             style="padding-bottom: 100px">
          <div v-for="(card) in getCards" :key="'takeRoles-card-' + card.name" class="cursor-pointer"
               @click="chooseRole(card)">
            <CardSafe
                :card="card"
                :hide-image="false"
                class="mb-3"
            />
          </div>

        </div>
      </vs-dialog>
      <vs-dialog modal  :visible="showModalType" @update:visible="(v) => showModalType = v">
<!--        <template #header>-->
<!--          <h4 class="not-margin text-white">-->
<!--            Выберите роль для игрока {{ roleFor }}-->
<!--          </h4>-->
<!--        </template>-->

        <div  :key="JSON.stringify(playersRoles) + roleFor" class=" text-white grid grid-cols-2  "
              style="padding-bottom: 100px">
          <div @click="chooseType('mir')">
            <img :src="mirImg" alt="" style="max-height: calc(100vh - 100px);">
          </div>
          <div @click="chooseType('witch')">
            <img :src="witchImg" alt="" style="max-height: calc(100vh - 100px);">
          </div>

        </div>
      </vs-dialog>
    </div>
    <div  class="flex items-center gap-4">
      <Button
          :disabled="Object.keys(playersRoles).length !== roles.length"
          @click="start"
      >
          Роли разданы, далее
      </Button>
      <Button
          v-if="true"
          @click="random"
      >
        random
      </Button>
    </div>
    <div v-if="Object.keys(playersRoles).length !== roles.length" style="font-size: 12px" class="pl-2 pt-1 opacity-50">
      Что бы продолжить вам нужно заполнить все роли игроков.
    </div>
    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import cards, {getByNames} from "@/store/cards";
import HistoryLine from "@/components/Game/HistoryLine.vue";
import {arrayStartGameTakeCards} from "@/js/GameModData";
import CardSafe from "@/components/Card.vue";
import mirImg from '@/assets/mir.png'
import witchImg from '@/assets/witch.png'

export default {
  name: "GameComming",
  components: {CardSafe, HistoryLine},
  data() {
    return {
      saved: false,
      playersRoles: {},

      showModalRoles: false,
      showModalType: false,
      roleFor: null,
      historyLine: [],
      roles: [],
      errorList: [],
      rolesItems: cards
    }
  },

  computed: {
    getCards() {
      let roles = this.roles.filter(role => !this.pickedCards.includes(role))
      return getByNames(roles)
    },
    pickedCards(){
      return Object.values(this.playersRoles).map(el => el.name)
    },
    pickedUsers(){
      return Object.keys(this.playersRoles)
    }
  },
  methods: {
    random(){
      let roles = localStorage.getItem('gameRoles')
      if(roles){
        roles = JSON.parse(roles)

        const res = {}

        roles.forEach((role, i) => {
          res[i + 1] = {
            type: i < 4 ? 'witch' : 'mir',
            name: role
          }
        })

        this.playersRoles = res
        this.save()
      }
    },
    chooseType(type) {
      this.playersRoles[this.roleFor] = {
        ...this.playersRoles[this.roleFor],
        type
      };
      this.showModalType = false
      this.save();
    },

    chooseRole(card) {
      this.playersRoles[this.roleFor] = {
        ...this.playersRoles[this.roleFor],
        name: card.name
      };

      this.showModalRoles = null;
      this.showModalType = true;
    },

    makeRole(id) {
      this.roleFor = id
      this.showModalRoles = true
    },
    start(){
      this.save()
      localStorage.removeItem('gameRoles')
      this.$router.push('/Game')
    },
    save() {
      this.historyLine = arrayStartGameTakeCards(this.roles.length, this.playersRoles)
      localStorage.setItem('playersRoles', JSON.stringify(this.playersRoles))
    },
  },
  mounted() {
    let roles = localStorage.getItem('gameRoles')
    let playersRoles = localStorage.getItem('playersRoles')
    if (roles) {
      roles = JSON.parse(roles)
    }
    if (playersRoles) {
      playersRoles = JSON.parse(playersRoles)
    }

    if (playersRoles) {
      this.playersRoles = playersRoles
    } else {
      this.playersRoles = {}
    }

    if (roles && Array.isArray(roles)) {
      this.roles = roles
    } else {
      this.roles = []
    }

    this.historyLine = arrayStartGameTakeCards(this.roles.length, this.playersRoles)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      block: 'start',
    });
  },
}
</script>

<style scoped>

</style>