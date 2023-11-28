<template>
  <div class="min-h-screen text-white p-6 bg-gray-200 dark:bg-gray-900">
<!--    {{ playersRoles }}-->
    <div v-if="playersRoles" :key="JSON.stringify(playersRoles)">
      <div v-for="(card, i) in playersRoles" :key="card.name" class="cardBox mb-2 flex items-center justify-between relative"
           :style="{opacity: card.killed ? '.2' : '1'}"
      >
        <div class="text-md">
          <div class="flex" style="padding-left: 1px">
            <HearIcon v-for="heart in card.heart" :key="card.name + heart" class="mb-1"/>
          </div>
          <div class="flex">
            <ShieldIcon v-for="shield in card.shield" :key="card.name + shield" class="mb-1"/>
          </div>
          <div v-if="card.fakeKill" style="color: rgb(25,91,255)" class="flex items-center ml-1">
            Фейково убит
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="rgb(25,91,255)" viewBox="0 0 24 24"><title>asterisk</title><path d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z" /></svg>
          </div>

          <div class="ml-1">
            <span class="opacity-75" :style="{color: card.killed ? 'rgb(255,71,87)' : ''}">Игрок {{ card.number }}</span>:
            <div :style="{color: card.killed ? 'rgb(255,71,87)' : ''}">{{ card.name }}</div>
          </div>

        </div>
        <div class="flex-shrink-0 flex-grow-1 flex items-center " :style="{pointerEvents: card.killed ? 'none' : '', opacity: card.killed ? '.5' : '1'}">
          <div class="ml-2 opacity-75 flex flex-col"
          >
            <vs-button
                border
                size="small"
                @click="playersRoles[i].shield++;saveAll()"
            >
              <ShieldIcon >+</ShieldIcon>
            </vs-button>
            <vs-button
                border
                size="small"
                @click="playersRoles[i].shield--;saveAll()"
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
                @click="playersRoles[i].heart++;saveAll()"
            >
              <HearIcon >+</HearIcon>
            </vs-button>
            <vs-button
                danger
                border
                size="small"
                @click="playersRoles[i].heart--;saveAll()"
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
            <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center outline-none justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
              <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>
              <span class="sr-only">New item</span>
            </button>
          </div>
          <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Create new item
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5  group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
            </svg>
            <span class="sr-only">Settings</span>
          </button>
          <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Settings
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
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
  </div>
</template>

<script>
import HearIcon from "@/components/HearIcon";
import ShieldIcon from "@/components/ShieldIcon";
import Skeleton from "@/components/Skeleton";

export default {
  name: "GameComming",
  components: {Skeleton, ShieldIcon, HearIcon},
  data() {
    return {
      playersRoles: {},
      panelAction: null,
    }
  },

  methods: {
    setPanelAction(action){
      this.panelAction = action
    },
    action(indexPlayer){
      if(this.panelAction === 'kill'){
        this.playersRoles[indexPlayer].killed = !this.playersRoles[indexPlayer].killed
      }else if(this.panelAction === 'fakeKill'){
        this.playersRoles[indexPlayer].fakeKill =  !this.playersRoles[indexPlayer].fakeKill
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

      this.playersRoles = playerNumber.map(number => ({
        number,
        name: playersRoles[number],
        heart: 1,
        fakeKill: false,
        killed: false,
        shield: 0,
      }))
      // this.playersRoles = roles
    } else {
      this.playersRoles = {}
    }
  },
}
</script>

<style scoped>

</style>