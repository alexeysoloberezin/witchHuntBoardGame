<template>
  <div class="min-h-screen text-white p-6 overflow-x-hidden bg_app">
    <Congradilations v-if="finishGameResult && !finishGameBlock"
                     :text="finishGameResult"
                     @update:setFinishGameBlock="() => finishGameBlock = true"
    />
    <template v-if="!showRoles">
      <Timer
          v-if="playersRoles"
          ref="timerComponent"
          @update:votedResult="votedResultHandler"
          :voted-list="playersRoles"
          @update:foll="makeFoll"
          @update:finishGame="finishGame"
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
              @update:necrChoose="(id) => necrChoose(id)"
              @update:demonChoose="(ids) => demonChoose(ids)"
              @update:witchFakeKill="(id) => witchFakeKill(id)"
              @update:angelChoose="(ids) => angelChoose(ids)"
              @update:hunterKill="hunterKill"
              @update:witchKill="(ids, ownerShot) => witchKill(ids, ownerShot)"
              @update:toggleWereWolf="toggleWereWolf"
              @update:setChooseApprentice="(choose) => setChooseApprentice(choose)"
              @update:changeHistoryItem="changeHistoryItem"
              @update:votedUsers="votedUsers"
              @update:gamblerChoose="(choose) => setGamblerChoose(choose)"
              @update:wereWolfChoose="(choose) => setWereWoolfChoose(choose)"
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
      <h4 class="text-center mb-2">Роли в рандомном порядке:</h4>
      <CardSafe v-for="(card, i) in showRolesCards"
                :key="'showRoles-card-' + i"
                :card="card"
                ava-size="50"
                :hide-image="true"
                class="mb-2"
      />
    </div>


    <div class="mobPanel">
      <div style="height: 60px;left: 50%;transform: translateX(-50%);bottom: 10px"
           class="fixed z-50 w-screen h-18 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div
            class="grid h-full max-w-lg mx-auto"
            :class="detailMode ? 'grid-cols-5' : 'grid-cols-3'"
        >
          <div class="flex items-center justify-center text-center">
            <div>
              <DetailModeToggleButton :detailMode="detailMode" @click="toggleDetailMode"/>
              <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">
                Детальный мод
              </div>
            </div>
          </div>
          <template v-if="detailMode">
            <KillButton :panelAction="panelAction" @click="setPanelAction('kill')"/>
            <FakeKillButton :panelAction="panelAction" @click="setPanelAction('fakeKill')"/>
            <MakeWitchButton :panelAction="panelAction" @click="setPanelAction('makeWitch')"/>
            <ChainButton :panelAction="panelAction" @click="setPanelAction('chain')"/>
          </template>
          <template v-else>
            <ShowRolesButton :showRoles="showRoles" @click="showRoles = !showRoles"/>
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
    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import {getByNames, names} from "@/store/cards.ts";
import types, {logType} from "@/js/types.ts";
import CardPlayer from "@/components/CardPlayer.vue";
import resetGame, {scrollTo} from "@/js/utils.ts";
import CardSafe from "@/components/Card.vue";
import GameMod from "@/js/GameMod";
import {firstStep, generate, historyLineData} from "@/js/GameModData.ts";
import HistoryLine from "@/components/Game/HistoryLine.vue";
import Timer from "@/components/Timer.vue";
import DaySkillModal from "@/components/DaySkillsModal.vue";
import {toast} from 'vue3-toastify';
import GameModWitchKill from "@/js/GameModModules/GameModWitchKill.ts";
import {saveGameData} from "@/js/GameModModules/GameModCore.ts";
import ShowRolesButton from "@/components/Buttons/ShowRolesButton.vue";
import MakeWitchButton from "@/components/Buttons/makeWitchButton.vue";
import FakeKillButton from "@/components/Buttons/FakeKillButton.vue";
import KillButton from "@/components/Buttons/KillButton.vue";
import ChainButton from "@/components/Buttons/ChainButton.vue";
import DetailModeToggleButton from "@/components/Buttons/DetailModeToggleButton.vue";
import Congradilations from "@/components/Congradilations/Congradilations.vue";
import {useStorage} from "@vueuse/core/index";

export default {
  name: "Game",
  components: {
    Congradilations,
    DetailModeToggleButton,
    ChainButton,
    KillButton,
    FakeKillButton, MakeWitchButton, ShowRolesButton, DaySkillModal, Timer, HistoryLine, CardSafe, CardPlayer
  },
  data() {
    return {
      finishGameResult: null,
      finishGameBlock: false,
      shabash: useStorage('shabash', false),

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
      emissaryTryKilled: false,
      fanaticGotHeart: false,
      fanaticWasChecked: false,

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
    isGameStats(){
      const playersString = localStorage.getItem('players')
      return Boolean(playersString)
    },
    getGameStats() {
      let saveGame = null
      let saveGame_all = null
      let players = null;
      let playersRoles = null;
      let shabash = null;
      const saveGameString = localStorage.getItem('saveGame')
      if (saveGameString) {
        saveGame = JSON.parse(saveGameString)
      }
      const saveGame_allString = localStorage.getItem('saveGame_all')
      if (saveGame_allString) {
        saveGame_all = JSON.parse(saveGame_allString)
      }
      const playersString = localStorage.getItem('players')
      if (playersString) {
        players = JSON.parse(playersString);
      }

      const playersRolesString = localStorage.getItem("playersRoles");
      if (playersRolesString) {
        playersRoles = JSON.parse(playersRolesString);
      }

      const shabashString = localStorage.getItem("shabash");
      if (shabashString) {
        shabash = JSON.parse(shabashString);
      }

      const gameId = localStorage.getItem("gameId");

      const finalResult = saveGame_all.finishGameResult;

      const stats = [];

      for (const playerNumber in players) {
        const playerInfo = players[playerNumber];

        const sgData = saveGame.find((sg) => sg.number === playerNumber);

        if (!sgData) {
          continue;
        }

        let killsCount = 0;
        saveGame.forEach((sg) => {
          if (String(sg.killedBy) === playerNumber) {
            killsCount++;
          }
        });

        const isWin = playerInfo.role.type === finalResult;

        // Build the result object
        const result = {
          id: playerInfo.id,
          name: playerInfo.name,
          telegram: playerInfo.telegram,
          role: playerInfo.role.name,
          side: playerInfo.role.type,
          kills: killsCount,
          isDead: sgData.killed,
          isWin: isWin,
          isWinAndNotDead: isWin && !sgData.killed,
          foll: sgData.foll,
        };

        stats.push(result);
      }

      const gameStats = {
        id: gameId,
        totalPlayers: Object.keys(players).length,
        roles: Object.values(playersRoles).map((el) => el.name),
        witch: Object.values(playersRoles).filter((el) => el.type === "witch")
          .length,
        mir: Object.values(playersRoles).filter((el) => el.type === "mir")
          .length,
        shabash: shabash,
        totalKills: saveGame.filter((el) => el.killed).length,
        whoWin: saveGame_all.finishGameResult,
      };

      return { playersStats: stats, gameStats: gameStats };
    },
    async fetchGlobalPlayers() {
      try {
        const { playersStats, gameStats } = this.getGameStats();
        const response = await fetch(`/api/sheets/stats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playersStats,
            gameStats,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Failed to fetch global players:", error);
      }
    },
    checkEndGame(){
      const result = GameMod.checkEndGame(this.playersRoles)
      this.finishGameResult = result
      if (result && this.isGameStats()) {
        this.fetchGlobalPlayers()
      }
    },
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
    changeHistoryItem(id, reload) {
      const realy = confirm('Вы уверены? сейчас это не безопасно. Только если на несколько шагов назад. Без смены дня ночи.')

      if (realy) {
        this.activeStep = id
        this.saveAll()

        if(reload){
          location.reload()
        }
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
      const res = GameMod.showPriestCheck(this.playersRoles, ids, this.refreshList)
      alert(res)
      this.refreshList()
    },
    witchKill(ids, ownerShot) {
      GameModWitchKill.apply(this, [ids, this.playersRoles, (index) => this.action(index, 'kill', ownerShot)])
    },
    angelChoose(ids) {
      GameMod.angelChoose(ids, this.playersRoles, this.blockHeal)
    },
    necrChoose(id){
      if(!id){
        toast.error(`Не выбрат игрок`)
        return
      }

      const index = this.playersRoles.findIndex(el => el.name === 'Некромант');
      const necr = this.playersRoles.find(el => el.name === 'Некромант');
      const newPlayers = GameMod.necrChoose(id, this.playersRoles)
      this.playersRoles = newPlayers

      if(!necr.killed){
        this.action(index,'kill')
      }
      toast.success(`Игорок ${id} воскрес`)
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
    },
    votedUsers({user2, user1, isSiparete}) {
      if (isSiparete && (!user1 || !user2)) {
        return alert('Не полные данные')
      }

      if (!isSiparete) {
        const index = this.playersRoles.findIndex(el => el.number === user1);
        const find = this.playersRoles.find(el => el.number === user1);

        if (index !== -1) {
          if(find.name === names.Fanatic){
            this.fanaticGotHeart = true
            find.heart = find.heart + 1
            this.setTryKillLog(index)
            toast.success('Попытка убийства - ' + find.number)
            toast.success('Фанатик получает жизнь')
          }else{
            this.action(index, 'kill');
          }
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
            if(this.countNight === 3){
              const indexEmissary = this.playersRoles.findIndex(player => player.name === names.Emissary)
              const emissary = this.playersRoles.find(player => player.name === names.Emissary)

              const fanatic = this.playersRoles.find(player => player.name === names.Fanatic)
              const indexFanatic = this.playersRoles.findIndex(player => player.name === names.Fanatic)

              if(fanatic && !fanatic?.killed){
                if(!this.fanaticGotHeart && fanatic.fanaticCheck === 0){
                  toast.warn('Фанатик не выполнил условия он умирает!.')
                  this.action(indexFanatic, 'goodKill')
                  return null;
                }
              }

              if(emissary && !this.emissaryTryKilled && !emissary?.killed){
                toast.warn('Эмиссар не выполнил условия он умирает!.')
                this.action(indexEmissary, 'goodKill')
                return null;
              }
            }

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
    gamblerShield() {
      GameMod.gamblerShield(this.countNight, this.playersRoles)
    },
    wereWoolfShield() {
      GameMod.wereWoolfShieldBeforeTurn(this.playersRoles)
    },
    priestShield() {
      GameMod.priestShield(this.countNight, this.playersRoles)
    },
    toggleWereWolf() {
      this.playersRoles = GameMod.wereWoolfTurning(this.playersRoles)
      this.saveAll()
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
    setWereWoolfChoose(choose) {
      this.playersRoles = GameMod.wereWoolfChoose(this.playersRoles, choose)
      toast.success('Успешно установленна роль ' + (choose === 'mir' ? 'Мирный' : "Ведьма") + ' для оборотня')
      this.saveAll()
    },
    startNight() {
      this.gamblerShield()
      this.wereWoolfShield()
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

      this.playersRoles = GameMod.makeRoleForWereWolf(this.playersRoles)
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
      if(this.playersRoles[indexPlayer].name === names.Emissary){
        this.emissaryTryKilled = true
      }

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
    action(indexPlayer, type, ownerShot) {
      const typeAction = type || this.panelAction
      const PLAYER = this.playersRoles[indexPlayer]

      if (typeAction === 'kill' || typeAction === 'goodKill') {
        if (PLAYER.name === names.Emissary && this.nightVal <= 3 && typeAction !== 'goodKill') {
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
          PLAYER.killedBy = this.countNight

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
            if (ownerShot === 'witchKill' && PLAYER.name === names.Werewolf) {
              toast.success('Обращение оборотня: ' + PLAYER.number)
              this.playersRoles = GameMod.wereWoolfTurning(this.playersRoles)
            }
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
        if (PLAYER.name === names.Werewolf) {
          toast.success('Обращение оборотня: ' + PLAYER.number)
          this.playersRoles = GameMod.wereWoolfTurning(this.playersRoles)
        }
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
      if (!this.finishGameBlock) {
        this.checkEndGame();
      }

      saveGameData({
            finishGameBlock: this.finishGameBlock,
            finishGameResult: this.finishGameResult,
            panelAction: this.panelAction,
            isNight: this.isNight,
            nightVal: this.nightVal,
            detailMode: this.detailMode,
            countNight: this.countNight,
            blockHeal: this.blockHeal,
            killedBy: this.killedBy,
            log: this.log,
            emissaryTryKilled: this.emissaryTryKilled,
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
            killedBy: null,
            isGood: el.type === 'mir',
            gamblerChoose: '',
            wereWolfChoose: '',
            wereWolfTurned: false,
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
    finishGame(value){
      const saveGame_all = localStorage.getItem('saveGame_all')
      if (saveGame_all) {
        const parsedData = JSON.parse(saveGame_all)
        parsedData.finishGameBlock = true;
        parsedData.finishGameResult = value
        localStorage.setItem('saveGame_all', JSON.stringify(parsedData))
      }
      this.checkEndGame()
    }
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