import { MANIPULATE_COUNTER, UPDATE_HISTORY } from '../actions/types';

const initialState = {
  lifeCounter: 20,
  history: [],
  loading: true
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case MANIPULATE_COUNTER:
      return {
        ...state,
        [action.counterType]: state[action.counterType] + action.payload
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
