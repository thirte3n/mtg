import { MANIPULATE_COUNTER, UPDATE_HISTORY, SET_MODE } from './types';

export const manipulateCounter = (amount = 1, mode) => {
  return {
    type: MANIPULATE_COUNTER,
    payload: amount,
    mode
  };
};

export const updateHistory = (change, mode) => {
  return {
    type: UPDATE_HISTORY,
    payload: change,
    mode
  };
};

export const setMode = mode => {
  return {
    type: SET_MODE,
    payload: mode
  };
};
