<template>
  <ol class="relative text-gray-500 border-l-2 border-gray-200 border-gray-600 text-gray-400">
    <li v-for="el in array"
        :key="el.id"
        class="mb-10 cursor-pointer "
        :class="classes(el.id)"
        @click="emitClickOnItem(el.id)"
    >
      <div class="flex items-center">
        <HistoryStatus :type="el.type" :active="isActive(el.id)"/>
        <div class="pl-8 ml-2" :class="!isActive(el.id) ? 'text-white' : 'text-green-600'">
          <h3 class="font-medium leading-tight">{{ el.title }}</h3>
          <p class="text-sm opacity-50">{{ el.text }}</p>
        </div>
        <div v-if="!isActive(el.id) && showPointer" class="ml-4">
          <IconPointer/>
        </div>
      </div>

      <div class="pl-8 ml-1">
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

        <template v-if="isActiveStep(el.id)">
          <div v-if="!isShow && el.type === 'day'" class="mt-2">
            <vs-button size="small" @click.stop="emitStartTimer('start')">
              Старт таймера
            </vs-button>
          </div>

          <div v-if="el.type === 'voted'" class="flex items-center gap-2">
            <vs-button size="small" @click="votedModal = true">
              Казнь игрока/игроков
            </vs-button>
            <vs-dialog width="300px" not-center v-model="votedModal">
              <template #header>
                <h4 class="not-margin text-white">
                  Казнь игрока
                </h4>
              </template>


              <div class="con-content">
                <div class="flex items-center mb-8">
                  <vs-checkbox v-model="votedPersons.isSiparete" />
                  <div class="text-white text-sm ml-2 opacity-50">Попил двух игроков?</div>
                </div>
                <vs-input v-model="votedPersons.user1" class="mt-2" placeholder="Игрок 1" label="Игрок 1"></vs-input>



                <vs-input v-model="votedPersons.user2" v-if="votedPersons.isSiparete" class="mt-6" placeholder="Игрок 2" label="Игрок 2"></vs-input>
              </div>

              <template #footer>
                <div class="con-footer flex items-center">
                  <vs-button @click="votedModal=false" >
                    Сохранить
                  </vs-button>
                  <vs-button @click="votedModal=false"  transparent>
                    Закрыть
                  </vs-button>
                </div>
              </template>
            </vs-dialog>
          </div>
          {{ votedFinish }}

          <div v-if="nextBtnIsShow(el.id, el.type)" class="mt-2">
            <vs-button size="small" @click.stop="emitClickNext">
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

export default {
  name: "HistoryLine",
  components: {IconPointer, HistoryStatus},
  props: ['array', 'active', 'showPointer', 'activeStep', 'gamblerChooseClosed'],
  computed: {
    currentEl(){
      return this.array.find(el => el.id === this.activeStep)
    }
  },
  data(){
    return {
      isShow: false,
      votedFinish: true,
      votedModal: false,
      votedPersons: {
        user1: null,
        user2: null,
        isSiparete: true
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
    checkVotedType(){
      this.votedFinish = this.currentEl.type !== 'voted';
    },
    nextBtnIsShow(id, type){
      if(id === 22  && this.activeStep === 22){
        return !!this.gamblerChooseClosed
      }

      if(this.isDaySpeach(type) && this.isActiveStep(id)){
        return this.isShow
      }

      if(!this.votedFinish){
        return false
      }

      return true
    },
    isDaySpeach(type){
      return type === 'day'
    },
    classes(id) {
      if (!this.activeStep) {
        return ''
      }
      if (!this.isActiveStep(id)) {
        return 'opacity-50 pointer-events-none'
      }
      return ''
    },
    isActiveStep(id) {
      return id === this.activeStep
    },
    setGamblerChoose(choose){
      this.$emit('update:gamblerChoose', choose);
    },
    isActive(id) {
      if (Array.isArray(this.active)) {
        return this.active.includes(id + '')
      }
      return false
    },
    emitClickNext() {
      console.log('this.', this.isShow)
      this.emitStartTimer('stop')
      this.isShow = false

      this.$emit('update:clickNext');
    },
    emitStartTimer(type){
      this.isShow = true
      this.$emit('update:startTimer', type);
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
