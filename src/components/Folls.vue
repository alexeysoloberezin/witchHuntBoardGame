<template>
   <div class="flex " style="padding-left: 2px">
     <span v-for="el in folls" :key="keyId + cardNumber + '-folls-' + el">
      <svg style="width: 17px;margin-right: -9px;margin-top: -2px" fill="rgb(255,71,87)"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exclamation-thick</title><path
          d="M10 3H14V14H10V3M10 21V17H14V21H10Z"/></svg>
    </span>
   </div>
</template>

<script >
export default {
  name: 'Folls',
  props: ['folls', 'cardNumber', 'keyId']
}
</script>

<style scoped>

</style>