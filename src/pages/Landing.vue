<template>
  <div
    class="min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 flex flex-col justify-center sm:p-10"
  >
    <div
      class="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto"
    >
      <div
        class="absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"
      ></div>
      <div class="relative bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl">
        <div class="flex items-center justify-start pt-6 pl-6">
          <span class="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          <span class="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
        </div>

        <div class="px-20 py-6">
          <!-- nav -->
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-center">
              <div
                class="flex items-center justify-center text-3xl font-bold text-true-gray-800 dark:text-gray-100"
              >
                <img
                  class="w-10 h-10 mr-1 text-blue-700"
                  src="@/assets/space.png"
                  alt="logo"
                />
                Witch Hunt
              </div>
            </div>
            <div class="hidden md:flex items-center justify-center">
              <a
                v-if="auth"
                href="#"
                class="mr-5 text-lg font-medium text-true-gray-800 dark:text-gray-100 hover:text-cool-gray-700 transition duration-150 ease-in-out"
                >{{ username }}</a
              >
              <router-link
                :to="{ path: '/main/home/' }"
                class="px-6 py-3 rounded-3xl font-medium bg-gradient-to-b from-red-600 to-red-700 hover:from-red-900 text-white outline-none focus:outline-none hover:shadow-md hover:from-true-gray-900 transition duration-200 ease-in-out"
              >
                Начать
              </router-link>
            </div>
          </div>
          <!-- /nav -->

          <!-- hero section -->
          <div class="lg:2/6 xl:w-2/4 mt-20 lg:mt-40 lg:ml-16 text-left">
            <div
              class="text-5xl xl:text-6xl font-semibold text-gray-900 dark:text-gray-200 leading-none"
            >
              Witch hunt правила.
            </div>
            <div
              class="mt-6 text-xl font-light text-true-gray-500 dark:text-white antialiased"
            >
              {{ $t("landing.sub") }}.
            </div>
            <div class="flex">
              <router-link
                name="to-dashboard"
                tag="button"
                :to="{ path: '/main/home/' }"
                class="md:hidden ml-1 mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-red-600 to-red-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-red-900 transition duration-200 ease-in-out"
              >
                Начать
              </router-link>
            </div>
          </div>
          <div class="mt-20 text-left"></div>

          <!-- /hero section -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import queryString from "@/utils/queryString";
import config from "@/config";

export default {
  name: "Landing",
  computed: {

    state() {
      return btoa(this.stateParam);
    },
    username() {
      return this.user
        ? `${this.user.username}#${this.user.discriminator}`
        : "Anonymous";
    },
    loginUrl() {
      const loginParams = {
        client_id: config.clientId,
        redirect_uri: config.home,
        response_type: "token",
        scope: "identify guilds",
        state: this.state,
      };
      return `${config.discordApi}/oauth2/authorize${queryString(loginParams)}`;
    },
  },
  data() {
    return {
      botUrl: `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=268438560&scope=bot`,
    };
  },
};
</script>