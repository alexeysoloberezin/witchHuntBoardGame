import {PlayerRole} from "@/globalTypes";

export function saveGameData(allData: AllData, playersRolesData: PlayerRole[]) {
  const dataToSave = {
    finishGameBlock: allData.finishGameBlock,
    finishGameResult: allData.finishGameResult,
    panelAction: allData.panelAction,
    isNight: allData.isNight,
    nightVal: allData.nightVal,
    detailMode: allData.detailMode,
    emissaryTryKilled: allData.emissaryTryKilled,
    countNight: allData.countNight,
    blockHeal: allData.blockHeal,
    log: allData.log,
    activeStep: allData.activeStep,
    nightHistory: allData.nightHistory,
    dayLog: allData.dayLog,
    activeNightStep: allData.activeNightStep,
    gamblerChooseClosed: allData.gamblerChooseClosed,
  };

  localStorage.setItem('saveGame_all', JSON.stringify(dataToSave));
  localStorage.setItem('saveGame', JSON.stringify(playersRolesData));
}

export type AllData = {
  finishGameBlock: boolean,
  finishGameResult: string | null,
  panelAction: string | null;
  isNight: boolean;
  nightVal: number;
  detailMode: boolean;
  countNight: number;
  emissaryTryKilled: boolean;
  blockHeal: string[];
  log: string | boolean;
  activeStep: string;
  nightHistory: string[];
  dayLog: string[];
  activeNightStep: number;
  gamblerChooseClosed: boolean;
};
