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

import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents, {
    disableClick: false,
    touchClass: 'touch-active',
    tapTolerance: 10,
    touchHoldTolerance: 400,
    swipeTolerance: 30,
    longTapTimeInterval: 400,
    namespace: 'touch'
})
Vue.use(Toast, {
    position: 'top-right',
    duration: 1500,
    className: ['my-toast'], // добавьте класс стилей, который вы определите в своем CSS
    styles: {
        color: 'white', // цвет текста
        backgroundColor: 'rgba(255, 71, 87, 0.8)', // цвет фона
    },
});
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