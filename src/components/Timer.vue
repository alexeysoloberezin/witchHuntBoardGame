<template>
  <div>
    <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 fixed "
         style="top: 0;left: 0;width: 100vw; z-index: 102">
      <div class="bg-blue-600 h-2 rounded-full" :style="{width: value + '%', transition: 'width 0.5s'}"></div>
    </div>

    <div v-if="logListShow" class="fixed logList bg-gray-800 flex items-center justify-center rounded"
         style="top: 0;left: 0;width: 100vw;height: 100vh;z-index: 101;padding: 30px 20px 30px 80px">
        <div class="bg-gray-900  w-full h-full rounded-lg p-3 overflow-y-auto">
          <div v-for="(el,i) in logList" :key="'logList-' + i">
            -- {{ el }}
          </div>
        </div>
    </div>

    <div v-if="lock" class="fixed bg-gray-800 flex items-center justify-center"
         style="top: 0;left: 0;width: 100vw;height: 100vh;z-index: 101;">

      <img class="absolute top-0 left-0 w-screen h-screen pointer-events-none" style="opacity: .12;filter: grayscale(0)"
           :src="imgTexture" alt="">

      <radial-progress-bar :diameter="300"
                           :completed-steps="completedSteps"
                           innerStrokeColor="#101116"
                           :strokeWidth="17"
                           :innerStrokeWidth="20"
                           startColor="#1c64f2"
                           stopColor="##aa1cf2"
                           :total-steps="totalSteps"
      >
        <p class="text-4xl font-medium">{{ completedSteps }}</p>
      </radial-progress-bar>
    </div>

    <div class="fixed  group" style="bottom: 75px;left: 10px;z-index: 103;transition: .4s"
         :style="{bottom: !lock ? '80px' : '15px'}">

      <div class="flex flex-col items-center  mb-4 space-y-2" :class="!open ? 'hidden': ''">
<!--        <button @click="showLog" type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left"-->
<!--                style="width: 50px;height: 50px;"-->
<!--                class="flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">-->
<!--          <svg  class="w-6 opacity-50 block" fill="#fff"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>math-log</title><path d="M18 7C16.9 7 16 7.9 16 9V15C16 16.1 16.9 17 18 17H20C21.1 17 22 16.1 22 15V11H20V15H18V9H22V7H18M2 7V17H8V15H4V7H2M11 7C9.9 7 9 7.9 9 9V15C9 16.1 9.9 17 11 17H13C14.1 17 15 16.1 15 15V9C15 7.9 14.1 7 13 7H11M11 9H13V15H11V9Z" /></svg>-->
<!--          <span class="sr-only">Log</span>-->
<!--        </button>-->
        <button @click="leaveGame" type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left"
                style="width: 50px;height: 50px;"
                class="flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
          <svg class="w-6 opacity-50 block" fill="#fff"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exit-run</title><path d="M13.34,8.17C12.41,8.17 11.65,7.4 11.65,6.47A1.69,1.69 0 0,1 13.34,4.78C14.28,4.78 15.04,5.54 15.04,6.47C15.04,7.4 14.28,8.17 13.34,8.17M10.3,19.93L4.37,18.75L4.71,17.05L8.86,17.9L10.21,11.04L8.69,11.64V14.5H7V10.54L11.4,8.67L12.07,8.59C12.67,8.59 13.17,8.93 13.5,9.44L14.36,10.79C15.04,12 16.39,12.82 18,12.82V14.5C16.14,14.5 14.44,13.67 13.34,12.4L12.84,14.94L14.61,16.63V23H12.92V17.9L11.14,16.21L10.3,19.93M21,23H19V3H6V16.11L4,15.69V1H21V23M6,23H4V19.78L6,20.2V23Z" /></svg>
          <span class="sr-only">leave</span>
        </button>
        <button @click="startTimer" type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left"
                style="width: 50px;height: 50px;"
                class="flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
          <svg class="w-6 opacity-75 block" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>
            timer-outline</title>
            <path
                d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z"/>
          </svg>
          <span class="sr-only">Share</span>
        </button>
        <button @click="stopTimer" type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left"
                style="width: 50px;height: 50px;"
                class="flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
          <svg class="w-6 opacity-75 block" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>
            timer-cancel-outline</title>
            <path
                d="M11 8H13V14H11V8M15 1H9V3H15V1M12 20C8.13 20 5 16.87 5 13S8.13 6 12 6C15.54 6 18.45 8.62 18.93 12.03C19.65 12.08 20.34 12.23 21 12.5C20.87 10.57 20.16 8.81 19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 6C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13S7.03 22 12 22C12.34 22 12.67 22 13 21.94C12.63 21.35 12.35 20.69 12.18 20C12.12 20 12.06 20 12 20M23 18.5C23 21 21 23 18.5 23S14 21 14 18.5 16 14 18.5 14 23 16 23 18.5M20 21.08L15.92 17C15.65 17.42 15.5 17.94 15.5 18.5C15.5 20.16 16.84 21.5 18.5 21.5C19.06 21.5 19.58 21.35 20 21.08M21.5 18.5C21.5 16.84 20.16 15.5 18.5 15.5C17.94 15.5 17.42 15.65 17 15.92L21.08 20C21.35 19.58 21.5 19.06 21.5 18.5Z"/>
          </svg>
          <span class="sr-only">stopTimer</span>
        </button>
<!--        <button @click="unlock" type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left"-->
<!--                style="width: 50px;height: 50px;"-->
<!--                class="flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">-->
<!--          <svg class="w-6 opacity-75 block" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>-->
<!--            lock-alert-outline</title>-->
<!--            <path-->
<!--                d="M10 17C8.9 17 8 16.1 8 15C8 13.9 8.9 13 10 13C11.1 13 12 13.9 12 15S11.1 17 10 17M16 20V10H4V20H16M16 8C17.1 8 18 8.9 18 10V20C18 21.1 17.1 22 16 22H4C2.9 22 2 21.1 2 20V10C2 8.9 2.9 8 4 8H5V6C5 3.2 7.2 1 10 1S15 3.2 15 6V8H16M10 3C8.3 3 7 4.3 7 6V8H13V6C13 4.3 11.7 3 10 3M22 7H20V13H22V7M22 15H20V17H22V15Z"/>-->
<!--          </svg>-->
<!--          <span class="sr-only">Lock</span>-->
<!--        </button>-->
        <div class="relative">
          <button @click="votedModal = !votedModal;loadVotedList()" type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left"
                  style="width: 50px;height: 50px;"
                  class="flex justify-center items-center w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
            <svg class="w-6 opacity-75 block" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>
              thumb-up-outline</title>
              <path
                  d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"/>
            </svg>
            <span class="sr-only">Lock</span>
          </button>
          <div :style="{transform: !votedModal ? 'translateX(200%)' : '', transition: '.5s', bottom: !lock ? '80px' : '15px'}"  class="fixed bg-gray-800 "
               style="z-index: 102;right: 10px;padding: 25px 15px 15px 15px;width: 210px;box-shadow: 0 10px 125px rgba(11, 54, 87, 0.79); border: 1px solid rgba(255,255,255,0.13);border-radius: 12px">

            <div v-if="!votedStart && Array.isArray(votedList)" class="grid " style="grid-column-gap: 15px">
              <div class="flex  mb-2" v-for="(person) in votedList.filter(el => !el.killed)" :key="'as' + person.number" style="justify-content: space-between">
                <div class="flex items-center">
                  <Checkbox :value="person.number"
                            :input-id="'votedEl-' + person.number"
                            v-model="votedListItems" @change="votedListItemsChanged" />
                  <label :for="'votedEl-' + person.number" class="ml-2 text-sm">Игрок: {{ person.number }}</label>
                  <Folls
                    :key-id="'votedFalls'"
                    :card-number="person.number"
                    :folls="person.foll"
                  />
                </div>
                <div>
                  <Button size="small" outlined  rounded @click="makeFoll(person.number)">
                    Фолл
                  </Button>
                </div>
              </div>

              <Button @click="votedStart = true">
                Начать
              </Button>
            </div>
            <div v-else>
              <div v-for="(person, i) in votedListItems" :key="'ite' + person" class="grid grid-cols-2 mb-2 items-center">
                <div class="text-sm">Игрок: {{ person }} </div>

                <div v-if="i === votedListItems.length - 1"   class="w-100 text-sm">Ост.: {{ votedListItemsFinalSum }}</div>
                <InputText v-else
                          v-model.number="votedListItemsFinal[person]"
                          type="number"
                          class="w-100"
                ></InputText>
              </div>

              <div class="grid grid-cols-1 gap-2">
                <Button @click="saveVoted">
                  Верно, сохранить.
                </Button>
                <Button outlined  @click="votedStart = false;votedListItems = [];votedListItemsFinal={};resetVotedList()">
                  Сбросить
                </Button>
              </div>
            </div>

          </div>
        </div>
        <div id="tooltip-print" role="tooltip"
             class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Print
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <button @click="open = !open;loadVotedList()" type="button" data-dial-toggle="speed-dial-menu-default"
              aria-controls="speed-dial-menu-default" aria-expanded="false"
              style="width: 50px;height: 50px;"
              class="flex items-center justify-center text-white bg-blue-700 rounded-full mb-2  hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <svg class="w-6 h-6 transition-transform transition"
             :style="{transform: open ? 'rotate(45deg)' : '', transition: '.3s'}" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 1v16M1 9h16"/>
        </svg>
        <span class="sr-only">Open actions menu</span>
      </button>
    </div>
  </div>
</template>
<script>
import RadialProgressBar from 'vue-radial-progress'
import resetGame from '../js/utils'
import {toast} from 'vue3-toastify'
import Folls from "@/components/Folls.vue";
import imgTexture from '../assets/stone-texture.jpg'
export default {
  name: 'Timer',
  components: {
    Folls,
    RadialProgressBar
  },
  props: ['votedList'],
  data() {
    return {
      votedListItems: [],
      votedListItemsFinal: {},
      votedStart: false,
      votedModal: false,
      completedSteps: 0,
      value: 0,
      duration: 60,
      block: false,
      lock: false,
      timer: null,
      open: false,
      toast: this.$toast,

      logListShow: false,
      logList: [],
      totalSteps: 60
    }
  },
  computed: {
    votedListItemsFinalSum(){
      const res = Object.values(this.votedListItemsFinal)
      const sum = res.reduce((acc, el) => +acc + +el, 0);
      const list = this.votedList.filter(el => !el.killed)
      return list.length - sum
    }
  },

  methods: {
    makeFoll(id){
      this.$emit('update:foll', id)
    },
    saveVoted(){
      const copyArr = JSON.parse(JSON.stringify(this.votedListItems))
      const lastEl = copyArr[copyArr.length - 1]

      this.votedListItemsFinal[lastEl] = this.votedListItemsFinalSum

      const values = Object.values(this.votedListItemsFinal)
      const objs = Object.keys(this.votedListItemsFinal).map(key => ({
        number: key,
        value: this.votedListItemsFinal[key]
      }));

      const maxNumber = Math.max(...values);

      const res = objs.filter(el => el.value === maxNumber)
      if (res.length === 1) {
        console.log('123', res)
        this.$emit('update:votedResult', {user1: res[0].number, isSiparete: false, user2: false})
      } else {
        console.log('222', res)
        this.$emit('update:votedResult', {user1: res[0].number, isSiparete: true, user2: res[1].number})
      }

      this.votedStart = false;
      this.votedModal = false;
      this.votedListItems = [];
      this.votedListItemsFinal={};
      this.resetVotedList()
    },
    resetVotedList(){
      localStorage.removeItem('votedListItems')
    },
    loadVotedList(){
      const res =  localStorage.getItem('votedListItems')
      if(res){
        this.votedListItems = JSON.parse(res)
      }
    },
    votedListItemsChanged(){
      console.log('votedListItemsChanged', this.votedListItems)
      localStorage.setItem('votedListItems', JSON.stringify(this.votedListItems))
    },
    showLog(){
      const logList = localStorage.getItem('logList')
      if(logList){
        this.logList = JSON.parse(logList)
      }

      this.logListShow = !this.logListShow
    },
    leaveGame(){
      const userConfirmed = confirm("Вы уверены что хотите закрыть игру и удалить историю?");
      if (userConfirmed) {
        resetGame()

        this.$router.push('/GameStart')
      }
    },
    unlock() {
      if (this.lock === false) {
        this.lock = true
      } else {
        const enteredPassword = window.prompt('Please enter your password:');

        if (enteredPassword === '000' || enteredPassword === 'zzz' || enteredPassword === 'ZZZ' || enteredPassword === 'я' || enteredPassword === 'Z' || enteredPassword === 'z') {
          this.lock = false
          this.open = false
          this.stopTimer()
        }
      }
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null
      this.value = 0
      this.completedSteps = 0
    },
    startTimer() {
      let b = this.block
      this.stopTimer()
      this.value = 100;
      this.completedSteps = this.totalSteps;

      this.timer = setInterval(() => {
        this.completedSteps -= 1;

        this.value -= (100 / this.duration);

        if (this.value <= 0) {
          this.stopTimer()
        } else if (this.completedSteps < 11 && !b) {
          toast.warning('Осталось менее 10 секунд!');
          b = true
        }
      }, 1000);
    },
  }
}
</script>

<style>


</style>