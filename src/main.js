import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

import Vuesax from 'vuesax'
import '@/assets/css/tailwind.css';

import 'vuesax/dist/vuesax.css'
import './assets/styles.css'

import i18n from './i18n';
import './registerServiceWorker';

import Toast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(Toast);
Vue.config.productionTip = false;

Vue.use(Vuesax, {
    // options here
})


new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app');