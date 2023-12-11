import { createApp } from 'vue';
import App from './App.vue';

// import store from './store';
import router from './router';

// import Vuesax from 'vuesax';
import '@/assets/css/tailwind.css';

// import 'vuesax/dist/vuesax.css';
import './assets/styles.css';
// import i18n from './i18n';
import './registerServiceWorker';

// import 'vue-toast-notification/dist/theme-sugar.css';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Vue2TouchEvents from 'vue2-touch-events';
import i18n from "@/i18n";

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import Button from "primevue/button"
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import InputSwitch from 'primevue/inputswitch';
import Avatar from 'primevue/avatar';
const app = createApp(App);

// app.use(store);
app.use(router);

app.use(PrimeVue);
app.component('vs-dialog', Dialog);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);
app.component('InputSwitch', InputSwitch);
app.component('vs-avatar', Avatar);

app.use(Vue2TouchEvents, {
    disableClick: false,
    touchClass: 'touch-active',
    tapTolerance: 10,
    touchHoldTolerance: 400,
    swipeTolerance: 30,
    longTapTimeInterval: 400,
    namespace: 'touch'
});

// app.use(Toast, {
//     position: 'top-right',
//     duration: 2500,
//     className: ['my-toast'], // добавьте класс стилей, который вы определите в своем CSS
//     styles: {
//         color: 'white', // цвет текста
//         backgroundColor: 'rgba(255, 71, 87, 0.8)', // цвет фона
//     },
// });
app.use( Vue3Toasity,
  {
      autoClose: 3000,
  })

// app.use(Vuesax, {
//     // options here
// });

app.use(i18n);

app.mount('#app');
