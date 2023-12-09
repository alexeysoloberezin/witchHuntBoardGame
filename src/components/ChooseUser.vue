<template>
  <div style="border: 1px solid rgba(255,255,255,0.11);padding: 10px;border-radius: 8px">
    <div v-if="title" class="text-white mb-2">
      {{ title }}
    </div>

    <div class="flex items-center gap-3 flex-wrap mb-3">
      <vs-avatar v-for="user in users"
                 :key="id + user.number"
                 :primary="isActive(user.number)"
                 :badge="imageMode"
                 badge-color="primary"
                 size="50"
                 @click="toggleActive(user.number)"
      >
        <template v-if="!imageMode" #text>
          {{ user.number }}
        </template>

        <img v-if="imageMode" :src="user.ava" alt="">
        <template v-if="imageMode" #badge>
          {{ user.number }}
        </template>
      </vs-avatar>
    </div>
    <vs-button @click="emitReady">
      Подтвердить
    </vs-button>
  </div>
</template>

<script>
export default {
  name: 'ChooseUser',
  props: ['users', 'id', 'multi', 'title', 'imageMode'],
  data() {
    return {
      active: []
    }
  },
  methods: {
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