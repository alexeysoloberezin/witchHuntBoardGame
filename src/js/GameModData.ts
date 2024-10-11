import {names} from "@/store/cards";
import GameMod from "@/js/GameMod";
import {logType} from "@/js/types";
import {getWatchManList} from "@/js/modules/watchManList";
import {DayType, HistoryItem, HistoryLineData, HistoryLineItem, PlayerRole} from "@/globalTypes";
import {useStorage} from "@vueuse/core/index";

export const dayPersonWhoHaveSkills: string[] = [
  names.Assassin,
  names.Nurse,
  names.Spiritualist,
  names['(D.O.B.) Dirty Old Bastard'],
  names["Loose Cannon"],
]

export type HistoryStartItem = {
  id: number
  isGood: boolean | undefined
  role: string | undefined
  text: string
  title: string
  type: DayType
}
export const arrayStartGameTakeCards = (playersLength: number, players: Record<any, PlayerRole>): HistoryStartItem[] => {

  const arr = []
  for (let i = 1; i < playersLength + 1; i++) {
    const find = players[i]

    arr.push({
      id: i,
      title: `Посыпается Игрок ${i}`,
      text: `${find?.name || ''} -- ${find?.type || ''}`,
      isGood: find?.type,
      role: find?.name,
      type: DayType.NIGHT,
    })
  }
  return arr
}

export const firstStep: number = 21
export const historyLineData = ({initialPlayers, nights = 0, nightLog, dayLog}: HistoryLineData) => {
  if (!Array.isArray(initialPlayers) || initialPlayers.length < 4) {
    return []
  }

  const roles = initialPlayers.map(el => el.name)

  const gravedigger = initialPlayers.find(el => el.name === names['Gravedigger'])?.number
  const judge = initialPlayers.find(el => el.name === names['Judge'])?.number
  const priest = initialPlayers.find(el => el.name === names['Priest'])?.number
  const oracleList = initialPlayers
    .filter(player => player.isGood)
    .map(el => el.number)
    .join(' , ')

  let generated = []

  for (let i = 0; i < nights + 1; i++) {
    generated = [
      ...generated,
      ...generate(initialPlayers, i, nightLog, dayLog),
    ]
  }

  const dayList: HistoryLineItem[] = [
    {
      id: firstStep,
      title: 'Посыпаются ведьмы знакомятся',
      text: 'Ночное знакомство',
      ifPlayerInGame: false,
      type: DayType.NIGHT,
    },
    {
      id: 22,
      title: 'Посыпается Азартный игрок.',
      name: names.Gambler,
      text: 'Азартный игрок выбирает четные или нечетные ночи в эти ночи у него будет иммунитет. Эта ночь нулевая.',
      ifPlayerInGame: true,
      type: DayType.NIGHT,
    },
    {
      id: 23,
      title: 'Просыпается Бомбардировщик',
      name: names.Bomber,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `Выбирает кому дать бомбу. Покажите мне цифру я выдам бомбу этому игроку.`
    },
    {
      id: 24,
      title: 'Просыпается Оракул',
      name: names.Oracle,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `Узнает личность случайного мирного.Покажите одного из мирных:
       ${oracleList}`
    },
    {
      id: 25,
      title: 'Просыпается Ученик',
      name: names.Apprentice,
      type: DayType.NIGHT,
      ifPlayerInGame: true,
      text: `Выбирает могильщик(${gravedigger}) или судья(${judge}). Нужно показать кто сидит на выбранной роле.`
    },
    {
      id: 26,
      title: 'Просыпается Послушник',
      name: names.Acolyte,
      text: 'Послушник узнает кто священник: покажите - ' + priest,
      type: DayType.NIGHT,
      ifPlayerInGame: true,
    },
    {
      id: 27,
      title: 'Просыпается Сторож',
      name: names.Watchman,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
            Узнает личность случайного мирного который не просыпался. Покажите кого-нибудь из 
            ${watchmanListEnd(initialPlayers)}
          `
    },
    {
      id: 2777,
      title: 'Просыпается Оборотень',
      name: names.Werewolf,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
            Выбирает будет ли он играть за мирных или за ведьм. 
          `
    },
    {
      id: 28,
      title: 'Все просыпаются, наступил день.',
      ifPlayerInGame: false,
      text: "Доброе утро",
      type: DayType.DAY
    },
    ...generated
  ]

  return GameMod.filterStepsPolesInGame(dayList, roles)
}

export const generate = (initialPlayers: PlayerRole[], night: number, nightLog: HistoryItem[], dayLog: HistoryItem[]) => {
  let res = [
    ...dayUsers({night, users: initialPlayers, nightLog}),
  ]

  if (night > 0) {
    res = [...res, ...voted('voted-user-' + night)]
  }

  return [
    ...res,
    ...nigthStepNew(night, initialPlayers, dayLog)
  ]
}

export const nigthStepNew = (night: number = 0, users, dayLog: HistoryItem[]) => {
  let start = 'night-' + night + '-'

  const necrList = dayLog.filter(el => el.type === logType.tryKill).map(e => e.player).join(' , ')
  let necrListArr = [{
    id: start + 0,
    title: 'Просыпается Некромант',
    name: names.Necromancer,
    ifPlayerInGame: true,
    type: DayType.NIGHT,
    text: "тт"
  }]

  const hunterList = dayLog.filter(el => el.type === logType.tryKill).map(e => e.player).join(' , ')
  let hunterArr = [{
    id: start + 1,
    title: 'Просыпается Охотник',
    name: names.Hunter,
    ifPlayerInGame: true,
    type: DayType.NIGHT,
    text: `
        ${hunterList ?
      'Выживали игроки -' + hunterList + '.'
      : 'Скип'
    }
          `
  }]

  let res = []

  const dayLogGravedigger = dayLog.filter(el => el.type === logType.dayKill || el.type === logType.kill)

  if (night !== 0) {
    res = [
      {
        id: start + 2,
        title: 'Просыпается Могильщик',
        name: names.Gravedigger,
        ifPlayerInGame: false,
        type: DayType.NIGHT,
        text: `
    Просыпается Могильщик. И узнает карты (обе) всех умерших днем игроков. => 
    ${dayLogGravedigger.map(el => el.player).join(' , ')}
          `
      },
      {
        id: start + 3,
        title: 'Просыпаются Демоны',
        name: 'Демоны',
        ifPlayerInGame: false,
        type: DayType.NIGHT,
        text: `
            Просыпаются демоны и выбирают каких двух жертв поменять ролями.
          `
      },
      {
        id: start + 4,
        title: 'Просыпаются Ангелы',
        name: 'Ангелы',
        ifPlayerInGame: false,
        type: DayType.NIGHT,
        text: `
            Просыпаются Ангелы и выбирают кого они хотят защитить этой ночью.
          `
      },
    ]
  }

  const shabash = useStorage('shabash', false)
  console.log('shabash', shabash)
  let shabashArr = []

  if(night === 0 && shabash.value){
    const lastCheck = localStorage.getItem('lastPriestCheck')
    shabashArr = [{
      id: start + 1444,
      title: 'Шабаш ведьм',
      name: 'Шабаш ведьм',
      ifPlayerInGame: false,
      type: DayType.NIGHT,
      text: `
          Проверка ведьм - ${lastCheck}
        `
    }]
  }

  return [
    ...necrListArr,
    ...res,
    ...hunterArr,
    {
      id: start + 555,
      title: 'Просыпается Оборотень',
      name: names.Werewolf,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
            Просыпается Оборотень.
          `
    },
    {
      id: start + 5,
      title: 'Просыпаются Ведьмы',
      name: 'Ведьмы',
      ifPlayerInGame: false,
      type: DayType.NIGHT,
      text: `
            Просыпаются Ведьмы.
             Хотите ли вы сделать иллюзорное убийство?
             Кого убивают ведьмы ?
          `
    },
    {
      id: start + 6,
      title: 'Священник',
      name: names.Priest,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
            Просыпаются Священник и делает свою проверку.(на ведьму).
            Не забудь оведомить фанатика если его преверят. И дать доп жизнь
          `
    },
    {
      id: start + 7,
      title: 'Просыпается Фанатик',
      name: names.Fanatic,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
       Просыпаются Фанатик. Проверяли ли вас? ==> 
       ${users.find(el => el.name === names.Fanatic)?.fanaticCheck === 1 ? 'Да' : 'Нет'}
      `
    },
    {
      id: start + 8,
      title: 'Инквизитор',
      name: names.Inquisitor,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
            Просыпаются Инквизитор и делает свою проверку по типу. (Информация, Атака...)
          `
    },
    {
      id: start + 9,
      title: 'Бомбардировщик',
      name: names.Bomber,
      ifPlayerInGame: true,
      type: DayType.NIGHT,
      text: `
            Если бомба есть!!
            Просыпаются Бомбардировщик и подает сигнал если хочет взорвать бомбу.
          `
    },
    ...shabashArr
  ]
}

export const dayUsers = ({night, users, nightLog}: {night: number, users: PlayerRole[], nightLog: HistoryItem[]}) => {
  const shiftArray = (arr, shift) => {
    const length = arr.length;
    const index = shift % length;
    return arr.slice(index).concat(arr.slice(0, index));
  };

  const res =
    shiftArray(users, night)
      .filter(user => !user.killed)
      .map(user => {
        return {
          id: 'daySpeach-' + night + '-' + user.number,
          title: 'Речь игрока: ' + (+user.number),
          ifPlayerInGame: false,
          text: 'Дневная речь',
          type: DayType.DAY
        };
      });

  let speachDeadPerson = []
  let firstPlayer30Sec = []

  if (night > 0) {
    speachDeadPerson = [
      {
        id: 'daySpeach-start-' + night,
        title: 'Речь убитого если есть: ' + nightLog.map(el => `\n-->  ${el.type} ${el.player}`).join('\n'),
        ifPlayerInGame: false,
        text: "Дневная речь",
        type: DayType.DAY
      }
    ]
  } else {
    firstPlayer30Sec = [
      {
        id: 'daySpeach-end-' + night,
        title: 'Речь игрока 1: 30 сек',
        ifPlayerInGame: false,
        text: "Дневная речь",
        type: DayType.DAY
      }
    ]
  }

  return [
    ...speachDeadPerson,
    ...res,
    ...firstPlayer30Sec,
  ]
}

export const voted = (prevId: string) => ([
  {
    id: prevId + '-1',
    title: 'Голосование!',
    ifPlayerInGame: false,
    text: "Дневная речь",
    type: DayType.VOTED
  },
  {
    id: prevId + '-2',
    title: 'Речь заголосованного игрока.',
    ifPlayerInGame: false,
    text: "Последняя минута.",
    type: DayType.VOTED_SPEEK
  },
])


export const watchmanListEnd = (playersList) => getWatchManList(playersList)