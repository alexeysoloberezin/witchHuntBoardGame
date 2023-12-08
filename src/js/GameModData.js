import {getByNames, names} from "@/store/cards";
import GameMod from "@/js/GameMod";

export const dayPersonWhoHaveSkills = [
  names.Assassin,
  names.Nurse,
  names.Spiritualist,
  names['(D.O.B.) Dirty Old Bastard'],
  names["Loose Cannon"],
]

export const GET_dayPersonWhoHaveSkills = () => {
  return getByNames(dayPersonWhoHaveSkills)
}

export const arrayStartGameTakeCards = (playersLength) => {
  const arr = []
  for (let i = 1; i < playersLength + 1; i++) {
    arr.push({
      id: i,
      title: `Посыпается Игрок ${i}`,
      text: 'Ночная раздача карт',
      type: 'night',
    })
  }
  return arr
}

export const firstStep = 21
export const historyLineData = ({initialPlayers, nights = 0}) => {
  console.log('initialPlayers', initialPlayers)
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

  console.log('nights', nights)
  for (let i = 0; i < nights + 1; i++) {
    generated = [
      ...generated,
      ...generate(initialPlayers, i),
    ]
  }

  const dayList = [
    {
      id: firstStep,
      title: 'Посыпаются ведьмы знакомятся',
      text: 'Ночное знакомство',
      ifPlayerInGame: false,
      type: 'night',
    },
    {
      id: 22,
      title: 'Посыпается Азартный игрок.',
      name: 'Азартный игрок',
      text: 'Азартный игрок выбирает четные или нечетные ночи в эти ночи у него будет иммунитет. Эта ночь нулевая.',
      ifPlayerInGame: true,
      type: 'night',
    },
    {
      id: 23,
      title: 'Просыпается Бомбардировщик ',
      name: 'Бомбардировщик',
      ifPlayerInGame: true,
      type: 'night',
      text: `Выбирает кому дать бомбу. Покажите мне цифру я выдам бомбу этому игроку.`
    },
    {
      id: 24,
      title: 'Просыпается Оракул',
      name: 'Оракул',
      ifPlayerInGame: true,
      type: 'night',
      text: `Узнает личность случайного мирного.Покажите одного из мирных:
       ${oracleList}`
    },
    {
      id: 25,
      title: 'Просыпается Ученик',
      name: 'Ученик',
      type: 'night',
      ifPlayerInGame: true,
      text: `Выбирает могильщик(${gravedigger}) или судья(${judge}). Нужно показать кто сидит на выбранной роле.`
    },
    {
      id: 26,
      title: 'Просыпается Послушник',
      name: 'Послушник',
      text: 'Послушник узнает кто священник: покажите - ' + priest,
      type: 'night',
      ifPlayerInGame: true,
    },
    {
      id: 27,
      title: 'Просыпается Сторож',
      name: 'Сторож',
      ifPlayerInGame: true,
      type: 'night',
      text: `
            Узнает личность случайного мирного который не просыпался. Покажите кого-нибудь из 
            ${watchmanListEnd(initialPlayers)}
          `
    },
    {
      id: 28,
      title: 'Все просыпаются, наступил день.',
      ifPlayerInGame: false,
      text: "Доброе утро",
      type: 'day'
    },
    ...generated
  ]

  return GameMod.filterStepsPolesInGame(dayList, roles)
}

export const generate = (initialPlayers, night) => {
  let res = [
    ...dayUsers({night, users: initialPlayers}),
  ]

  if(night > 0){
    res = [...res, ...voted('voted-user-' + night)]
  }

  return [
    ...res,
    ...nigthStepNew(night, initialPlayers)
  ]
}

export const nigthStepNew = (night = 0, users) => {
  console.log('users', users)
  let start = 'night-' + night + '-'

  let hunterArr = []
  const hunter = users.find(user => user.name === names.Hunter)

  if (hunter && hunter?.hunterWakeUp.length > 0) {
    const hunterLast = hunter?.hunterWakeUp[hunter?.hunterWakeUp.length - 1]

    if(hunterLast.night === night){
      hunterArr = [{
        id: start + 1,
        title: 'Просыпается Охотник',
        name: 'Охотник',
        ifPlayerInGame: true,
        type: 'night',
        text: `
            Т.к выживал Игрок - ${hunterLast.id}.  
            Хотите ли вы добить его?
          `
      }]
    }
  }

  return [
    ...hunterArr,
    {
    id: start + 2,
    title: 'Просыпается Могильщик',
    name: 'Могильщик',
    ifPlayerInGame: false,
    type: 'night',
    text: `
    Просыпается Могильщик. И узнает карты (обе) всех умерших днем игроков. => 
    ${users.filter(user => user.deadOnDay).map(el => el.number).join(' , ')}
          `
  },
    {
      id: start + 3,
      title: 'Просыпаются Демоны',
      name: 'Демоны',
      ifPlayerInGame: false,
      type: 'night',
      text: `
            Просыпаются демоны и выбирают каких двух жертв поменять ролями.
          `
    },
    {
      id: start + 4,
      title: 'Просыпаются Ангелы',
      name: 'Ангелы',
      ifPlayerInGame: false,
      type: 'night',
      text: `
            Просыпаются Ангелы и выбирают кого они хотят защитить этой ночью.
          `
    },
    {
      id: start + 5,
      title: 'Просыпаются Ведьмы',
      name: 'Ведьмы',
      ifPlayerInGame: false,
      type: 'night',
      text: `
            Просыпаются Ведьмы.
             Хотите ли вы сделать иллюзорное убийство?
             Кого убивают ведьмы ?
          `
    },
    {
      id: start + 6,
      title: 'Священник',
      name: 'Священник',
      ifPlayerInGame: true,
      type: 'night',
      text: `
            Просыпаются Священник и делает свою проверку.(на ведьму).
            Не забудь оведомить фанатика если его преверят. И дать доп жизнь
          `
    },
    {
      id: start + 7,
      title: 'Просыпается Фанатик',
      name: 'Фанатик',
      ifPlayerInGame: true,
      type: 'night',
      text: `
       Просыпаются Фанатик. Проверяли ли вас? ==> 
       ${users.find(el => el.name === names.Fanatic)?.fanaticCheck === 1 ? 'Да' : 'Нет'}
      `
    },
    {
      id: start + 8,
      title: 'Инквизитор',
      name: 'Инквизитор',
      ifPlayerInGame: true,
      type: 'night',
      text: `
            Просыпаются Инквизитор и делает свою проверку по типу. (Информация, Атака...)
          `
    },
    {
      id: start + 9,
      title: 'Бомбардировщик',
      name: 'Бомбардировщик',
      ifPlayerInGame: true,
      type: 'night',
      text: `
            Если бомба есть!!
            Просыпаются Бомбардировщик и подает сигнал если хочет взорвать бомбу.
          `
    },
  ]
}

export const dayUsers = ({night, users}) => {

  const res = users.filter(user => !user.killed).map((user) => {
    return {
      id: 'daySpeach-' + night + "-" + user.number,
      title: 'Речь игрока: ' + +user.number + ' ' + user.name,
      ifPlayerInGame: false,
      text: "Дневная речь",
      type: 'day'
    }
  })

  return res
}

export const voted = (prevId) => ([
  {
    id: prevId,
    title: 'Голосование!',
    ifPlayerInGame: false,
    text: "Дневная речь",
    type: 'voted'
  }
])

const watchmanList = [
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
const watchmanListEnd = (playersList) => {
  let res;

  res = playersList.filter(player => watchmanList.includes(player.name))
  res = res.filter(player => !!player.isGood)

  return res.map(el => el.number).join(' , ')
}