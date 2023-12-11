import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import '@/assets/css/tailwind.css';

import './assets/styles.css';
import './registerServiceWorker';

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Vue3TouchEvents from "vue3-touch-events";
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

app.use(router);

app.use(PrimeVue);
app.component('vs-dialog', Dialog);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);
app.component('InputSwitch', InputSwitch);
app.component('vs-avatar', Avatar);

app.use(Vue3TouchEvents);

app.use( Vue3Toasity,
  {
      autoClose: 3000,
  })

app.use(i18n);

app.mount('#app');
