<template>
  <div class="relative">
    <div class="cardBox mb-2 flex items-center justify-between relative"
         v-touch:moving="movingHandler"
         v-touch:end="movedHandler"
         v-touch:tap="tapHandler"
         :style="{
              opacity: card.killed ? '.2' : '1',
              border: card.isGood ? '' : '2px dashed rgba(255,71,87, .45)',
              backgroundColor: card.isGood ? '' : 'rgb(47,29,29)',
              transform: movingParams
            }"
    >
      <div class="text-md">
        <div class="flex" style="padding-left: 1px">
          <HearIcon v-for="heart in card.heart" :key="card.name + 'HEART' + heart" class="mb-1"/>
        </div>
        <div class="flex">
          <ShieldIcon v-for="shield in card.shield" :key="card.name + 'shield' + shield" class="mb-1"/>

          <div v-if="card.name === 'Азартный игрок'" class="flex items-center text-sm">
            <div :style="{color: gamblerHaveShield ? 'rgb(25,91,255)' : 'gray'}" class="ml-1">
              {{ card.gamblerChoose }}
            </div>
          </div>
        </div>
        <div v-if="card.fakeKill" style="color: rgb(25,91,255)" class="flex items-center ml-1">
          Фейково убит
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="rgb(25,91,255)" viewBox="0 0 24 24"><title>
            asterisk</title>
            <path
                d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z"/>
          </svg>
        </div>
        <div class="ml-1">
          <div class="flex items-center">
              <span class="opacity-75 flex" :style="{color: card.killed ? 'rgb(255,71,87)' : ''}">
              Игрок {{
                  card.number
                }}:</span>
            <div class="flex items-center">
            <span v-for="el in card.foll" :key="card.number + '-folls-' + el">
            <svg style="width: 17px;margin-right: -4px;margin-top: -2px" fill="rgb(255,71,87)"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exclamation-thick</title><path
                d="M10 3H14V14H10V3M10 21V17H14V21H10Z"/></svg>
          </span>
            </div>
          </div>
          <div :style="{color: card.killed ? 'rgb(255,71,87)' : 'rgb(25,91,255)'}">{{ card.name }}</div>
          <div class="text-sm" :style="{color: card.killed ? 'rgb(255,71,87)' : ''} ">Тип карты:
            {{ cardTypes[card.type] }}
          </div>
        </div>

      </div>
      <div class="flex-shrink-0 flex-grow-1 flex items-center"
           :style="{pointerEvents: card.killed ? 'none' : '', opacity: card.killed ? '.5' : '1'}">
        <div v-if="card.chain">
          <vs-button
              border
              size="small"
              style="pointer-events: none"
          >
            <svg style="width: 18px;" fill="#d5d6d7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>
              lock-pattern</title>
              <path
                  d="M7,3A4,4 0 0,1 11,7C11,8.86 9.73,10.43 8,10.87V13.13C8.37,13.22 8.72,13.37 9.04,13.56L13.56,9.04C13.2,8.44 13,7.75 13,7A4,4 0 0,1 17,3A4,4 0 0,1 21,7A4,4 0 0,1 17,11C16.26,11 15.57,10.8 15,10.45L10.45,15C10.8,15.57 11,16.26 11,17A4,4 0 0,1 7,21A4,4 0 0,1 3,17C3,15.14 4.27,13.57 6,13.13V10.87C4.27,10.43 3,8.86 3,7A4,4 0 0,1 7,3M17,13A4,4 0 0,1 21,17A4,4 0 0,1 17,21A4,4 0 0,1 13,17A4,4 0 0,1 17,13M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z"/>
            </svg>
          </vs-button>
        </div>
        <div class="ml-2 opacity-75 flex flex-col"
        >
          <vs-button
              border
              @click="handleShieldPlus(index)"
          >
            <ShieldIcon>+</ShieldIcon>
          </vs-button>
          <vs-button
              v-if="shields !== 0"
              border
              @click="handleShieldMinus(index)"
          >
            <ShieldIcon>-</ShieldIcon>
          </vs-button>
        </div>
        <div class="ml-2 opacity-75 flex flex-col"
        >
          <vs-button
              danger
              border
              @click="handleHeartPlus(index)"
          >
            <HearIcon>+</HearIcon>
          </vs-button>
          <vs-button
              v-if="hearts > 1"
              danger
              border
              @click="handleHeartMinus(index)"
          >
            <HearIcon>-</HearIcon>
          </vs-button>
        </div>
      </div>

      <div v-if="panelAction" class="absolute top-0 left-0 h-full w-full" @click="handleClickOnSkeleton(index)">
        <Skeleton/>
      </div>
    </div>

    <div v-if="!card.killed" class="cardBox-movieAction">
      <div class="cardBox-movieAction-l">
        <svg class="opacity-50" style="max-width: 45px;" fill="#fff" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"><title>thumb-up-outline</title>
          <path
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"/>
        </svg>
        <div class="opacity-75 mt-1" style="font-size: 11px;line-height: 1">На <br/> голосование</div>
      </div>
      <div class="cardBox-movieAction-r">
        <svg class="opacity-50" style="max-width: 45px;" fill="#fff" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"><title>alert-decagram-outline</title>
          <path
              d="M23,12L20.56,14.78L20.9,18.46L17.29,19.28L15.4,22.46L12,21L8.6,22.47L6.71,19.29L3.1,18.47L3.44,14.78L1,12L3.44,9.21L3.1,5.53L6.71,4.72L8.6,1.54L12,3L15.4,1.54L17.29,4.72L20.9,5.54L20.56,9.22L23,12M20.33,12L18.5,9.89L18.74,7.1L16,6.5L14.58,4.07L12,5.18L9.42,4.07L8,6.5L5.26,7.09L5.5,9.88L3.67,12L5.5,14.1L5.26,16.9L8,17.5L9.42,19.93L12,18.81L14.58,19.92L16,17.5L18.74,16.89L18.5,14.1L20.33,12M11,15H13V17H11V15M11,7H13V13H11V7"/>
        </svg>
        <div class="opacity-75 mt-1 mr-3" style="font-size: 11px;line-height: 1">Фол</div>
      </div>
    </div>
  </div>
</template>

<script>
import HearIcon from "@/components/HearIcon.vue";
import Skeleton from "@/components/Skeleton.vue";
import ShieldIcon from "@/components/ShieldIcon.vue";

export default {
  name: 'CardPlayer',
  components: {HearIcon, Skeleton, ShieldIcon},
  props: {
    panelAction: String,
    gamblerHaveShield: Boolean,
    index: Number,
    isNight: Boolean,
    hearts: Number,
    shields: Number,
    card: Object,
    cardTypes: [Array, Object],
  },
  data() {
    return {
      touchMove: {
        x: 0,
        xStart: 0,
        y: 0,
        yStart: 0
      },
      activeTouch: false,
      timer: null
    }
  },
  computed: {
    disableTouch(){
      return this.card.killed || !this.activeTouch
    },
    movingParams() {
      if (this.disableTouch) {
        return 'translateX(0px)'
      }

      const position = this.touchMove.x - this.touchMove.xStart

      if (position > 100) {
        return `translateX(100px)`
      } else if (position < -100) {
        return `translateX(-100px)`
      } else {
        return `translateX(${this.touchMove.x - this.touchMove.xStart}px)`
      }
    },
  },
  methods: {
    tapHandler(){
      this.activeTouch = true
      this.timer = setTimeout(() => {
        this.activeTouch = false
      }, 3500)
    },
    movedHandler() {
      if (this.disableTouch) {
        return null;
      }

      const position = this.touchMove.x - this.touchMove.xStart
      if (position > 85) {
        const votedListItems = new Set(JSON.parse(localStorage.getItem('votedListItems')) || []);

        if (!votedListItems.has(this.card.number)) {
          votedListItems.add(this.card.number);
          localStorage.setItem('votedListItems', JSON.stringify(Array.from(votedListItems)));

          this.$toast.success('Игрок: ' + this.card.number + ' выставлен на голосование')
        } else {
          this.$toast.success('Поддержано')
        }
      } else if (position < -85) {
        this.$emit('update:foll', this.card.number)
      }

      this.touchMove = {
        x: 0,
        xStart: 0,
      }
      this.activeTouch = false
      clearTimeout(this.timer);
      this.timer = null
    },
    movingHandler(event) {
      if(this.disableTouch){
        return null;
      }


      if (this.touchMove.xStart === 0) {
        this.touchMove.xStart = event.touches[0].clientX;
      }
      this.touchMove.x = event.touches[0].clientX;
    },


    handleShieldPlus(index) {
      this.$emit('update:shieldPlus', index);
    },
    handleShieldMinus(index) {
      this.$emit('update:shieldMinus', index);
    },
    handleHeartPlus(index) {
      this.$emit('update:heartPlus', index);
    },
    handleHeartMinus(index) {
      this.$emit('update:heartMinus', index);
    },
    handleClickOnSkeleton(index) {
      this.$emit('update:clickOnSkeleton', index);
    },
  },
}
</script>

<style>

</style>