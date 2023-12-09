<template>
  <div class="min-h-screen text-white p-6 bg-gray-200 dark:bg-gray-900 overflow-x-hidden">
    <template v-if="!showRoles">
      <Timer
          v-if="playersRoles"
          ref="timerComponent"
          @update:votedResult="votedResultHandler"
          :voted-list="playersRoles"
      />
      <div v-if="playersRoles" :key="JSON.stringify(playersRoles)">
        <template v-if="detailMode">
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
        </template>
        <hr class="my-4 opacity-25"/>
        <div class="pl-3 pt-2">
          <HistoryLine
              :array="historyLine"
              :activeStep="activeStep"
              :blockHeal="blockHeal"
              :countNight="countNight"
              :users="playersRoles"
              @update:clickNext="setNextActive"
              @update:startTimer="startTimer"
              @update:showPriestCheck="(ids) => showPriestCheck(ids)"
              @update:demonChoose="(ids) => demonChoose(ids)"
              @update:witchFakeKill="(id) => witchFakeKill(id)"
              @update:angelChoose="(ids) => angelChoose(ids)"
              @update:hunterKill="hunterKill"
              @update:witchKill="(ids) => witchKill(ids)"
              @update:setChooseApprentice="(choose) => setChooseApprentice(choose)"
              @update:changeHistoryItem="changeHistoryItem"
              @update:votedUsers="votedUsers"
              @update:gamblerChoose="(choose) => setGamblerChoose(choose)"
              :gamblerChooseClosed="gamblerChooseClosed"
              ref="historyList"
          ></HistoryLine>
        </div>
      </div>
      <div v-else>
        <vs-button @click="handlerResetGame">
          Сбросить игру
        </vs-button>
      </div>
    </template>
    <div v-else>
      <CardSafe v-for="(card, i) in showRolesCards" :key="'showRoles-card-' + i" :card="card" :hide-image="false"
                class="mb-2"/>
      <vs-button @click="hideShowRoles">Закрыть роли</vs-button>
    </div>


    <div class="mobPanel">
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
           class="fixed z-50 w-screen h-18 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div
            class="grid h-full max-w-lg mx-auto"
            :class="detailMode ? 'grid-cols-5' : 'grid-cols-2'"
        >
          <div class="flex items-center justify-center text-center">
            <div>
              <button @click="toggleDetailMode" data-tooltip-target="tooltip-new" type="button"

                      class="inline-flex items-center outline-none justify-center w-10 h-10 font-medium  rounded-full  group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg class="opacity-50" style="width: 28px;" :fill="!detailMode ? '#fff' : 'green'"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>auto-mode</title>
                  <path
                      d="M19.8 5.67C21.05 7.19 21.82 9.04 22 11H19.94C19.74 9.57 19.16 8.22 18.26 7.1L19.8 5.67M13 2.05C14.96 2.24 16.81 3 18.33 4.26L16.9 5.69C15.77 4.8 14.42 4.24 13 4.05V2.05M11 2.06C9.04 2.26 7.19 3.03 5.67 4.27L7.1 5.69C8.23 4.81 9.58 4.24 11 4.06V2.06M4.26 5.67L5.63 7.06V7.1C4.75 8.23 4.18 9.58 4 11H2C2.21 9.04 3 7.18 4.26 5.67M2 14V19L3.6 17.4C5.38 20.17 8.47 22 12 22C16.82 22 20.87 18.55 21.8 14H19.75C18.86 17.45 15.72 20 12 20C9.05 20 6.39 18.39 5 16L7 14H2M12 17L13.56 13.58L17 12L13.56 10.44L12 7L10.43 10.44L7 12L10.43 13.58L12 17Z"/>
                </svg>
                <span class="sr-only">New item</span>
              </button>
              <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">
                Детальный мод
              </div>
            </div>
          </div>
          <template v-if="detailMode">
            <button @click="setPanelAction('kill')" data-tooltip-target="tooltip-home" type="button"
                    class="inline-flex outline-none flex-col items-center justify-center px-5 rounded-s-full  group">
              <svg style="width: 30px;" :fill="panelAction === 'kill' ?  'rgb(25,91,255)' : '#d5d6d7'"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pistol</title>
                <path
                    d="M7,5H23V9H22V10H16A1,1 0 0,0 15,11V12A2,2 0 0,1 13,14H9.62C9.24,14 8.89,14.22 8.72,14.56L6.27,19.45C6.1,19.79 5.76,20 5.38,20H2C2,20 -1,20 3,14C3,14 6,10 2,10V5H3L3.5,4H6.5L7,5M14,12V11A1,1 0 0,0 13,10H12C12,10 11,11 12,12A2,2 0 0,1 10,10A1,1 0 0,0 9,11V12A1,1 0 0,0 10,13H13A1,1 0 0,0 14,12Z"/>
              </svg>
              <span class="sr-only">Убить</span>
              <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">Убить</div>
            </button>
            <button @click="setPanelAction('fakeKill')" data-tooltip-target="tooltip-wallet" type="button"
                    class="inline-flex flex-col items-center outline-none justify-center px-5  group">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px"
                   :fill="panelAction === 'fakeKill' ? 'rgb(25,91,255)' : '#d5d6d7'" viewBox="0 0 24 24"><title>
                asterisk</title>
                <path
                    d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z"/>
              </svg>
              <span class="sr-only">Fake kill</span>
              <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">Fake kill</div>

            </button>
            <button @click="setPanelAction('makeWitch')" data-tooltip-target="tooltip-settings" type="button"
                    class="inline-flex flex-col items-center justify-center px-5  group">
              <svg xmlns="http://www.w3.org/2000/svg" :fill="panelAction === 'makeWitch' ? 'rgb(25,91,255)' : '#d5d6d7'"
                   style="width: 28px;" viewBox="0 0 24 24"><title>thumb-down-outline</title>
                <path
                    d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z"/>
              </svg>
              <span class="sr-only">Make witch</span>
              <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">Ведьмы</div>
            </button>

            <button @click="setPanelAction('chain')" data-tooltip-target="tooltip-profile" type="button"
                    class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  group">
              <svg style="width: 30px;" :fill="panelAction === 'chain' ?  'rgb(25,91,255)' : '#d5d6d7'"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock-pattern</title>
                <path
                    d="M7,3A4,4 0 0,1 11,7C11,8.86 9.73,10.43 8,10.87V13.13C8.37,13.22 8.72,13.37 9.04,13.56L13.56,9.04C13.2,8.44 13,7.75 13,7A4,4 0 0,1 17,3A4,4 0 0,1 21,7A4,4 0 0,1 17,11C16.26,11 15.57,10.8 15,10.45L10.45,15C10.8,15.57 11,16.26 11,17A4,4 0 0,1 7,21A4,4 0 0,1 3,17C3,15.14 4.27,13.57 6,13.13V10.87C4.27,10.43 3,8.86 3,7A4,4 0 0,1 7,3M17,13A4,4 0 0,1 21,17A4,4 0 0,1 17,21A4,4 0 0,1 13,17A4,4 0 0,1 17,13M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z"/>
              </svg>
              <span class="sr-only">Profile</span>
              <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">Подмена ролей</div>
            </button>
          </template>
          <template v-else>
            <DaySkillModal
                :users="playersRoles"
                :key="JSON.stringify(playersRoles) + 'skills'"
                @update:action="skillAction"
            />
          </template>

          <div id="tooltip-profile" role="tooltip"
               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Profile
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </div>

    <vs-button v-if="showRoles === true" @click="showRoles = true">
      Показать роли
    </vs-button>
    <br><br><br><br><br><br><br><br><br><br>

  </div>
</template>

<script>
import {getByNames, names} from "@/store/cards";
import types from "@/js/types";
import CardPlayer from "@/components/CardPlayer";
import resetGame from "@/js/utils";
import CardSafe from "@/components/Card";
import GameMod from "@/js/GameMod";
import {firstStep, generate, historyLineData} from "@/js/GameModData";
import HistoryLine from "@/components/Game/HistoryLine";
import Timer from "@/components/Timer";
import DaySkillModal from "@/components/DaySkillsModal";


export default {
  name: "Game",
  components: {DaySkillModal, Timer, HistoryLine, CardSafe, CardPlayer},
  data() {
    return {
      activeStep: firstStep,
      countNight: 0,
      blockHeal: [],

      showRoles: false,
      detailMode: false,
      playersRoles: {},
      historyLine: [],
      panelAction: null,
      isNight: false,
      log: false,
      cardTypes: types,
      showDaySkills: false,
      nightVal: 0,
      nightHistory: [],
      dayLog: [],

      activeNightStep: 0,
      gamblerChooseClosed: false,

      saveInterval: null,
    }
  },
  computed: {
    showRolesCards() {
      return GameMod.showRolesCards(this.playersRoles, true)
    },
    hunter() {
      const hunter = this.playersRoles.find(el => el.name === names.Hunter)
      return hunter || null
    }
  },
  methods: {
    votedResultHandler(res) {
      this.votedUsers(res)
    },
    setChooseApprentice(choose) {
      const apprentice = this.playersRoles.find(u => u.name === names.Apprentice)
      apprentice.isJodge = choose
    },
    toggleDetailMode() {
      this.detailMode = !this.detailMode

      if (this.detailMode) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
            block: 'start',
          });
        }, 200)
      } else {
        this.scrollToActiveStep()
      }
    },
    scrollToActiveStep() {
      const activeEl = this.$refs.historyList.$refs['list-el-' + this.activeStep];

      if (Array.isArray(activeEl) && activeEl.length > 0) {
        const offset = activeEl[0].getBoundingClientRect().y
        const client = activeEl[0].getBoundingClientRect()
        console.log('client', client)
        console.log('offset', offset)

        setTimeout(() => {
          window.scrollTo({
            top: offset - 80,
            behavior: 'smooth',
            block: 'start',
          });
        }, 250)
      } else {
        console.error('Реф не является DOM-элементом');
      }
    },
    changeHistoryItem(id) {
      const realy = confirm('Вы уверены? сейчас это не безопасно. Только если на несколько шагов назад. Без смены дня ночи.')

      if (realy) {
        this.activeStep = id
      }
    },
    skillAction(number, type) {
      this.action(number, type)
    },
    hunterWakeUp(val) {
      if (this.hunter) {
        this.hunter.hunterWakeUp = val
        this.refreshList()
      }
    },
    hunterKill() {
      const hunterArr = this.hunter.hunterWakeUp
      if (hunterArr.length === 0) {
        return null
      }

      const target = hunterArr[hunterArr.length - 1]
      const index = this.playersRoles.findIndex(el => el.number == target.id);

      if (index !== -1) {
        this.action(index, 'kill')
        this.setNextActive()
      } else {
        console.log('not found', target)
      }
    },
    witchFakeKill(id) {
      if (!id) {
        this.$toast.error('Не полные данные..')
        return;
      }

      const index = this.playersRoles.findIndex(el => el.number === id);
      this.action(index, 'fakeKill')
      this.$toast.success(`Попытка убийства Игрока: ${id}`)
      this.hunterWakeUp([...this.hunter.hunterWakeUp, {
            night: this.countNight,
            id
          }]
      )
    },
    showPriestCheck(ids) {
      const fanatic = this.playersRoles.find(el => el.name === names.Fanatic)
      if (fanatic) {
        fanatic.fanaticCheck = 0
      }

      const id = ids[0]
      const find = this.playersRoles.find(el => el.number === id)
      let checkUser = [find]

      if (find.chain === true) {
        checkUser = this.playersRoles.filter(el => (el.chain && el.number !== id))
      }

      const res = !checkUser[0].isGood ? 'Ведьма' : 'Мирный'
      const isFanatic = find.name === names.Fanatic

      if (isFanatic) {

        const fanatic = this.playersRoles.find(el => el.name === names.Fanatic)
        fanatic.heart = fanatic.heart + 1
        fanatic.fanaticCheck = fanatic.fanaticCheck + 1
        this.refreshList()
      }

      console.log('isFanatic', isFanatic)
      alert(res)

      this.setNextActive()
    },
    witchKill(ids) {
      if (ids.length === 0 || !Array.isArray(ids)) {
        this.$toast.error('Не полные данные для защиты..')
        return;
      }

      ids.forEach(id => {
        const index = this.playersRoles.findIndex(el => el.number === id);
        this.action(index, 'kill')
      })
    },
    angelChoose(ids) {
      if (ids.length === 0 || !Array.isArray(ids)) {
        this.$toast.error('Не полные данные защиты ангелов..')
        return;
      }

      ids.forEach(id => {
        const find = this.playersRoles.find(el => el.number === id);

        const isBlock = this.blockHeal.indexOf(find.number)

        if (isBlock !== -1) {
          this.$toast.success(`Вы не можете защитить: ${id}. Так как его уже лечили под связкой демонов.`, {
            duration: 6000,
          })
          return null;
        }

        if (find.chain) {
          this.blockHeal.push(find.number)
        }

        this.$toast.success(`Защитна ангелов установлена на: ${id}`, {
          duration: 2000,
        })
        find.shield = find.shield + 1
      })

      this.setNextActive()
    },
    demonChoose(ids) {
      this.playersRoles.forEach(el => {
        el.chain = false
      })
      if (ids.length < 2 || !Array.isArray(ids)) {
        this.$toast.error('Не полные данные замены демонов..')
        return;
      }

      ids.forEach(id => {
        const index = this.playersRoles.findIndex(el => el.number === id);
        this.action(index, 'chain')
      })
      this.$toast.success(`Подмена ${ids[0]}/${ids[1]} принята`, {
        duration: 2000,
      })

      this.setNextActive()

    },
    votedUsers({user2, user1, isSiparete}) {
      console.log('users', user1, user2)

      if (isSiparete && (!user1 || !user2)) {
        return alert('Не полные данные')
      }

      if (!isSiparete) {
        const index = this.playersRoles.findIndex(el => el.number === user1);
        const find = this.playersRoles.find(el => el.number === user1);

        if (index !== -1) {
          this.action(index, 'kill');
        }
        find.deadOnDay = true

        this.refreshList()
        this.setNextActive()

        return null;
      }

      setTimeout(() => {
        const jodgeReslut = window.prompt(`Наступает ночь!! Просыпается судья и выбирает кого убить - ${user2} или ${user1}`);
        if (jodgeReslut == user1 || jodgeReslut == user2) {
          const index = this.playersRoles.findIndex(el => el.number === jodgeReslut);
          const find = this.playersRoles.find(el => el.number === jodgeReslut);

          if (index !== -1) {
            this.action(index, 'goodKill');
            find.deadOnDay = true
          }
        }
        this.refreshList()
        this.setNextActive()
        this.setNextActive()
      }, 1000)

    },
    startTimer(type) {
      if (type === 'start') {
        this.$refs.timerComponent.startTimer();
      } else {
        this.$refs.timerComponent.stopTimer();
      }
    },
    refreshList() {
      this.historyLine = historyLineData({
        initialPlayers: this.playersRoles,
        nights: this.countNight,
        nightLog: this.nightHistory
      })
    },
    setNextActive: function () {
      const find = this.historyLine.find(el => el.id === this.activeStep);

      if (find) {
        const currentIndex = this.historyLine.indexOf(find);
        if (currentIndex !== -1 && currentIndex < this.historyLine.length - 1) {
          const nextElement = this.historyLine[currentIndex + 1];

          console.log('find', find)
          console.log('nextElement', nextElement)
          if (find.type !== 'night' && nextElement.type === 'night') {
            this.startNight()
          }

          if (find.type !== 'day' && nextElement.type === 'day') {
            this.handleCloseNight()
            this.refreshList()
          }

          const nextElementId = nextElement.id;
          console.log(nextElementId);
          this.activeStep = nextElementId


        } else {
          this.historyLine = [
            ...this.historyLine,
            ...generate(
                this.playersRoles,
                this.countNight,
                this.nightHistory
            )
          ]
          this.setNextActive()
        }
      }
    },

    hideShowRoles() {
      const enteredPassword = window.prompt('Please enter your password:');

      if (enteredPassword === '000' || enteredPassword === 'zzz' || enteredPassword === 'ZZZ' || enteredPassword === 'я' || enteredPassword === 'Z' || enteredPassword === 'z') {
        this.showRoles = false
      }
    },
    gamblerShield() {
      GameMod.gamblerShield.apply(this, [this.countNight])
    },
    startNight() {
      this.gamblerShield()
      this.isNight = true
      this.nightHistory = []
      this.countNight = this.countNight + 1
    },
    makeFoll(index) {
      const find = this.playersRoles.find(player => player.number === index)

      if (find.foll >= 4) {
        find.foll = 0
      } else {
        find.foll = find.foll + 1
        this.$toast.success('Фол Игроку: ' + index + `<br/> У вас ${find.foll} фола`)
      }

      this.saveAll()
    },
    handlerResetGame() {
      resetGame()
    },
    setInGlobalLog(message) {
      GameMod.setInGlobalLog(message)
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
      } else {
        this.setInGlobalLog('Днем убавлена броня или жизнь Игрока: ' + index)
      }
    },
    gamblerHaveShield(choose) {
      return GameMod.gamblerHaveShield(choose, this.countNight)
    },
    setGamblerChoose(choose) {
      this.playersRoles = this.playersRoles.map(el => {
        if (el.name === names.Gambler) {
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
          shield: 0,
          chain: false,
        }
      })
      this.isNight = false
      this.nightVal = ++this.nightVal
      this.activeNightStep = 0
    },
    setPanelAction(action) {
      if (this.panelAction === action) {
        this.panelAction = null
        return
      }
      this.panelAction = action
    },
    action(indexPlayer, type) {
      const _t = this
      const typeAction = type || this.panelAction

      if (typeAction === 'kill' || typeAction === 'goodKill') {
        if (this.playersRoles[indexPlayer].name === names.Emissary && this.nightVal <= 3) {
          _t.$toast.success('Попытка убийства Игрока: ' + this.playersRoles[indexPlayer].number)
          this.setInGlobalLog('Попытка убийства Игрока: ' + this.playersRoles[indexPlayer].number)
          this.hunterWakeUp([...this.hunter.hunterWakeUp, {
            night: this.countNight,
            id: this.playersRoles[indexPlayer].number
          }])
          return;
        }

        const kill = () => {
          this.playersRoles[indexPlayer].killed = !this.playersRoles[indexPlayer].killed
          _t.$toast.success('Игрок: ' + this.playersRoles[indexPlayer].number + ' убит')

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
        }

        if (typeAction === 'goodKill') {
          kill();
          return;
        }

        if ((this.playersRoles[indexPlayer].heart > 1 || this.playersRoles[indexPlayer].shield > 0) && !this.playersRoles[indexPlayer].killed) {
          if (this.playersRoles[indexPlayer].shield > 0) {
            this.playersRoles[indexPlayer].shield = this.playersRoles[indexPlayer].shield - 1
          } else {
            this.playersRoles[indexPlayer].heart = this.playersRoles[indexPlayer].heart - 1
          }
          _t.$toast.success('Попытка убийства Игрока: ' + this.playersRoles[indexPlayer].number)
          this.hunterWakeUp([...this.hunter.hunterWakeUp, {
            night: this.countNight,
            id: this.playersRoles[indexPlayer].number
          }])
          this.setInGlobalLog('Попытка убийства Игрока: ' + this.playersRoles[indexPlayer].number)
          if (this.isNight) {
            this.nightHistory.push({
              player: this.playersRoles[indexPlayer].number,
              type: 'Попытка убийства'
            })
            this.setInGlobalLog('Убийство Игрока: ' + indexPlayer)
          }
        } else {
          kill();
        }
      } else if (typeAction === 'fakeKill') {
        this.handlerWithShieldOrHeart(indexPlayer)
        this.setInGlobalLog('Фейковое Убийство Игрока: ' + indexPlayer)

        this.playersRoles[indexPlayer].fakeKill = !this.playersRoles[indexPlayer].fakeKill
      } else if (typeAction === 'makeWitch') {
        this.playersRoles[indexPlayer].isGood = !this.playersRoles[indexPlayer].isGood
        this.setInGlobalLog('Выбрана ведьма: ' + indexPlayer)
        return
      } else if (typeAction === 'chain') {
        this.playersRoles[indexPlayer].chain = !this.playersRoles[indexPlayer].chain
        this.setInGlobalLog('Выбрана связь: ' + indexPlayer)
        return;
      } else if (typeAction === 'addHeart') {
        this.playersRoles[indexPlayer].heart = this.playersRoles[indexPlayer].heart + 1
        this.setInGlobalLog('Добавлена жизнь: ' + indexPlayer)
        this.$toast.success('Добавлена жизнь: ' + indexPlayer + ' Игроку')
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
        detailMode: this.detailMode,
        countNight: this.countNight,
        blockHeal: this.blockHeal,
        log: this.log,
        activeStep: this.activeStep,
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
        const players = Object.keys(playersRoles).map(el => ({
          ...playersRoles[el],
          number: el,
        }))
        const res = []

        players.forEach(el => {
          const card = getByNames([el.name])

          res.push({
            number: el.number,
            name: el.name,
            type: card[0].type,
            heart: card[0].id === 8 ? 2 : 1,
            foll: 0,
            isGood: el.type === 'mir',
            gamblerChoose: '',
            fanaticCheck: 0,
            hunterWakeUp: [],
            deadOnDay: false,
            isJodge: false,
            fakeKill: false,
            killed: false,
            chain: false,
            ava: card[0].ava,
            shield: 0,
          })
        })

        this.playersRoles = res
      } else {
        this.playersRoles = {}
      }
    },
  },
  mounted() {
    this.loadData()

    this.historyLine = historyLineData({
      initialPlayers: this.playersRoles,
      nights: this.countNight,
      nightLog: this.nightHistory
    })

    this.saveInterval = setInterval(() => {
      this.saveAll()
    }, 2000)

  },
  beforeDestroy() {
    clearInterval(this.saveInterval)
  }
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