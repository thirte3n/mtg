import { MANIPULATE_COUNTER, UPDATE_HISTORY, SET_MODE } from '../actions/types';

const initialState = {
  mode: 'life',
  lifeCounter: 20,
  poisonCounter: 0,
  lifeHistory: [],
  poisonHistory: [],
  landCounter: {
    plains: 0,
    island: 0,
    swamp: 0,
    mountain: 0,
    forest: 0
  },
  theme: 'plains',
  loading: true
};

const counterReducer = (state = initialState, action) => {
  const history = `${action.mode}History`;
  const counter = `${action.mode}Counter`;

  switch (action.type) {
    case MANIPULATE_COUNTER:
      return {
        ...state,
        [counter]: state[counter] + action.payload
      };

    case UPDATE_HISTORY:
      return {
        ...state,
        [history]: [
          { change: action.payload, subtotal: state[counter] },
          ...state[history]
        ]
      };

    case SET_MODE:
      return {
        ...state,
        mode: action.payload
      };

    default:
      return state;
  }
};

export default counterReducer;
