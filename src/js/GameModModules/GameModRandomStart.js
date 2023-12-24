import {names} from "@/store/cards";

class GameModRandomStart {
  shuffleRoles(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  generateRandomRoles(arr, witchCount) {
    const copyArr = [...arr]
    return copyArr.filter(role => role !== names.Priest).slice(0, witchCount)
  }

  makeRandomRoles(roles, witchCount) {
    const shuffledRoles = [...roles];
    this.shuffleRoles(shuffledRoles);

    const witchRoles = this.generateRandomRoles(shuffledRoles, witchCount)

    this.shuffleRoles(shuffledRoles);

    const res = {};

    shuffledRoles.forEach((role, i) => {
      res[i + 1] = {
        type: witchRoles.includes(role) ? 'witch' : 'mir',
        name: role
      };
    });

    return res;
  }
}

export default new GameModRandomStart()