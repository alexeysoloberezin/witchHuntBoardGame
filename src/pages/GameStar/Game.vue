<template>
  <div class="min-h-screen text-white p-6 overflow-x-hidden bg_app">
    <template v-if="!showRoles">
      <Timer
          v-if="playersRoles"
          ref="timerComponent"
          @update:votedResult="votedResultHandler"
          :voted-list="playersRoles"
          @update:foll="makeFoll"
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
              @update:shieldPlus="playersRoles[i].shield++;saveAll();"
              @update:shieldMinus="playersRoles[i].shield--;saveAll();handlerWithShieldOrHeart(i)"
              @update:heartPlus="playersRoles[i].heart++;saveAll();"
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
              :hunter-list="hunterList"
              :countNight="countNight"
              :is-history-line="true"
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
        <Button @click="handlerResetGame">
          Сбросить игру
        </Button>
      </div>
    </template>
    <div v-else>
      <CardSafe v-for="(card, i) in showRolesCards" :key="'showRoles-card-' + i" :card="card" :hide-image="false"
                class="mb-2"/>
      <Button @click="hideShowRoles">Закрыть роли</Button>
    </div>


    <div class="mobPanel">
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

    <Button v-if="showRoles === true" @click="showRoles = true">
      Показать роли
    </Button>
    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import {getByNames, names} from "@/store/cards";
import types, {logType} from "@/js/types";
import CardPlayer from "@/components/CardPlayer.vue";
import resetGame, {scrollTo} from "@/js/utils";
import CardSafe from "@/components/Card.vue";
import GameMod from "@/js/GameMod";
import {firstStep, generate, historyLineData} from "@/js/GameModData";
import HistoryLine from "@/components/Game/HistoryLine.vue";
import Timer from "@/components/Timer.vue";
import DaySkillModal from "@/components/DaySkillsModal.vue";
import {toast} from 'vue3-toastify';
import GameModWitchKill from "@/js/GameModModules/GameModWitchKill";
import {saveGameData} from "@/js/GameModModules/GameModCore";

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
    hunterList() {
      return this.dayLog.filter(el => el.type === logType.tryKill)
    },
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
        scrollTo(0, 200)
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
    hunterKill(id) {
      if (!id) {
        return toast.error('Не корректный id')
      }

      const index = this.playersRoles.findIndex(el => el.number == id);

      if (index === -1) {
        return console.log('not found', id)
      }

      this.action(index, 'kill')
      this.setNextActive()
    },
    witchFakeKill(id) {
      if (!id) {
        toast.error('Не полные данные..')
        return;
      }

      const index = this.playersRoles.findIndex(el => el.number === id);
      this.action(index, 'fakeKill')
      toast.success(`Попытка убийства Игрока: ${id}`)
      this.hunterWakeUp([...this.hunter.hunterWakeUp, {
            night: this.countNight,
            id
          }]
      )
    },
    showPriestCheck(ids) {
      const res = GameMod.showPriestCheck(this.playersRoles, ids, this.refreshList, this.setNextActive)
      alert(res)
    },
    witchKill(ids) {
      GameModWitchKill.apply(this, [ids, this.playersRoles, (index) => this.action(index, 'kill')])
    },
    angelChoose(ids) {
      GameMod.angelChoose(ids, this.playersRoles, this.blockHeal, this.setNextActive)
    },
    demonChoose(ids) {
      this.playersRoles.forEach(el => {
        el.chain = false
      })
      if (ids.length < 2 || !Array.isArray(ids)) {
        toast.error('Не полные данные замены демонов..')
        return;
      }

      ids.forEach(id => {
        const index = this.playersRoles.findIndex(el => el.number === id);
        this.action(index, 'chain')
      })
      toast.success(`Подмена ${ids[0]}/${ids[1]} принята`, {
        duration: 2000,
      })

      this.setNextActive()

    },
    votedUsers({user2, user1, isSiparete}) {
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
        nightLog: this.nightHistory,
        dayLog: this.dayLog
      })
      this.saveAll()
    },

    setNextActive: function () {
      const find = this.historyLine.find(el => el.id === this.activeStep);

      if (find) {
        const currentIndex = this.historyLine.indexOf(find);
        if (currentIndex !== -1 && currentIndex < this.historyLine.length - 1) {
          const nextElement = this.historyLine[currentIndex + 1];

          if (find.type !== 'night' && nextElement.type === 'night') {
            this.startNight()
            this.refreshList()
          }

          if (find.type !== 'day' && nextElement.type === 'day') {
            this.handleCloseNight()
            this.refreshList()
          }

          const nextElementId = nextElement.id;
          this.activeStep = nextElementId


        } else {
          this.historyLine = [
            ...this.historyLine,
            ...generate(
                this.playersRoles,
                this.countNight,
                this.nightHistory,
                this.dayLog
            )
          ]
          this.setNextActive()
        }
      }

      this.saveAll()
    },
    hideShowRoles() {
      this.showRoles = false
    },
    gamblerShield() {
      GameMod.gamblerShield.apply(this, [this.countNight])
    },
    priestShield() {
       GameMod.priestShield.apply(this, [this.countNight])
    },

    makeFoll(index) {
      const find = this.playersRoles.find(player => player.number === index)

      if (find.foll >= 4) {
        find.foll = 0
      } else {
        find.foll = find.foll + 1
        toast.success('Фол Игроку: ' + index + `. У вас ${find.foll} фола`)
      }

      this.saveAll()
    },
    handlerResetGame() {
      resetGame()
    },
    handlerWithShieldOrHeart(index) {
      this.setTryKillLog(index)
    },
    gamblerHaveShield(choose) {
      return GameMod.gamblerHaveShield(choose, this.countNight)
    },
    setGamblerChoose(choose) {
      this.playersRoles = GameMod.gamblerChoose(this.playersRoles, choose)
      this.gamblerChooseClosed = true
    },
    startNight() {
      this.gamblerShield()
      this.priestShield()
      this.isNight = true

      const nightTryKills = this.nightHistory.filter(el => el.type === logType.tryKill)

      this.dayLog = this.dayLog.concat(nightTryKills)

      this.nightHistory = []
      this.countNight = this.countNight + 1
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

      const dayInNigthLog = this.dayLog.filter(el => el.inNextLog)
      this.nightHistory = this.nightHistory.concat(dayInNigthLog)

      this.dayLog = []
      this.activeNightStep = 0
    },
    setPanelAction(action) {
      if (this.panelAction === action) {
        this.panelAction = null
        return
      }
      this.panelAction = action
    },
    setKillLog(indexPlayer, inNextLog = false) {
      if (this.isNight) {
        this.nightHistory.push({
          player: this.playersRoles[indexPlayer].number,
          type: logType.kill,
          inNextLog
        })
      } else {
        this.dayLog.push({
          player: this.playersRoles[indexPlayer].number,
          type: logType.dayKill,
          inNextLog
        })
      }
    },
    setTryKillLog(indexPlayer) {
      if (this.isNight) {
        this.nightHistory.push({
          player: this.playersRoles[indexPlayer].number,
          type: logType.tryKill
        })
        return;
      }

      this.dayLog.push({
        player: this.playersRoles[indexPlayer].number,
        type: logType.tryKill
      })
    },
    action(indexPlayer, type) {
      const typeAction = type || this.panelAction
      const PLAYER = this.playersRoles[indexPlayer]

      if (typeAction === 'kill' || typeAction === 'goodKill') {
        if (PLAYER.name === names.Emissary && this.nightVal <= 3) {
          toast.success('Попытка убийства Игрока: ' + PLAYER.number)
          this.hunterWakeUp([...this.hunter.hunterWakeUp, {
            night: this.countNight,
            id: PLAYER.number
          }])
          this.setTryKillLog(indexPlayer)
          this.saveAll()
          return;
        }

        const kill = (inNextLog) => {
          PLAYER.killed = !PLAYER.killed
          toast.success('Игрок: ' + PLAYER.number + ' убит')

          this.setKillLog(indexPlayer, inNextLog)
          this.refreshList()
        }

        if (typeAction === 'goodKill') {
          kill(true);
          return;
        }

        if ((PLAYER.heart > 1 || PLAYER.shield > 0) && !PLAYER.killed) {
          if (PLAYER.shield > 0) {
            PLAYER.shield = PLAYER.shield - 1
          } else {
            PLAYER.heart = PLAYER.heart - 1
          }
          toast.success('Попытка убийства Игрока: ' + PLAYER.number)
          this.setTryKillLog(indexPlayer)
          this.hunterWakeUp([...this.hunter.hunterWakeUp, {
            night: this.countNight,
            id: PLAYER.number
          }])
        } else {
          kill();
        }
      } else if (typeAction === 'fakeKill') {
        PLAYER.fakeKill = !PLAYER.fakeKill
        this.setTryKillLog(indexPlayer)

      } else if (typeAction === 'makeWitch') {
        PLAYER.isGood = !PLAYER.isGood
        return
      } else if (typeAction === 'chain') {
        PLAYER.chain = !PLAYER.chain
        return;
      } else if (typeAction === 'addHeart') {
        PLAYER.heart = PLAYER.heart + 1
        toast.success('Добавлена жизнь: ' + indexPlayer + ' Игроку')
        return;
      }

      this.panelAction = null
      this.saveAll()
    },
    saveAll() {
      saveGameData({
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
          },
          this.playersRoles
      )
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
      nightLog: this.nightHistory,
      dayLog: this.dayLog
    })

    setTimeout(() => this.saveAll(), 1000)
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