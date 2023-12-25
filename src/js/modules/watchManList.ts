import {names} from "@/store/cards";
import {PlayerRole} from "@/globalTypes";

export const watchmanList: string[] = [
  names['Nurse'],
  names['Survivalist'],
  names['Judge'],
  names['Hunter'],
  names['Assassin'],
  names['Gravedigger'],
  names['Benevolent Old Dame'],
  names['Peeping Tom'],
  names['Inquisitor'],
  names['Loose Cannon'],
  names['Fanatic'],
  names['Emissary'],
  names['(D.O.B.) Dirty Old Bastard'],
]

export const getWatchManList = (playersList: PlayerRole[]): string => {
  let res;

  res = playersList.filter(player => watchmanList.includes(player.name))
  res = res.filter(player => !!player.isGood)

  return res.map(el => el.number).join(' , ') || ''
}

