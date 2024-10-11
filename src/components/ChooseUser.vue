<template>
  <div style="border: 1px solid rgba(255,255,255,0.11);padding: 10px;border-radius: 8px">
    <div v-if="title" class="text-white mb-2">
      {{ title }}
    </div>

    <div class="flex items-center gap-3 flex-wrap mb-3">
      <vs-avatar v-for="user in users"
                 :key="id + user.number"
                 :style="
                     {
                       backgroundColor: getColor(user.number, user),
                       opacity: isDisabled(user.number) ? 0.15 : 1,
                     }
                  "
                 v-badge="
                   imageMode
                      ? user.number
                      : null
                 "
                 size="large"
                 :label="!imageMode && isDisabled(user.number) ? 'Disb' : user.number"
                 :image="imageMode ? user.ava : null"
                 @click="toggleActive(user.number)"
      >
      </vs-avatar>

    </div>
    <Button @click="emitReady">
      Подтвердить
    </Button>
  </div>
</template>

<script>
export default {
  name: 'ChooseUser',
  props: ['users', 'id','showRed','countNight', 'multi', 'title', 'imageMode', 'disabled'],
  data() {
    return {
      active: [],
      disabledArr: this.disabled || []
    }
  },
  methods: {
    isDisabled(number){
      return  this.disabledArr.includes(number)
    },
    getColor(number, user){
      if(this.isActive(number)){
        return '#6366F1'
      }
      if(this.showRed){
        if(user.killedBy === this.countNight - 1){
          return '#931723'
        }
      }

      return  ''
    },
    isActive(number) {
      return this.active.includes(number);
    },
    toggleActive(number) {
      if (this.multi) {
        if (this.active.includes(number)) {
          this.active = this.active.filter((item) => item !== number);
        } else {
          this.active.push(number);
        }
      } else {
        if(Array.isArray(this.active) && this.active > 0){
          if(this.active[0] === number){
            this.active = []
            this.$emit('update:selectActive', this.active);
            return;
          }
        }

        this.active = [number];
      }
      this.$emit('update:selectActive', this.active);
    },
    emitReady() {
      this.$emit('update:clickReady', this.active);
    }
  }
}
</script>