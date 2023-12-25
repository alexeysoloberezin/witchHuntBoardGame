import { expect, test } from 'vitest';
import { names } from '@/store/cards';
import { GameModPlayers } from '@/js/GameModModules/GameModPlayers';
import {PlayerRole} from "@/globalTypes";

test('gamblerChoose function sets gamblerChoose property for Gambler', () => {
  const players = [
    { name: names.Gambler },
    { name: 'Role1' },
    { name: 'Role2' },
  ];
  const choose = 'some_choice';

  const gameModPlayers = new GameModPlayers();
  const result = gameModPlayers.gamblerChoose(players, choose);

  expect(result).toEqual([
    { name: names.Gambler, gamblerChoose: choose },
    { name: 'Role1' },
    { name: 'Role2' },
  ]);
});

test('gamblerShield function increments shield for Gambler based on gamblerChoose and nightVal', () => {
  const gambler = { name: names.Gambler, gamblerChoose: 'четные', shield: 0 };
  const playersRoles = [gambler, { name: 'Role1' }, { name: 'Role2' }];
  const nightValOdd = 3;
  const nightValEven = 4;

  const gameModPlayers: any = new GameModPlayers();
  gameModPlayers.playersRoles = playersRoles;

  gameModPlayers.gamblerShield(nightValOdd, playersRoles as PlayerRole[]);
  expect<any>(gambler.shield).toEqual(1);

  gambler.shield = 0;

  gameModPlayers.gamblerShield(nightValEven, playersRoles as PlayerRole[]);
  expect<any>(gambler.shield).toEqual(0);
});

test('gamblerHaveShield function returns true if Gambler has a shield based on choose and nightVal', () => {
  const gameModPlayers = new GameModPlayers();

  // Test with 'четные' choose and odd nightVal
  expect(gameModPlayers.gamblerHaveShield('четные', 3)).toBeTruthy();

  // Test with 'четные' choose and even nightVal
  expect(gameModPlayers.gamblerHaveShield('четные', 4)).toBeFalsy();

  // Test with 'нечетные' choose and odd nightVal
  expect(gameModPlayers.gamblerHaveShield('нечетные', 3)).toBeFalsy();

  // Test with 'нечетные' choose and even nightVal
  expect(gameModPlayers.gamblerHaveShield('нечетные', 4)).toBeTruthy();
});

test('priestShield function increments shield for Priest if nightVal is 0', () => {
  const priest = { name: names.Priest, shield: 0 };
  const playersRoles = [priest, { name: 'Role1' }, { name: 'Role2' }];

  const gameModPlayers: any = new GameModPlayers();

  // Test with nightVal = 0
  gameModPlayers.priestShield(0, playersRoles as PlayerRole[]);
  expect(priest.shield).toEqual(1);
});

