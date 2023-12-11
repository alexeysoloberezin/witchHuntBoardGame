import cards, {names} from "@/store/cards";

class GameMod {
  loadData(){

  }
  setInGlobalLog(message){
    let res = localStorage.getItem('logList')
    if (res) {
      res = JSON.parse(res)
      res = [...res, message]
    } else {
      res = [message]
    }
    localStorage.setItem('logList', JSON.stringify(res))
  }

  showRolesCards(playersRoles, shuffle){
    const roles = Object.values(playersRoles).map(el => el.name)
    const res = cards.filter(card => roles.map(el => el.toLowerCase()).includes(card.name.toLowerCase()))

    if(shuffle){
      for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
      }
    }

    return res;
  }

  gamblerChoose(players, choose){
    return players.map(el => {
      if (el.name === names.Gambler) {
        return {
          ...el,
          gamblerChoose: choose
        }
      } else {
        return el
      }
    })
  }

  getNumberFromText(text, type) {
    const matches = text.match(/\((\d+)\)/g);

    if (matches) {
      const numbers = matches.map(match => parseInt(match.match(/\d+/)[0], 10));
      return numbers[type ? 1 : 0];
    } else {
      return null; // Или любое другое значение по умолчанию, если скобки не найдены
    }
  }

  gamblerShield(nightVal){
    const find = this.playersRoles.find(player => player.name === names.Gambler)
    if (find) {
      if (find.killed) {
        return null;
      }
      if (this.gamblerHaveShield(find.gamblerChoose, nightVal)) {
        find.shield = find.shield + 1
      }
    }
  }

  gamblerHaveShield(choose, nightVal) {
    if (choose === 'четные') {
      return nightVal % 2 === 0;
    } else if (choose === 'нечетные') {
      return nightVal % 2 !== 0;
    }
    return false
  }

  filterStepsPolesInGame(array, roles){
   return array.filter((el) => {
      if (el.ifPlayerInGame === false) {
        return true
      } else {
        return roles.includes(el.name)
      }
    })
  }

  getNightWelcomePerson(playersRoles, step, nightStepsWelcome){
    const person = nightStepsWelcome[step]

    if (person?.name === names.Apprentice) {
      const roles = Object.values(playersRoles)

      let gravedigger, judge;

      roles.forEach(role => {
        if (role.name === names.Gravedigger) {
          gravedigger = role.number
        } else if (role.name === names.Judge) {
          judge = role.number
        }
      })

      return {
        ...person,
        text: person.text(gravedigger, judge)
      }
    }

    return nightStepsWelcome[step]
  }
}

export default new GameMod()