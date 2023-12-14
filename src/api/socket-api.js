import {io} from "socket.io-client";

 class SocketApi {
    static socket = null;

    static createConnection(){
        this.socket = io('http://localhost:5002/')

        this.socket.on('connect', () => {
            console.log('connect')
        })

        this.socket.on('disconnect', (e) => {
            console.log('disconnect', e)
        })
    }

     static getRoomsList(callback) {
         // Отправить запрос на сервер для получения списка комнат
         this.socket.emit("getRoomsList", (roomsList) => {
             // Обработать полученный список комнат
             if (callback) {
                 callback(roomsList);
             }
         });
     }
}

export default SocketApi