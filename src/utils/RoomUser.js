import {toast} from "vue3-toastify";

class RoomUser {
    createUser({name, text = ''}){
        localStorage.setItem('room_user', JSON.stringify({name, text}))
    }

    getUser(){
        const user = localStorage.getItem('room_user')
        if(user){
            return JSON.parse(user)
        }
        return null
    }
}

export default new RoomUser()