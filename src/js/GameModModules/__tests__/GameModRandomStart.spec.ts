import {expect, test} from 'vitest';
import GameModRandomStart from '@/js/GameModModules/GameModRandomStart';
import {names} from "@/store/cards";

test('shuffleRoles function shuffles the array', () => {
  const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffledArray = [...originalArray];
  GameModRandomStart.shuffleRoles(shuffledArray);

  expect(shuffledArray).not.toEqual(originalArray);

  expect(shuffledArray.length).toEqual(originalArray.length);
});

test('generateRandomRoles function generates random roles excluding "Priest"', () => {
  const roles = ['Role1', 'Role2', 'Священник', 'Role3', 'Role4'];
  const witchCount = 2;
  const result = GameModRandomStart.generateRandomRoles(roles, witchCount);

  expect(Object.values(result)).not.toContain(names.Priest);

  expect(Object.values(result).length).toEqual(witchCount);
});

test('makeRandomRoles function generates random roles with types "witch" and "mir"', () => {
  const roles = ['Role1', 'Role2', 'Role3', 'Role4', 'Role5'];
  const witchCount = 2;
  const result = GameModRandomStart.makeRandomRoles(roles, witchCount);

  expect(typeof result).toEqual('object');

  expect(Object.keys(result).length).toEqual(roles.length);

  Object.values(result).forEach((role: any) => {
    expect(role?.type).toMatch(/witch|mir/);
  });

  const witchRolesCount = Object.values(result).filter((role: any) => role?.type === 'witch').length;
  expect(witchRolesCount).toEqual(witchCount);
});
