<template>
  <div>
    <div v-if="isHistoryLine" @click="showAll = !showAll"
         class="text-sky text-center text-sm opacity-50 mb-2 p-3 mb-4  cursor-pointer"
         style="background: rgba(255,255,255,0.08);border-radius: 8px">
      {{ showAll ? 'Скрыть пройденые' : 'Показать всю историю' }}
    </div>
    <div class="relative text-gray-500 border-l-2 border-gray-200 border-gray-600 text-gray-400 historyLine"
         ref="historyLine"
    >

      <transition-group tag="ul" name="historyList">
        <div v-for="el in arrayFinished"
             :key="el.id"
             :ref="`list-el-${el.id}`"
             v-touch:tap="touchHandler"
        >
          <div
              class="mb-10 cursor-pointer "
              @click="emitClickOnItem(el.id)"
          >
            <div class="flex">
              <div @click.stop="handleDoubleClick(el.id)"
              >
                <HistoryStatus
                    :type="el.type"
                    :active="isActive(el.id)"
                />
              </div>

              <div class="pl-8 ml-2" :class="classes(el.id), !isActive(el.id) ? 'text-white' : 'text-green-600'">
                <h3 class="font-medium leading-tight">{{ el.title }}</h3>
                <p class="text-sm opacity-50">{{ el.text }}</p>
              </div>
              <div v-if="!isActive(el.id) && showPointer" class="ml-4">
                <IconPointer/>
              </div>
              <div v-if="witchQr && isActive(el.id)" @click.stop.prevent="() => {
                showLinkQr = true;
                activeQrLink = el
              }">
                <Button outlined size="small" class="ml-4">QR code карт</Button>
                <vs-dialog modal :visible="showLinkQr" @update:visible="(v) => {showLinkQr = v;activeQrLink=null}">
                  <template #header>
                    <h4>Get your cards:</h4>
                  </template>

                  <div>
                    <router-link v-if="activeQrLink" :to="`/Roles/?role=${activeQrLink.role}&isGood=${activeQrLink.isGood}`">
                      <h4  class="not-margin text-white">
                        <VueQrcode :value="`https://witch-hunt-board-game-opad.vercel.app/Roles/?role=${activeQrLink.role}&isGood=${activeQrLink.isGood}`" :size="320" />
                      </h4>
                    </router-link>
                  </div>
                </vs-dialog>
              </div>
            </div>

            <div v-if="el.id === activeStep" class="pl-8 ml-1">
              <div v-if="activeStep === 22 && el.id === 22">
                <div v-if="!gamblerChooseClosed" class="flex items-center mt-2 gap-4">
                  <Button
                      size="small"
                      @click="setGamblerChoose('четные')"
                  >
                    Четные ночи
                  </Button>
                  <Button
                      size="small"
                      @click="setGamblerChoose('нечетные')"
                  >
                    Нечетные
                  </Button>
                </div>
              </div>

              <div v-if="el.name === names.Priest" class="mt-3 mb-3">
                <ChooseUser
                    :users="users"
                    @update:clickReady="(ids) => showPriestCheck(ids)"
                    :id="'priest-choose'"
                />
              </div>
              <div v-if="el.name === names.Inquisitor" class="mt-3 mb-3">
                <ChooseUser
                    :users="users"
                    @update:clickReady="(ids) => inquisitorCheck(ids)"
                    :id="'inqusitor-choose'"
                />

                <vs-dialog modal @update:visible="(v) => inquisitorModal = v" :visible="inquisitorModal">
                  <div class="con-content max-w-[280px]">
                    <div class="flex items-center justify-center mb-2" style="height: calc(100vh - 120px);">
                      <img :src="typeRoles[inquisitorChoose]" alt="" style="object-fit: contain">
                    </div>
                  </div>
                </vs-dialog>
              </div>

              <div v-if="el.name === 'Ведьмы'" class="mt-3 mb-3">
                <div>

                </div>
                <ToggleAccord>
                  <template #toggleBtn>
                    <Button size="small" outlined class="mb-2">Сделать иллюзорное убийство</Button>
                  </template>

                  <template #main>
                    <ChooseUser
                        :title="'Иллюзорное убийство'"
                        :users="users.filter(el => !el.killed)"
                        @update:clickReady="(ids) => witchFakeKill(ids)"
                        :id="'fakeKill-choose'"
                        class="mb-2"
                    />
                  </template>
                </ToggleAccord>

                <ChooseUser
                    :title="'Убийство'"
                    :multi="true"
                    :users="users.filter(el => !el.killed)"
                    @update:clickReady="(ids) => witchKill(ids)"
                    :id="'witchKill-choose'"
                />
              </div>

              <div v-if="el.name === names.Hunter" class="mt-3 mb-3">
                <temaplte v-if="currentCard.killed">
                  <h2 class="text-white">Охотник убит!</h2>
                </temaplte>
                <div v-if="hunterList.length" class="flex d-flex gap-3 mt-2">
                  <div v-for="el in hunterList" class="ma-2">
                    <Button @click="hunterKill(el.player)">
                      Добить игрока {{ el.player }}
                    </Button>
                  </div>
                </div>

                <hr class="opacity-50 my-3"/>
              </div>

              <div v-if="el.name === names.Apprentice" class="mt-3 mb-3">
                <Button @click="apprenticeModal = true" size="small">
                  Показать роли
                </Button>
                <vs-dialog modal :visible="apprenticeModal" @update:visible="(v) => apprenticeModal = v">
                  <template #header>
                    <div class="flex items-center justify-center mb-2  gap-4 mt-3">
                      <div>
                        {{ !apprenticeRole ? 'Могильщик' : 'Судья' }}
                      </div>
                      <InputSwitch v-model="apprenticeRole" @change="apprenticeShowNumber = false"/>

                      <Button @click="setChooseApprentice" size="small">
                        Подтвердить
                      </Button>
                    </div>
                  </template>
                  <div v-if="apprenticeRole" class="relative" style="max-height: 70vh;">
                    <img :src="imgs.imgCard7"
                         style="object-fit: contain;display: block;max-height:70vh;width: 100%;height: 100%;transition: .3s"
                         :style="{opacity: !apprenticeShowNumber ? '1' : '0.35'}" alt="">
                    <div v-if="apprenticeShowNumber" class="Apprentice__choose"
                         :class="apprenticeShowNumber && 'active'">
                      {{ getNumber(el.text) }}
                    </div>
                  </div>
                  <div v-else class="relative" style="max-height: 70vh;">
                    <img :src="imgs.imgCard2"
                         style="object-fit: contain;display: block;max-height:70vh;width: 100%;height: 100%;transition: .3s"
                         :style="{opacity: !apprenticeShowNumber ? '1' : '0.35'}" alt="">
                    <div v-if="apprenticeShowNumber" class="Apprentice__choose"
                         :class="apprenticeShowNumber && 'active'">
                      {{ getNumber(el.text) }}
                    </div>
                  </div>
                </vs-dialog>
              </div>

              <div v-if="el.name === 'Демоны'" class="mt-3 mb-3">
                <ChooseUser
                    :users="users.filter(el => !el.killed)"
                    :multi="true"
                    @update:clickReady="(ids) => demonChoose(ids)"
                    :id="'demon-choose'"
                />
              </div>

              <div v-if="el.name === 'Ангелы'" class="mt-3 mb-3">
                <ChooseUser
                    :users="users.filter(el => !el.killed)"
                    :multi="true"
                    :disabled="blockHeal"
                    @update:clickReady="(ids) => angelChoose(ids)"
                    :id="'angel-choose'"
                />
              </div>

              <div v-if="el.name === names['Bomber'] && countNight > 0" class="mt-3 mb-3">
                <div v-if="Array.isArray(users)" class="flex flex-wrap gap-3">
                  <ChooseUser
                      :title="'Подрыв жопы игрока:'"
                      :users="users.filter(el => !el.killed)"
                      :multi="false"
                      @update:clickReady="(ids) => bomberKill(ids)"
                      :id="'boomberKill-choose'"
                  />
                </div>
              </div>


              <template v-if="isActiveStep(el.id)">
                <div v-if="!isShow && el.type === 'day'" class="mt-3">
                  <Button @click.stop="emitStartTimer('start')" size="small">
                    Старт таймера
                  </Button>
                </div>

                <div v-if="nextBtnIsShow(el.id, el.type)" class="mt-3">
                  <Button @click.stop="emitClickNext(el.id)" @keydown.down="emitClickNext(el.id)" size="small">
                    Далее
                  </Button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </transition-group>

      <div v-if="!currentEl && !!this.activeStep">
        <Button @click="reload">Dont worry.. Refresh</Button>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryStatus from "@/components/Game/HistoryStatus.vue";
import IconPointer from "@/components/icons/IconPointer.vue";
import {names} from "@/store/cards";
import ChooseUser from "@/components/ChooseUser.vue";
import GameMod from "@/js/GameMod";
import {roles} from "@/js/types";
import {toast} from 'vue3-toastify'
import imgCard2 from '@/assets/cards/v2.png'
import imgCard7 from '@/assets/cards/v7.png'
import ToggleAccord from "@/components/ToggleAccord.vue";
import VueQrcode from 'qrcode.vue';
import {computed} from "vue";


export default {
  name: "HistoryLine",
  components: {ToggleAccord, ChooseUser, IconPointer, HistoryStatus, VueQrcode},
  props: ['array', 'active', 'showPointer','witchQr', 'hunterList', 'activeStep', 'blockHeal', 'gamblerChooseClosed', 'users', 'countNight', 'isHistoryLine'],
  computed: {
    thisLink() {
      return window.location.href
    },
    hunterWakeUpInThisNight() {
      const hunter = this.hunter

      if (!hunter) {
        return false
      }

      if (hunter.hunterWakeUp.length > 0) {
        const res = hunter.hunterWakeUp.findIndex(el => el.night === this.countNight - 1)
        return res !== -1
      }

      return false
    },
    hunter() {
      if (!Array.isArray(this.users)) {
        return null
      }
      return this.users.find(user => user.name === names.Hunter)
    },
    currentEl() {
      const find = this.array.find(el => el.id === this.activeStep)
      if (!find) {
        console.log('find', find)
      }
      return find
    },
    currentCard() {
      return this.users.find(user => user.name === this.currentEl.name)
    },
    arrayFinished() {
      if (this.showAll) {
        return this.array
      }

      const res = this.array.filter(el => {
        const refName = 'list-el-' + el.id
        const inHiddenList = this.hiddenSteps.indexOf(refName)
        return inHiddenList === -1
      })

      return res
    }
  },

  data() {
    return {
      showLinkQr: false,
      activeQrLink: null,
      imgs: {
        'imgCard7': imgCard7,
        'imgCard2': imgCard2
      },
      hiddenSteps: [],
      showAll: false,
      names: names,
      isShow: false,
      typeRoles: roles,

      apprenticeModal: false,
      apprenticeRole: false,
      apprenticeShowNumber: false,

      bomberChoose: null,

      inquisitorModal: false,
      inquisitorChoose: null,

      votedFinish: true,
      votedModal: false,
      votedPersons: {
        user1: null,
        user2: null,
        isSiparete: false
      },

      block: 0,
    }
  },
  updated() {
    this.checkVotedType()
  },
  mounted() {
    this.checkVotedType()

    if (this.isHistoryLine) {
      this.updateFinisherList()
    }
  },
  methods: {
    reload() {
      location.reload()
    },
    touchHandler() {
      this.block = this.block + 1

      setTimeout(() => {
        this.block = 0
      }, 200)

      if (this.block > 1) {
        if (this.currentEl.type === 'day') {
          this.$emit('update:clickNext');
          this.isShow = true
          this.updateFinisherList()
          this.$emit('update:startTimer', 'start');
        } else {
          this.$emit('update:startTimer', 'stop');
        }
      }
    },
    updateFinisherList() {
      this.hiddenSteps = []
      const activeElRef = this.$refs['list-el-' + this.activeStep];
      let block = false;

      Object.keys(this.$refs).forEach(refKey => {
        const ref = this.$refs[refKey];

        if (ref === activeElRef) {
          block = true;
        }

        if (!block) {
          this.hiddenSteps.push(refKey)
        }
      });
    },
    alreadyFinish(id) {
      if (this.showAll) {
        return true
      }

      const inHiddenList = this.hiddenSteps.indexOf('list-el-' + id)

      return inHiddenList === -1

    },
    bomberKill(ids) {
      if (!Array.isArray(ids) || ids.length === 0) {
        toast.error('Не правильное значение')
        return;
      }
      this.$emit('update:witchKill', ids)
    },
    inquisitorCheck(ids) {
      if (Array.isArray(ids) && ids.length > 0) {
        this.inquisitorModal = true
        const find = this.users.find(u => u.number === ids[0])

        if (find.name === names.Apprentice) {
          if (find.isJodge) {
            this.inquisitorChoose = 'attack'
          } else {
            this.inquisitorChoose = 'info'
          }
          return;
        }

        this.inquisitorChoose = find.type
      }
    },
    setChooseApprentice() {
      this.$emit('update:setChooseApprentice', this.apprenticeRole)
      this.apprenticeShowNumber = true
    },
    getNumber(text) {
      return GameMod.getNumberFromText(text, this.apprenticeRole)
    },
    hunterKill(id) {
      this.$emit('update:hunterKill', id)
    },
    witchFakeKill(ids) {
      const id = ids[0] || null
      this.$emit('update:witchFakeKill', id)
    },
    showPriestCheck(ids) {
      this.$emit('update:showPriestCheck', ids)
    },
    witchKill(ids) {
      this.$emit('update:witchKill', ids)
    },
    demonChoose(ids) {
      this.$emit('update:demonChoose', ids)
    },
    angelChoose(ids) {
      let errors = []

      ids.forEach(id => {
        const isBlock = this.blockHeal.indexOf(id)
        if (isBlock !== -1) {
          errors.push(id)
        }
      })

      if (errors.length > 0) {
        return alert('Нельзя лечить:' + errors.join(', '));
      }

      this.$emit('update:angelChoose', ids)
    },
    saveVoted() {
      this.$emit('update:votedUsers', this.votedPersons)
      this.votedModal = false
    },
    checkVotedType() {
      this.votedFinish = this.currentEl?.type !== 'voted';
    },
    nextBtnIsShow(id, type) {
      if (id === 22 && this.activeStep === 22) {
        return !!this.gamblerChooseClosed
      }

      if (this.isDaySpeach(type) && this.isActiveStep(id)) {
        return this.isShow
      }


      return true
    },
    isDaySpeach(type) {
      return type === 'day'
    },
    classes(id) {
      if (!this.activeStep) {
        return ''
      }
      if (!this.isActiveStep(id)) {
        return 'opacity-25'
      }
      return ''
    },
    isActiveStep(id) {
      return id === this.activeStep
    },
    setGamblerChoose(choose) {
      this.$emit('update:gamblerChoose', choose);
    },
    isActive(id) {
      if (Array.isArray(this.active)) {
        return this.active.includes(id + '')
      }
      return false
    },
    emitClickNext() {
      this.emitStartTimer('stop');
      this.isShow = false;
      this.$emit('update:clickNext');
      this.updateFinisherList();
    },
    emitStartTimer(type) {
      this.isShow = true
      this.$emit('update:startTimer', type);
    },
    handleDoubleClick(id) {
      this.$emit('update:changeHistoryItem', id)
    },

    emitClickOnItem(itemId) {
      // if (this.isActive(itemId)) {
      //   // alert('')
      //   return null;
      // }
      this.$emit('update:clickOnItem', itemId);
    }
  }
}
</script>

<style scoped>
</style>
