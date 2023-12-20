import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {useRoomsStore} from "@/store/rooms";
import {useRouter} from "vue-router";

export const useRoomUserStore = defineStore('roomUser', () => {
    const user = useStorage('room_user',null, undefined, {
        serializer: {
            read: (v) => (v ? JSON.parse(v) : null),
            write: (v) => JSON.stringify(v),
        },
    })
    const roomsStore = useRoomsStore()
    const router = useRouter()
    const loading = ref(false)

    const alreadyHaveName = computed(() => {
        return !!user.value
    })

    async function createUser({name, subtitle , roomId}){
        loading.value = true
        await roomsStore.joinRoom(roomId,subtitle, name)
    }

    function clearUser(){
        user.value = null
    }

    return {user, clearUser,loading, createUser, alreadyHaveName}
})