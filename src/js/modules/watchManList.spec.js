import { expect, test } from 'vitest'
import {watchmanListEnd} from "@/js/GameModData";
import {watchmanList} from "@/js/modules/watchManList";
import {names} from "@/store/cards";

test('getWatchmanList function base', () => {
  const testArray = Object.keys(watchmanList).map((name, index) => {
    return {
      number: (index + 1).toString(),
      name: watchmanList[name],
      isGood: true,
    };
  });

  const result = watchmanListEnd(testArray);
  expect(result).toEqual('1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13');
});

test('getWatchmanList function first 4 witches', () => {
  const testArray = Object.keys(watchmanList).map((name, index) => {
    return {
      number: (index + 1).toString(),
      name: watchmanList[name],
      isGood: index > 4,
    };
  });

  const result = watchmanListEnd(testArray);
  expect(result).toEqual('6 , 7 , 8 , 9 , 10 , 11 , 12 , 13');
});

test('getWatchmanList function all names', () => {
  const testArray = Object.keys(names).map((name, index) => {
    return {
      number: (index + 1).toString(),
      name: names[name],
      isGood: true,
    };
  });

  const result = watchmanListEnd(testArray);
  expect(result).toEqual('1 , 2 , 3 , 4 , 5 , 7 , 8 , 9 , 10 , 17 , 19 , 20 , 22');
});

test('getWatchmanList function % 2', () => {
  const testArray = Object.keys(names).map((name, index) => {
    return {
      number: (index + 1).toString(),
      name: names[name],
      isGood: index % 2 === 0,
    };
  });

  const result = watchmanListEnd(testArray);
  expect(result).toEqual('1 , 3 , 5 , 7 , 9 , 17 , 19');
});