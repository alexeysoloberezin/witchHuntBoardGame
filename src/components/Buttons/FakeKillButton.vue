<template>
  <button  data-tooltip-target="tooltip-wallet" type="button"
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
</template>

<script setup>
const props = defineProps({
  panelAction: String
})
</script>

<style scoped>

</style>