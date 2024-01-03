import cards, {names} from "@/store/cards";
import {Card} from "@/store/cards.types";

class GameVariants {
  variants: any[] = [
    {
      title: "Базовый вариант",
      description: "Что есть то есть",
      roles: [
        names.Priest,
        names.Apprentice,
        names.Judge,
        names.Gravedigger,
        names.Assassin,
        names.Survivalist,
        names.Nurse,
        names.Watchman,
        names['(D.O.B.) Dirty Old Bastard'],
        names.Fanatic,
        names.Gambler,
        names.Hunter,
        names.Bomber,
        names["Benevolent Old Dame"],
        names.Inquisitor,
        names.Emissary,
        names.Acolyte,
        names.Spiritualist,
        names["Loose Cannon"],
        names.Oracle,
        names["Fortune Teller"],
      ]
    },
    {
      title: "Знание сила!",
      description: '"Знания преображают обычного человека в мудреца, открывая двери возможностей."',
      roles: [
        names.Priest,
        names.Apprentice,
        names.Judge,
        names.Gravedigger,
        names.Watchman,
        names.Inquisitor,
        names['Peeping Tom'],
        names.Fanatic,
        names.Acolyte,
        names.Spiritualist,
        names.Oracle,
        names["Fortune Teller"],
        names.Assassin,
        names.Survivalist,
        names.Nurse,
        names['(D.O.B.) Dirty Old Bastard'],
        names.Gambler,
        names.Hunter,
        names.Bomber,
        names["Benevolent Old Dame"],
        names.Emissary,
        names["Loose Cannon"],
      ]
    },
    {
      title: "Попытайся дожить до утра. 'Аккуратная игра? - здесь не поможет!'",
      description: '"Даже после самой темной ночи наступает рассвет, а сильный дождь заканчивается радугой."',
      roles: [
        names.Priest,
        names.Apprentice,
        names.Judge,
        names.Gravedigger,
        names.Assassin,
        names.Hunter,
        names.Bomber,
        names['(D.O.B.) Dirty Old Bastard'],
        names["Loose Cannon"],
        names.Survivalist,
        names["Benevolent Old Dame"],
        names.Watchman,
        names.Gambler,
        names.Fanatic,
        names.Inquisitor,
        names.Nurse,
        names.Acolyte,
        names.Emissary,
        names.Spiritualist,
        names.Oracle,
        names['Peeping Tom'],
        names["Fortune Teller"],
      ]
    },
    {
      title: "Один в поле не воин!",
      description: '"Раньше говорили: «Я бы с ним в разведку не пошёл»\n' +
        'Я с тобой в тур не поехал — ты проверку не прошёл"',
      roles: [
        names.Emissary,
        names.Priest,
        names.Apprentice,
        names.Judge,
        names.Gravedigger,
        names.Assassin,
        names.Hunter,
        names.Bomber,
        names['(D.O.B.) Dirty Old Bastard'],
        names["Loose Cannon"],
        names.Survivalist,
        names.Nurse,
        names["Benevolent Old Dame"],
        names.Watchman,
        names.Gambler,
        names.Fanatic,
        names.Inquisitor,
        names.Acolyte,
        names.Spiritualist,
        names.Oracle,
        names['Peeping Tom'],
        names["Fortune Teller"],
      ]
    },
    {
      title: "Подглядывающий Том в Комнате!",
      description: '"Мне не надо никаких миллиардов. Я ничего не хочу, я не хочу это видеть — я хочу про это сказать всем. Понимаешь?"',
      roles: [
        names['Peeping Tom'],
        names.Priest,
        names.Apprentice,
        names.Judge,
        names.Gravedigger,
        names.Watchman,
        names.Inquisitor,
        names.Bomber,
        names.Oracle,
        names.Assassin,
        names.Gambler,
        names.Fanatic,
        names.Hunter,
        names.Survivalist,
        names.Nurse,
        names["Benevolent Old Dame"],
        names['(D.O.B.) Dirty Old Bastard'],
        names["Loose Cannon"],
        names.Acolyte,
        names.Spiritualist,
        names.Emissary,
        names["Fortune Teller"],
      ]
    },
    {
      title: "Попытка убийства или иллюзия обмана?",
      description: '"Единственный способ отделаться от искушения – это поддаться ему."',
      roles: [
        names.Priest,
        names.Apprentice,
        names.Judge,
        names.Gravedigger,
        names.Emissary,
        names.Hunter,
        names.Nurse,
        names.Assassin,
        names.Survivalist,
        names.Bomber,
        names.Gambler,
        names.Fanatic,
        names.Inquisitor,
        names['(D.O.B.) Dirty Old Bastard'],
        names.Oracle,
        names["Benevolent Old Dame"],
        names.Watchman,
        names["Loose Cannon"],
        names.Acolyte,
        names.Spiritualist,
        names['Peeping Tom'],
        names["Fortune Teller"],
      ]
    }
  ]

  getVariants() {
    return this.variants.map(variant => {
      return {
        ...variant,
        roles: variant.roles.map(role => {
          return cards.find(card => card.name === role)
        })
      }
    })
  }

  setVariant(roles: Card[]) {
     const arr = roles.map(role => role.name)
     localStorage.setItem('gameRoles', JSON.stringify(arr))
  }

  isMode(roles: string[], playerLength: number) {
    if(!Array.isArray(roles)){
      return false
    }

    return this.variants.find(variant => {
      const sortedRoles = [...roles].sort();
      const sortedVariantRoles = [...variant.roles].slice(0, playerLength).sort();
      return JSON.stringify(sortedVariantRoles) === JSON.stringify(sortedRoles);
    })
  }
}

export default new GameVariants()