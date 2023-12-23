<template>
  <div id="app" class="theme-dark">
    <img :src="img" class="app_bg" alt="">
    <router-view />
  </div>
</template>

<script setup>
import img from './assets/fon.jpg'
</script>
