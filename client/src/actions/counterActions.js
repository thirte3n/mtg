import { MANIPULATE_COUNTER, UPDATE_HISTORY } from './types';

export const manipulateLife = (amount = 1) => {
  return {
    type: MANIPULATE_COUNTER,
    payload: amount,
    counterType: 'lifeCounter'
  };
};

export const updateHistory = change => {
  return {
    type: UPDATE_HISTORY,
    payload: change
  };
};
