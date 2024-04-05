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
          :witchQr="false"
          :bigFonts="true"
          :active="pickedUsers"
          @update:clickOnItem="makeRole"
      />
      <vs-dialog modal :visible="showModalRoles" @update:visible="(v) => showModalRoles = v">
        <template #header>
          <h4 class="not-margin text-white">
            Выберите роль для игрока {{ roleFor }}
          </h4>
        </template>

        <div :key="JSON.stringify(playersRoles) + roleFor" class=" text-white  max-h-screen  "
             style="padding-bottom: 100px">
          <div v-for="(card) in getCards" :key="'takeRoles-card-' + card.name" class="cursor-pointer"
               @click="chooseRole(card)">
            <CardSafe
                :card="card"
                :hide-image="false"
                class="mb-3"
            />
          </div>
          <Button @click="nextModal">Изменить команду</Button>
        </div>
      </vs-dialog>
      <vs-dialog modal :visible="showModalType" @update:visible="(v) => showModalType = v">
        <template #header>
          <Button @click="prevModal">Изменить роль</Button>
        </template>
        <div :key="JSON.stringify(playersRoles) + roleFor" class=" text-white grid grid-cols-2  "
             style="padding-bottom: 100px">
          <div @click="chooseType('mir')">
            <img :src="imgs.mirImg" alt="" style="max-height: calc(100vh - 100px);">
          </div>
          <div @click="chooseType('witch')">
            <img :src="imgs.witchImg" alt="" style="max-height: calc(100vh - 100px);">
          </div>
        </div>
      </vs-dialog>
    </div>
    <div class="flex items-center gap-4">
      <Button
          :disabled="Object.keys(playersRoles).length !== roles.length"
          @click="start"
      >
        Роли разданы, далее
      </Button>

    </div>
    <div class="flex gap-3 mt-4">
      <Button
          @click="random"
      >
        Рандомная расдача
      </Button>
      <Button
          outlined
          @click="clear"
      >
        Сбросить
      </Button>
    </div>
    <div v-if="Object.keys(playersRoles).length !== roles.length" style="font-size: 12px" class="pl-2 pt-1 opacity-50">
      Что бы продолжить вам нужно заполнить все роли игроков.
    </div>
    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import cards, {getByNames} from "@/store/cards.ts";
import HistoryLine from "@/components/Game/HistoryLine.vue";
import {arrayStartGameTakeCards} from "@/js/GameModData.ts";
import CardSafe from "@/components/Card.vue";
import mirImg from '@/assets/mir.png'
import witchImg from '@/assets/witch.png'
import GameMod from "@/js/GameMod";
import {toast} from 'vue3-toastify'

export default {
  name: "GameComming",
  components: {CardSafe, HistoryLine},
  data() {
    return {
      imgs: {
        'mirImg': mirImg,
        'witchImg': witchImg,
      },
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
    pickedCards() {
      return Object.entries(this.playersRoles)
          .filter(([n, el]) => (!!el?.type && !!el?.name))
          .map(([n, el]) => el.name)
    },
    pickedUsers() {
      return Object.entries(this.playersRoles)
          .filter(([n, el]) => (!!el?.type && !!el?.name))
          .map(([number]) => number)
    }
  },
  methods: {
    clear(){
      this.playersRoles = {}
      this.save()
    },
    prevModal() {
      this.showModalRoles = true;
      this.showModalType = false;
    },
    nextModal() {
      this.showModalRoles = null;
      this.showModalType = true;
    },
    random() {
      let witches = GameMod.askWitches()
      if(!witches){
        return;
      }

      let roles = localStorage.getItem('gameRoles')
      if (!roles) {
        return toast.error('Не правильные роли!')
      }

      roles = JSON.parse(roles)

      this.playersRoles = GameMod.makeRandomRoles(roles, witches)

      toast.success('Роли успешно розданы!')
      this.save()
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
      this.save();
    },

    makeRole(id) {
      const find = this.playersRoles[id]

      this.roleFor = id

      if (!find || (!!find?.name && !!find?.type)) {
        this.showModalRoles = true
        this.save()
        return null;
      }

      this.showModalRoles = null;
      this.showModalType = true;
      this.save()
    },

    start() {
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