import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sideBarOpen: false,
        dark: true,
    },
    getters: {
        sideBarOpen(state) {
            return state.sideBarOpen;
        },
        dark(state) {
            return state.dark;
        },
    },
    mutations: {
        toggleSidebar(state) {
            state.sideBarOpen = !state.sideBarOpen;
        },
    },
    actions: {

    }
});