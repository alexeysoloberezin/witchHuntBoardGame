import {names} from "@/store/cards";

export function saveGameData(allData, playersRolesData) {
  const dataToSave = {
    panelAction: allData.panelAction,
    isNight: allData.isNight,
    nightVal: allData.nightVal,
    detailMode: allData.detailMode,
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

