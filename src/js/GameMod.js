import cards, {names} from "@/store/cards";
import {toast} from 'vue3-toastify'
import {GameModPlayers} from "@/js/GameModModules/GameModPlayers";
import GameModRandomStart from "@/js/GameModModules/GameModRandomStart";

class GameMod extends GameModPlayers{
  setInGlobalLog(message) {
    let res = localStorage.getItem('logList')
    if (res) {
      res = JSON.parse(res)
      res = [...res, message]
    } else {
      res = [message]
    }
    localStorage.setItem('logList', JSON.stringify(res))
  }

  showRolesCards(playersRoles, shuffle) {
    const roles = Object.values(playersRoles).map(el => el.name)
    const res = cards.filter(card => roles.map(el => el.toLowerCase()).includes(card.name.toLowerCase()))

    if (shuffle) {
      for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
      }
    }

    return res;
  }

  getNumberFromText(text, type) {
    const matches = text.match(/\((\d+)\)/g);

    if (matches) {
      const numbers = matches.map(match => parseInt(match.match(/\d+/)[0], 10));
      return numbers[type ? 1 : 0];
    } else {
      return null;
    }
  }

  askWitches() {
    let witches = window.prompt('Сколько ведьм будет?')
    if (!witches) {
      toast.error('Нет данных о кол. ведьм')
      return null
    }

    witches = parseInt(witches)

    if (!witches) {
      toast.error('Число ведьм не правильное')
      return null
    }
    if (witches >= 5) {
      toast.error('Слишком много ведьм!')
      return null
    }

    return witches
  }

  makeRandomRoles(...args) {
    return GameModRandomStart.makeRandomRoles(...args)
  }

  filterStepsPolesInGame(array, roles) {
    return array.filter((el) => {
      if (el.ifPlayerInGame === false) {
        return true
      } else {
        return roles.includes(el.name)
      }
    })
  }
}

export default new GameMod()