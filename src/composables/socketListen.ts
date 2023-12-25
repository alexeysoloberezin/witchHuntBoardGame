import {ref, onMounted, onBeforeUnmount, computed, watch} from 'vue';
import {useRoomsStore} from "@/store/rooms";

const useSocketListener = (eventName, callback) => {
  const roomsStore = useRoomsStore();
  const socket = computed(() => roomsStore.$state.socket); // Подставьте свой метод для получения сокета

  const initListener = () => {
    socket.value?.on(eventName, callback);
  };

  const destroyListener = () => {
    socket.value?.off(eventName, callback);
  };

  onMounted(() => {
    initListener();
  });

  onBeforeUnmount(() => {
    destroyListener();
  });

  watch(() => socket.value, (newSocket) => {
    initListener()
  });

  return {
    on: initListener,
    off: destroyListener,
  };
};

export default useSocketListener;
