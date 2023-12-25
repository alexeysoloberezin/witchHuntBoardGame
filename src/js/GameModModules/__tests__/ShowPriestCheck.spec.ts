// Ваш файл с тестами, например, showPriestCheck.test.js

import {names} from "@/store/cards";
import GameMod from "@/js/GameMod";
import {expect, test, describe, it, vi} from 'vitest';
import {PlayerRole} from "@/globalTypes";

describe("showPriestCheck", () => {
  it("should handle fanatic case and alert 'Мирный'", () => {
    const playersRoles: Pick<PlayerRole, "name" | "number" | "fanaticCheck" | "isGood" | "heart" | "chain">[]
      = [
      {name: names.Fanatic, number: "1", fanaticCheck: 2, isGood: true, chain: false, heart: 1},
      {number: "2", name: "Мирный", fanaticCheck: 0, isGood: true, chain: false, heart: 1},
    ];
    const ids = ["1"];
    const refreshList = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles as PlayerRole[], ids, refreshList);

    console.log('playersRoles', playersRoles)

    expect(playersRoles[0].fanaticCheck).toBe(1);
    expect(playersRoles[0].heart).toBe(2);
    expect(refreshList).toHaveBeenCalled();
    expect(res).toEqual("Мирный");
  });

  it("should handle non-fanatic case and alert 'Мирный'", () => {
    const playersRoles: Pick<PlayerRole, "name" | "number" | "fanaticCheck" | "isGood" | "heart" | "chain">[]
      = [
      {name: names.Acolyte, number: "1", fanaticCheck: 0, isGood: true, heart: 1, chain: false},
      {number: "2", name: "Ведьма", fanaticCheck: 0, isGood: false,heart: 1, chain: false},
    ];
    const ids = ["1"];
    const refreshList = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles as PlayerRole[], ids, refreshList);

    expect(playersRoles[0].fanaticCheck).toBe(0);
    expect(playersRoles[0].heart).toBe(1);
    expect(refreshList).not.toHaveBeenCalled();
    expect(res).toEqual("Мирный");
  });

  it("should handle in chan demons", () => {
    const playersRoles: Pick<PlayerRole, "name" | "number" | "fanaticCheck" | "isGood" | "heart" | "chain">[]
    = [
      {name: names.Acolyte, number: "1", fanaticCheck: 0, isGood: true, chain: true, heart: 1},
      {number: "2", name: names.Nurse, fanaticCheck: 0, isGood: false, chain: true, heart: 1},
    ];

    const ids = ["1"];
    const refreshList = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles as PlayerRole[], ids, refreshList);

    expect(res).toEqual("Ведьма");
  });

  it("should handle in chan demons two good person", () => {
    const playersRoles: Pick<PlayerRole, "name" | "number" | "fanaticCheck" | "isGood" | "heart" | "chain">[]
      = [
      {name: names.Acolyte, number: "1", fanaticCheck: 0, isGood: true, chain: true, heart: 1},
      {number: "2", name: names.Nurse,fanaticCheck: 0, isGood: true, chain: true, heart: 1},
    ];

    const ids = ["2"];
    const refreshList = vi.fn();

    const res = GameMod.showPriestCheck(playersRoles as PlayerRole[], ids, refreshList);

    expect(res).toEqual("Мирный");
  });
});
