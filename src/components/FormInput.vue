<script setup>
import {ErrorMessage, Field} from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: "text"
  },
  name: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ''
  },
  hideErrorMessage: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div>
    <slot name="input">
      <Field
          :name="name"
          :type="type"
          :placeholder="placeholder"
          class="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"/>
    </slot>
    <slot name="errorMessage" >
      <ErrorMessage :name="name" class="text-red-600 text-sm" />
    </slot>
  </div>
</template>

<style scoped>

</style>