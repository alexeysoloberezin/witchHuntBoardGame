// Ваш файл с тестами, например, showPriestCheck.test.js

import { names } from "@/store/cards";
import GameMod from "@/js/GameMod";
import {expect, test, describe, it, vi} from 'vitest';

describe("Angel Choose", () => {
  const setNextActive = vi.fn();

  it("Base Choose one person", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", isGood: true, chain: false, shield: 0 },
      { name: names.Acolyte, number: "2", isGood: true, chain: false, shield: 0 },
      { name: names.Bomber, number: "3", isGood: false, chain: false, shield: 0 },
    ];

    const blockHeal = []
    const ids = ["1"];

    GameMod.angelChoose(ids, playersRoles, blockHeal, setNextActive);

    expect(playersRoles[0].shield).toBe(1);
    expect(playersRoles[1].shield).toBe(0);
    expect(playersRoles[2].shield).toBe(0);
    expect(setNextActive).toHaveBeenCalled();
  });

  it("Base Choose two person", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", isGood: true, chain: false, shield: 0 },
      { name: names.Acolyte, number: "2", isGood: true, chain: false, shield: 0 },
      { name: names.Bomber, number: "3", isGood: false, chain: false, shield: 0 },
    ];

    const blockHeal = []
    const ids = ["2", "3"];

    GameMod.angelChoose(ids, playersRoles, blockHeal, setNextActive);

    expect(playersRoles[1].shield).toBe(1);
    expect(playersRoles[2].shield).toBe(1);
    expect(playersRoles[0].shield).toBe(0);
  });

  it("Choose in chain demons one person", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", isGood: true, chain: false, shield: 0 },
      { name: names.Acolyte, number: "2", isGood: true, chain: true, shield: 0 },
      { name: names.Bomber, number: "3", isGood: false, chain: true, shield: 0 },
    ];

    const blockHeal = []
    const ids = ["2"];

    GameMod.angelChoose(ids, playersRoles, blockHeal, setNextActive);

    expect(playersRoles[0].shield).toBe(0);
    expect(playersRoles[1].shield).toBe(1);
    expect(playersRoles[2].shield).toBe(0);
    expect(blockHeal).toEqual(["2"])
  });

  it("Choose in chain demons two person", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", isGood: true, chain: false, shield: 0 },
      { name: names.Acolyte, number: "2", isGood: true, chain: true, shield: 0 },
      { name: names.Bomber, number: "3", isGood: false, chain: true, shield: 0 },
    ];

    const blockHeal = ["5"]
    const ids = ["2", "3"];

    GameMod.angelChoose(ids, playersRoles, blockHeal, setNextActive);

    expect(playersRoles[0].shield).toBe(0);
    expect(playersRoles[1].shield).toBe(1);
    expect(playersRoles[2].shield).toBe(1);
    expect(blockHeal).toEqual(["5", "2", "3"])
  });

  it("Choose in blocked person", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", isGood: true, chain: false, shield: 0 },
      { name: names.Acolyte, number: "2", isGood: true, chain: false, shield: 0 },
      { name: names.Bomber, number: "3", isGood: false, chain: false, shield: 0 },
    ];

    const blockHeal = ["2"]
    const ids = ["2", "3"];

    GameMod.angelChoose(ids, playersRoles, blockHeal, setNextActive);

    expect(blockHeal).toEqual(["2"]);
    expect(playersRoles[0].shield).toBe(0);
    expect(playersRoles[1].shield).toBe(0);
    expect(playersRoles[2].shield).toBe(0);
  });

  it("Choose with error data", () => {
    const playersRoles = [
      { name: names.Fanatic, number: "1", isGood: true, chain: false, shield: 0 },
      { name: names.Acolyte, number: "2", isGood: true, chain: false, shield: 0 },
      { name: names.Bomber, number: "3", isGood: false, chain: false, shield: 0 },
    ];

    const blockHeal = []
    const ids = [];

    GameMod.angelChoose(ids, playersRoles, blockHeal, setNextActive);

    expect(playersRoles[0].shield).toBe(0);
    expect(playersRoles[1].shield).toBe(0);
    expect(playersRoles[2].shield).toBe(0);
    expect(blockHeal).toEqual([]);
  });
});
