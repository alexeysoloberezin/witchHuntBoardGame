<template>
  <div class="min-h-screen text-white p-6 bg-gray-200 dark:bg-gray-900 overflow-x-hidden" >
    <Timer v-if="playersRoles" :voted-list="playersRoles" :key="JSON.stringify(playersRoles)"/>
    <div v-if="playersRoles" :key="JSON.stringify(playersRoles)">
      <CardPlayer
          v-for="(card, i) in playersRoles"
          :key="card.name"
          :card="card"
          :panelAction="panelAction"
          :isNight="isNight"
          :gamblerHaveShield="isNight && gamblerHaveShield(card.gamblerChoose)"
          :cardTypes="cardTypes"
          :shields="playersRoles[i].shield"
          :hearts="playersRoles[i].heart"
          @update:shieldPlus="playersRoles[i].shield++;saveAll();setInGlobalLog('Добавлена броня Игрока: ' + i)"
          @update:shieldMinus="playersRoles[i].shield--;saveAll();handlerWithShieldOrHeart(i)"
          @update:heartPlus="playersRoles[i].heart++;saveAll();setInGlobalLog('Добавлена жизнь Игроку: ' + i)"
          @update:heartMinus="playersRoles[i].heart--;saveAll();handlerWithShieldOrHeart(i)"
          @update:clickOnSkeleton="action(i)"
          @update:foll="makeFoll"
      />
    </div>
    <div v-else>
      <vs-button @click="handlerResetGame">
        Сбросить игру
      </vs-button>
    </div>

    <div class="mobPanel">
      <div class="nightPanel p-3" :class="isNight ? 'active' : ''">
        <div :key="activeNightStep + nightVal">
          <div class="flex items-center gap-3 mb-2">
            <div>Ночь:</div>
            <vs-input v-model.number="nightVal" placeholder="Ночь" class="w-full "/>
          </div>
          <template v-if="nightVal !== 0 && !!getNightPerson">
            <h3 class="text-center text-xl">{{ getNightPerson.name }}</h3>
            <p class="text-center mt-1 px-4">
              {{ getNightPerson.text }}
            </p>

            <template v-if="getNightPerson.name === 'Могильщик или ученик' && dayLog.length > 0">
              <hr class="opacity-25 my-3"/>
              <div class="text-center">Была:</div>
              <div v-for="(item, i) in dayLog" :key="i + item.type" class="mb-2 text-center">
                {{ item.type }} Игрока {{ item.player }}
              </div>
            </template>
          </template>
          <template v-else-if="!!getNightWelcomePerson">
            <h3 class="text-center text-xl">{{ getNightWelcomePerson.name }}</h3>
            <p class="text-center mt-1 px-4">
              {{ getNightWelcomePerson.text }}
            </p>

            <template v-if="getNightWelcomePerson.name === 'Азартный игрок'">
              <div v-if="!gamblerChooseClosed" class="flex items-center justify-center mt-2">
                <vs-button
                    @click="setGamblerChoose('четные')"
                >
                  Четные ночи
                </vs-button>
                <vs-button
                    @click="setGamblerChoose('нечетные')"
                >
                  Нечетные
                </vs-button>
              </div>
            </template>
          </template>
          <div class="flex items-center justify-center mt-2">
            <vs-button
                v-if="activeNightStep !== 0"
                size="large"
                @click="activeNightStep--"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>
                arrow-left</title>
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
              </svg>
            </vs-button>
            <vs-button
                v-if="nightVal === 0 ? (activeNightStep !== nightStepsWelcome.length - 1) : (activeNightStep !== nightSteps.length - 1)"
                size="large"
                @click="activeNightStep++"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;transform: rotate(180deg)" fill="#fff"
                   viewBox="0 0 24 24"><title>arrow-left</title>
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
              </svg>
            </vs-button>

            <vs-button
                v-if="nightVal === 0 ? (activeNightStep === nightStepsWelcome.length - 1) : (activeNightStep === nightSteps.length - 1)"
                @click="handleCloseNight"
            >
              Закончить ночь
            </vs-button>
          </div>

        </div>
      </div>
      <div class="nightPanel p-3" :key="log" :class="log ? 'active' : ''">
        <div>
          <div v-for="(item, i) in nightHistory" :key="i + item.type" class="mb-2 text-center">
            {{ item.type }} Игрока {{ item.player }}
          </div>
        </div>
        <div class="flex justify-center">
          <vs-button
              @click="closeLog"

          >
            Закрыть
          </vs-button>
        </div>
      </div>
      <div style="height: 60px;left: 50%;transform: translateX(-50%);bottom: 10px"
           class="fixed z-50 w-screen h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button @click="setPanelAction('kill')" data-tooltip-target="tooltip-home" type="button"
                  class="inline-flex outline-none flex-col items-center justify-center px-5 rounded-s-full  group">
            <svg style="width: 30px;" :fill="panelAction === 'kill' ?  'rgb(25,91,255)' : '#d5d6d7'"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pistol</title>
              <path
                  d="M7,5H23V9H22V10H16A1,1 0 0,0 15,11V12A2,2 0 0,1 13,14H9.62C9.24,14 8.89,14.22 8.72,14.56L6.27,19.45C6.1,19.79 5.76,20 5.38,20H2C2,20 -1,20 3,14C3,14 6,10 2,10V5H3L3.5,4H6.5L7,5M14,12V11A1,1 0 0,0 13,10H12C12,10 11,11 12,12A2,2 0 0,1 10,10A1,1 0 0,0 9,11V12A1,1 0 0,0 10,13H13A1,1 0 0,0 14,12Z"/>
            </svg>
            <span class="sr-only">Убить</span>
          </button>
          <div id="tooltip-home" role="tooltip"
               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Убить
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button @click="setPanelAction('fakeKill')" data-tooltip-target="tooltip-wallet" type="button"
                  class="inline-flex flex-col items-center outline-none justify-center px-5  group">
            <svg xmlns="http://www.w3.org/2000/svg" width="30px"
                 :fill="panelAction === 'fakeKill' ? 'rgb(25,91,255)' : '#d5d6d7'" viewBox="0 0 24 24"><title>
              asterisk</title>
              <path
                  d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z"/>
            </svg>
            <span class="sr-only">Fake kill</span>
          </button>
          <div id="tooltip-wallet" role="tooltip"
               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Fake kill
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <div class="flex items-center justify-center text-center">
            <div>
              <button @click="isNight = true" data-tooltip-target="tooltip-new" type="button"
                      :class="isNight ? 'bg-blue-600' : ''"
                      class="inline-flex items-center outline-none justify-center w-10 h-10 font-medium  rounded-full  group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="23px" fill="#fff" viewBox="0 0 24 24"><title>
                  weather-night</title>
                  <path
                      d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"/>
                </svg>
                <span class="sr-only">New item</span>
              </button>
              <div class="" style="font-size: 11px">Ст. стола: {{ nightVal }}</div>
            </div>
          </div>
          <div id="tooltip-new" role="tooltip"
               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">

            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button @click="setPanelAction('makeWitch')" data-tooltip-target="tooltip-settings" type="button"
                  class="inline-flex flex-col items-center justify-center px-5  group">
            <svg xmlns="http://www.w3.org/2000/svg" :fill="panelAction === 'makeWitch' ? 'rgb(25,91,255)' : '#d5d6d7'"
                 style="width: 28px;" viewBox="0 0 24 24"><title>thumb-down-outline</title>
              <path
                  d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z"/>
            </svg>
            <span class="sr-only">Make witch</span>
          </button>
          <div id="tooltip-settings" role="tooltip"
               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Settings
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button v-if="true" @click="setPanelAction('chain')" data-tooltip-target="tooltip-profile" type="button"
                  class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  group">
            <svg style="width: 30px;" :fill="panelAction === 'chain' ?  'rgb(25,91,255)' : '#d5d6d7'"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock-pattern</title>
              <path
                  d="M7,3A4,4 0 0,1 11,7C11,8.86 9.73,10.43 8,10.87V13.13C8.37,13.22 8.72,13.37 9.04,13.56L13.56,9.04C13.2,8.44 13,7.75 13,7A4,4 0 0,1 17,3A4,4 0 0,1 21,7A4,4 0 0,1 17,11C16.26,11 15.57,10.8 15,10.45L10.45,15C10.8,15.57 11,16.26 11,17A4,4 0 0,1 7,21A4,4 0 0,1 3,17C3,15.14 4.27,13.57 6,13.13V10.87C4.27,10.43 3,8.86 3,7A4,4 0 0,1 7,3M17,13A4,4 0 0,1 21,17A4,4 0 0,1 17,21A4,4 0 0,1 13,17A4,4 0 0,1 17,13M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z"/>
            </svg>
            <span class="sr-only">Profile</span>
          </button>
          <div id="tooltip-profile" role="tooltip"
               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Profile
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>

    </div>
    <br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import {getByNames} from "@/store/cards";
import types from "@/js/types";
import Timer from "@/components/Timer";
import CardPlayer from "@/components/CardPlayer";
import resetGame from "@/js/utils";

const nightStepsWelcome = [
  {
    name: 'Ведьмы',
    ifPlayerInGame: false,
    text: `
            Знакомятся. Отмечаем кто witcher.
          `
  },
  {
    name: 'Азартный игрок',
    ifPlayerInGame: true,
    text: `
            Просыпается Азартный игрок. И выбирает по каким ночам у него будет иммунитет.
            Чётным или нечетным.
          `
  },
  {
    name: 'Бомбардировщик',
    ifPlayerInGame: true,
    text: `
            Выбирает кому дать бомбу.
          `
  },
  {
    name: 'Оракул',
    ifPlayerInGame: true,
    text: `
            Узнает личность случайного мирного.
          `
  },
  {
    name: 'Ученик',
    ifPlayerInGame: true,
    text: `
            Выбирает могильщик или судья. Нужно показать кто сидит на выбранной роле.
          `
  },
  {
    name: 'Послушник',
    ifPlayerInGame: true,
    text: `
            Узнает кто священник
          `
  },
  {
    name: 'Сторож',
    ifPlayerInGame: true,
    text: `
            Узнает личность случайного мирного который не просыпался.
          `
  },
]
const nightSteps = [
  {
    name: 'Судья или ученик',
    ifPlayerInGame: false,
    text: `
            Равное количество голосов на прошлом голосовании? Да -
            Просыпается Судья. Хотите ли вы казнить кого-нибудь из прошлого голосования?
          `
  },
  {
    name: 'Могильщик или ученик',
    ifPlayerInGame: false,
    text: `
            Просыпается Могильщик. И узнает карты (обе) всех умерших днем игроков.
          `
  },
  {
    name: 'Демоны',
    ifPlayerInGame: false,
    text: `
            Просыпаются демоны и выбирают каких двух жертв поменять ролями.
          `
  },
  {
    name: 'Ангелы',
    ifPlayerInGame: false,
    text: `
            Просыпаются Ангелы и выбирают кого они хотят защитить этой ночью.
          `
  },
  {
    name: 'Ведьмы',
    ifPlayerInGame: false,
    text: `
            Просыпаются Ведьмы и выбирают цель для убийства.
          `
  },
  {
    name: 'Священник',
    ifPlayerInGame: true,
    text: `
            Просыпаются Священник и делает свою проверку.(на ведьму).
            Не забудь оведомить фанатика если его преверят. И дать доп жизнь
          `
  },
  {
    name: 'Инквизитор',
    ifPlayerInGame: true,
    text: `
            Просыпаются Инквизитор и делает свою проверку по типу. (Информация, Атака...)
          `
  },
  {
    name: 'Бомбардировщик',
    ifPlayerInGame: true,
    text: `
            Если бомба есть!!
            Просыпаются Бомбардировщик и подает сигнал если хочет взорвать бомбу.
          `
  },
  {
    name: 'Охотник',
    ifPlayerInGame: true,
    text: `
            Если предыдущей ночью выживал человек. Просыпается охотник. И убивает цель. Которая выжела.
          `
  },

]

export default {
  name: "GameComming",
  components: {CardPlayer, Timer},
  data() {
    return {
      playersRoles: {},
      panelAction: null,
      isNight: false,
      log: false,
      cardTypes: types,
      nightVal: 0,
      nightHistory: [],
      dayLog: [],

      nightStepsWelcome: [],
      nightSteps: [],
      activeNightStep: 0,
      gamblerChooseClosed: false,
    }
  },
  computed: {
    getNightPerson() {
      return this.nightSteps[this.activeNightStep]
    },
    getNightWelcomePerson() {
      return this.nightStepsWelcome[this.activeNightStep]
    },
  },
  methods: {
    makeFoll(index){
      console.log('foll', index)
      const find = this.playersRoles.find(player => player.number === index)

      if(find.foll >= 4){
        find.foll = 0
      }else{
        find.foll = find.foll + 1
        this.$toast.success('Фол Игроку: ' +  index + `<br/> У вас ${find.foll} фола`)
      }

      this.saveAll()
    },
    handlerResetGame() {
      resetGame()
    },
    setInGlobalLog(message){
      let res =  localStorage.getItem('logList' )
      if(res){
        res = JSON.parse(res)
        res = [...res, message]
      }else{
        res = [message]
      }
      localStorage.setItem('logList', JSON.stringify(res))
    },
    closeLog() {
      this.log = false
      this.nightHistory = []
      this.dayLog = []
    },
    handlerWithShieldOrHeart(index) {
      if (this.isNight) {
        this.setInGlobalLog('Ночью убавлена броня или жизнь Игрока: ' + index)

        this.nightHistory.push({
          player: this.playersRoles[index].number,
          type: 'Попытка убийства'
        })
      }else{
        this.setInGlobalLog('Днем убавлена броня или жизнь Игрока: ' + index)
      }
    },
    gamblerHaveShield(choose) {
      if (choose === 'четные') {
        return this.nightVal % 2 === 0;
      } else if (choose === 'нечетные') {
        return this.nightVal % 2 !== 0;
      }

      return false
    },
    setGamblerChoose(choose) {
      this.playersRoles = this.playersRoles.map(el => {
        if (el.name === 'Азартный игрок') {
          return {
            ...el,
            gamblerChoose: choose
          }
        } else {
          return el
        }
      })
      this.gamblerChooseClosed = true
      this.setInGlobalLog('Гамблер (Азартный игрок выбирает): ' + choose + ' ночи')
    },
    handleCloseNight() {
      this.playersRoles = this.playersRoles.map(el => {
        return {
          ...el,
          fakeKill: false,
          chain: false,
        }
      })
      this.isNight = false
      this.nightVal = ++this.nightVal
      this.log = true
      this.activeNightStep = 0
    },
    setPanelAction(action) {
      if (this.panelAction === action) {
        this.panelAction = null
        return
      }
      this.panelAction = action
    },
    action(indexPlayer) {
      if (this.panelAction === 'kill') {
        if (this.playersRoles[indexPlayer].name === 'Эмиссар' && this.nightVal <= 3) {
          alert('U cant kill him')
          this.setInGlobalLog('Попытка убийства Игрока: ' + indexPlayer)
          return;
        }

        this.playersRoles[indexPlayer].killed = !this.playersRoles[indexPlayer].killed

        if (this.isNight) {
          this.nightHistory.push({
            player: this.playersRoles[indexPlayer].number,
            type: 'Убийство'
          })
          this.setInGlobalLog('Убийство Игрока: ' + indexPlayer)
        } else {
          this.dayLog.push({
            player: this.playersRoles[indexPlayer].number,
            type: 'Казнь'
          })
          this.setInGlobalLog('Казнь Игрока: ' + indexPlayer)
        }

      } else if (this.panelAction === 'fakeKill') {
        this.handlerWithShieldOrHeart(indexPlayer)
        this.setInGlobalLog('Фейковое Убийство Игрока: ' + indexPlayer)

        this.playersRoles[indexPlayer].fakeKill = !this.playersRoles[indexPlayer].fakeKill
      } else if (this.panelAction === 'makeWitch') {
        this.playersRoles[indexPlayer].isGood = !this.playersRoles[indexPlayer].isGood
        this.setInGlobalLog('Выбрана ведьма: ' + indexPlayer)
        return
      } else if (this.panelAction === 'chain') {
        this.playersRoles[indexPlayer].chain = !this.playersRoles[indexPlayer].chain
        this.setInGlobalLog('Выбрана связь: ' + indexPlayer)
        return;
      }

      this.panelAction = null
      this.saveAll()
    },
    saveAll() {
      const dataToSave = {
        panelAction: this.panelAction,
        isNight: this.isNight,
        nightVal: this.nightVal,
        log: this.log,
        nightHistory: this.nightHistory,
        dayLog: this.dayLog,
        activeNightStep: this.activeNightStep,
        gamblerChooseClosed: this.gamblerChooseClosed
      };

      localStorage.setItem('saveGame_all', JSON.stringify(dataToSave));
      localStorage.setItem('saveGame', JSON.stringify(this.playersRoles))
    },
    loadData() {
      const savedData = localStorage.getItem('saveGame_all');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(this, parsedData);
      }

      let saveGame = localStorage.getItem('saveGame')
      if (saveGame) {
        this.playersRoles = JSON.parse(saveGame)
        return null
      }

      let playersRoles = localStorage.getItem('playersRoles')
      if (playersRoles) {
        playersRoles = JSON.parse(playersRoles)
      }

      if (playersRoles) {
        const playerNumber = Object.keys(playersRoles)

        this.playersRoles = playerNumber.map(number => {
          const card = getByNames([playersRoles[number]])
          return {
            number,
            name: playersRoles[number],
            type: card[0].type,
            heart: card[0].id === 8 ? 2 : 1,
            foll: 0,
            isGood: true,
            gamblerChoose: '',
            fakeKill: false,
            killed: false,
            chain: false,
            shield: 0,
          }
        })
      } else {
        this.playersRoles = {}
      }


    },
  },
  mounted() {
    let playersRoles = localStorage.getItem('playersRoles')
    if(playersRoles){
      playersRoles = JSON.parse(playersRoles)
      const roles = Object.values(playersRoles)

      this.nightStepsWelcome = nightStepsWelcome.filter((el) => {
        if(el.ifPlayerInGame === false){
          return true
        }else{
          return roles.includes(el.name)
        }
      })

      console.log('nightSteps', nightSteps)
      console.log('roles', roles)

      this.nightSteps = nightSteps.filter((el) => {
        if(el.ifPlayerInGame === false){
          return true
        }else{
          return roles.includes(el.name)
        }
      })
    }else{
      this.nightStepsWelcome = nightStepsWelcome
      this.nightSteps = nightSteps
    }

    this.loadData()

    setTimeout(() => {
      this.saveAll()
    }, 2000)
  },
}
</script>

<style>
.nightPanel {
  position: fixed;
  bottom: 80px;
  background: rgba(26, 28, 35);
  left: 24px;
  z-index: 40;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 10px 125px rgba(11, 54, 87, 0.79);
  width: calc(100vw - 48px);
  transform: translateY(200%);
  transition: .5s;
}

.nightPanel.active {
  transform: translateY(0);
}
</style>