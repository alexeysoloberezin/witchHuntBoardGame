<template>
  <ol class="relative text-gray-500 border-l-2 border-gray-200 border-gray-600 text-gray-400">
    <li v-for="el in array"
        :key="el.id"
        class="mb-10 cursor-pointer "
        :class="classes(el.id)"
        @click="emitClickOnItem(el.id)"
        :ref="`list-el-${el.id}`"
    >
      <div class="flex">
        <div @click.stop="handleDoubleClick(el.id)"
        >
          <HistoryStatus
              :type="el.type"
              :active="isActive(el.id)"

          />
        </div>

        <div class="pl-8 ml-2" :class="!isActive(el.id) ? 'text-white' : 'text-green-600'">
          <h3 class="font-medium leading-tight">{{ el.title }}</h3>
          <p class="text-sm opacity-50">{{ el.text }}</p>
        </div>
        <div v-if="!isActive(el.id) && showPointer" class="ml-4">
          <IconPointer/>
        </div>
      </div>

      <div v-if="el.id === activeStep" class="pl-8 ml-1">
        <div v-if="activeStep === 22 && el.id === 22">
          <div v-if="!gamblerChooseClosed" class="flex items-center mt-2">
            <vs-button
                size="small"
                @click="setGamblerChoose('четные')"
            >
              Четные ночи
            </vs-button>
            <vs-button
                size="small"
                @click="setGamblerChoose('нечетные')"
            >
              Нечетные
            </vs-button>
          </div>
        </div>

        <div v-if="el.name === names.Priest" class="mt-3 mb-3">
          <ChooseUser
              :users="users"
              @update:clickReady="(ids) => showPriestCheck(ids)"
              :id="'priest-choose'"
          />
        </div>

        <div v-if="el.name === 'Ведьмы'" class="mt-3 mb-3">
          <ChooseUser
              :title="'Иллюзорное убийство'"
              :users="users.filter(el => !el.killed)"
              @update:clickReady="(ids) => witchFakeKill(ids)"
              :id="'fakeKill-choose'"
              class="mb-2"
          />
          <ChooseUser
              :title="'Убийство'"
              :users="users.filter(el => !el.killed)"
              @update:clickReady="(ids) => witchKill(ids)"
              :id="'witchKill-choose'"
          />
        </div>

        <div v-if="el.name === names.Hunter" class="mt-3 mb-3">
          <vs-button v-if="hunterWakeUpInThisNight" @click="hunterKill">
            Добить
          </vs-button>
          <hr class="opacity-50 my-3"/>
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
              @update:clickReady="(ids) => angelChoose(ids)"
              :id="'angel-choose'"
          />
        </div>


        <template v-if="isActiveStep(el.id)">
          <div v-if="!isShow && el.type === 'day'" class="mt-2">
            <vs-button  @click.stop="emitStartTimer('start')">
              Старт таймера
            </vs-button>
          </div>

          <div v-if="el.type === 'voted'" class="flex items-center gap-2">
            <vs-button size="small" @click="votedModal = true">
              Казнь игрока/игроков
            </vs-button>
            <vs-dialog width="300px" scroll blur not-close auto-width v-model="votedModal">
              <template #header>
                <h4 class="not-margin text-white">
                  {{ votedPersons.isSiparete ? 'Попил игроков' : 'Казнь игрока' }}
                </h4>
              </template>

              <div class="con-content max-w-[280px]">
                <div class="flex items-center mb-8">
                  <vs-checkbox v-model="votedPersons.isSiparete"/>
                  <div class="text-white text-sm ml-2 opacity-50">Попил двух игроков?</div>
                </div>
                <UsersCheck
                    v-model="votedPersons.user1"
                    placeholder="Первый игрок попила"
                    label="Первый игрок попила"
                    @update:modelValue="(v) => votedPersons.user1 = v"
                    :is-alive="true"
                    class="mt-4"
                    :users="users"
                />

                <div v-if="votedPersons.isSiparete">
                  <hr class="my-8 opacity-50"/>
                  <UsersCheck
                      v-model="votedPersons.user2"
                      placeholder="Второй игрок попила"
                      label="Второй игрок попила"
                      @update:modelValue="(v) => votedPersons.user2 = v"
                      :is-alive="true"
                      class="mt-4"
                      :users="users"
                  />
                </div>
              </div>

              <template #footer>
                <div class="con-footer flex items-center mt-2">
                  <vs-button
                      @click="saveVoted">
                    Сохранить
                  </vs-button>
                  <vs-button @click="votedModal=false" transparent>
                    Закрыть
                  </vs-button>
                </div>
              </template>
            </vs-dialog>
          </div>

          <div v-if="nextBtnIsShow(el.id, el.type)" class="mt-3">
            <vs-button  @click.stop="emitClickNext(el.id)" @keydown.down="emitClickNext(el.id)">
              Далее
            </vs-button>
          </div>
        </template>
      </div>
    </li>
  </ol>
</template>

<script>
import HistoryStatus from "@/components/Game/HistoryStatus";
import IconPointer from "@/components/icons/IconPointer";
import UsersCheck from "@/components/UsersCheck";
import {names} from "@/store/cards";
import ChooseUser from "@/components/ChooseUser";

export default {
  name: "HistoryLine",
  components: {ChooseUser, UsersCheck, IconPointer, HistoryStatus},
  props: ['array', 'active', 'showPointer', 'activeStep', 'gamblerChooseClosed', 'users', 'countNight'],
  computed: {
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
      return this.array.find(el => el.id === this.activeStep)
    },
    currentCard() {
      return this.users.find(user => user.name === this.currentEl.name)
    }
  },
  data() {
    return {
      names: names,
      isShow: false,
      votedFinish: true,
      votedModal: false,
      votedPersons: {
        user1: null,
        user2: null,
        isSiparete: false
      }
    }
  },
  updated() {
    this.checkVotedType()
  },
  mounted() {
    this.checkVotedType()
  },
  methods: {
    scrollDown() {
      window.scrollTo({
        top: window.scrollY + 80,
        behavior: 'smooth',
        block: 'start',
      });
    },
    hunterKill() {
      this.$emit('update:hunterKill')
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
        return 'opacity-50'
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
    emitClickNext(id) {
      console.log('this.', this.isShow)
      this.emitStartTimer('stop')
      this.isShow = false
      this.$emit('update:clickNext');

      this.scrollDown(id)
    },
    emitStartTimer(type) {
      this.isShow = true
      this.$emit('update:startTimer', type);

    },
    handleDoubleClick(id) {
      console.log('id', id)
      this.$emit('update:changeHistoryItem', id)
    },

    emitClickOnItem(itemId) {
      if (this.isActive(itemId)) {
        // alert('')
        return null;
      }
      this.$emit('update:clickOnItem', itemId);
    }
  }
}
</script>

<style scoped>
</style>
