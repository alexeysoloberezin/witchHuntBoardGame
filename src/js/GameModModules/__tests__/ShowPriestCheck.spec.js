// Ваш файл с тестами, например, showPriestCheck.test.js

import { names } from "@/store/cards";
import GameMod from "@/js/GameMod";
import {expect, test, describe, it, vi} from 'vitest';

describe("showPriestCheck", () => {
  it("should handle fanatic case and alert 'Мирный'", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", fanaticCheck: 2,  isGood: true, heart: 1 },
      { number: "2", name: "Мирный", isGood: true, chain: false },
    ];
    const ids = ["1"];
    const refreshList = vi.fn();
    const setNextActive = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles, ids, refreshList, setNextActive);

    console.log('playersRoles', playersRoles)

    expect(playersRoles[0].fanaticCheck).toBe(1);
    expect(playersRoles[0].heart).toBe(2);
    expect(refreshList).toHaveBeenCalled();
    expect(setNextActive).toHaveBeenCalled();
    expect(res).toEqual("Мирный");
  });

  it("should handle non-fanatic case and alert 'Мирный'", () => {
    const playersRoles = [
      { name: names.Acolyte,number: "1", fanaticCheck: 0, isGood: true, heart: 1 },
      { number: "2", name: "Ведьма", isGood: false, chain: false },
    ];
    const ids = ["1"];
    const refreshList = vi.fn();
    const setNextActive = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles, ids, refreshList, setNextActive);

    expect(playersRoles[0].fanaticCheck).toBe(0);
    expect(playersRoles[0].heart).toBe(1);
    expect(refreshList).not.toHaveBeenCalled();
    expect(setNextActive).toHaveBeenCalled();
    expect(res).toEqual("Мирный");
  });

  it("should handle in chan demons", () => {
    const playersRoles = [
      { name: names.Acolyte,number: "1", fanaticCheck: 0, isGood: true, chain: true, heart: 1 },
      { number: "2", name: names.Nurse, isGood: false, chain: true, heart: 1 },
    ];

    const ids = ["1"];
    const refreshList = vi.fn();
    const setNextActive = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles, ids, refreshList, setNextActive);

    expect(res).toEqual("Ведьма");
  });

  it("should handle in chan demons two good person", () => {
    const playersRoles = [
      { name: names.Acolyte,number: "1", fanaticCheck: 0, isGood: true, chain: true, heart: 1 },
      { number: "2", name: names.Nurse, isGood: true, chain: true, heart: 1 },
    ];

    const ids = ["2"];
    const refreshList = vi.fn();
    const setNextActive = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles, ids, refreshList, setNextActive);

    expect(res).toEqual("Мирный");
  });
});
