<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap text-gray-500 dark:text-gray-400">

      <Sidebar/>

      <div
          class="w-full  pl-0 lg:pl-64 min-h-screen"
          id="main-content"
      >
        <div class="min-h p-6 ">
          <keep-alive include="DashboardHome,Logs,Commands" :max="3">
            <router-view/>
          </keep-alive>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h {
  min-height: calc(100% - 8rem);
}
</style>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
  beforeMount() {

  },
};
</script>
