<template>
  <button  data-tooltip-target="tooltip-home" type="button"
          class="inline-flex outline-none flex-col items-center justify-center px-5 rounded-s-full  group">
    <svg style="width: 30px;" :fill="panelAction === 'kill' ?  'rgb(25,91,255)' : '#d5d6d7'"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pistol</title>
      <path
          d="M7,5H23V9H22V10H16A1,1 0 0,0 15,11V12A2,2 0 0,1 13,14H9.62C9.24,14 8.89,14.22 8.72,14.56L6.27,19.45C6.1,19.79 5.76,20 5.38,20H2C2,20 -1,20 3,14C3,14 6,10 2,10V5H3L3.5,4H6.5L7,5M14,12V11A1,1 0 0,0 13,10H12C12,10 11,11 12,12A2,2 0 0,1 10,10A1,1 0 0,0 9,11V12A1,1 0 0,0 10,13H13A1,1 0 0,0 14,12Z"/>
    </svg>
    <span class="sr-only">Убить</span>
    <div class="" style="font-size: 10px;line-height: 1.1;opacity: .5">Убить</div>
  </button>
</template>

<script setup>
const props = defineProps({
  panelAction: String
})
</script>

<style scoped>

</style>