import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  UPDATE_HISTORY
} from '../actions/types';

const initialState = {
  lifeCounter: 20,
  history: [],
  loading: true
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        [action.payload.counterSelector]:
          state[action.payload.counterSelector] + action.payload.amount
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        [action.payload.counterSelector]:
          state[action.payload.counterSelector] - action.payload.amount
      };

    case UPDATE_HISTORY:
      return {
        ...state,
        history: [
          { change: action.payload, subtotal: state.lifeCounter },
          ...state.history
        ]
      };

    default:
      return state;
  }
};

export default counterReducer;
