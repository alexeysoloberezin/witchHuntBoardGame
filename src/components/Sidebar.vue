<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->

  <div>
    <div
        class="w-2/3 md:w-1/3 shadow-lg lg:w-64 fixed md:top-0 md:left-12 h-screen lg:block bg-gray-100 dark:bg-gray-800 z-30"
        id="main-nav"
    >
      <div class="flex">
        <div>
          <div
              class="w-full h-16 px-6 bg-gray-100 dark:bg-gray-800 flex px-4 items-center mb-8 mx-auto"
          >
            <img
                alt="rally-logo"
                src="@/assets/rallyLogo.svg"
                class="w-12 h-12 bg-gray-300 dark:bg-gray-900 rounded-full shadow-lg"
            />
            <p class="font-semibold pl-4">Witch Hunt</p>
          </div>

          <div class="mb-4 px-4 text-sm font-semibold">
            <p class="pl-4 mb-1">{{ $t("sidebar.main") }}</p>
            <router-link
                tag="div"
                :to="{ path: '/main/home' }"
                class="w-full flex items-center h-10 pl-4 hover:text-red-400 rounded-lg cursor-pointer"
            >
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" style="max-width: 23px;" fill="#d5d6d7"
                   viewBox="0 0 24 24"><title>cards-outline</title>
                <path
                    d="M11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05L6.93,20C7.24,20.77 7.97,21.23 8.74,21.25C9,21.25 9.27,21.22 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.25C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25M14.67,2.25L18.12,10.6V4.25A2,2 0 0,0 16.12,2.25M20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.78 21.47,4.36M11.19,4.22L16.17,16.24L8.78,19.3L3.8,7.29"/>
              </svg>
              <span>Персонажи</span>
            </router-link>
            <router-link
                v-if="auth"
                tag="div"
                :to="{ path: 'setup' }"
                class="w-full flex items-center h-10 pl-4 hover:text-red-400 rounded-lg cursor-pointer"
            >
              <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
                <path
                    d="M6.176,7.241V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.221,0-0.403,0.181-0.403,0.402v0.461C4.79,7.416,4.365,7.955,4.365,8.591c0,0.636,0.424,1.175,1.006,1.35v3.278c0,0.222,0.182,0.402,0.403,0.402c0.222,0,0.402-0.181,0.402-0.402V9.941c0.582-0.175,1.006-0.714,1.006-1.35C7.183,7.955,6.758,7.416,6.176,7.241 M5.774,9.195c-0.332,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C6.377,8.923,6.105,9.195,5.774,9.195 M10.402,10.058V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.222,0-0.402,0.181-0.402,0.402v3.278c-0.582,0.175-1.006,0.714-1.006,1.35c0,0.637,0.424,1.175,1.006,1.351v0.461c0,0.222,0.181,0.402,0.402,0.402c0.221,0,0.402-0.181,0.402-0.402v-0.461c0.582-0.176,1.006-0.714,1.006-1.351C11.408,10.772,10.984,10.233,10.402,10.058M10,12.013c-0.333,0-0.604-0.272-0.604-0.604S9.667,10.805,10,10.805c0.332,0,0.604,0.271,0.604,0.604S10.332,12.013,10,12.013M14.629,8.448V6.78c0-0.221-0.182-0.402-0.403-0.402c-0.221,0-0.402,0.181-0.402,0.402v1.668c-0.581,0.175-1.006,0.714-1.006,1.35c0,0.636,0.425,1.176,1.006,1.351v2.07c0,0.222,0.182,0.402,0.402,0.402c0.222,0,0.403-0.181,0.403-0.402v-2.07c0.581-0.175,1.006-0.715,1.006-1.351C15.635,9.163,15.21,8.624,14.629,8.448 M14.226,10.402c-0.331,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C14.83,10.13,14.558,10.402,14.226,10.402 M17.647,3.962H2.353c-0.221,0-0.402,0.181-0.402,0.402v11.27c0,0.222,0.181,0.402,0.402,0.402h15.295c0.222,0,0.402-0.181,0.402-0.402V4.365C18.05,4.144,17.869,3.962,17.647,3.962 M17.245,15.232H2.755V4.768h14.49V15.232z"
                ></path>
              </svg>
              <span>{{ $t("sidebar.setup") }}</span>
            </router-link>
            <router-link
                tag="div"
                :to="{ path: '/GameStart' }"
                class="w-full flex items-center h-10 pl-4 hover:text-red-400 rounded-lg cursor-pointer"
            >
              <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
                <path
                    d="M15.396,2.292H4.604c-0.212,0-0.385,0.174-0.385,0.386v14.646c0,0.212,0.173,0.385,0.385,0.385h10.792c0.211,0,0.385-0.173,0.385-0.385V2.677C15.781,2.465,15.607,2.292,15.396,2.292 M15.01,16.938H4.99v-2.698h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.519,1.156-1.156s-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.321-1.089,0.771H4.99v-3.083h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.518,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V6.531h1.609C6.755,6.98,7.185,7.302,7.688,7.302c0.638,0,1.156-0.519,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V3.062h10.02V16.938z M7.302,13.854c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386s-0.173,0.385-0.385,0.385S7.302,14.066,7.302,13.854 M7.302,10c0-0.212,0.173-0.385,0.385-0.385S8.073,9.788,8.073,10s-0.173,0.385-0.385,0.385S7.302,10.212,7.302,10 M7.302,6.146c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386S7.899,6.531,7.688,6.531S7.302,6.358,7.302,6.146"
                ></path>
              </svg>
              <span>Старт игры</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div  id="main-mobal-nav" class="">
      <div style="height: 60px;left: 50%;transform: translateX(-50%);bottom: 10px"
           class="fixed z-50 w-screen h-18 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
          <router-link to="/main/home/" class="inline-flex outline-none flex-col items-center justify-center px-5 rounded-s-full  group">
              <svg style="width: 30px;"  class="mr-2" xmlns="http://www.w3.org/2000/svg"  fill="#d5d6d7"
                   viewBox="0 0 24 24"><title>cards-outline</title>
                <path
                    d="M11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05L6.93,20C7.24,20.77 7.97,21.23 8.74,21.25C9,21.25 9.27,21.22 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.25C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25M14.67,2.25L18.12,10.6V4.25A2,2 0 0,0 16.12,2.25M20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.78 21.47,4.36M11.19,4.22L16.17,16.24L8.78,19.3L3.8,7.29"/>
              </svg>
               <div class="" style="font-size: 11px" >Персонажи</div>
          </router-link>

          <router-link to="/GameStart"  class="inline-flex flex-col items-center outline-none justify-center px-5  group">
              <svg style="width: 35px;" class="" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>gamepad-variant-outline</title><path d="M6,9H8V11H10V13H8V15H6V13H4V11H6V9M18.5,9A1.5,1.5 0 0,1 20,10.5A1.5,1.5 0 0,1 18.5,12A1.5,1.5 0 0,1 17,10.5A1.5,1.5 0 0,1 18.5,9M15.5,12A1.5,1.5 0 0,1 17,13.5A1.5,1.5 0 0,1 15.5,15A1.5,1.5 0 0,1 14,13.5A1.5,1.5 0 0,1 15.5,12M17,5A7,7 0 0,1 24,12A7,7 0 0,1 17,19C15.04,19 13.27,18.2 12,16.9C10.73,18.2 8.96,19 7,19A7,7 0 0,1 0,12A7,7 0 0,1 7,5H17M7,7A5,5 0 0,0 2,12A5,5 0 0,0 7,17C8.64,17 10.09,16.21 11,15H13C13.91,16.21 15.36,17 17,17A5,5 0 0,0 22,12A5,5 0 0,0 17,7H7Z" /></svg>
              <div class="" style="font-size: 11px" >Начать игру</div>

          </router-link>

          <router-link to="/Game" :style="{pointerEvents: haveActiveGame ? '' : 'none', opacity: haveActiveGame ? '.5' : '.15'}"  class="inline-flex opacity-50 flex-col items-center outline-none justify-center px-5  group">
            <svg style="width: 35px;" class="" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clock-start</title><path d="M12,1C8.14,1 5,4.14 5,8A7,7 0 0,0 12,15C15.86,15 19,11.87 19,8C19,4.14 15.86,1 12,1M12,3.15C14.67,3.15 16.85,5.32 16.85,8C16.85,10.68 14.67,12.85 12,12.85A4.85,4.85 0 0,1 7.15,8A4.85,4.85 0 0,1 12,3.15M11,5V8.69L14.19,10.53L14.94,9.23L12.5,7.82V5M4,16V24H6V21H18V24L22,20L18,16V19H6V16" /></svg>
            <div class="" style="font-size: 11px" >Продолжить игру</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  #main-nav{
    display: none;
  }
}
@media (min-width: 1024px) {
  #main-mobal-nav{
    display: none;
  }
}
</style>

<script>
import {mapState, mapGetters} from "vuex";

import config from "@/config";

export default {
  name: "Sidebar",
 
  computed: {
    ...mapState(["sideBarOpen", "currentGuild", "guilds"]),
    ...mapGetters({auth: "ifAuthenticated"}),
  },
  data() {
    return {
      cdn: config.discordCdn,
      haveActiveGame: false
    };
  },
  mounted() {
    let saveGame = localStorage.getItem('saveGame')
    this.haveActiveGame = !!saveGame
  }
};
</script>