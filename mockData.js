const saveGame = [
  {
    number: "1",
    name: "Ассасин",
    type: "attack",
    heart: 1,
    foll: 0,
    killedBy: null,
    isGood: true,
    gamblerChoose: "",
    wereWolfChoose: "",
    wereWolfTurned: false,
    fanaticCheck: 0,
    hunterWakeUp: [],
    deadOnDay: false,
    isJodge: false,
    fakeKill: false,
    killed: false,
    chain: false,
    ava: "/src/assets/ava/Property 1=Variant3.png",
    shield: 0,
  },
  {
    number: "2",
    name: "Охотник",
    type: "attack",
    heart: 1,
    foll: 0,
    killedBy: null,
    isGood: true,
    gamblerChoose: "",
    wereWolfChoose: "",
    wereWolfTurned: false,
    fanaticCheck: 0,
    hunterWakeUp: [{ night: 1, id: "4" }],
    deadOnDay: false,
    isJodge: false,
    fakeKill: false,
    killed: false,
    chain: false,
    ava: "/src/assets/ava/Property 1=Variant4.png",
    shield: 0,
  },
  {
    number: "3",
    name: "Могильщик",
    type: "info",
    heart: 1,
    foll: 0,
    killedBy: 1,
    isGood: false,
    gamblerChoose: "",
    wereWolfChoose: "",
    wereWolfTurned: false,
    fanaticCheck: 0,
    hunterWakeUp: [],
    deadOnDay: true,
    isJodge: false,
    fakeKill: false,
    killed: true,
    chain: false,
    ava: "/src/assets/ava/Property 1=Variant2.png",
    shield: 0,
  },
  {
    number: "4",
    name: "Священник",
    type: "holy",
    heart: 1,
    foll: 0,
    killedBy: null,
    isGood: true,
    gamblerChoose: "",
    wereWolfChoose: "",
    wereWolfTurned: false,
    fanaticCheck: 0,
    hunterWakeUp: [],
    deadOnDay: false,
    isJodge: false,
    fakeKill: false,
    killed: false,
    chain: false,
    ava: "/src/assets/ava/Property 1=Variant12.png",
    shield: 0,
  },
];

const saveGame_all = {
  finishGameBlock: false,
  finishGameResult: "mir",
  panelAction: null,
  isNight: true,
  nightVal: 2,
  detailMode: false,
  emissaryTryKilled: false,
  countNight: 2,
  blockHeal: [],
  log: false,
  activeStep: "night-1-2",
  nightHistory: [],
  dayLog: [
    { player: "3", type: "Казнь", inNextLog: false },
    { player: "4", type: "Попытка убийства" },
  ],
  activeNightStep: 0,
  gamblerChooseClosed: false,
};

const players = {
  1: {
    id: -861431,
    name: "Игрок Жорже, tg george",
    telegram: "george",
    role: { type: "mir", name: "Ассасин" },
  },
  2: {
    id: 1231231,
    name: "Игрок Катерина, tg AnEkaterina",
    telegram: "AnEkaterina",
    role: { type: "mir", name: "Охотник" },
  },
  3: {
    id: -381398.6,
    name: "Игрок Костя, tg koslev",
    telegram: "koslev",
    role: { type: "witch", name: "Могильщик" },
  },
  4: {
    id: -701420.2,
    name: "Игрок Лена, tg witch",
    telegram: "witch",
    role: { type: "mir", name: "Священник" },
  },
};

function getGameStats(saveGame, saveGame_all, players) {
  const finalResult = saveGame_all.finishGameResult;

  const stats = [];

  for (const playerNumber in players) {
    const playerInfo = players[playerNumber];

    const sgData = saveGame.find((sg) => sg.number === playerNumber);

    if (!sgData) {
      continue;
    }

    let killsCount = 0;
    saveGame.forEach((sg) => {
      if (String(sg.killedBy) === playerNumber) {
        killsCount++;
      }
    });

    const isWin = playerInfo.role.type === finalResult;

    // Build the result object
    const result = {
      id: playerInfo.id,
      name: playerInfo.name,
      telegram: playerInfo.telegram,
      role: playerInfo.role.name,
      side: playerInfo.role.type,
      kills: killsCount,
      isDead: sgData.killed,
      isWin: isWin,
      isWinAndNotDead: isWin && !sgData.killed,
      foll: sgData.foll,
      // or sgData.heart <= 0, if you prefer
      // You can add more fields if needed:
      // killedBy: sgData.killedBy,
      // dayKilled: sgData.deadOnDay,
      // ...
    };

    stats.push(result);
  }

  return stats;
}
