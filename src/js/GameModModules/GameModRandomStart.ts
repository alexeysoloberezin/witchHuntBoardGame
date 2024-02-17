import {names} from "@/store/cards";
import {Role, RoleWithType} from "@/globalTypes";

class GameModRandomStart {
  shuffleRoles(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  generateRandomRoles(arr: Role[], witchCount: number): Role[] {
    const copyArr = [...arr]
    return copyArr
      .filter(role => role !== names.Priest && role !== names.Werewolf && role !== names.Acolyte)
      .slice(0, witchCount)
  }

  makeRandomRoles(roles: Role[], witchCount: number): Record<number, RoleWithType> {
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