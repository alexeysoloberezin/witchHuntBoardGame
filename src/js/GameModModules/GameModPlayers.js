import {names} from "@/store/cards";
import {toast} from "vue3-toastify";

export class GameModPlayers {
  gamblerChoose(players, choose) {
    return players.map(el => {
      if (el.name !== names.Gambler) {
        return el
      }

      return {
        ...el,
        gamblerChoose: choose
      }
    })
  }

  gamblerShield(nightVal) {
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
      return nightVal % 2 !== 0;
    } else if (choose === 'нечетные') {
      return nightVal % 2 === 0;
    }
    return false
  }


  priestShield(nightVal) {
    const find = this.playersRoles.find(player => player.name === names.Priest)
    if (find) {
      if (nightVal === 0) {
        find.shield = find.shield + 1
      }
    }
  }

  showPriestCheck(playersRoles, ids, refreshList, setNextActive) {
    const fanatic = playersRoles.find((el) => el.name === names.Fanatic);
    if (fanatic) {
      fanatic.fanaticCheck = 0;
    }

    const id = ids[0];
    const find = playersRoles.find((el) => el.number === id);
    let checkUser = [find];

    if (find.chain === true) {
      checkUser = playersRoles.filter((el) => el.chain && el.number !== id);
    }

    const res = !checkUser[0].isGood ? "Ведьма" : "Мирный";
    const isFanatic = find.name === names.Fanatic;

    if (isFanatic) {
      const fanatic = playersRoles.find((el) => el.name === names.Fanatic);
      fanatic.heart = fanatic.heart + 1;
      fanatic.fanaticCheck = fanatic.fanaticCheck + 1;
      refreshList();
    }

    setNextActive();

    return res
  }

  angelChoose(ids, playersRoles, blockHeal, setNextActive) {
    if (ids.length === 0 || !Array.isArray(ids)) {
      toast.error('Не полные данные защиты ангелов..')
      return;
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      if (blockHeal.includes(id)) {
        toast.error(`Вы не можете защитить: ${id}. Так как его уже лечили под связкой демонов.`, {
          duration: 6000,
        })
        return;
      }
    }

    ids.forEach(id => {
      const find = playersRoles.find(el => el.number === id);

      if (find.chain) {
        blockHeal.push(find.number)
      }

      toast.success(`Защитна ангелов установлена на: ${id}`, {
        duration: 2000,
      })
      find.shield = find.shield + 1
    })

    setNextActive()
  }
}