<template>
  <div>
    <div @click="isShow = !isShow">
      <slot name="toggleBtn">
      </slot>
    </div>
    <Transition >
      <div v-if="isShow">
        <slot name="main"></slot>
      </div>
    </Transition>

  </div>
</template>

<script>
export default {
  name: 'toggleAccord',
  data(){
    return {
      isShow: false
    }
  },
  methods: {
    toggle(){

    }
  }
}
</script>

<style scoped>

</style>