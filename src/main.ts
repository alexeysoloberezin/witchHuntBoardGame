import {createApp} from 'vue';
import App from './App.vue';

import router from './router';

import '@/assets/css/tailwind.css';
import './assets/styles.css';
import './registerServiceWorker';

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
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
import ConfirmationService from 'primevue/confirmationservice';
import {createPinia} from "pinia";

const app = createApp(App);
const pinia = createPinia()

app.use(router);

app.use(pinia);

app.use(PrimeVue);
app.use(ConfirmationService);
app.component('vs-dialog', Dialog);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);
app.component('InputSwitch', InputSwitch);
app.component('vs-avatar', Avatar);

app.use(Vue3TouchEvents);

  interface ToastTypes {
    error: (message: string, duration?: number) => void;
    success: (message: string, duration?: number) => void;
  }

app.use(Vue3Toastify,
  {
    autoClose: 3000,
  } as any)

app.use(i18n as any);

app.mount('#app');
