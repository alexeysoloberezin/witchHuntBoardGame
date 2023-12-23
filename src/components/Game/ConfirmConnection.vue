<template>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="grid justify-content-center bg-gray-800 align-items-center  p-5 surface-overlay rounded">
        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
          <i class="pi pi-question text-5xl"></i>
        </div>
        <div @click="acceptCallback" class="mx-auto">
          <radial-progress-bar :diameter="300"
                               :completed-steps="completedSteps"
                               innerStrokeColor="#101116"
                               :strokeWidth="22"
                               :innerStrokeWidth="30"
                               startColor="#1ae157"
                               stopColor="#1acfe1"
                               :total-steps="totalSteps"
          >
            <p class="text-2xl font-medium">Подтвердить</p>
            <p class="text-xl font-medium">Нажмите сюда!</p>
            <div class="text-4xl font-medium">
              {{ completedSteps }}
            </div>
          </radial-progress-bar>
        </div>
        <div class="flex align-items-center justify-center gap-2 mt-4">
          <Button label="Отменить" severity="danger" outlined @click="rejectCallback"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup>
import ConfirmDialog from 'primevue/confirmdialog'
import {useConfirm} from "primevue/useconfirm";
import {toast} from "vue3-toastify";
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import RadialProgressBar from 'vue-radial-progress'
import {useRoomsStore} from "@/store/rooms";
import useSocketListener from "@/composables/socketListen";

const confirm = useConfirm();
const completedSteps = ref(0)
const totalSteps = 12
let timer = null

const stopTimer = () => {
  clearInterval(timer);
  timer = null
  completedSteps.value = 0
}

const startTimer = () => {
  stopTimer()
  completedSteps.value = totalSteps;

  timer = setInterval(() => {
    completedSteps.value -= 1;

    if (completedSteps.value <= 0) {
      stopTimer()
      confirm.close()
    }
  }, 1000);
}

const roomsStore = useRoomsStore()
const socket = computed(() => roomsStore.$state.socket);

const requireConfirmation = (clientId) => {
  console.log('clientID', clientId)
  startTimer()
  confirm.require({
    group: 'headless',
    header: 'Are you sure?',
    message: 'Please confirm to proceed.',
    accept: () => {
      toast.success('Принято');
      socket.value?.emit('confirmConnection', {clientId});
      confirm.close()
    },
    reject: () => {
      toast.error('Вы не подтвердили готовность, вас выгнали из комнаты.');
    }
  });
};

onBeforeUnmount(() => {
  socket.value?.off('watchClientsResponses')
})

useSocketListener(
    'checkConnection',
    ({clientId}) => {
      console.log('checkConnection', clientId)
      requireConfirmation(clientId);
    }
)
</script>
