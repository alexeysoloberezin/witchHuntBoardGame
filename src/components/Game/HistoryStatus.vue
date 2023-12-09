<template>
  <span
      style="transform: translateX(-15px)"
      class="absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4  "
      :class="getClassByType"
  >
        <span class="w-5 h-5 text-white fill-current">
          <HistoryCheckIcon v-if="active"/>
          <HistoryNightIcon v-else-if="type === 'night'"/>
          <HistoryDayIcon v-else-if="type === 'day'"/>
          <VotedIcon v-else-if="type === 'voted'"/>
          <VotedIcon v-else-if="type === 'voted-speek'"/>
        </span>
    </span>
</template>

<script>
import HistoryCheckIcon from "@/components/icons/HistotyCheck";
import HistoryNightIcon from "@/components/icons/HistoryNightIcon";
import HistoryDayIcon from "@/components/icons/HistoryDayIcon";
import VotedIcon from "@/components/icons/VotedIcon";

export default {
  name: "HistoryStatus",
  components: {VotedIcon, HistoryDayIcon, HistoryNightIcon, HistoryCheckIcon},
  props: ['type', 'active'],
  computed: {
    getClassByType() {
      if(this.active){
        return 'bg-green-500 ring-green-500'
      }

      switch (this.type) {
        case 'night':
          return 'bg-blue-800 ring-blue-800'
        case 'day':
          return 'bg-orange-400 ring-orange-400'
        default:
          return 'bg-green-800 ring-gray-800'
      }
    }
  }
}
</script>

<style scoped>

</style>