import { INCREMENT_COUNTER, DECREMENT_COUNTER, UPDATE_HISTORY } from './types';

export const addLife = (amount = 1) => {
  return {
    type: INCREMENT_COUNTER,
    payload: {
      counterSelector: 'lifeCounter',
      amount
    }
  };
};

export const subtractLife = (amount = 1) => {
  return {
    type: DECREMENT_COUNTER,
    payload: {
      counterSelector: 'lifeCounter',
      amount
    }
  };
};

export const updateHistory = change => {
  return {
    type: UPDATE_HISTORY,
    payload: change
  };
};
