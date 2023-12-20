<script setup>

const props = defineProps(['isActive'])
</script>

<template>
  <span
      class="inline-flex relative items-center text-xs font-medium px-4 py-1 rounded-full "
     :class="isActive ? 'text-green-100 bg-green-500' : 'bg-red-500 text-red-100'"
  >
      <span class="animate-ping absolute inline-flex rounded-full  opacity-25"
            style="width: 80%;height: 85%"
        :class="isActive ? 'bg-green-700' : 'bg-red-700'"
      ></span>
    <span class="relative flex h-2 w-2 mr-1">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2" :class="isActive ? 'bg-green-700' : 'bg-red-700'"></span>
    </span>
      <span class="relative z-4">{{ isActive ? 'Connected' : 'Unavailable' }}</span>
  </span>
</template>

<style scoped>

</style>