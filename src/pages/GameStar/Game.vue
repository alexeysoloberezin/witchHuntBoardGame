<template>
  <div class="min-h-screen text-white p-6 bg-gray-200 dark:bg-gray-900">
    {{dayLog }}
    <Timer v-if="playersRoles" :voted-list="playersRoles" :key="JSON.stringify(playersRoles)"/>
    <div v-if="playersRoles" :key="JSON.stringify(playersRoles)">
      <div v-for="(card, i) in playersRoles" :key="card.name" class="cardBox mb-2 flex items-center justify-between relative"
           :style="{
              opacity: card.killed ? '.2' : '1',
              border: card.isGood ? '' : '2px dashed rgba(255,71,87, .45)',
              backgroundColor: card.isGood ? '' : 'rgba(255,71,87, .12)'
            }"
      >
        <div class="text-md">

          <div class="flex" style="padding-left: 1px">
            <HearIcon v-for="heart in card.heart" :key="card.name + 'HEART' + heart" class="mb-1"/>
          </div>
          <div class="flex">
            <ShieldIcon v-for="shield in card.shield" :key="card.name + 'shield' + shield" class="mb-1"/>

            <div v-if="card.name === 'Азартный игрок'" class="flex items-center text-sm">
              <ShieldIcon v-if="isNight && gamblerHaveShield(card.gamblerChoose)"  class="mb-1 mr-1"/>
              <div :style="{color: isNight && gamblerHaveShield(card.gamblerChoose) ? 'rgb(25,91,255)' : 'gray'}">
                {{ card.gamblerChoose }}
              </div>
            </div>
          </div>
          <div v-if="card.fakeKill" style="color: rgb(25,91,255)" class="flex items-center ml-1">
            Фейково убит
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="rgb(25,91,255)" viewBox="0 0 24 24"><title>asterisk</title><path d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z" /></svg>
          </div>

          <div class="ml-1">
            <span class="opacity-75" :style="{color: card.killed ? 'rgb(255,71,87)' : ''}">Игрок {{ card.number }}</span>:
            <div :style="{color: card.killed ? 'rgb(255,71,87)' : 'rgb(25,91,255)'}">{{ card.name }}</div>
            <div class="text-sm" :style="{color: card.killed ? 'rgb(255,71,87)' : ''} ">Тип карты: {{ cardTypes[card.type] }}</div>
          </div>

        </div>
        <div class="flex-shrink-0 flex-grow-1 flex items-center " :style="{pointerEvents: card.killed ? 'none' : '', opacity: card.killed ? '.5' : '1'}">
          <div v-if="card.chain">
            <vs-button
                border
                size="small"
                @click="playersRoles[i].shield++;saveAll();"
            >
              <svg style="width: 18px;" fill="#d5d6d7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock-pattern</title><path d="M7,3A4,4 0 0,1 11,7C11,8.86 9.73,10.43 8,10.87V13.13C8.37,13.22 8.72,13.37 9.04,13.56L13.56,9.04C13.2,8.44 13,7.75 13,7A4,4 0 0,1 17,3A4,4 0 0,1 21,7A4,4 0 0,1 17,11C16.26,11 15.57,10.8 15,10.45L10.45,15C10.8,15.57 11,16.26 11,17A4,4 0 0,1 7,21A4,4 0 0,1 3,17C3,15.14 4.27,13.57 6,13.13V10.87C4.27,10.43 3,8.86 3,7A4,4 0 0,1 7,3M17,13A4,4 0 0,1 21,17A4,4 0 0,1 17,21A4,4 0 0,1 13,17A4,4 0 0,1 17,13M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z" /></svg>
            </vs-button>
          </div>
          <div class="ml-2 opacity-75 flex flex-col"
          >
            <vs-button
                border
                size="small"
                @click="playersRoles[i].shield++;saveAll();"
            >
              <ShieldIcon >+</ShieldIcon>
            </vs-button>
            <vs-button
                v-if="playersRoles[i].shield !== 0"
                border
                size="small"
                @click="playersRoles[i].shield--;saveAll();handlerWithShieldOrHeart(i)"
            >
              <ShieldIcon >-</ShieldIcon>
            </vs-button>
          </div>
          <div class="ml-2 opacity-75 flex flex-col"
          >
            <vs-button
                danger
                border
                size="small"
                @click="playersRoles[i].heart++;saveAll();"
            >
              <HearIcon >+</HearIcon>
            </vs-button>
            <vs-button
                v-if="playersRoles[i].heart > 1"
                danger
                border
                size="small"
                @click="playersRoles[i].heart--;saveAll();handlerWithShieldOrHeart(i)"
            >
              <HearIcon >-</HearIcon>
            </vs-button>
          </div>
        </div>
        <div v-if="panelAction" class="absolute top-0 left-0 h-full w-full" @click="action(i)">
          <Skeleton />
        </div>
      </div>
    </div>

    <div class="mobPanel">
      <div class="nightPanel p-3" :class="isNight ? 'active' : ''">
        <div :key="activeNightStep + nightVal">
          <div class="flex items-center gap-3 mb-2">
            <div>Ночь:</div>
            <vs-input v-model.number="nightVal"  placeholder="Ночь" class="w-full "/>
          </div>

          <h3 class="text-center text-xl">{{ getNightPerson.name }}</h3>
          <p class="text-center mt-1 px-4">
            {{ getNightPerson.text }}
          </p>

          <template v-if="getNightPerson.name === 'Азартный игрок'">
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

          <template v-if="getNightPerson.name === 'Могильщик или ученик' && dayLog.length > 0">
            <hr class="opacity-25 my-3"/>
            <div class="text-center">Была:</div>
            <div v-for="(item, i) in dayLog" :key="i + item.type" class="mb-2 text-center">
              {{ item.type }} Игрока {{ item.player }}
            </div>
          </template>


          <div class="flex items-center justify-center mt-2">
            <vs-button
                v-if="activeNightStep !== 0"
                size="large"
                @click="activeNightStep--"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;" fill="#fff" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
            </vs-button>
            <vs-button
                v-if="activeNightStep !== nightSteps.length - 1"
                size="large"
                @click="activeNightStep++"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px;transform: rotate(180deg)" fill="#fff" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
            </vs-button>

            <vs-button
                v-if="activeNightStep === nightSteps.length - 1"
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
      <div style="height: 60px;left: 50%;transform: translateX(-50%);bottom: 10px" class="fixed z-50 w-screen h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button @click="setPanelAction('kill')" data-tooltip-target="tooltip-home" type="button" class="inline-flex outline-none flex-col items-center justify-center px-5 rounded-s-full  group">
            <svg style="width: 30px;" :fill="panelAction === 'kill' ?  'rgb(25,91,255)' : '#d5d6d7'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pistol</title><path d="M7,5H23V9H22V10H16A1,1 0 0,0 15,11V12A2,2 0 0,1 13,14H9.62C9.24,14 8.89,14.22 8.72,14.56L6.27,19.45C6.1,19.79 5.76,20 5.38,20H2C2,20 -1,20 3,14C3,14 6,10 2,10V5H3L3.5,4H6.5L7,5M14,12V11A1,1 0 0,0 13,10H12C12,10 11,11 12,12A2,2 0 0,1 10,10A1,1 0 0,0 9,11V12A1,1 0 0,0 10,13H13A1,1 0 0,0 14,12Z" /></svg>
            <span class="sr-only">Убить</span>
          </button>
          <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Убить
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button @click="setPanelAction('fakeKill')" data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center outline-none justify-center px-5  group">
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" :fill="panelAction === 'fakeKill' ? 'rgb(25,91,255)' : '#d5d6d7'" viewBox="0 0 24 24"><title>asterisk</title><path d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z" /></svg>
            <span class="sr-only">Fake kill</span>
          </button>
          <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Fake kill
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <div class="flex items-center justify-center">
            <button @click="isNight = true" data-tooltip-target="tooltip-new" type="button"
                    :class="isNight ? 'bg-blue-600' : ''"
                    class="inline-flex items-center outline-none justify-center w-10 h-10 font-medium  rounded-full  group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="23px" fill="#fff" viewBox="0 0 24 24"><title>weather-night</title><path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" /></svg>
              <span class="sr-only">New item</span>
            </button>
          </div>
          <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">

            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button @click="setPanelAction('makeWitch')" data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5  group">
            <svg xmlns="http://www.w3.org/2000/svg" :fill="panelAction === 'makeWitch' ? 'rgb(25,91,255)' : '#d5d6d7'" style="width: 28px;" viewBox="0 0 24 24"><title>thumb-down-outline</title><path d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z" /></svg>
            <span class="sr-only">Make witch</span>
          </button>
          <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Settings
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button v-if="true" @click="setPanelAction('chain')" data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  group">
            <svg style="width: 30px;" :fill="panelAction === 'chain' ?  'rgb(25,91,255)' : '#d5d6d7'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock-pattern</title><path d="M7,3A4,4 0 0,1 11,7C11,8.86 9.73,10.43 8,10.87V13.13C8.37,13.22 8.72,13.37 9.04,13.56L13.56,9.04C13.2,8.44 13,7.75 13,7A4,4 0 0,1 17,3A4,4 0 0,1 21,7A4,4 0 0,1 17,11C16.26,11 15.57,10.8 15,10.45L10.45,15C10.8,15.57 11,16.26 11,17A4,4 0 0,1 7,21A4,4 0 0,1 3,17C3,15.14 4.27,13.57 6,13.13V10.87C4.27,10.43 3,8.86 3,7A4,4 0 0,1 7,3M17,13A4,4 0 0,1 21,17A4,4 0 0,1 17,21A4,4 0 0,1 13,17A4,4 0 0,1 17,13M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z" /></svg>
            <span class="sr-only">Profile</span>
          </button>
          <div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
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
import HearIcon from "@/components/HearIcon";
import ShieldIcon from "@/components/ShieldIcon";
import Skeleton from "@/components/Skeleton";
import {getByNames} from "@/store/cards";
import types from "@/js/types";
import Timer from "@/components/Timer";


/*
* Кого пытались убить
* Кто умер
*
* */
export default {
  name: "GameComming",
  components: {Timer, Skeleton, ShieldIcon, HearIcon},
  data() {
    return {
      playersRoles: {},
      panelAction: null,
      isNight: false,
      log: false,
      cardTypes: types,
      nightVal: 1,
      nightHistory: [],
      dayLog: [],

      nightSteps: [
        {
          name: 'Судья или ученик',
          text: `
            Равное количество голосов на прошлом голосовании? Да -
            Просыпается Судья. Хотите ли вы казнить кого-нибудь из прошлого голосования?
          `
        },
        {
          name: 'Азартный игрок',
          firstNight: true,
          text: `
            Просыпается Азартный игрок. И выбирает по каким ночам у него будет иммунитет.
            Чётным или нечетным.
          `
        },
        {
          name: 'Могильщик или ученик',
          text: `
            Просыпается Могильщик. И узнает карты (обе) всех умерших днем игроков.
          `
        },
        {
          name: 'Демоны',
          text: `
            Просыпаются демоны и выбирают каких двух жертв поменять ролями.
          `
        },
        {
          name: 'Ангелы',
          text: `
            Просыпаются Ангелы и выбирают кого они хотят защитить этой ночью.
          `
        },
        {
          name: 'Ведьмы',
          text: `
            Просыпаются Ведьмы и выбирают цель для убийства.
          `
        },
        {
          name: 'Священник',
          text: `
            Просыпаются Священник и делает свою проверку.(на ведьму)
          `
        },
        {
          name: 'Инквизитор',
          text: `
            Просыпаются Священник и делает свою проверку. (Информация, Атака...)
          `
        },
        {
          name: 'Бомбардировщик',
          text: `
            Если бомба есть!!
            Просыпаются Бомбардировщик и подает сигнал если хочет взорвать бомбу.
          `
        },
        {
          name: 'Охотник',
          text: `
            Если предыдущей ночью выживал человек. Просыпается охотник. И убивает цель. Которая выжела.
          `
        },
        {
          name: 'Сторож',
          firstNight: true,
          text: `
            Узнает личность случайного мирного который не просыпался.
          `
        },
      ],
      activeNightStep: 0,
      gamblerChooseClosed: false,
    }
  },
  computed: {
    getNightPerson(){
      return this.nightSteps[this.activeNightStep]
    },
  },
  methods: {
    closeLog(){
      this.log = false
      this.nightHistory = []
    },
    handlerWithShieldOrHeart(index){
      if(this.isNight){
        this.nightHistory.push({
          player: this.playersRoles[index].number,
          type: 'Попытка убийства'
        })
      }
    },
    gamblerHaveShield(choose){
      if(choose === 'четные'){
        return this.nightVal % 2 === 0;
      }else if(choose === 'нечетные') {
        return this.nightVal % 2 !== 0;
      }

      return false

    },
    setGamblerChoose(choose){
      this.playersRoles = this.playersRoles.map(el => {
        if(el.name === 'Азартный игрок'){
          return {
            ...el,
            gamblerChoose: choose
          }
        }else{
          return el
        }
      })
      this.gamblerChooseClosed = true
    },
    handleCloseNight(){
      this.playersRoles = this.playersRoles.map(el => {
        return {
          ...el,
          fakeKill: false,
          killed: false,
          chain: false,
        }
      })
      this.isNight = false
      this.nightVal = ++this.nightVal
      this.nightLog = true
      this.activeNightStep = 1
    },
    setPanelAction(action){
      if(this.panelAction === action){
        this.panelAction = null
        return
      }
      this.panelAction = action
    },
    action(indexPlayer){
      if(this.panelAction === 'kill'){
        if(this.playersRoles[indexPlayer].name === 'Эмиссар' && this.nightVal <= 3){
          alert('U cant kill him')
          return;
        }

        this.playersRoles[indexPlayer].killed = !this.playersRoles[indexPlayer].killed

        if(this.isNight){
          this.nightHistory.push({
            player: this.playersRoles[indexPlayer].number,
            type: 'Убийство'
          })
        }else{
          this.dayLog.push({
            player: this.playersRoles[indexPlayer].number,
            type: 'Казнь'
          })
        }

      }else if(this.panelAction === 'fakeKill'){
        this.playersRoles[indexPlayer].fakeKill =  !this.playersRoles[indexPlayer].fakeKill
      }else if(this.panelAction === 'makeWitch'){
        this.playersRoles[indexPlayer].isGood =  !this.playersRoles[indexPlayer].isGood
        return
      }else if(this.panelAction === 'chain'){
        this.playersRoles[indexPlayer].chain =  !this.playersRoles[indexPlayer].chain
        return;
      }

      this.panelAction = null
    },
    saveAll(){
      localStorage.setItem('saveGame', JSON.stringify(this.playersRoles))
    }
  },
  mounted() {
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
          isGood: true,
          gamblerChoose: '',
          fakeKill: false,
          killed: false,
          chain: false,
          shield: 0,
        }
      })
      // this.playersRoles = roles
    } else {
      this.playersRoles = {}
    }
  },
}
</script>

<style>
.nightPanel{
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
.nightPanel.active{
  transform: translateY(0);
}
</style>