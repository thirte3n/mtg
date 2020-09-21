import {
  MANIPULATE_SINGLE_COUNTER,
  MANIPULATE_LAND_COUNTER,
  UPDATE_HISTORY,
  SET_MODE
} from './types';

export const manipulateSingleCounter = (amount = 1, mode) => {
  return {
    type: MANIPULATE_SINGLE_COUNTER,
    payload: amount,
    mode
  };
};

export const manipulateLandCounter = (amount = 1, landType, mode) => {
  return {
    type: MANIPULATE_LAND_COUNTER,
    payload: amount,
    landType,
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

export const setMode = (mode) => {
  return {
    type: SET_MODE,
    payload: mode
  };
};
