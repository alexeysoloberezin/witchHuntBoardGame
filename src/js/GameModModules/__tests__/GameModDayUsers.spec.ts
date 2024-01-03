// Ваш файл с тестами, например, showPriestCheck.test.js

import {names} from "@/store/cards";
import GameMod from "@/js/GameMod";
import {expect, test, describe, it, vi} from 'vitest';
import {PlayerRole} from "@/globalTypes";
import {dayUsers} from "@/js/GameModData";

const mokData = [{
  "number": "1",
  "name": "Сторож",
  "type": "info",
  "heart": 1,
  "foll": 0,
  "isGood": false,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant18.png",
  "shield": 0
}, {
  "number": "2",
  "name": "Ученик",
  "type": "attack|info",
  "heart": 1,
  "foll": 0,
  "isGood": false,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant13.png",
  "shield": 0
}, {
  "number": "3",
  "name": "Священник",
  "type": "holy",
  "heart": 1,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant12.png",
  "shield": 0
}, {
  "number": "4",
  "name": "Охотник",
  "type": "attack",
  "heart": 1,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant4.png",
  "shield": 0
}, {
  "number": "5",
  "name": "Выжившый",
  "type": "guard",
  "heart": 2,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant8.png",
  "shield": 0
}, {
  "number": "6",
  "name": "Могильщик",
  "type": "info",
  "heart": 1,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant2.png",
  "shield": 0
}, {
  "number": "7",
  "name": "Ассасин",
  "type": "attack",
  "heart": 1,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant3.png",
  "shield": 0
}, {
  "number": "8",
  "name": "Азартный игрок",
  "type": "guard",
  "heart": 1,
  "foll": 0,
  "isGood": false,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant6.png",
  "shield": 0
}, {
  "number": "9",
  "name": "Судья",
  "type": "attack",
  "heart": 1,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant7.png",
  "shield": 0
}, {
  "number": "10",
  "name": "Медсестра",
  "type": "guard",
  "heart": 1,
  "foll": 0,
  "isGood": true,
  "gamblerChoose": "",
  "fanaticCheck": 0,
  "hunterWakeUp": [],
  "deadOnDay": false,
  "isJodge": false,
  "fakeKill": false,
  "killed": false,
  "chain": false,
  "ava": "/src/assets/ava/Property 1=Variant5.png",
  "shield": 0
}];

describe("Day users history", () => {
  it("All players alive day 1", () => {
    const users = [...mokData]
    const night = 1;
    const nightLog = [];

    const res = dayUsers({night, users, nightLog});
    const resIds = res.map(el => el.id)

    expect(resIds).toEqual([
        'daySpeach-start-1',
        'daySpeach-1-2',
        'daySpeach-1-3',
        'daySpeach-1-4',
        'daySpeach-1-5',
        'daySpeach-1-6',
        'daySpeach-1-7',
        'daySpeach-1-8',
        'daySpeach-1-9',
        'daySpeach-1-10',
        'daySpeach-1-1'
      ]
    )
  });

  it("All players alive day 3", () => {
    const users = [...mokData]
    const night = 3;
    const nightLog = [];

    const res = dayUsers({night, users, nightLog});
    const resIds = res.map(el => el.id)

    expect(resIds).toEqual([
        'daySpeach-start-3',
        'daySpeach-3-4',
        'daySpeach-3-5',
        'daySpeach-3-6',
        'daySpeach-3-7',
        'daySpeach-3-8',
        'daySpeach-3-9',
        'daySpeach-3-10',
        'daySpeach-3-1',
        'daySpeach-3-2',
        'daySpeach-3-3',
      ]
    )
  });

  it("Killed first player, day 2", () => {
    const users = mokData.map(el => {
      return el.number === '1' ? {...el, killed: true} : el
    })

    const night = 1;
    const nightLog = [];

    const res = dayUsers({night, users, nightLog});
    const resIds = res.map(el => el.id)

    expect(resIds).toEqual([
        "daySpeach-start-1",
        "daySpeach-1-2",
        "daySpeach-1-3",
        "daySpeach-1-4",
        "daySpeach-1-5",
        "daySpeach-1-6",
        "daySpeach-1-7",
        "daySpeach-1-8",
        "daySpeach-1-9",
        "daySpeach-1-10",
      ]
    )
  });

  it("Killed first player, day 3", () => {
    const users = mokData.map(el => {
      return el.number === '1' ? {...el, killed: true} : el
    })

    const night = 2;
    const nightLog = [];

    const res = dayUsers({night, users, nightLog});
    const resIds = res.map(el => el.id)

    expect(resIds).toEqual([
        "daySpeach-start-2",
        "daySpeach-2-3",
        "daySpeach-2-4",
        "daySpeach-2-5",
        "daySpeach-2-6",
        "daySpeach-2-7",
        "daySpeach-2-8",
        "daySpeach-2-9",
        "daySpeach-2-10",
        "daySpeach-2-2",
      ]
    )
  });

  it("Killed players - 1,2 -- day 4", () => {
    const users = mokData.map(el => {
      return el.number === '1' || el.number === '2' ? {...el, killed: true} : el
    })

    const night = 3;
    const nightLog = [];

    const res = dayUsers({night, users, nightLog});
    const resIds = res.map(el => el.id)

    expect(resIds).toEqual([
        "daySpeach-start-3",
        "daySpeach-3-4",
        "daySpeach-3-5",
        "daySpeach-3-6",
        "daySpeach-3-7",
        "daySpeach-3-8",
        "daySpeach-3-9",
        "daySpeach-3-10",
        "daySpeach-3-3",
      ]
    )
  });

  it("Killed players - 2,4,7,8,1 -- day 6", () => {
    const killed = ['2', '4', '7', '8', '1']
    const users = mokData.map(el => {
      return killed.includes(el.number) ? {...el, killed: true} : el
    })

    const night = 5;
    const nightLog = [];

    const res = dayUsers({night, users, nightLog});
    const resIds = res.map(el => el.id)
    console.log(resIds)

    expect(resIds).toEqual([
        "daySpeach-start-5",
        "daySpeach-5-6",
        "daySpeach-5-9",
        "daySpeach-5-10",
        "daySpeach-5-3",
        "daySpeach-5-5",
      ]
    )
  });
});
