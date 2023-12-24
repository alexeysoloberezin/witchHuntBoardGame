import {names} from "@/store/cards";

export const watchmanList = [
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

export const getWatchManList = (playersList) => {
  let res;

  res = playersList.filter(player => watchmanList.includes(player.name))
  res = res.filter(player => !!player.isGood)

  return res.map(el => el.number).join(' , ')
}

