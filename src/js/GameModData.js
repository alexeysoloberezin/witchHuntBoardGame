import {names} from "@/store/cards";
import GameMod from "@/js/GameMod";

export const nightStepsWelcome = [
  {
    name: 'Ведьмы',
    ifPlayerInGame: false,
    text: `
            Знакомятся. Отмечаем кто witcher.
          `
  },
  {
    name: 'Азартный игрок',
    ifPlayerInGame: true,
    text: `
            Просыпается Азартный игрок. И выбирает по каким ночам у него будет иммунитет.
            Чётным или нечетным.
          `
  },
  {
    name: 'Бомбардировщик',
    ifPlayerInGame: true,
    text: `
            Выбирает кому дать бомбу.
          `
  },
  {
    name: 'Оракул',
    ifPlayerInGame: true,
    text: `
            Узнает личность случайного мирного.
          `
  },
  {
    name: 'Ученик',
    ifPlayerInGame: true,
    text: (gravedigger, judge) => `
            Выбирает могильщик(${gravedigger}) или судья(${judge}). Нужно показать кто сидит на выбранной роле.
          `
  },
  {
    name: 'Послушник',
    ifPlayerInGame: true,
    text: `
            Узнает кто священник
          `
  },
  {
    name: 'Сторож',
    ifPlayerInGame: true,
    text: `
            Узнает личность случайного мирного который не просыпался.
          `
  },
]
export const nightSteps = [
  {
    name: 'Могильщик или ученик',
    ifPlayerInGame: false,
    text: `
            Просыпается Могильщик. И узнает карты (обе) всех умерших днем игроков.
          `
  },
  {
    name: 'Демоны',
    ifPlayerInGame: false,
    text: `
            Просыпаются демоны и выбирают каких двух жертв поменять ролями.
          `
  },
  {
    name: 'Ангелы',
    ifPlayerInGame: false,
    text: `
            Просыпаются Ангелы и выбирают кого они хотят защитить этой ночью.
          `
  },
  {
    name: 'Ведьмы',
    ifPlayerInGame: false,
    text: `
            Просыпаются Ведьмы.
             Хотите ли вы сделать иллюзорное убийство?
             Кого убивают ведьмы ?
          `
  },
  {
    name: 'Священник',
    ifPlayerInGame: true,
    text: `
            Просыпаются Священник и делает свою проверку.(на ведьму).
            Не забудь оведомить фанатика если его преверят. И дать доп жизнь
          `
  },
  {
    name: 'Фанатик',
    ifPlayerInGame: true,
    text: ` Просыпаются Фанатик. Проверяли ли вас?`
  },
  {
    name: 'Инквизитор',
    ifPlayerInGame: true,
    text: `
            Просыпаются Инквизитор и делает свою проверку по типу. (Информация, Атака...)
          `
  },
  {
    name: 'Бомбардировщик',
    ifPlayerInGame: true,
    text: `
            Если бомба есть!!
            Просыпаются Бомбардировщик и подает сигнал если хочет взорвать бомбу.
          `
  },
  {
    name: 'Охотник',
    ifPlayerInGame: true,
    text: `
            Если предыдущей ночью выживал человек. Просыпается охотник. И убивает цель. Которая выжела.
          `
  },
]

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
export const historyLineData = ({initialPlayers}) => {
  console.log('initialPlayers', initialPlayers)
  if(!Array.isArray(initialPlayers) || initialPlayers.length < 4){
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
      text: 'Азартный игрок выбирает четные или нечетные ночи в эти ночи у него будет иммунитет. Эта ночь нулевая.',
      ifPlayerInGame: true,
      type: 'night',
    },
    {
      id: 23,
      title: 'Просыпается Бомбардировщик ',
      ifPlayerInGame: true,
      type: 'night',
      text: `Выбирает кому дать бомбу. Покажите мне цифру я выдам бомбу этому игроку.`
    },
    {
      id: 24,
      title: 'Просыпается Оракул',
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
      text: 'Послушник узнает кто священник: покажите - ' + priest,
      type: 'night',
      ifPlayerInGame: true,
    },
    {
      id: 27,
      title: 'Просыпается Сторож',
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
    ...dayUsers({start: 29, users: initialPlayers}),
    ...voted(29 + initialPlayers.length),
  ]

  return GameMod.filterStepsPolesInGame(dayList, roles)
}

export const dayUsers = ({start, users}) => {
  const res = users.map((user, index) => {
    return {
      id: +start + index,
      title: 'Речь игрока: ' + +user.number + ' ' +  user.name,
      ifPlayerInGame: false,
      text: "Дневная речь",
      type: 'day'
    }
  })

  return res
}

export const voted = (prevId) => ([
  {
    id: prevId + 1,
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