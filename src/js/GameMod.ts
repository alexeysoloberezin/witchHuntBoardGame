import cards, { names } from "@/store/cards";
import { toast } from 'vue3-toastify';
import { GameModPlayers } from "@/js/GameModModules/GameModPlayers";
import GameModRandomStart from "@/js/GameModModules/GameModRandomStart";
import {PlayerRole} from "@/globalTypes";
import {Card} from "@/store/cards.types";

class GameMod extends GameModPlayers {
  checkEndGame(players: PlayerRole[]): string | null {
    const witchesAlived = players.filter(el => !el.isGood && !el.killed);

    if(witchesAlived.length === 0){
      return 'mir'
    }

    return null
  }

  showRolesCards(playersRoles: PlayerRole[], shuffle: boolean): Card[] {
    const roles = Object.values(playersRoles).map(el => el.name);
    const res = cards.filter(card => roles.map(el => el.toLowerCase()).includes(card.name.toLowerCase()));

    if (shuffle) {
      for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
      }
    }

    return res;
  }

  getNumberFromText(text: string, type: boolean): number | null {
    const matches = text.match(/\((\d+)\)/g);

    if (matches) {
      const numbers = matches.map(match => parseInt(match.match(/\d+/)[0], 10));
      return numbers[type ? 1 : 0];
    } else {
      return null;
    }
  }

  askWitches(): number | null {
    let witches: string | number = window.prompt('Сколько ведьм будет?');
    if (!witches) {
      toast.error('Нет данных о количестве ведьм');
      return null;
    }

    witches = parseInt(witches as string);

    if (!witches) {
      toast.error('Число ведьм не правильное');
      return null;
    }
    if (witches >= 5) {
      toast.error('Слишком много ведьм!');
      return null;
    }

    return witches as number;
  }

  makeRandomRoles(roles: any, witchCount: any): Record<number, { type: string, name: string }> {
    return GameModRandomStart.makeRandomRoles(roles, witchCount);
  }

  filterStepsPolesInGame(array: any[], roles: string[]): any[] {
    return array.filter((el) => {
      if (el.ifPlayerInGame === false) {
        return true;
      } else {
        return roles.includes(el.name);
      }
    });
  }
}

export default new GameMod();
