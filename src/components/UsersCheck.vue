<template>
  <div>
    <div style="max-width: calc(100% - 20px)">
      <vs-input
          :value="userInput"
          @input="emitValue"
          class="mb-4"
          :placeholder="placeholder"
          :label="label">
      </vs-input>
    </div>

    <div class="flex items-center gap-3 flex-wrap">
      <div v-for="user in getUsers" :key="'UsersCheck+' + user.number" @click="emitClickEl(user)">
<!--        <vs-avatar v-if="userInput === user.number" badge size="50">-->
<!--          <img :src="user.ava" alt="">-->
<!--          <template #badge>-->
<!--            {{ user.number }}-->
<!--          </template>-->
<!--        </vs-avatar>-->
<!--        <vs-avatar v-else size="50"-->
<!--        >-->
<!--          <template #text>-->
<!--            {{ user.number }}-->
<!--          </template>-->
<!--        </vs-avatar>-->

        <vs-avatar
             v-if="userInput === user.number"
             v-badge="user.number"
             size="large"
             :image="user.ava"
        >
        </vs-avatar>
        <vs-avatar
            v-else
            size="large"
            :label="user.number"
        >
        </vs-avatar>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'UsersCheck',
  props: ['users', 'modelValue', 'placeholder', 'label', 'isAlive'],
  methods: {
    emitClickEl(el) {
      // Изменение значения внутренней переменной
      if(this.userInput === el.number){
        this.$emit('update:modelValue', null);
        return;
      }

      this.userInput = el.number;
      this.$emit('update:modelValue', el.number);
    },
    emitValue(val) {
      if(this.userInput === val){
        this.$emit('update:modelValue', null);
        return;
      }

      this.userInput = val;
      this.$emit('update:modelValue', val);
    }
  },
  watch: {
    // Обработка изменений значения внешней переменной
    value(newValue) {
      this.userInput = newValue;
    }
  },
  computed: {
    getUsers() {
      if (!this.isAlive) {
        return this.users
      }

      return this.users.filter(user => !user.killed)
    }
  },
  data() {
    return {
      // Внутренняя переменная, используемая для связи с v-model
      userInput: this.modelValue
    };
  },

}
</script>

<style scoped>

</style>