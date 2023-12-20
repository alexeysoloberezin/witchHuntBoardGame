<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li class="py-3 sm:py-4">
    <div class="flex items-center">
      <div class="flex-shrink-0 bg-gray-900 w-10 h-10 mr-2 flex rounded text-center items-center justify-center">
        {{ user?.subtitle }}
      </div>

      <div class="flex-shrink-0 mr-2">
        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
             alt="Neil image">
      </div>
      <div class="flex-1 min-w-0 ms-4">
        <p class="text-sm font-medium text-gray-900 "
           :class="active ? 'text-green-500' : 'text-white'"
        >
          {{ active && 'Вы:' }} {{ user?.name }}
        </p>
      </div>
      <div class="inline-flex items-center text-base font-semibold "
           :class="active ? 'text-green-500' : 'text-white'"
      >
        Active
      </div>
    </div>
  </li>
</template>

<style scoped>

</style>