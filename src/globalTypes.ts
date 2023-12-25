export type PlayerRole = {
  number: string;
  name: string;
  type: string;
  heart: number;
  foll: number;
  isGood: boolean;
  gamblerChoose: string;
  fanaticCheck: number;
  hunterWakeUp: {night: number, id: string}[]; // Не знаю структуры этого массива
  deadOnDay: boolean;
  isJodge: boolean;
  fakeKill: boolean;
  killed: boolean;
  chain: boolean;
  ava: string;
  shield: number;
};

export type Role = string
export type RoleWithType = {type: string, name: string}

export enum DayType {
  DAY = 'day',
  NIGHT = 'night',
  VOTED = 'voted',
  VOTED_SPEEK = "voted-speek"
}

export type HistoryItem = {
  player: string,
  type: string,
  inNextLog?: boolean
}

export type HistoryLineItem = {
  id: number | string,
  title: string,
  name: string,
  text: string,
  ifPlayerInGame: boolean,
  type: DayType,
}
export type HistoryLineData = {
  initialPlayers: PlayerRole[],
  nights: number,
  nightLog: HistoryItem[],
  dayLog: HistoryItem[]
}