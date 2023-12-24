import {toast} from "vue3-toastify";

export default function GameModWitchKill(ids, playersRoles, cb){
  if (ids.length === 0 || !Array.isArray(ids)) {
    toast.error('Не полные данные для защиты..')
    return;
  }

  if (ids.length > 2) {
    toast.error('Ведьмы не могут убивать больше 2')
    return;
  }

  ids.forEach(id => {
    const index = playersRoles.findIndex(el => el.number === id);
    cb(index)
  })
}